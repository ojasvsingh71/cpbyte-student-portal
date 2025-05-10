import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import ResponseError from "../types/ResponseError.js";
import axios from "axios";

export const getTrackerDashboard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ResponseError("User ID is required", 400);
  }

  const DashData = await prisma.user.findUnique({
    where: {
      library_id: id,
    },
    include: {
      tracker: {
        include: {
          leetcode: true,
          github: true,
        },
      },
    },
    omit: {
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!DashData) {
    return res
      .status(404)
      .json({ message: "No tracker data found for this user" });
  }

  return res.status(200).json(DashData);
});

export const addSkill = asyncHandler(async (req, res) => {
  const { skill } = req.body;

  if (!skill) {
    throw new ResponseError("Skill is required", 400);
  }

  const updatedTracker = await prisma.trackerDashboard.update({
    where: {
      userId: req.userId,
    },
    data: {
      skills: {
        push: skill,
      },
    },
  });

  return res.status(200).json(updatedTracker);
});

export const removeSkill = asyncHandler(async (req, res) => {
  const { skill } = req.body;

  if (!skill) {
    throw new ResponseError("Skill is required", 400);
  }
  const dashboard = await prisma.trackerDashboard.findUnique({
    where: {
      userId: req.userId,
    },
  });

  if (!dashboard) {
    throw new ResponseError("Dashboard not found", 404);
  }

  const updatedSkills = dashboard.skills.filter((s) => s !== skill);

  const updatedTracker = await prisma.trackerDashboard.update({
    where: {
      userId: req.userId,
    },
    data: {
      skills: updatedSkills,
    },
  });

  return res.status(200).json(updatedTracker);
});

const getPastFiveDays = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pastFiveDays = [];

  for (let i = 4; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    const utcTimestamp = Date.UTC(
      pastDate.getFullYear(),
      pastDate.getMonth(),
      pastDate.getDate()
    );
    pastFiveDays.push(utcTimestamp / 1000);
  }
  return pastFiveDays;
}; // This function returns an array of the last 5 days in UTC timestamp format

const check = async (matchDate, dbHistory) => {
  const dbObject = JSON.parse(dbHistory);
  const set = new Set(Object.keys(dbObject).map(Number));
  const finalDate = [0, 0, 0, 0, 0];
  for (let i = 4; i >= 0; i--) {
    if (set.has(matchDate[i])) {
      finalDate[i] = 1;
    }
  }
  return finalDate;
}; // This function checks if the last 5 days are present in the database history and returns an array of 1s and 0s

export const addLeetCode = asyncHandler(async (req, res) => {
  const { leetcodeUsername } = req.body;

  if (!leetcodeUsername) {
    throw new ResponseError("Leetcode username is required", 400);
  }

  const leetcode = await axios.get(
    `https://leetcode.com/graphql?query=query%20{%20matchedUser(username:%22${leetcodeUsername}%22)%20{%20submissionCalendar%20submitStats%20{%20acSubmissionNum%20{%20count%20}%20}%20}%20}`
  );

  const matchedUser = leetcode.data.data.matchedUser;

  if (!matchedUser) {
    throw new ResponseError("Leetcode user not found", 404);
  }

  const tracker = await prisma.trackerDashboard.findUnique({
    where: {
      userId: req.userId,
    },
    include: {
      leetcode: true,
    },
  });

  await prisma.leetcode.update({
    where: {
      id: tracker.leetcode.id,
    },
    data: {
      username: leetcodeUsername,
      url: `https://leetcode.com/${leetcodeUsername}/`,
      solvedProblems: matchedUser.submitStats.acSubmissionNum[0].count,
      easy: matchedUser.submitStats.acSubmissionNum[1].count,
      medium: matchedUser.submitStats.acSubmissionNum[2].count,
      hard: matchedUser.submitStats.acSubmissionNum[3].count,
      calendar: matchedUser.submissionCalendar,
      tracker: {
        connect: {
          id: tracker.id,
        },
      },
    },
  });

  const past5Days = getPastFiveDays();
  const record = await check(past5Days, matchedUser.submissionCalendar);

  const updatedTracker = await prisma.trackerDashboard.update({
    where: {
      id: tracker.id,
    },
    data: {
      past5: record,
    },
    include: {
      leetcode: true,
    },
  });

  return res.status(200).json(updatedTracker);
});

export const addProject = asyncHandler(async (req, res) => {
  const { project } = req.body;

  if (!project) {
    throw new ResponseError("Project data is required", 400);
  }
  const tracker = await prisma.trackerDashboard.findUnique({
    where: { userId: req.userId },
  });

  if (!tracker) {
    throw new ResponseError("Tracker not found for this user", 404);
  }
  const addedProject = await prisma.projects.create({
    data: {
      ...project,
      tracker: {
        connect: {
          id: tracker.id,
        },
      },
    },
  });

  return res.status(201).json(addedProject);
});

export const removeProject = asyncHandler(async (req, res) => {
  const { projectId } = req.query;
  console.log(projectId);

  if (!projectId) {
    throw new ResponseError("Project ID is required", 400);
  }

  const deletedProject = await prisma.projects.delete({
    where: {
      id: projectId,
    },
  });

  const newProject = await prisma.projects.findMany({
    where: {
      trackerId: deletedProject.trackerId,
    },
  });

  return res.status(200).json(newProject);
});

export const addGitHub = asyncHandler(async (req, res) => {
  const { githubUsername } = req.body;

  if (!githubUsername) {
    throw new ResponseError("GitHub data is required", 400);
  }

  const tracker = await prisma.trackerDashboard.findUnique({
    where: {
      userId: req.userId,
    },
    include: {
      github: true,
    },
  });

  if (!tracker) {
    throw new ResponseError("User Tracker Dashboard not found", 404);
  }

  const response = await axios.post(
    "https://api.github.com/graphql",
    {
      query: `query {user(login: "${githubUsername}") {contributionsCollection {contributionCalendar {totalContributions}}pullRequests {totalCount}repositories(privacy: PUBLIC) {totalCount}}}`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new ResponseError("GitHub user not found", 404);
  }

  const totalContributions =
    response.data.data.user.contributionsCollection.contributionCalendar
      .totalContributions;
  const totalPullRequests = response.data.data.user.pullRequests.totalCount;
  const totalRepositories = response.data.data.user.repositories.totalCount;

  const updatedGithub = await prisma.gitHub.update({
    where: {
      id: tracker.github.id,
    },
    data: {
      url: `https://github.com/${githubUsername}`,
      contributions: totalContributions,
      prs: totalPullRequests,
      repos: totalRepositories,
      username: githubUsername,
    },
  });

  return res.status(200).json(updatedGithub);
});

export const refreshAll = asyncHandler(async (req, res) => {
  const leetcodeEntries = await prisma.leetcode.findMany();
  const githubEntries = await prisma.gitHub.findMany();

  for (const entry of leetcodeEntries) {
    const leetcode = await axios.get(
      `https://leetcode.com/graphql?query=query%20{%20matchedUser(username:%22${entry.username}%22)%20{%20submissionCalendar%20submitStats%20{%20acSubmissionNum%20{%20count%20}%20}%20}%20}`
    );

    const matchedUser = leetcode.data.data.matchedUser;

    if (!matchedUser) {
      continue;
    }

    await prisma.leetcode.update({
      where: {
        id: entry.id,
      },
      data: {
        solvedProblems: matchedUser.submitStats.acSubmissionNum[0].count,
        easy: matchedUser.submitStats.acSubmissionNum[1].count,
        medium: matchedUser.submitStats.acSubmissionNum[2].count,
        hard: matchedUser.submitStats.acSubmissionNum[3].count,
        calendar: matchedUser.submissionCalendar,
      },
    });

    const past5Days = getPastFiveDays();
    const record = await check(past5Days, matchedUser.submissionCalendar);

    await prisma.trackerDashboard.update({
      where: {
        id: entry.trackerId,
      },
      data: {
        past5: record,
      },
    });
  }

  for (const entry of githubEntries) {
    const response = await axios.post(
      "https://api.github.com/graphql",
      {
        query: `query {user(login: "${entry.username}") {contributionsCollection {contributionCalendar {totalContributions}}pullRequests {totalCount}repositories(privacy: PUBLIC) {totalCount}}}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    if (response.status !== 200) {
      continue;
    }

    const totalContributions =
      response.data.data.user.contributionsCollection.contributionCalendar
        .totalContributions;
    const totalPullRequests = response.data.data.user.pullRequests.totalCount;
    const totalRepositories = response.data.data.user.repositories.totalCount;

    await prisma.gitHub.update({
      where: {
        id: entry.id,
      },
      data: {
        contributions: totalContributions,
        prs: totalPullRequests,
        repos: totalRepositories
      },
    });
  }

  return res.status(200).json({
    message: "All LeetCode and Github entries refreshed successfully",
  });
});