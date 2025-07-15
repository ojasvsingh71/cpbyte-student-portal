import React from 'react'
import { GiBattleGear } from "react-icons/gi";
import { DiCodeigniter } from "react-icons/di";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import noimage from '../assets/noImage.webp';
import { useSelector } from 'react-redux';

function DetailCard() {
    const { data: user, loading } = useSelector((state) => state.dashboard);   

    if (loading) {
        // Skeleton for DetailCard
        return (
            <div className='w-full p-5 mt-14'>
                <div className='bg-gray-900 rounded-2xl border border-gray-600 p-8 animate-pulse'>
                    <div className='flex items-center gap-2 mb-6'>
                        <div className='w-2 h-8 bg-[#0ec1e7] rounded-2xl'></div>
                        <div className='h-6 bg-gray-700 w-40 rounded'></div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-6 items-center'>
                        <div className="w-32 h-32 bg-gray-700 rounded-full"></div>
                        <div className='flex flex-col gap-3 w-full'>
                            <div className='h-6 bg-gray-700 w-32 rounded'></div>
                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                                {Array(4).fill().map((_, i) => (
                                    <div key={i} className='flex flex-col gap-2'>
                                        <div className='h-4 bg-gray-600 w-20 rounded'></div>
                                        <div className='h-5 bg-gray-700 w-full rounded'></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
                        {Array(4).fill().map((_, i) => (
                            <div key={i} className='bg-gray-800 p-4 rounded-2xl flex gap-4 items-center'>
                                <div className='w-10 h-10 bg-gray-700 rounded-full'></div>
                                <div className='flex flex-col gap-2'>
                                    <div className='w-10 h-4 bg-gray-700 rounded'></div>
                                    <div className='w-20 h-3 bg-gray-600 rounded'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }


    
    return (
        <div className='w-full h-fit text-white p-2 md:p-5 mt-14 md:mt-5 md:mr-5'>
            <div className='bg-gray-900 rounded-2xl border border-gray-600 p-4 md:p-8 flex flex-col gap-4'>
                <div className='flex gap-2 items-center mb-2 md:mb-4'>
                    <div className='w-2 h-8 bg-[#0ec1e7] rounded-2xl'></div>
                    <span className='text-white text-lg md:text-2xl'>Detail Member</span>
                </div>
                
                <div className='flex flex-col md:flex-row gap-4 lg:gap-12 md:gap-6 items-center mb-4 whitespace-nowrap'>
                    <div><div className="w-32 h-32 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
                        <img 
                            src={user.avatar || noimage} 
                            alt="User avatar" 
                            className="w-full h-full object-cover"
                        />
                    </div></div>
                    <div className='flex flex-col gap-2 md:gap-4 w-full'>
                        <div className='text-center md:text-left'>
                            <span className='text-xl md:text-2xl font-semibold'>{user?.name}</span>
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-[#949597]'>Role</span>
                                <span className='truncate overflow-hidden whitespace-nowrap'>{user?.role}</span>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='text-[#949597]'>DSA/DEV</span>
                                <span className='truncate overflow-hidden whitespace-nowrap'>{user?.domain_dsa}/{user?.domain_dev}</span>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='text-[#949597]'>Email</span>
                                <span className='break-all truncate overflow-hidden whitespace-nowrap'>{user?.email}</span>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='text-[#949597]'>Library ID</span>
                                <span className='truncate overflow-hidden whitespace-nowrap'>{user?.library_id}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
                    <div className='flex gap-3 items-center bg-gray-800 p-3 rounded-2xl'>
                        <div className='rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center'>
                            <GiBattleGear size={30}/>
                        </div>
                        <div className='flex flex-col gap-1 truncate overflow-hidden whitespace-nowrap'>
                            <span className='font-semibold text-base md:text-lg'>{user?.dsaAttendance}%</span>
                            <span className='text-[#b7bdbf] text-xs md:text-sm'>DSA Attendance</span>
                        </div>
                    </div>
                    
                    <div className='flex gap-3 items-center bg-gray-800 p-3 rounded-2xl'>
                        <div className='rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center'>
                            <DiCodeigniter size={30}/>
                        </div>
                        <div className='flex flex-col gap-1 truncate overflow-hidden whitespace-nowrap'>
                            <span className='font-semibold text-base md:text-lg'>{user?.devAttendance}%</span>
                            <span className='text-[#b7bdbf] text-xs md:text-sm'>DEV Attendance</span>
                        </div>
                    </div>
                    
                    <div className='flex gap-3 items-center bg-gray-800 p-3 rounded-2xl'>
                        <div className='rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center'>
                            <FaChalkboardTeacher size={30}/>
                        </div>
                        <div className='flex flex-col gap-1 truncate overflow-hidden whitespace-nowrap'>
                            <span className='font-semibold text-base md:text-lg'>{user?.mentor_dsa || "--"}</span>
                            <span className='text-[#b7bdbf] text-xs md:text-sm'>DSA Mentor</span>
                        </div>
                    </div>
                    
                    <div className='flex gap-3 items-center bg-gray-800 p-3 rounded-2xl'>
                        <div className='rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center'>
                            <PiChalkboardTeacherBold size={30}/>
                        </div>
                        <div className='flex flex-col gap-1 truncate overflow-hidden whitespace-nowrap'>
                            <span className='font-semibold text-base md:text-lg'>{user?.mentor_dev || "--"}</span>
                            <span className='text-[#b7bdbf] text-xs md:text-sm'>DEV Mentor</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCard