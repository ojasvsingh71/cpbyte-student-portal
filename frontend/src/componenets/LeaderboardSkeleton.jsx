import React from "react";

const SkeletonCard = () => (
  <div className="w-full h-40 rounded-lg bg-gray-800 animate-pulse"></div>
);

const SkeletonRow = () => (
  <tr className="border-b border-gray-700 animate-pulse">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="py-4 px-6">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

const LeaderboardSkeleton = () => {
  return (
    <div className="w-full p-4 lg:p-12 pt-4">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full mb-12">
        {[...Array(3)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
          <thead className="bg-gray-950">
            <tr className="text-left">
              {["Rank", "Name", "Year", "Language", "Total", "Previous"].map(
                (heading, i) => (
                  <th
                    key={i}
                    className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardSkeleton;
