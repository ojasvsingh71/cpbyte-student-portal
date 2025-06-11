import React, { useState } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import DaysCard from './DaysCard';
import { useSelector } from 'react-redux';

function AttendanceCard() {
  const { attendances } = useSelector(state => state.dashboard.data || { attendances: [] });
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Sorted attendances (newest first)
  const sortedAttendances = [...(attendances || [])].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const totalPresent = sortedAttendances?.filter(day => day.status === 'PRESENT').length || 0;
  const totalClasses = sortedAttendances?.length || 0;
  const attendancePercentage = totalClasses ? Math.round((totalPresent / totalClasses) * 100) : 0;
  
  // Circle variables
  const circleRadius = 40;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const circleDashOffset = circleCircumference - (attendancePercentage / 100) * circleCircumference;
  const animateProgress = true;

  // Show newest classes first
  const displayedAttendances = showAll ? sortedAttendances : sortedAttendances?.slice(0, 4);

  return (
    <div className='w-full h-fit p-5 mr-5'>
      <div className='bg-gray-900 rounded-2xl border border-gray-600 p-4 md:p-8 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300'>

        {/* Header */}
        <div className='flex justify-between items-center'>
          <div className='flex gap-3 items-center'>
            <div className='w-2 h-8 bg-gradient-to-b from-[#0ec1e7] to-[#7ef9ff] rounded-2xl'></div>
            <span className='text-white text-2xl font-semibold bg-gradient-to-r from-[#0ec1e7] to-[#7ef9ff] bg-clip-text text-transparent'>
              Attendance History
            </span>
          </div>

          <button className='flex gap-2 p-2 px-4 rounded-lg justify-center items-center border border-zinc-600 hover:border-[#0ec1e7] hover:bg-zinc-800/50 transition-all group'>
            <FaFilter className='text-zinc-300 group-hover:text-[#0ec1e7] transition-colors' /> 
            <span className='text-zinc-300 group-hover:text-[#0ec1e7] transition-colors'>Filter</span>
          </button>
        </div>

        {/* Circle + Days Layout */}
        <div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>

          {/* Circular Progress */}
          <div className='relative w-40 h-40 shrink-0 self-center'> 
            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={circleRadius}
                stroke="
#abd4b0"

                strokeWidth="17"
                strokeLinecap="butt"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r={circleRadius}
                stroke="#029e14"
                strokeWidth="17" 
                strokeLinecap="butt" 
                fill="none"
                strokeDasharray={circleCircumference}
                strokeDashoffset={animateProgress ? circleDashOffset : circleCircumference}
                style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-extrabold text-[#ffffff] drop-shadow-md">
                {attendancePercentage}%
              </p>
              <p className="text-xs text-neutral-400 tracking-wider uppercase mt-1">
                {totalPresent}/{totalClasses} Classes
              </p>
            </div>
          </div>

          {/* Days Grid  */}
          <div className='flex-1 w-full'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3'>
              {displayedAttendances?.length > 0 ? (
                displayedAttendances.map((day, index) => (
                  <div 
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="transition-transform duration-200 hover:scale-[1.03]"
                  >
                    <DaysCard
                      date={new Date(day.date).toDateString()}
                      subject={day.subject}
                      status={day.status}
                      isHovered={hoveredIndex === index}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-4 rounded-lg bg-zinc-800/50">
                  <p className="text-gray-400">No attendance data available</p>
                </div>
              )}
            </div>

            {sortedAttendances?.length > 4 && (
              <button 
                onClick={() => setShowAll(!showAll)}
                className="mt-4 flex items-center gap-2 text-sm text-[#0ec1e7] hover:text-[#7ef9ff] transition-colors"
              >
                {showAll ? (
                  <>
                    <FaChevronUp size={12} /> Show Less
                  </>
                ) : (
                  <>
                    <FaChevronDown size={12} /> Show More
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceCard;