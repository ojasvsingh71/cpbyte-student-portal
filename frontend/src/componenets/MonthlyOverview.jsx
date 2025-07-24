import React, { useState } from 'react'

function MonthlyOverview({currentMonth, event, formatMonthKey}) {
    
    const [expandedDays, setExpandedDays] = useState({});
    const [expandedSections, setExpandedSections] = useState({
        "Past Events": false,
        "Today": false,
        "Upcoming Events": false
    });

  return (
    <div className="w-full md:w-[25%] backdrop-blur rounded-lg border border-gray-600 p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-[#0ec1e7]">Monthly Overview</h3>
              {event[formatMonthKey(currentMonth)] ? (
                <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2 text-sm">
                  {["Past Events", "Today", "Upcoming Events"]
                    .map((label, index, array) => {
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
                      const isLast = index === array.length - 1;

                      return (
                        <div
                          key={label}
                          className={`${!isLast ? "pb-4 mb-4 border-b border-gray-600" : ""}`}
                        >
                          <h4 className="text-md text-white font-semibold mb-2">{label}</h4>

                          {visibleEvents.map(([date, events]) => {
                            const isDayExpanded = expandedDays[date];
                            const defaultVisibleCount = label === "Today" ? 3 : 1;
                            const visibleDayEvents = isDayExpanded ? events : events.slice(0, defaultVisibleCount);

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
                                    {visibleDayEvents.map((ev) => (
                                      <li
                                        key={ev.id}
                                        className={`truncate ${label === "Past Events"
                                          ? "text-red-400"
                                          : label === "Today"
                                            ? "text-green-400"
                                            : "text-yellow-400"
                                          }`}
                                      >
                                        {ev.title}
                                      </li>
                                    ))}
                                  </ul>

                                  {events.length > defaultVisibleCount && (
                                    <button
                                      onClick={() =>
                                        setExpandedDays((prev) => ({
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
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No events available.</p>
              )}
            </div>
  )
}

export default MonthlyOverview
