import React from 'react'
import { FaFilter } from 'react-icons/fa'
import DaysCard from './DaysCard'
import { useSelector } from 'react-redux';

function AttendanceCard() {
  const { data: dashboardData, loading } = useSelector(state => state.dashboard);

  
  if (loading) {
    return (
      <div className='w-full h-fit text-white p-5 mr-5'>
        <div className='bg-gray-900 border border-gray-600 rounded-2xl p-8 animate-pulse'>
          <div className='flex justify-between items-center mb-8'>
            <div className='flex gap-2 items-center'>
              <div className='w-2 h-8 bg-[#0ec1e7] rounded-2xl'></div>
              <div className='h-6 w-48 bg-gray-700 rounded'></div>
            </div>
            <div className='flex gap-2 p-2 rounded border border-zinc-500'>
              <div className='w-4 h-4 bg-gray-700 rounded'></div>
              <div className='w-10 h-4 bg-gray-700 rounded'></div>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {Array(4).fill().map((_, i) => (
              <div key={i} className='h-20 bg-gray-800 rounded-lg'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

 const attendances = dashboardData?.attendances || [];

  return (
    <div className='w-full h-fit text-white p-5 mr-5'>
      <div className='bg-gray-900 border border-gray-600 rounded-2xl p-8 flex flex-col gap-8'>
        <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center mb-4'>
                <div className='w-2 h-8 bg-[#0ec1e7] rounded-2xl'></div>
                <span className='text-white text-2xl'>Attendance History</span>
            </div>
            <div className='flex gap-2 p-1 px-4 rounded-lg justify-center items-center border border-zinc-500 cursor-pointer'>
                <FaFilter/> <span>Filter</span>
            </div>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {
          attendances?.map(day=>{
            return <DaysCard date={new Date(day.date).toDateString()} subject={day.subject} status={day.status} />
          })
          }
        </div>
      </div>
    </div>
  )
}

export default AttendanceCard
