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
        <div className="bg-[#070b0f] text-white min-h-screen w-full p-2 md:p-8 mt">
            <div className="p-2 md:p-4 mt-14 md:mt-0">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">Attendance Marked</h1>
                    <p className="text-base md:text-lg text-gray-300 mb-6">
                        Attendance has been successfully marked.
                    </p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => reset()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AttendanceCard;
