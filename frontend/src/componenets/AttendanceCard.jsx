import React, { useLayoutEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import DaysCard from "./DaysCard";
import { useSelector } from "react-redux";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min"; // ✅ Import Vanta NET effect

function AttendanceCard() {
  const { attendances } = useSelector((state) => state.dashboard.data);

  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // ✅ Vanta Background Initialization
  useLayoutEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0ec1e7,
          backgroundColor: 0x000000,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* ✅ Vanta background */}
      <div
        ref={vantaRef}
        className="fixed top-0 left-0 w-full h-full z-[-1]"
        style={{ zIndex: -1 }}
      />

      {/* ✅ Centered Foreground Attendance Card */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center text-white p-5">
        <div className="bg-gray-900 border border-gray-600 rounded-2xl p-8 flex flex-col gap-8 w-full max-w-6xl">
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