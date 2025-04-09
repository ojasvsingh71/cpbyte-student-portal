import React, { useState } from "react";
import { Search } from "lucide-react";
import noimage from "../../public/noImage.webp";

const MarkAttendance = () => {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [DSA, setDSA] = useState(true);
  const [toggleAll, setToggleAll] = useState(false);
  
  const permissionRequests = [
    {
      id: 13,
      employee: "Dianne Russell",
      libraryId: "2327CSE1290",
      duration: "7 days",
      attended: "50%",
      status: "Pendimg",
    },
    {
      id: 14,
      employee: "Jane Cooper",
      libraryId: "2327CSE1291",
      duration: "5 days",
      attended: "50%",
      status: "Pending",
    },
    {
      id: 15,
      employee: "Kristin Watson",
      libraryId: "2327CSE1292",
      duration: "3 days",
      attended: "50%",
      status: "Pending",
    },
    {
      id: 16,
      employee: "Marvin McKinney",
      libraryId: "2327CSE1293",
      duration: "3 days",
      attended: "50%",
      status: "Pending",
    },
    {
      id: 17,
      employee: "Eleanor Pena",
      libraryId: "2327CSE1294",
      duration: "30 days",
      attended: "50%",
      status: "Pending",
    },
    {
      id: 18,
      employee: "Piastri O",
      libraryId: "2327CSE1295",
      duration: "2 days",
      attended: "50%",
      status: "Pending",
    },
    {
      id: 19,
      employee: "Charles Zao",
      libraryId: "2327CSE1296",
      duration: "3 days",
      attended: "50%",
      status: "Pending",
    },
    {
      id: 20,
      employee: "Devon Lane",
      libraryId: "2327CSE1297",
      duration: "5 days",
      attended: "50%",
      status: "pending",
    },
  ];

  const handleStatusChange = (libraryId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [libraryId]: status,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = permissionRequests.map((req) => ({
      libraryId: req.libraryId,
      status: selectedStatus[req.libraryId] || "ABSENT_WITHOUT_REASON",
    }));
    console.log(result);
  };

  const markAllPresent = () => {
    setToggleAll(!toggleAll);
    if(!toggleAll) {
    permissionRequests.map((items)=>{
      handleStatusChange(items.libraryId, "PRESENT")
    })
  }
  else {
    setSelectedStatus({});
  }
  };

  return (
    <div className="bg-[#070b0f] text-white min-h-screen w-full p-8">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-[#0ec1e7] rounded-full"></div>
            <h1 className="text-3xl font-bold">Mark Member Attendance</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-gray-800 rounded-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-[#212327] rounded-full overflow-hidden">
                <img
                  src={noimage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xs">
                <div className="font-medium">Roushan Srivastav</div>
                <div className="text-gray-400">COORDINATOR</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setDSA(true)}
              className={`${DSA?"bg-[#0ec1e7]":"bg-[#212327]"} px-4 py-2 rounded text-sm font-medium cursor-pointer`}
            >
              JAVA Attendance
            </button>
            <button 
              onClick={() => setDSA(false)}
            className={`${!DSA?"bg-[#0ec1e7]":"bg-[#212327]"} px-4 py-2 rounded text-sm font-medium cursor-pointer`}>
              WEBDEV Attendance
            </button>
          </div>
          <h2 className="text-lg font-semibold mb-4">132 JAVA Members</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex text-sm gap-2">
              <span className="text-zinc-500">Attendance for Date:</span>
              <span>07 April 2025</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <input type="checkbox" className="ml-4" onChange={markAllPresent}/>
              <span className="text-sm text-zinc-300">Mark all present</span>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-2xl">
            <form onSubmit={handleSubmit}>
              <table className="w-full">
                <thead className="bg-[#212327]">
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                    <th className="py-3 px-4">S No.</th>
                    <th className="py-3 px-4">Member</th>
                    <th className="py-3 px-4">Library ID</th>
                    <th className="py-3 px-4">Attended</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-800">
                      <td className="py-4 px-4">{request.id}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-500 rounded-full overflow-hidden">
                            <img
                              src={noimage}
                              alt={request.employee}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span>{request.employee}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 w-[15rem]">
                        {request.libraryId}
                      </td>
                      <td className="py-4 px-4 w-[13rem]">
                        {request.attended}
                      </td>
                      <td className="py-4 px-4 gap-2 flex">
                        {[
                          "PRESENT",
                          "ABSENT_WITHOUT_REASON",
                          "ABSENT_WITH_REASON",
                        ].map((status) => {
                          const isSelected =
                            selectedStatus[request.libraryId] === status;
                          let colorClasses = "";
                          if (status === "PRESENT")
                            colorClasses = isSelected
                              ? "bg-green-700"
                              : "bg-green-900 opacity-75";
                          if (status === "ABSENT_WITHOUT_REASON")
                            colorClasses = isSelected
                              ? "bg-red-700"
                              : "bg-red-900 opacity-75";
                          if (status === "ABSENT_WITH_REASON")
                            colorClasses = isSelected
                              ? "bg-blue-800"
                              : "bg-blue-950 opacity-75";

                          return (
                            <button
                              type="button"
                              key={status}
                              onClick={() =>
                                handleStatusChange(request.libraryId, status)
                              }
                              className={`text-white px-3 py-1 rounded text-xs ${colorClasses}`}
                            >
                              {status.replace(/_/g, " ")}
                            </button>
                          );
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex justify-end pr-16">
              <button
                type="submit"
                className="mt-4 bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded text-white"
              >
                Submit
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;
