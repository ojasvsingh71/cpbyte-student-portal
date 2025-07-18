import DetailCard from '../componenets/DetailCard'
import AttendanceCard from '../componenets/AttendanceCard'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userProfile } from "../redux/slices/profileSlice"; 


function UserDashboard() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  return (
    <div className='bg-[#070b0f] w-full min-h-screen flex flex-col text-white md:pr-8'>
      <DetailCard/>
      <AttendanceCard/>
    </div>
  )
}

export default UserDashboard
