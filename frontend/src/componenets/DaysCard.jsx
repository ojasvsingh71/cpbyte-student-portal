import React from 'react'
import { FiClock } from "react-icons/fi";
import { TbCalendarCode } from "react-icons/tb";

function DaysCard(props) {
    const { date, subject, status } = props;
    
    const statusColors = {
        PRESENT: 'bg-green-500',
        ABSENT_WITH_REASON: 'bg-blue-700',
       
    }

    // Define subject colors
    const subjectColors = {
        DSA: 'text-[#e7b40e]',
        OTHER: 'text-[#f700ff]'
    }

    return (
        <div className='flex flex-col gap-1 bg-neutral-900 rounded-2xl overflow-hidden p-3 border border-neutral-800'>
            {/* Date and Status Row */}
            <div className='flex justify-between items-center p-1'>
                <div className='flex justify-start items-center gap-2'>
                    <FiClock size={18} className="text-gray-400" />
                    <span className="text-base font-medium text-gray-200">
                        {date}
                    </span>
                </div>
                <div className={`w-4 h-4 rounded-full ${
                    statusColors[status] || 'bg-red-500' 
                }`}></div>
            </div>
            
            {/* Subject Row */}
            <div className='flex gap-2 items-center p-1'>
                <TbCalendarCode size={18} className="text-gray-400" />
                <span className={`text-base font-large ${
                    subjectColors[subject] || subjectColors.OTHER
                }`}>
                    {subject}
                </span>
            </div>
        </div>
    )
}

export default DaysCard