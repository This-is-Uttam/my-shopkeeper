import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <>
      <div>
        <Skeleton className="h-50 w-screen rounded-xl" />

        <Skeleton className="h-5 w-[100px] rounded-xl" />
      </div>
      <div className="grid grid-cols-6 gap-5">
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-fit p-3">
          <Skeleton className="h-55 w-[180px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 m-auto w-[120px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingSkeleton;
