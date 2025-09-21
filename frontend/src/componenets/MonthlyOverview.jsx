import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  MapPin,
  CircleDot,
} from "lucide-react";

function MonthlyOverview({ currentMonth, event, formatMonthKey }) {
  const [expandedDays, setExpandedDays] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    "Past Events": false,
    Today: false,
    "Upcoming Events": false,
  });

  const sectionOrder = ["Past Events", "Today", "Upcoming Events"];
  const todayDate = new Date();

  // Helper to get filtered events by category
  const getEventsByCategory = (label) => {
    return Object.entries(event[formatMonthKey(currentMonth)] || {})
      .filter(([dateStr]) => {
        const date = new Date(dateStr);
        if (label === "Past Events")
          return date < new Date(todayDate.setHours(0, 0, 0, 0));
        if (label === "Today")
          return date.toDateString() === new Date().toDateString();
        if (label === "Upcoming Events")
          return date > new Date(todayDate.setHours(23, 59, 59, 999));
        return false;
      })
      .sort((a, b) => new Date(a[0]) - new Date(b[0]));
  };

  const hasEvents =
    event[formatMonthKey(currentMonth)] &&
    Object.keys(event[formatMonthKey(currentMonth)]).length > 0;

  return (
    <div className="w-full md:w-[25%] backdrop-blur rounded-lg border border-gray-600 p-4 mb-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-[#0ec1e7] flex items-center gap-2">
        <span>
          <Calendar />
        </span>
        Monthly Overview
      </h3>
      {hasEvents ? (
        <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2 text-sm">
          {sectionOrder.map((label, index, array) => {
            const eventsByCategory = getEventsByCategory(label);
            if (eventsByCategory.length === 0) return null;

            const isExpanded = expandedSections[label];
            const visibleEvents = isExpanded
              ? eventsByCategory
              : eventsByCategory.slice(0, 3);
            const isLast = index === array.length - 1;

            return (
              <div
                key={label}
                className={`${
                  !isLast ? "pb-4 mb-4 border-b border-gray-600" : ""
                } transition-all`}
              >
                <div
                  className={`flex px-3 py-1 rounded-2xl items-center justify-between cursor-pointer group mb-2
                    ${
                      label === "Past Events"
                        ? "bg-gradient-to-r from-red-100 via-red-200 to-red-300 text-red-700 border border-red-300"
                        : label === "Today"
                        ? "bg-gradient-to-r from-green-100 via-green-200 to-green-300 text-green-700 border border-green-300"
                        : "bg-gradient-to-r from-yellow-100 via-orange-200 to-orange-300 text-orange-700 border border-orange-300"
                    }`}
                  onClick={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      [label]: !prev[label],
                    }))
                  }
                  title={`Toggle ${label}`}
                >
                  <h4 className="text-md font-semibold flex items-center gap-1">
                    {label === "Past Events" && (
                      <span>
                        <Clock size={"1rem"} />
                      </span>
                    )}
                    {label === "Today" && (
                      <span>
                        <Calendar size={"1rem"} />
                      </span>
                    )}
                    {label === "Upcoming Events" && (
                      <span>
                        <MapPin size={"1rem"} />
                      </span>
                    )}
                    {label}
                  </h4>
                  <span className="text-xs transition">
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </div>
                {visibleEvents.map(([date, events]) => {
                  const isDayExpanded = expandedDays[date];
                  const visibleDayEvents = isDayExpanded
                    ? events
                    : events.slice(0, 1);

                  return (
                    <div key={date} className="flex flex-col md:flex-row mb-2">
                      <h5 className="text-gray-400 font-medium w-[100px] shrink-0 flex items-center gap-1">
                        <span>
                          <CircleDot size={"1rem"} />
                        </span>
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
                              className={`truncate ${
                                label === "Past Events"
                                  ? "text-red-400"
                                  : label === "Today"
                                  ? "text-green-400"
                                  : "text-yellow-400"
                              } font-medium hover:bg-gray-700/30 px-2 py-1 rounded transition`}
                              title={ev.title}
                            >
                              {`${ev.title} ${
                                events.length > 1 ? `...+${events.length - 1}` : ""
                              } `}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
                {eventsByCategory.length > 3 && (
                  <button
                    onClick={() =>
                      setExpandedSections((prev) => ({
                        ...prev,
                        [label]: !prev[label],
                      }))
                    }
                    className="text-xs text-blue-400 hover:underline mt-2 ml-2"
                  >
                    {isExpanded ? "Collapse Section" : "Expand Section"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-sm flex items-center gap-2">
          No events available.
        </p>
      )}
    </div>
  );
}

export default MonthlyOverview;
