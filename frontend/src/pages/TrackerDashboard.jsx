import React, { useEffect, useState, useRef } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router-dom";
import git from "../assets/github.webp";
import { Star } from "lucide-react";
import { IoStatsChartSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import * as THREE from "three";

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


function TrackerDashboard() {
  const { data } = useSelector((state) => state.tracker);
  const [date, setDate] = useState("");

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);


  useEffect(() => {
    const date = new Date();
    setDate(date.toUTCString());
 }, [])
 
 useEffect(() => {
  let isMounted = true;

  const loadVanta = async () => {
    const VANTA = await import("vanta/dist/vanta.net.min");

    if (isMounted && !vantaEffect.current) {
      vantaEffect.current = VANTA.default({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xfff5,
        backgroundColor: 0x0,
        points: 20.00,
        maxDistance: 10.00,
        spacing: 20.00,
      });
    }
  };

  loadVanta();

  return () => {
    isMounted = false;
    if (vantaEffect.current) vantaEffect.current.destroy();
  };
}, []);

  return (
  <div ref={vantaRef} className="flex items-center justify-center min-h-screen w-full">
    <div className="flex-1 p-8 md:p-8 min-h-screen w-full z-10">
      <div className="mb-6 md:mb-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 lg:pt-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Hello, {data?.name}
          </h1>
          <p className="text-sm text-gray-400">Today is {date}</p>
        </div>
        <div className="flex space-x-5">
          <span className="cursor-pointer hover:opacity-80 transition-opacity">
            <FaInstagram color="white" size={"1.5rem"} />
          </span>
          <span className="cursor-pointer hover:opacity-80 transition-opacity">
            <FaFacebook color="white" size={"1.5rem"} />
          </span>
          <span className="cursor-pointer hover:opacity-80 transition-opacity">
            <FaLinkedin color="white" size={"1.5rem"} />
          </span>
          <span className="cursor-pointer hover:opacity-80 transition-opacity">
            <FaTwitter color="white" size={"1.5rem"} />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="backdrop-blur-sm rounded-4xl shadow-[0_0_15px_#0ec1e7]/50 border border-[#0ec1e7] text-white w-full flex items-center justify-around p-4 lg:py-6 transition-transform duration-300 hover:scale-105">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <img
                src="src\assets\TotalQuestions.png"
                alt="TotalSolved-icon"
                className="w-6 h-6 md:w-7 md:h-7"
              />
              <h2 className="font-medium text-lg md:text-xl">Total Questions</h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Number of questions Solved🚀
            </p>
          </div>
          <span className="text-3xl md:text-4xl font-bold">
            {data?.leetcode.solvedProblems === -1
              ? "N/A"
              : data?.leetcode.solvedProblems}
          </span>
        </div>
        <div className="backdrop-blur-sm rounded-4xl shadow-[0_0_15px_#0ec1e7]/50 border border-[#0ec1e7] text-white flex items-center justify-around p-4 lg:py-6 transition-transform duration-300 hover:scale-105">
          <div>
              <div className="flex items-center gap-2 mb-1">
                <img
                  src="src\assets\Ranking.png"
                  alt="ranking-icon"
                  className="w-6 h-6 md:w-7 md:h-7"
                />
                <h2 className="font-medium text-lg md:text-xl">Ranking</h2>
              </div>
            <p className="text-gray-400 text-sm md:text-base">
              Overall Leaderboard Ranking👑
            </p>
          </div>
          <span className="text-3xl md:text-4xl font-bold">
            {data?.rank === -1 ? "N/A" : data?.rank}
          </span>
        </div>
        <div className="backdrop-blur-sm rounded-4xl border border-[#0ec1e7] shadow-[0_0_15px_#0ec1e7]/50 text-white flex items-center justify-around p-4 lg:py-6 md:col-span-2 lg:col-span-1 transition-transform duration-300 hover:scale-105">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <img
                src="src\assets\Streak.png"
                alt="Streak-icon"
                className="w-6 h-6 md:w-7 md:h-7"
              />
              <h2 className="font-medium text-lg md:text-xl">Past days</h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Consistency heat map🔥
            </p>
          </div>
          <span className="text-3xl font-bold flex gap-1">
            {data?.past5.map((day, index) => (
              <div
                key={index}
                className={`${
                  day == 0 ? "bg-red-500" : "bg-green-500"
                } w-4 h-4 md:w-5 md:h-5 rounded-md`}
              ></div>
            ))}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-7 my-4 md:my-5">
        <div className="backdrop-blur-sm rounded-2xl shadow-xl border border-white flex text-white flex-col  p-4 md:p-7">
          <h2 className="flex items-center gap-2">
            <IoStatsChartSharp size={"1.5rem"} />
            <span className="text-xl md:text-2xl font-medium">DSA Stats</span>
          </h2>
          <div className="border-t border-gray-600 my-4" />


          {/* Text Content */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4 md:my-5 md:mb-10 gap-4">
            <div className="space-y-8 text-base font-semibold md:text-xl ml-10">
              <div className="text-[#00e676]">
                Easy:
                <div className="text-white">{data?.leetcode.easy}</div>
              </div>
              <div className="text-[#ff9100]">
                Medium:
                <div  className="text-white">{data?.leetcode.medium}</div>
              </div>
              <div className="text-[#f44336]">
                Hard:
                <div className="text-white">{data?.leetcode.hard}</div>
              </div>
            </div>
            {/* Pie Chart */}
            <div className="w-56 h-56 mr-25 relative transition-transform duration-300 hover:scale-105">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {/* Easy Ring (Outer) */}
                  <Pie
                    data={[
                      { name: "Easy", value: data?.leetcode?.easy || 0 , fill:"#00e676"},
                      { name: "Remaining", value: 883 - (data?.leetcode?.easy || 0), fill:"#1e1e1e" },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={65}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                    cornerRadius={10}

                  >
                  </Pie>

                  {/* Medium Ring (Middle) */}
                  <Pie
                    data={[
                      { name: "Medium", value: data?.leetcode?.medium || 0 , fill:"#ff9100"},
                      { name: "Remaining", value: 1872 - (data?.leetcode?.medium || 0), fill:"#1e1e1e" },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={53}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                    cornerRadius={10}
                  >
                  </Pie>

                  {/* Hard Ring (Inner) */}
                  <Pie
                    data={[
                      { name: "Hard", value: data?.leetcode?.hard || 0, fill:"#f44336" },
                      { name: "Remaining", value: 846 - (data?.leetcode?.hard || 0), fill:"#1e1e1e" },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={34}
                    outerRadius={41}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                    cornerRadius={10}
                  >
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="flex items-center gap-2">
            <img src={git} alt="" className="w-8" />
            <span className="text-xl md:text-2xl font-medium">
              GitHub Stats
            </span>
          </h2>
          <div className="border-t border-gray-600 my-4" />

          <div className="grid grid-cols-3 gap-2 md:gap-5 w-full my-4 md:my-5 md:mb-10">
            <div className="border w-full flex flex-col justify-center items-center border-gray-700 rounded-lg py-3  transition-transform duration-300 hover:scale-105">
              <h1 className="text-green-500 text-2xl md:text-3xl font-medium">
                {data?.github.contributions}
              </h1>
              <span className="flex items-center gap-0.5">
               <img
                src="src\assets\GitContribution.png"
                alt="Contribution-icon"
                className="w-6 h-6 md:w-7 md:h-7"
              />
              <span className="text-base md:text-xl">Contributions</span>
              </span>
            </div>
            <div className="border w-full flex flex-col justify-center items-center border-gray-700 rounded-lg py-3 transition-transform duration-300 hover:scale-105">
              <h1 className="text-2xl md:text-3xl text-orange-400 font-medium">
                {data?.github.prs}
              </h1>
              <span className="flex items-center gap-0.5">
                <img
                  src="src/assets/pull-request.png"
                  alt="Pr-icon"
                  className="w-6 h-6 md:w-7 md:h-7"
                />
                <span className="text-base md:text-xl">Total PRs</span>
              </span>
            </div>
            <div className="border w-full flex flex-col justify-center items-center border-gray-700 rounded-lg py-3 transition-transform duration-300 hover:scale-105">
              <h1 className="text-2xl md:text-3xl text-red-700 font-medium">
                {data?.github.repos}
              </h1>
              <span className="flex items-center gap-0.5">
                <img
                  src="src/assets/code-fork.png"
                  alt="Fork-icon"
                  className="w-6 h-6 md:w-7 md:h-7"
                />
                <span className="text-base md:text-xl">Total Repos</span>
              </span>
            </div>
          </div>
        </div> 
        <div className="backdrop-blur-sm rounded-2xl shadow-xl border border-white flex flex-col text-white p-4 md:p-7 justify-between">
          <div className="mb-4 md:mb-8 h-auto md:h-1/5">
            <div className="text-xl md:text-2xl flex justify-between items-center w-full gap-2 font-medium mb-4 md:mb-5">
              <h2>Skills</h2>
              <Link
                to="/ManageTracker/SkillManagement"
                className="opacity-70 hover:opacity-100 duration-200"
              >
                <LuPenLine />
              </Link>
            </div>
            <div className="border-t border-gray-600 mb-6" />

             <div className="flex gap-2 md:gap-3 w-full h-fit flex-wrap">
              {data?.skills.length !== 0 ? (
                data?.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="border block items-center text-wrap justify-center shadow-[0_0_8px_#0ec1e7]/50 backdrop-blur-sm border-[#0ec1e7]/40 rounded-lg p-1 px-2 md:px-3 text-sm md:text-base"
                  >
                    <span>{skill}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No Skills added yet..</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-start w-full">
            <div className="text-xl md:text-2xl flex items-center gap-4 font-medium mb-4 md:mb-7">
              <h2>Language for DSA</h2>
            </div>
            <div className="border-t border-gray-600 mb-6 w-full" />
            <span className="text-xl md:text-2xl w-fit font-medium border border-gray-700 rounded-lg p-2 md:p-3">
              {data?.dsaLanguage}
            </span>
          </div>
          
          <div className=" flex flex-col items-start w-full">
            <div className="text-xl md:text-2xl flex justify-between items-center w-full gap-2 font-medium mb-4 md:mb-7">
              <h2>Platforms</h2>
              <Link
                to="/ManageTracker"
                className="opacity-70 hover:opacity-100 duration-200"
              >
                <LuPenLine />
              </Link>
            </div>
            <div className="border-t border-gray-600 mb-6 w-full" />
            <div className="flex">
              {data?.leetcode.url !== "" && (
                <a
                  href={data?.leetcode.url}
                  className="text-xl md:text-2xl w-fit font-medium border border-gray-700 rounded-lg p-2 md:p-3 hover:bg-gray-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <SiLeetcode />
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div> 
      <div className="w-full mt-4 md:mt-5">
        <div className="w-full h-full backdrop-blur-sm rounded-2xl shadow-xl border border-white p-4 px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-medium text-xl md:text-2xl">
              Projects
            </h2>
            <Link
              to="/ManageTracker/AddProject"
              className="text-gray-400 hover:text-white duration-200"
            >
              <LuPenLine size={24} />
            </Link>
          </div>
          <div className="flex justify-center">
            {(data?.projects?.length == 0 || !data.projects) ? (
              <p className="text-gray-400 py-6">
                Currently No Projects are added..
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {data?.projects?.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg border border-gray-600 flex flex-col gap-2"
                  >
                    <div className="w-full h-44 md:h-52 border-b-gray-600 border-b-2 rounded-t-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={project.coverImage}
                        alt={project.projectName}
                        className=""
                      />
                    </div>
                    <div className="p-4 pt-0">
                      <p className="text-white text-start flex items-center gap-1 text-xl font-semibold mb-2">
                        <Star color="gold" fill="gold" />
                        {project.projectName}
                      </p>
                      {project.websiteUrl !== "" && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-sm md:text-base mb-2"
                        >
                          View Project
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="blank"
                        className="bg-gray-700 gap-2 flex text-gray-300 mb-1 p-1 px-2 rounded-full items-center xl:w-fit"
                      >
                        <img src={git} alt="git" className="w-5 h-5" />
                        <p className="overflow-hidden">
                          {project.githubUrl.split("com/")[1]}
                        </p>
                      </a>{" "}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default TrackerDashboard;
