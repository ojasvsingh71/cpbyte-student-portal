import React, { useEffect, useState, useRef } from "react";
import SkeletonLoader from "../componenets/SkeletonLoader";
import noimage from "../assets/noImage.webp";
import { useDispatch, useSelector } from "react-redux";
import { markAttendance } from "../redux/slices/attendanceSlice";
import MarkAttendanceProtector from "../componenets/MarkAttendanceProtector";
import { updateStatus } from "../redux/slices/checkStatus";
import { toast } from "react-hot-toast";
import AttendanceAlreadyMarked from "../componenets/AttendanceAlreadyMarked";
import * as THREE from "three";

const MarkAttendance = () => {
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [toggleAll, setToggleAll] = useState(false);
  const [isMarked, setIsMarked] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permissionRequests, setPermissionRequests] = useState([]);

  const { subject } = useSelector((state) => state.checkStatus);
  const [DSA, setDSA] = useState(subject);
  const { domain_dev, domain_dsa, name, role } = useSelector(
    (state) => state.dashboard.data
  );
  const allMembers = useSelector((state) => state.attendance.data);
  const dispatch = useDispatch();

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const markAllPresent = () => {
    setToggleAll(!toggleAll);
    if (!toggleAll) {
      const updated = {};
      permissionRequests.forEach((item) => {
        updated[item.library_id] = "PRESENT";
      });
      setSelectedStatus(updated);
    } else {
      setSelectedStatus({});
    }
  };

  useEffect(() => {
    const loadVanta = async () => {
      try {
        const VANTA = await import("vanta/dist/vanta.net.min");
        if (!vantaEffect.current && vantaRef.current) {
          vantaEffect.current = VANTA.default({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            color: 0xfff5,
            backgroundColor: 0x0,
            points: 20.0,
            maxDistance: 10.0,
            spacing: 20.0,
            material: new THREE.LineBasicMaterial({
              color: 0xfff5,
              vertexColors: false,
            }),
          });
        }
      } catch (error) {
        console.error("Failed to load Vanta animation:", error);
      }
    };

    loadVanta();
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const confirmToast = (present, absent, excused) =>
    new Promise((resolve) => {
      toast.custom((t) => (
        <div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[#212327] text-white p-6 rounded-2xl shadow-2xl w-[95vw] max-w-3xl border border-white/10">
            <h3 className="text-3xl font-semibold mb-6">Confirm Attendance Submission</h3>
            <p className="text-xl mb-2">Present: {present}</p>
            <p className="text-xl mb-2">Absent: {absent}</p>
            <p className="text-xl mb-4">Excused: {excused}</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-sm px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className="bg-[#0ec1e7] hover:bg-[#0ea2e7] text-sm px-5 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ));
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = permissionRequests.map((req) => ({
      library_id: req.library_id,
      status: selectedStatus[req.library_id] || "ABSENT_WITHOUT_REASON",
    }));

    let present = 0,
      absent = 0,
      excused = 0;

    result.forEach(({ status }) => {
      if (status === "PRESENT") present++;
      else if (status === "ABSENT_WITH_REASON") excused++;
      else absent++;
    });

    const confirm = await confirmToast(present, absent, excused);
    if (!confirm) return;

    const toastId = toast.loading("Marking Attendance...");
    setIsSubmitting(true);

    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const res = await dispatch(
      markAttendance({
        responses: result,
        subject: DSA ? "DSA" : "DEV",
        date,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(updateStatus({ domain: DSA ? domain_dsa : domain_dev, date }));
      setIsMarked(2);
      toast.success("Attendance marked successfully", { id: toastId });
    } else {
      toast.error("Failed to mark attendance", { id: toastId });
    }

    setIsSubmitting(false);
  };

  const handleStatusChange = (id, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  useEffect(() => {
    setLoading(true);
    setDSA(subject);

    const timeout = setTimeout(() => {
      const members = DSA ? allMembers?.dsaMembers : allMembers?.devMembers;
      setPermissionRequests(Array.isArray(members) ? members : []);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [DSA, isMarked, subject, allMembers]);

  if (role !== "COORDINATOR") {
    return (
      <div className="text-white min-h-screen w-full p-4 md:p-8 bg-[#070b0f]">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold text-red-500 mb-2">403</h1>
          <p className="text-base text-gray-300">You are not authorized to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full text-white pb-16 overflow-hidden">
      <div
        ref={vantaRef}
        className="fixed inset-0 z-0 w-full h-full"
      />
      
      <div className="relative z-10 p-4 md:p-8 min-h-screen">
        <div className="absolute top-6 right-6 bg-[#1c1c1c]/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 shadow z-10">
          <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center">
            {name?.charAt(0)?.toUpperCase() || "C"}
          </div>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-gray-400 uppercase">{role}</p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <div className="w-2 h-8 bg-[#0ec1e7] rounded-sm" />
              Mark Member Attendance
            </h1>
          </div>

          {isMarked === 1 && (
            <>
              <div className="inline-block mb-2 px-4 py-1 rounded-md bg-[#0ec1e7] text-black font-semibold text-sm shadow">
                {DSA ? "DSA Attendance" : "DEV Attendance"}
              </div>
              
              <p className="text-sm text-gray-300 mt-2 mb-6">
                {permissionRequests.length} {DSA ? "DSA" : "DEV"} Members
                <br />
                Attendance for Date:{" "}
                <span className="font-medium">{new Date().toDateString()}</span>
              </p>
            </>
          )}

          {isMarked === 0 && <MarkAttendanceProtector setIsMarked={setIsMarked} />}
          
          {isMarked === 1 && (
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1c1c1c]/40 backdrop-blur-md shadow-lg">
              <div className="flex justify-between items-center p-4">
                <div className="text-lg font-semibold">Mark all present</div>
                <input
                  type="checkbox"
                  onChange={markAllPresent}
                  checked={toggleAll}
                  className="w-4 h-4 text-[#0ec1e7] bg-gray-700 border-gray-600 rounded focus:ring-[#0ec1e7]"
                />
              </div>

              {loading ? (
                <SkeletonLoader />
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#2c2f34] text-gray-300 text-sm font-medium">
                        <tr>
                          <th className="px-4 py-2 w-12">S No.</th>
                          <th className="px-4 py-2">Member</th>
                          <th className="px-4 py-2">Library ID</th>
                          <th className="px-4 py-2">Attended</th>
                          <th className="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {permissionRequests
                          .filter((req) => req && req.name && req.library_id)
                          .map((req, idx) => (
                            <tr
                              key={req.library_id}
                              className="border-b border-[#2c2f34]"
                            >
                              <td className="px-4 py-2">{idx + 1}</td>
                              <td className="px-4 py-2 flex items-center gap-2">
                                <img
                                  src={noimage}
                                  className="h-6 w-6 rounded-full object-cover"
                                  alt="Member"
                                />
                                {req.name}
                              </td>
                              <td className="px-4 py-2">{req.library_id}</td>
                              <td className="px-4 py-2">
                                {DSA ? req.dsaAttendance : req.devAttendance}%
                              </td>
                              <td className="px-4 py-2">
                                <div className="flex gap-2 flex-wrap">
                                  {[
                                    "PRESENT",
                                    "ABSENT_WITHOUT_REASON",
                                    "ABSENT_WITH_REASON",
                                  ].map((status) => {
                                    const isSelected =
                                      selectedStatus[req.library_id] === status;
                                    let bg = {
                                      PRESENT: isSelected
                                        ? "bg-green-600"
                                        : "bg-green-900",
                                      ABSENT_WITHOUT_REASON: isSelected
                                        ? "bg-red-600"
                                        : "bg-red-900",
                                      ABSENT_WITH_REASON: isSelected
                                        ? "bg-blue-600"
                                        : "bg-blue-900",
                                    }[status];

                                    return (
                                      <button
                                        key={status}
                                        type="button"
                                        onClick={() =>
                                          handleStatusChange(req.library_id, status)
                                        }
                                        className={`text-xs px-2 py-1 rounded text-white ${bg} hover:opacity-80 transition-opacity`}
                                      >
                                        {status.replace(/_/g, " ")}
                                      </button>
                                    );
                                  })}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end mt-4 p-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-[#0ec1e7] hover:bg-[#0ea2e7] px-4 py-2 rounded text-white text-sm transition-colors ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          
          {isMarked === 2 && <AttendanceAlreadyMarked setIsMarked={setIsMarked} />}
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;