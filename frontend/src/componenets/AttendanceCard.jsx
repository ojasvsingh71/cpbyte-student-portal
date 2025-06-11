import React, { useState, useRef, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import DaysCard from './DaysCard';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

function AttendanceCard() {
  const { attendances = [] } = useSelector(state => state.dashboard.data || {});
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter attendance by subject
  const filteredAttendance = attendances.filter(day =>
    filter === 'All' ? true : day.subject === filter
  );

  return (
    <div className='w-full h-fit text-white p-5 mr-5'>
      <div className='bg-transparent border border-gray-600 rounded-2xl p-8 flex flex-col gap-8'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center mb-4'>
            <div className='w-2 h-8 bg-[#0ec1e7] rounded-2xl'></div>
            <span className='text-white caret-transparent text-2xl'>Attendance History</span>
          </div>

          {/* Filter Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <div
              className='flex gap-2 p-1 px-4 rounded-lg  justify-center items-center border border-zinc-500 cursor-pointer'
              onClick={() => setOpen(prev => !prev)}
            >
              <FaFilter className={`transition-transform  duration-200 ${open ? 'rotate-180' : 'rotate-0'}`} />
              <span className='text-sm caret-transparent'>{filter}</span>
            </div>

            {/* Animated Dropdown Menu */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute right-0 mt-2 w-48 caret-transparent  bg-gray-800 text-white rounded-md shadow-lg z-10'
                >
                  <ul className='p-2 caret-transparent space-y-1'>
                    {['All', 'DSA', 'DEV'].map(option => (
                      <li
                        key={option}
                        className='px-4 py-2 hover:bg-gray-900 cursor-pointer'
                        onClick={() => {
                          setFilter(option);
                          setOpen(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Attendance Cards */}
        <div className='grid grid-cols-4 gap-4'>
          {filteredAttendance.map((day, idx) => (
            <DaysCard
              key={idx}
              date={new Date(day.date).toDateString()}
              subject={day.subject}
              status={day.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AttendanceCard;
