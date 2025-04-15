import React from 'react'
import { GiBattleGear } from "react-icons/gi";
import { DiCodeigniter } from "react-icons/di";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import noimage from "../../public/noImage.webp"
import { useSelector } from 'react-redux';

function DetailCard() {

    const user = useSelector((state) => state.dashboard.data)    
    
  return (
    <div className='w-full h-fit text-white p-5 mt-5 mr-5'>
      <div className='bg-gray-900 rounded-2xl border border-gray-600 p-8 flex flex-col gap-4'>
        <div className='flex gap-2 items-center mb-4'>
            <div className='w-2 h-8 bg-[#0ec1e7] rounded-2xl'></div>
            <span className='text-white text-2xl'>Detail Member</span>
        </div>
        <div className='flex gap-12 items-center mb-4'>
            <div className='w-28 h-28 overflow-hidden flex items-center justify-between rounded-full'>
                <img src={user?.avatar===""?noimage:user.avatar} alt="avatar" className='rounded-full h-full w-full object-cover'/>
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <span className='text-2xl font-semibold'>{user?.name}</span>
                </div>
                <div className='flex gap-14'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#949597]'>Role</span>
                        <span>{user?.role}</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#949597]'>DSA/DEV</span>
                        <span>{user?.domain_dsa}/{user?.domain_dev}</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#949597]'>Email</span>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#949597]'>Library ID</span>
                        <span>{user?.library_id}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex gap-4 relative'>
            <div className='flex gap-4 items-center bg-gray-800 p-4 w-1/4 rounded-2xl'>
                <div className='rounded-full w-10 h-10'>
                    <GiBattleGear size={35}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-lg'>{user?.dsaAttendance}%</span>
                    <span className='text-[#b7bdbf] text-sm'>DSA Attendance</span>
                </div>
            </div>
            <div className='flex gap-4 items-center bg-gray-800 p-4 w-1/4 rounded-2xl'>
                <div className='rounded-full w-10 h-10'>
                    <DiCodeigniter size={35}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-lg'>{user?.devAttendance}%</span>
                    <span className='text-[#b7bdbf] text-sm'>DEV Attendance</span>
                </div>
            </div>
            <div className='flex gap-4 items-center bg-gray-800 p-4 w-1/4 rounded-2xl'>
                <div className='rounded-full w-10 h-10'>
                    <FaChalkboardTeacher size={35}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-lg'>{user?.mentor_dsa?mentor_dsa:"--"}</span>
                    <span className='text-[#b7bdbf] text-sm'>DSA Mentor</span>
                </div>
            </div>
            <div className='flex gap-4 items-center bg-gray-800 p-4 w-1/4 rounded-2xl'>
                <div className='rounded-full w-10 h-10'>
                    <PiChalkboardTeacherBold size={35}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-lg'>{user?.mentor_dev?mentor_dev:"--"}</span>
                    <span className='text-[#b7bdbf] text-sm'>DEV Mentor</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DetailCard
