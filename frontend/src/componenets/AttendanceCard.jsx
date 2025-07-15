import React, { useLayoutEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import DaysCard from "./DaysCard";
import { useSelector } from "react-redux";
import * as THREE from "three";

function AttendanceCard() {
  const {attendances} = useSelector(state=>state.dashboard.data)
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Vanta background */}
      <div
        ref={vantaRef}
        className="fixed top-0 left-0 w-full h-full z-[-1]"
        style={{ zIndex: -1 }}
      />

      {/* Foreground Attendance Card */}
      <div className="relative z-10 w-full h-fit text-white p-5 mr-5">
        <div className="bg-gray-900 border border-gray-600 rounded-2xl p-8 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center mb-4">
              <div className="w-2 h-8 bg-[#0ec1e7] rounded-2xl"></div>
              <span className="text-white text-2xl">Attendance History</span>
            </div>
            <div className="flex gap-2 p-1 px-4 rounded-lg justify-center items-center border border-zinc-500 cursor-pointer">
              <FaFilter /> <span>Filter</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {attendances?.map((day, index) => (
              <DaysCard
                key={index}
                date={new Date(day.date).toDateString()}
                subject={day.subject}
                status={day.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceCard;
