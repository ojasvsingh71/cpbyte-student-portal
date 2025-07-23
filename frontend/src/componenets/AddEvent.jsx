import React, { useState } from "react";
import toast from "react-hot-toast";
import { addEvents } from "../redux/slices/eventSlice";
import { useDispatch } from "react-redux";

function AddEvent({ selectedDate, months }) {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("General");
  const [disable, setDisable] = useState(false);

  const dispatch = useDispatch();

  const addEvent = async () => {
    setDisable(true);
    const toastId = toast.loading("Adding Event..");

    if (!title.trim()) {
      setDisable(false);
      return;
    }

    const dateKey = new Date(selectedDate);
    const utcDateOnly = new Date(
      Date.UTC(dateKey.getFullYear(), dateKey.getMonth(), dateKey.getDate())
    );
    const res = await dispatch(
      addEvents({ date: utcDateOnly, title, discription, category })
    );
    if (res.meta.requestStatus === "fulfilled")
      toast.success("Event Added Successfully", {
        id: toastId,
      });
    setTitle("");
    setDiscription("");
    setCategory("General");
    setDisable(false);
  };

  return (
    <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-lg backdrop-blur border border-gray-600 shadow-lg">
      <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-[#0ec1e7]">
        {selectedDate.getDate()} {months[selectedDate.getMonth()]}{" "}
        {selectedDate.getFullYear()}
      </h3>

      <div className="mb-3 md:mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add event title"
          className="w-full p-2 rounded text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50"
          rows="2"
        />
        <select
          name="category"
          id="category"
          className="w-full p-2 mt-2 rounded text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General" className="bg-black">
            General
          </option>
          <option value="Class" className="bg-black">
            Class
          </option>
        </select>
        <textarea
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
          placeholder="Add event description"
          className="w-full p-2 mt-2 rounded text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50"
          rows="2"
        />
      </div>

      <button
        onClick={addEvent}
        disabled={disable}
        className="bg-[#0ec1e7] hover:bg-[#259fdc] text-white py-1.5 md:py-2 px-3 md:px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#0ec1e7] focus:ring-opacity-50 text-sm md:text-base cursor-pointer"
      >
        Add Event
      </button>
    </div>
  );
}

export default AddEvent;
