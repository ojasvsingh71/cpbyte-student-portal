import React from "react";
import "./skeleton.css";

export default function SkeletonLoader() {
  const rows = Array.from({ length: 8 });

  return (
    <div className="w-screen h-screen bg-[#070b0f] overflow-hidden">
      <div className="p-4 md:p-8 text-white min-h-screen">
        <div className="skeleton-heading w-64 h-8 mb-4 rounded"></div>
        <div className="skeleton-subheading w-40 h-4 mb-6 rounded"></div>

        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-gray-400 bg-[#212327] border-b border-gray-800">
                <th className="px-2 py-2">S No.</th>
                <th className="px-2 py-2">Member</th>
                <th className="px-2 py-2">Library ID</th>
                <th className="px-2 py-2">Attended</th>
                <th className="px-2 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((_, i) => (
                <tr key={i} className="border-b border-gray-800">
                  <td className="px-2 py-3">
                    <div className="skeleton h-4 w-6 rounded"></div>
                  </td>
                  <td className="px-2 py-3 flex items-center gap-2">
                    <div className="skeleton h-8 w-8 rounded-full"></div>
                    <div className="skeleton h-4 w-20 rounded"></div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="skeleton h-4 w-28 rounded"></div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="skeleton h-4 w-12 rounded"></div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2 flex-wrap">
                      <div className="skeleton h-6 w-14 rounded"></div>
                      <div className="skeleton h-6 w-24 rounded"></div>
                      <div className="skeleton h-6 w-24 rounded"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
