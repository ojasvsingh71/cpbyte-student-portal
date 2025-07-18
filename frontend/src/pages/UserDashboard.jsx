import React, { useRef, useEffect } from 'react';
import DetailCard from '../componenets/DetailCard';
import AttendanceCard from '../componenets/AttendanceCard';
import * as THREE from 'three';

function UserDashboard() {
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
      isMounted = false;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    
    <div ref={vantaRef} className="bg-[#070b0f] w-full min-h-screen flex flex-col text-white md:pr-8">
      <DetailCard />
      <AttendanceCard />
    </div>
  );
}

export default UserDashboard;
