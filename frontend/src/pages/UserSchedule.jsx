import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, addEvents, removeEvents } from '../redux/slices/eventSlice';
import toast from 'react-hot-toast';

const UserSchedule = () => {
  const user = useSelector(state => state.dashboard.data);
  const { event } = useSelector(state => state.event);
  const [addMode, setAddMode] = useState(false);

  const dispatch = useDispatch();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("General")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedSections, setExpandedSections] = useState({
    "Past Events": false,
    "Today": false,
    "Upcoming Events": false
  });
  const [expandedDays, setExpandedDays] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatMonthKey = (currentMonth) => {
    return `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`
  }

  useEffect(() => {
    async function getMonthsEvents() {
      const month = formatMonthKey(currentMonth);

      if (event[month])
        return;
      dispatch(getEvents({ month }));
    }
    getMonthsEvents();

  }, [currentMonth]);

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const weekdays = isMobile ? ["S", "M", "T", "W", "T", "F", "S"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const colorClasses = [
    'bg-fuchsia-600',

    'bg-violet-600',

    'bg-sky-500',

    'bg-cyan-500',

    'bg-emerald-500',

    'bg-amber-500',

    'bg-orange-500',

    'bg-rose-600',
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
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const addEvent = async () => {
    const toastId = toast.loading("Adding Event..")
    if (!title.trim()) return;

    const dateKey = new Date(selectedDate);
    const utcDateOnly = new Date(Date.UTC(
      dateKey.getFullYear(),
      dateKey.getMonth(),
      dateKey.getDate()
    ));
    const res = await dispatch(addEvents({ date: utcDateOnly, title, discription, category }))
    if (res.meta.requestStatus === "fulfilled")
      toast.success("Event Added Successfully", {
        id: toastId
      })
    setTitle("");
    setDiscription("");
    setCategory("General");
  };

  const removeEvent = async (eventId, eventDate) => {
    const toastId = toast.loading("Removing Event..")
    const res = await dispatch(removeEvents({ eventId, eventDate }))
    if (res.meta.requestStatus === "fulfilled")
      toast.success("Event Removed Successfully", {
        id: toastId
      })
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="min-h-screen bg-[#070b0f] pt-16 text-gray-100 p-2 md:p-4 w-full py-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-4 md:mb-8">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="flex items-center space-x-2">
              <div className='bg-[#0ec1e7] w-1 md:w-2 h-6 md:h-8 rounded-full'></div>
              <h1 className="text-xl md:text-3xl font-bold text-white">Schedule</h1>
            </div>
            <div className="flex space-x-1 md:space-x-2">
              <button onClick={prevMonth} className="p-1 md:p-2 rounded-full hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "18" : "24"} height={isMobile ? "18" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <h2 className="text-sm md:text-xl font-semibold flex items-center px-2 md:px-4">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button onClick={nextMonth} className="p-1 md:p-2 rounded-full hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "18" : "24"} height={isMobile ? "18" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        {/* Weekday Names Row */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[75%]">
            <div className="grid grid-cols-7 gap-1 mb-1 md:mb-2">
              {weekdays.map((day, index) => {
                const isWeekend = day === "Sat" || day === "Sun";

                return (
                  <div
                    key={index}
                    className={`text-center py-1 md:py-2 font-medium text-xs md:text-base rounded ${isWeekend ? "bg-[#0ec1e7] text-white" : "bg-white text-black"
                      }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Calendar Day Grid with alternating column colors */}
            <div className="grid grid-cols-7 gap-1 mb-4 md:mb-6">
              {days.map((day, index) => {
                const dateKey = day ? formatDateKey(day) : null;

                const isToday =
                  day &&
                  day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth() &&
                  day.getFullYear() === new Date().getFullYear();

                const isSelected =
                  day &&
                  day.getDate() === selectedDate.getDate() &&
                  day.getMonth() === selectedDate.getMonth() &&
                  day.getFullYear() === selectedDate.getFullYear();

                const dayEvents =
                  dateKey && event[formatMonthKey(currentMonth)]
                    ? event[formatMonthKey(currentMonth)][dateKey] || []
                    : [];

                const cellHeightClass = isMobile ? "h-14 md:h-24" : "h-24";

                const colIndex = index % 7;
                const altBg = colIndex % 2 === 0 ? "bg-[#1f2937]" : "bg-[#2a3444]";

                return (
                  <div
                    key={index}
                    className={`p-1 ${cellHeightClass} border border-gray-800 rounded ${day ? `${altBg} hover:bg-gray-700 cursor-pointer` : "bg-gray-900"
                      } ${isSelected ? "ring-2 ring-[#0ec1e7]" : ""}`}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day && (
                      <div className="relative group w-full h-full">
                        {/* Date Number */}
                        <div
                          className={`text-xs p-1 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mx-auto ${isToday ? "bg-[#0ec1e7] text-white" : "text-white"
                            }`}
                        >
                          {day.getDate()}
                        </div>

                        {/* Visible Events (First 2) */}
                        <div className="mt-1 space-y-0.5">
                          {dayEvents.slice(0, 2).map((event) => {
                            const randomColor =
                              colorClasses[event.id.charCodeAt(0) % colorClasses.length];
                            return (
                              <div
                                key={event.id}
                                className={`flex items-center gap-1 px-1 py-0.5 rounded text-white text-xs truncate ${randomColor}`}
                              >
                                <span className="w-2 h-2 rounded-full bg-white opacity-80"></span>
                                <span className="truncate" title={event.title}>
                                  {event.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Hover Tooltip for Remaining Events */}
                        {dayEvents.length > 2 && (
                          <div className="absolute z-10 hidden group-hover:flex flex-col bg-gray-900 text-white text-xs p-2 rounded-lg shadow-lg top-10 left-1/2 -translate-x-1/2 w-max max-w-[150px]">
                            {dayEvents.map((event) => {
                              const randomColor =
                                colorClasses[event.id.charCodeAt(0) % colorClasses.length];
                              return (
                                <div
                                  key={event.id}
                                  className={`flex items-center gap-1 mb-1 last:mb-0 rounded px-2 py-1 ${randomColor}`}
                                >
                                  <span className="w-2 h-2 rounded-full bg-blue opacity-80"></span>
                                  <span className="truncate" title={event.title}>
                                    {event.title}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full md:w-[25%] bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-[#0ec1e7]">Monthly Overview</h3>
            {event[formatMonthKey(currentMonth)] ? (
              <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2 text-sm">
                {["Past Events", "Today", "Upcoming Events"].map((label) => {
                  const today = new Date();
                  const eventsByCategory = Object.entries(event[formatMonthKey(currentMonth)])
                    .filter(([dateStr]) => {
                      const date = new Date(dateStr);
                      if (label === "Past Events") return date < new Date(today.setHours(0, 0, 0, 0));
                      if (label === "Today") return date.toDateString() === new Date().toDateString();
                      if (label === "Upcoming Events") return date > new Date(today.setHours(23, 59, 59, 999));
                      return false;
                    })
                    .sort((a, b) => new Date(a[0]) - new Date(b[0]));

                  if (eventsByCategory.length === 0) return null;

                  const isExpanded = expandedSections[label];
                  const visibleEvents = isExpanded ? eventsByCategory : eventsByCategory.slice(0, 3);

                  const labelColor =
                    label === "Past Events"
                      ? "text-red-400"
                      : label === "Today"
                        ? "text-green-400"
                        : "text-yellow-400";

                  return (
                    <div key={label}>
                      <h4 className="text-md text-white font-semibold mb-2">{label}</h4>
                      {visibleEvents.map(([date, events]) => {
                        const isDayExpanded = expandedDays[date];
                        const visibleDayEvents = isDayExpanded ? events : events.slice(0, 3);

                        return (
                          <div key={date} className="flex flex-col md:flex-row mb-2">
                            <h5 className="text-gray-400 font-medium w-[80px] shrink-0">
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                                day: "2-digit",
                                month: "short",
                              })}
                            </h5>

                            <div className="flex-1">
                              <ul className="list-disc pl-4 space-y-1 text-gray-300">
                                {visibleDayEvents.map(ev => (
                                  <li key={ev.id} className={`truncate ${labelColor}`}>
                                    {ev.title}
                                  </li>
                                ))}
                              </ul>

                              {events.length > 3 && (
                                <button
                                  onClick={() =>
                                    setExpandedDays(prev => ({
                                      ...prev,
                                      [date]: !prev[date],
                                    }))
                                  }
                                  className="text-xs text-blue-400 hover:underline mt-1 ml-4"
                                >
                                  {isDayExpanded ? "Show Less" : "Show More"}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {eventsByCategory.length > 5 && (
                        <button
                          className="text-xs text-blue-400 hover:underline mt-1"
                          onClick={() =>
                            setExpandedSections(prev => ({
                              ...prev,
                              [label]: !prev[label],
                            }))
                          }
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No events available.</p>
            )}
          </div>
        </div>

        {user.role === "COORDINATOR" && (
          <>
            <div className="bg-gray-800 p-3 md:p-4 rounded-lg shadow-lg">
              <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-[#0ec1e7]">
                {selectedDate.getDate()} {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h3>

              <div className="mb-3 md:mb-4">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add event title"
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50"
                  rows="2"
                />
                <select name="category" id="category" className='w-full p-2 mt-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="General">General</option>
                  <option value="Class">Class</option>
                </select>
                <textarea
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  placeholder="Add event description"
                  className="w-full p-2 mt-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50"
                  rows="2"
                />
              </div>

              <button
                onClick={addEvent}
                className="bg-[#0ec1e7] hover:bg-[#259fdc] text-white py-1.5 md:py-2 px-3 md:px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#0ec1e7] focus:ring-opacity-50 text-sm md:text-base"
              >
                Add Event
              </button>
            </div>

            <div className="mt-4 md:mt-6">
              <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-[#0ec1e7]">
                Events for {selectedDate.getDate()} {months[selectedDate.getMonth()]}
              </h3>

              {event[formatMonthKey(currentMonth)] && event[formatMonthKey(currentMonth)][formatDateKey(selectedDate)] && event[formatMonthKey(currentMonth)][formatDateKey(selectedDate)].length > 0 ? (
                <div className="space-y-1 md:space-y-2">
                  {
                    event[formatMonthKey(currentMonth)][formatDateKey(selectedDate)].map((event) => (
                      <div
                        key={event.id}
                        className="p-2 md:p-3 rounded flex justify-between items-center border-b-2 border-[#0ec1e7] bg-gray-800"
                      >
                        <span className="text-sm md:text-base break-words flex-1 pr-2">{event.title}</span>
                        <button
                          onClick={() => removeEvent(event.id, formatDateKey(selectedDate))}
                          className="p-1 text-red-500 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded text-xs md:text-sm whitespace-nowrap"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm md:text-base">No events scheduled for this day.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div >
  );
};

export default UserSchedule;