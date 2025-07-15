import React, { useLayoutEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import DaysCard from "./DaysCard";
import { useSelector } from "react-redux";
import * as THREE from "three";

function AttendanceCard() {
  const { attendances } = useSelector((state) => state.dashboard.data);

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useLayoutEffect(() => {
    const loadVanta = async () => {
      const VANTA = await import("vanta/dist/vanta.net.min");
      if (!vantaEffect.current && vantaRef.current) {
        vantaEffect.current = VANTA.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xfff5,
          backgroundColor: 0x0,
          points: 20.0,
          maxDistance: 10.0,
          spacing: 20.0,
        });
      }
    };

    loadVanta();
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

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
