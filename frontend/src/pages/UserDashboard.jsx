import React from 'react'
import DetailCard from '../componenets/DetailCard'
import AttendanceCard from '../componenets/AttendanceCard'

function UserDashboard() {
  return (
    <div className='bg-[#070b0f] w-full min-h-screen flex flex-col text-white pr-15'>
      <DetailCard/>
      <AttendanceCard/>
    </div>
  )
}

export default UserDashboard
