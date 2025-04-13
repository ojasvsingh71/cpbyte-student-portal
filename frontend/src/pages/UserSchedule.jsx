import React, { useState, useEffect } from 'react';

const UserSchedule=()=> {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [eventText, setEventText] = useState("");
  const [eventColor, setEventColor] = useState("bg-[#0ec1e7]");

  const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const colors = [
    { name: "Purple", class: "bg-purple-500" },
    { name: "Blue", class: "bg-blue-500" },
    { name: "Green", class: "bg-green-500" },
    { name: "Red", class: "bg-red-500" },
    { name: "Orange", class: "bg-orange-500" }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];

    const firstDay = new Date(year, month, 1);
    
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };
  
  const addEvent = () => {
    if (!eventText.trim()) return;
    
    const dateKey = formatDateKey(selectedDate);
    const updatedEvents = {...events};
    
    if (!updatedEvents[dateKey]) {
      updatedEvents[dateKey] = [];
    }
    
    updatedEvents[dateKey].push({
      id: Date.now(),
      text: eventText,
      color: eventColor
    });
    
    setEvents(updatedEvents);
    setEventText("");
  };
  
  const removeEvent = (dateKey, eventId) => {
    const updatedEvents = {...events};
    updatedEvents[dateKey] = events[dateKey].filter(event => event.id !== eventId);
    
    if (updatedEvents[dateKey].length === 0) {
      delete updatedEvents[dateKey];
    }
    
    setEvents(updatedEvents);
  };
  
  const days = getDaysInMonth(currentMonth);

  return (
    <div className="min-h-screen bg-[#070b0f] text-gray-100 p-4 w-full py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <div className='bg-[#0ec1e7] w-2 h-8 rounded-full '></div>
            <h1 className="text-3xl font-bold text-white">Schedule</h1>
            </div>
            <div className="flex space-x-2">
              <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold flex items-center px-4">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-center py-2 text-gray-400 font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-6">
          {days.map((day, index) => {
            const dateKey = day ? formatDateKey(day) : null;
            const isToday = day ? 
              day.getDate() === new Date().getDate() && 
              day.getMonth() === new Date().getMonth() && 
              day.getFullYear() === new Date().getFullYear() : false;
            
            const isSelected = day ?
              day.getDate() === selectedDate.getDate() &&
              day.getMonth() === selectedDate.getMonth() &&
              day.getFullYear() === selectedDate.getFullYear() : false;
            
            const dayEvents = dateKey && events[dateKey] ? events[dateKey] : [];
            
            return (
              <div 
                key={index} 
                className={`p-1 h-24 border border-gray-800 rounded ${day ? 'bg-gray-800 hover:bg-gray-700 cursor-pointer' : 'bg-gray-900'} ${isSelected ? 'ring-2 ring-[#0ec1e7]' : ''}`}
                onClick={() => day && setSelectedDate(day)}
              >
                {day && (
                  <>
                    <div className={`text-xs p-1 rounded-full w-6 h-6 flex items-center justify-center ${isToday ? 'bg-[#0ec1e7] text-white' : 'text-gray-300'}`}>
                      {day.getDate()}
                    </div>
                    <div className="mt-1 overflow-y-auto max-h-16">
                      {dayEvents.map(event => (
                        <div 
                          key={event.id} 
                          className={`${event.color} text-white text-xs p-1 mb-1 rounded truncate flex justify-between`}
                        >
                          <span className="truncate">{event.text}</span>
                          <button 
                            className="hover:bg-gray-900 hover:bg-opacity-20 rounded px-1" 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeEvent(dateKey, event.id);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-3 text-[#0ec1e7]">
            {selectedDate.getDate()} {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Event Colors
            </label>
            <div className="flex space-x-2 mb-3">
              {colors.map(color => (
                <button
                  key={color.class}
                  className={`w-6 h-6 rounded-full ${color.class} ${eventColor === color.class ? 'ring-2 ring-white' : ''}`}
                  onClick={() => setEventColor(color.class)}
                  title={color.name}
                />
              ))}
            </div>
            
            <textarea
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              placeholder="Add event details"
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50"
              rows="2"
            />
          </div>
          
          <button
            onClick={addEvent}
            className="bg-[#0ec1e7] hover:bg-[#259fdc] text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#0ec1e7] focus:ring-opacity-50"
          >
            Add Event
          </button>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3 text-[#0ec1e7]">Events for {selectedDate.getDate()} {months[selectedDate.getMonth()]}</h3>
          
          {events[formatDateKey(selectedDate)] && events[formatDateKey(selectedDate)].length > 0 ? (
            <div className="space-y-2">
              {events[formatDateKey(selectedDate)].map(event => (
                <div 
                  key={event.id} 
                  className={`${event.color} p-3 rounded flex justify-between items-center`}
                >
                  <span>{event.text}</span>
                  <button 
                    onClick={() => removeEvent(formatDateKey(selectedDate), event.id)}
                    className="p-1 hover:bg-black hover:bg-opacity-20 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No events scheduled for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSchedule;