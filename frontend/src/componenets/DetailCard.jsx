import React from 'react'
import { GiBattleGear } from "react-icons/gi";
import { DiCodeigniter } from "react-icons/di";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import noimage from "../../public/noImage.webp"

function DetailCard() {
  return (
    <div className='w-full h-fit text-white p-5 mt-5 mr-5'>
      <div className='bg-gray-900 rounded-2xl border border-gray-600 p-8 flex flex-col gap-4'>
        <div className='flex gap-2 items-center mb-4'>
            <div className='w-2 h-8 bg-[#0ec1e7] rounded-2xl'></div>
            <span className='text-white text-2xl'>Detail Member</span>
        </div>
        <div className='flex gap-12 items-center mb-4'>
            <div className='w-28 h-28 rounded-full bg-[#0ec1e7]'>
                <img src={noimage} alt="avatar" className='rounded-full'/>
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <span className='text-2xl font-semibold'>Roushan Srivastav</span>
                </div>
                <div className='flex gap-14'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#949597]'>Role</span>
                        <span>COORDINATOR</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#949597]'>DSA/DEV</span>
                        <span>JAVA/WEBDEV</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#949597]'>Email</span>
                        <span>roshan@gmail.com</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#949597]'>Library ID</span>
                        <span>2327CSE1290</span>
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
                    <span className='font-semibold text-lg'>50%</span>
                    <span className='text-[#b7bdbf] text-sm'>DSA Attendance</span>
                </div>
            </div>
            <div className='flex gap-4 items-center bg-gray-800 p-4 w-1/4 rounded-2xl'>
                <div className='rounded-full w-10 h-10'>
                    <DiCodeigniter size={35}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-lg'>50%</span>
                    <span className='text-[#b7bdbf] text-sm'>DEV Attendance</span>
                </div>
            </div>
            <div className='flex gap-4 items-center bg-gray-800 p-4 w-1/4 rounded-2xl'>
                <div className='rounded-full w-10 h-10'>
                    {/* <img src="" alt="icon" /> */}
                    <FaChalkboardTeacher size={35}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-lg'>Ansh Singh</span>
                    <span className='text-[#b7bdbf] text-sm'>DSA Mentor</span>
                </div>
            </div>
            <div className='flex gap-4 items-center bg-gray-800 p-4 w-1/4 rounded-2xl'>
                <div className='rounded-full w-10 h-10'>
                    {/* <img src="" alt="icon" /> */}
                    <PiChalkboardTeacherBold size={35}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-lg'>Pratyush Sharma</span>
                    <span className='text-[#b7bdbf] text-sm'>DEV Mentor</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DetailCard
