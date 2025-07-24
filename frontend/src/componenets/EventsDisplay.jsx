import React from "react";
import toast from "react-hot-toast";
import { removeEvents } from "../redux/slices/eventSlice";
import { useDispatch } from "react-redux";

function EventsDisplay({
  selectedDate,
  months,
  event,
  user,
  formatMonthKey,
  formatDateKey,
  currentMonth,
}) {
  const dispatch = useDispatch();

  const removeEvent = async (eventId, eventDate) => {
    const toastId = toast.loading("Removing Event..");
    const res = await dispatch(removeEvents({ eventId, eventDate }));
    if (res.meta.requestStatus === "fulfilled")
      toast.success("Event Removed Successfully", {
        id: toastId,
      });
  };

  return (
    <div className="mt-2 md:mt-4">
      <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-[#0ec1e7]">
        Events for {selectedDate.getDate()} {months[selectedDate.getMonth()]}
      </h3>

      {event[formatMonthKey(currentMonth)] &&
      event[formatMonthKey(currentMonth)][formatDateKey(selectedDate)] &&
      event[formatMonthKey(currentMonth)][formatDateKey(selectedDate)].length >
        0 ? (
        <div className="space-y-1 md:space-y-2">
          {event[formatMonthKey(currentMonth)][formatDateKey(selectedDate)].map(
            (event) => (
              <div
                key={event.id}
                className="p-2 md:p-3 rounded border backdrop-blur border-gray-600 border-b-2 border-b-[#0ec1e7]"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="flex-1 pr-2">
                    <span className="text-sm md:text-base font-medium text-white break-words">
                      {event.title}
                    </span>
                    {event.discription && (
                      <p className="text-xs md:text-sm text-gray-300 mt-1">
                        {event.discription}
                      </p>
                    )}
                  </div>

                  {user.role === "COORDINATOR" && (
                    <button
                      onClick={() =>
                        removeEvent(event.id, formatDateKey(selectedDate))
                      }
                      className="p-1 text-red-500 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded text-xs md:text-sm whitespace-nowrap"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-gray-400 text-sm md:text-base">
          No events scheduled for this day.
        </p>
      )}
    </div>
  );
}

export default EventsDisplay;
