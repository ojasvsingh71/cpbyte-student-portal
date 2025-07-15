import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-800 animate-pulse rounded-lg ${className}`}></div>
);

const TargetUserSkeleton = () => {
  return (
    <div className="flex-1 p-8 min-h-screen w-full bg-gray-950 text-white space-y-8">
      {/* Top Profile Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <SkeletonBox className="w-12 h-12 rounded-full" />
          <SkeletonBox className="w-40 h-6" />
        </div>
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonBox key={i} className="w-6 h-6 rounded-full" />
          ))}
        </div>
      </div>

      {/* Triple Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <SkeletonBox key={i} className="h-28" />
        ))}
      </div>

      {/* DSA + GitHub and Skills + Language */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonBox className="h-[400px]" />
        <SkeletonBox className="h-[400px]" />
      </div>

      {/* Projects Section */}
      <div className="w-full h-[200px] bg-gray-900 p-6 rounded-xl border border-gray-800">
        <SkeletonBox className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonBox key={i} className="h-40" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TargetUserSkeleton;
