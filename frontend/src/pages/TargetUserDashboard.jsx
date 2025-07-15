import React, { useEffect, useState, useRef } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useParams } from "react-router-dom";
import noimage from '../assets/noImage.webp';
import { Star } from "lucide-react";
import git from '../assets/github.webp';
import { IoStatsChartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getTrackerDataOfTargetUser } from "../redux/slices/targetUserSlice";
import TargetUserSkeleton from '../componenets/TargetUserSkeleton';
import * as THREE from 'three';

function TargetUserDashboard() {
  const { library_id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const user = useSelector((state) => state.targetUser.data);
  const loading = useSelector((state) => state.targetUser.loading);
  
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    dispatch(getTrackerDataOfTargetUser({ library_id }));
  }, [dispatch, library_id]);

  useEffect(() => {
    setData(user);
  }, [user]);


  useEffect(() => {
    let vantaInstance = null;
    let isMounted = true;

    const initVanta = async () => {
      try {
        if (!vantaRef.current || vantaEffect.current) return;
        
        const VANTA = await import('vanta/dist/vanta.net.min');
        
        if (isMounted && vantaRef.current) {
          vantaInstance = VANTA.default({
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
            backgroundColor: 0x000000,
            points: 20.00,
            maxDistance: 10.00,
            spacing: 20.00
          });
          vantaEffect.current = vantaInstance;
        }
      } catch (error) {
        console.error("Vanta initialization failed:", error);
      }
    };

    const timeoutId = setTimeout(initVanta, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (vantaInstance) {
        vantaInstance.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black">
      <div ref={vantaRef} className="fixed inset-0 z-0"/>
      
      {loading && <TargetUserSkeleton />}
      
      {!loading && (
        <div className="relative z-10 min-h-screen w-full">
          <div className="p-4 w-full lg:p-8 min-h-screen">
          
            <div className="mb-10 flex items-center justify-between backdrop-blur-sm bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/50">
                  <img
                    src={data?.avatar || noimage}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-white">
                    Hello, {data?.name}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Today is {new Date().toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  <FaInstagram size={"1.5rem"} />
                </a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  <FaFacebook size={"1.5rem"} />
                </a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  <FaLinkedin size={"1.5rem"} />
                </a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  <FaTwitter size={"1.5rem"} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="glow-card bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white w-full flex flex-col p-5 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,193,231,0.2)]">
                <h2 className="font-medium text-lg mb-2">Total Questions</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Number of questions Solved ▼
                </p>
                <span className="text-3xl font-bold self-end">
                  {data?.leetcode.solvedProblems === -1
                    ? "N/A"
                    : data?.leetcode.solvedProblems}
                </span>
              </div>

              <div className="glow-card bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white w-full flex flex-col p-5 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,193,231,0.2)]">
                <h2 className="font-medium text-lg mb-2">Ranking</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Overall Leaderboard Ranking ▼
                </p>
                <span className="text-3xl font-bold self-end">
                  {data?.rank === -1 ? "N/A" : data?.rank}
                </span>
              </div>

              <div className="glow-card bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white w-full flex flex-col p-5 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,193,231,0.2)]">
                <h2 className="font-medium text-lg mb-2">Past days</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Consistency heat map ▼
                </p>
                <div className="flex gap-1 self-end">
                  {data?.past5.map((day, index) => (
                    <div
                      key={index}
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        day == 0 ? "bg-red-500/30" : "bg-green-500/30"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        day == 0 ? "bg-red-400" : "bg-green-400"
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="glow-card backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,193,231,0.2)] lg:col-span-1">
                <h2 className="text-xl font-medium mb-6 text-cyan-400 flex items-center gap-2">
                  <IoStatsChartSharp size={"1.5rem"} />
                  <span>DSA Stats</span>
                </h2>

                <div className="space-y-4">
                  {[
                    { level: "Easy", value: data?.leetcode.easy, color: "bg-cyan-500" },
                    { level: "Medium", value: data?.leetcode.medium, color: "bg-orange-500" },
                    { level: "Hard", value: data?.leetcode.hard, color: "bg-red-500" }
                  ].map((stat, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{stat.level}</span>
                        <span className="text-gray-300">{stat.value}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                          className={`${stat.color} h-2.5 rounded-full`} 
                          style={{ width: `${(stat.value / 500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-medium mb-4 text-cyan-400">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {data?.skills.length !== 0 ? (
                      data?.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-200"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400">No Skills added yet..</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-medium mb-3 text-cyan-400">Language for DSA</h2>
                  <div className="bg-gray-800 px-4 py-2 rounded-lg w-fit">
                    {data?.dsaLanguage || "Not specified"}
                  </div>
                </div>
              </div>

              <div className="glow-card backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,193,231,0.2)] lg:col-span-1">
                <h2 className="text-xl font-medium mb-6 text-cyan-400 flex items-center gap-2">
                  <img src={git} alt="GitHub" className="w-6" />
                  <span>GitHub Stats</span>
                </h2>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg text-gray-300">Contributions</h3>
                    <span className="text-2xl font-bold text-cyan-400">
                      {data?.github.contributions}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-gray-400 mb-1">Total PRs</h3>
                      <p className="text-xl font-bold">{data?.github.prs}</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-gray-400 mb-1">Total Repos</h3>
                      <p className="text-xl font-bold">{data?.github.repos}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-medium mb-4 text-cyan-400">Platforms</h2>
                  <div className="flex gap-4">
                    {data?.leetcode.url && (
                      <a
                        href={data?.leetcode.url}
                        className="bg-gray-800/50 p-4 rounded-lg flex items-center justify-center w-14 h-14 transition-all hover:bg-orange-500/20"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiLeetcode size={"1.5rem"} className="text-orange-500" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="glow-card backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,193,231,0.2)] lg:col-span-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium text-cyan-400">Projects</h2>
                </div>
                
                {data?.projects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">
                      Currently no Projects are added.
                    </p>
                    <p className="text-gray-400 mb-6">
                      Add your project to showcase your skills!
                    </p>
                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Add New Project
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data?.projects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 transition-all hover:shadow-[0_0_10px_rgba(14,193,231,0.2)]"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-gray-700 w-12 h-12 rounded-lg flex items-center justify-center">
                            <Star className="text-yellow-400" size={18} />
                          </div>
                          <h3 className="text-lg font-medium text-white">{project.projectName}</h3>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {project.websiteUrl && (
                            <a
                              href={project.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 text-sm hover:underline"
                            >
                              View Live Project
                            </a>
                          )}
                          
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-300 text-sm hover:text-cyan-400"
                          >
                            <img src={git} alt="GitHub" className="w-4" />
                            <span className="truncate">{project.githubUrl.split("com/")[1]}</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TargetUserDashboard;
