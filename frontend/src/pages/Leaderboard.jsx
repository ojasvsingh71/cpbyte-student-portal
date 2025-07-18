import React, { useEffect, useState, useRef } from "react";
import trophy from "../assets/trophy.png";
import noimage from "../assets/noImage.webp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../redux/slices/Leaderboard";
import LeaderboardSkeleton from "../componenets/LeaderboardSkeleton";
import * as THREE from 'three';
import "./LeaderBoard.css";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.leaderboard);
  const [data, setData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  
  useEffect(() => {
    if (!users || users.length === 0) { 
      dispatch(getAll({}));
    }
  }, [dispatch, users]);

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null); 

  useEffect(() => {
    let isMounted = true;

    const loadVanta = async () => {
      const VANTA = await import('vanta/dist/vanta.net.min');

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
          backgroundColor: 0x000000,
          points: 20.00,
          maxDistance: 10.00,
          spacing: 20.00
        });
      }
    };

    loadVanta();

    return () => {
      isMounted = false;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (vantaEffect.current) {
      vantaEffect.current.resize();
    }
  }, [data]);

  useEffect(() => {
    let filteredData = users;

    if (selectedLanguage !== "All") {
      filteredData = filteredData.filter((user) => {
        return user.language === selectedLanguage;
      });
    }

    if (selectedYear !== "All") {
      filteredData = filteredData.filter((user) => {
        return user.year === selectedYear;
      });
    }

    setData(filteredData);
  }, [users, selectedLanguage, selectedYear]);

  return (

    <div className="relative min-h-screen w-full bg-black">
      <div ref={vantaRef} className="fixed inset-0 z-0"/>
      
      <div className="relative z-10 min-h-screen w-full">
        <div className="p-4 w-full lg:p-8 min-h-screen">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold my-4 text-center text-white drop-shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Leaderboard 🚀
            </h1>
            
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <select
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="All">All Languages</option>
                <option value="CPP">CPP</option>
                <option value="JAVA">Java</option>
              </select>

              <select
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === "All" ? "All" : parseInt(e.target.value))}
              >
                <option value="All">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            {loading ? (  
              <LeaderboardSkeleton />  
            ) : (  
              <div className="w-full p-4 lg:px-0 lg:py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                  {data?.map(
                    (item, index) =>
                      index < 3 && (
                        <div
                          key={item.id}
                          className={`relative glow-card group w-full flex flex-col text-white rounded-xl p-5 backdrop-blur-sm bg-gradient-to-br ${
                            index === 0
                              ? "from-amber-500/10 to-amber-600/10 border border-amber-500/30"
                              : index === 1
                              ? "from-gray-500/10 to-gray-600/10 border border-gray-500/30"
                              : "from-yellow-700/10 to-yellow-800/10 border border-yellow-700/30"
                          }`}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            e.currentTarget.style.setProperty("--x", `${x}px`);
                            e.currentTarget.style.setProperty("--y", `${y}px`);
                          }}
                        >
                         
                          <div className="absolute top-4 right-4 w-14 h-14 flex items-center justify-center">
                            <div className={`absolute w-full h-full rounded-full ${
                              index === 0 ? "bg-amber-500/20" : 
                              index === 1 ? "bg-gray-500/20" : "bg-yellow-700/20"
                            }`}></div>
                            <img 
                              src={trophy} 
                              alt="trophy" 
                              className={`w-10 h-10 ${index === 0 ? "filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" : ""}`}
                            />
                          </div>
                          
                          <div className="flex items-center gap-4 mb-5">
                            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                              <img
                                src={item?.avatar || noimage}
                                alt="avatar"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Link
                              to={`/u/dashboard/${item.library_id}`}
                              className="font-bold text-xl hover:text-cyan-400 transition-colors"
                            >
                              {item?.name}
                            </Link>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mt-auto">
                            <div className="flex flex-col items-center p-3 bg-gray-900/50 rounded-lg">
                              <h2 className="text-gray-400 text-sm font-medium">Rank</h2>
                              <h1 className="text-white text-xl font-bold mt-1">
                                {index + 1}
                              </h1>
                            </div>
                            
                            <div className="flex flex-col items-center p-3 bg-gray-900/50 rounded-lg">
                              <h2 className="text-gray-400 text-sm font-medium">Total</h2>
                              <h1 className="text-white text-xl font-bold mt-1">
                                {item?.solvedProblems}
                              </h1>
                            </div>
                            
                            <div className="flex flex-col items-center p-3 bg-gray-900/50 rounded-lg">
                              <h2 className="text-gray-400 text-sm font-medium">Language</h2>
                              <h1 className="text-white text-xl font-bold mt-1">
                                {item?.language}
                              </h1>
                            </div>
                          </div>

                        </div>
                      )
                  )}
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-800">
                      <tr className="text-left">
                        <th className="py-4 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="py-4 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                          Name
                        </th>
                        <th className="py-4 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                          Year
                        </th>
                        <th className="py-4 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                          Language
                        </th>
                        <th className="py-4 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                          Total
                        </th>
                        <th className="py-4 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                          Previous
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr 
                          key={item.id} 
                          className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="py-4 px-6 text-white font-medium">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                              index < 3 
                                ? index === 0 
                                  ? "bg-amber-500/20 text-amber-300" 
                                  : index === 1 
                                    ? "bg-gray-500/20 text-gray-300"
                                    : "bg-yellow-700/20 text-yellow-300"
                                : "bg-gray-700 text-gray-300"
                            }`}>
                              {index + 1}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-cyan-400/30">
                                <img
                                  src={item.avatar || noimage}
                                  alt="avatar"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <Link
                                to={`/Tracker`}
                                className="text-white hover:text-cyan-400 transition-colors"
                              >
                                {item.name}
                              </Link>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-white">
                            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                              Year {item.year}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-white">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              item.language === "CPP" 
                                ? "bg-blue-500/20 text-blue-300" 
                                : "bg-green-500/20 text-green-300"
                            }`}>
                              {item.language}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-white font-bold">
                            {item.solvedProblems}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-1">
                              {item.previous.map((day, idx) => (
                                <div
                                  key={idx}
                                  className={`w-5 h-5 rounded-md flex items-center justify-center ${
                                    day === 0 
                                      ? "bg-red-500/30" 
                                      : "bg-green-500/30"
                                  }`}
                                >
                                  <div className={`w-2 h-2 rounded-full ${
                                    day === 0 ? "bg-red-400" : "bg-green-400"
                                  }`}></div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;