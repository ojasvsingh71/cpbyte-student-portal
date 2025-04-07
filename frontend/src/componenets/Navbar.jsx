import React from "react";
import logo from "../../public/CPBYTE_Logo.jpg";
import { RiHome4Line } from "react-icons/ri";
import { GrSchedulePlay } from "react-icons/gr";
import { TbHelpOctagon } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { AiOutlinePieChart } from "react-icons/ai";

function Navbar() {

  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? 'bg-[#212327] text-[#0ec1e7]' : 'text-gray-300';
  };

  return (
    <div className="Sidebar bg-[#070b0f] border-r border-gray-600 min-h-screen w-[15rem] flex fixed justify-between overflow-hidden z-50">
      <div className="flex flex-col items-center h-full w-full m-4">
        <div className="flex items-center gap-2 justify-start w-full">
          <img src={logo} alt="" className="w-14 rounded-full" />
          <h2 className="text-white text-xl tracking-wider font-semibold">
            CP<span className="text-[#0ec1e7]">BYTE</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 items-start justify-start w-full mt-4">
          <h2 className="text-gray-300 text-sm pl-6 tracking-widest">
            MAIN MENU
          </h2>
          <div className="flex flex-col gap-4 w-full">
            <Link
              to={""}
              className={`flex items-center gap-2 hover:bg-[#212327] ${getActiveClass("/") } hover:text-[#0ec1e7] duration-200 w-full p-2 pl-6 rounded-md cursor-pointer`}
            >
              <RiHome4Line size={20} />
              <h2>Dashboard</h2>
            </Link>
            <Link
              to={"Schedule"}
              className={`flex items-center gap-2 hover:bg-[#212327] ${getActiveClass("/Schedule") } hover:text-[#0ec1e7] duration-200 w-full p-2 pl-6 rounded-md cursor-pointer`}
            >
              <GrSchedulePlay size={20} />
              <h2>Schedule</h2>
            </Link>
            <Link
              to={"Attendance"}
              className={`flex items-center gap-2 hover:bg-[#212327] ${getActiveClass("/Attendance") } hover:text-[#0ec1e7] duration-200 w-full p-2 pl-6 rounded-md cursor-pointer`}
            >
              <AiOutlinePieChart size={20} />
              <h2>Attendance</h2>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start justify-start w-full mt-4">
          <h2 className="text-gray-300 text-sm pl-6 tracking-widest">
            SETTINGS
          </h2>
          <div className="flex flex-col gap-4 w-full">
            <Link
              to={"Settings"}
              className={`flex items-center gap-2 hover:bg-[#212327] ${getActiveClass("/Settings") } hover:text-[#0ec1e7] duration-200 w-full p-2 pl-6 rounded-md cursor-pointer`}
            >
              <IoMdSettings size={20} />
              <h2>Settings</h2>
            </Link>
            <Link
              to={"Help"}
              className={`flex items-center gap-2 hover:bg-[#212327] ${getActiveClass("/Help") } hover:text-[#0ec1e7] duration-200 w-full p-2 pl-6 rounded-md cursor-pointer`}
            >
              <TbHelpOctagon size={20} />
              <h2>Help Center</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
