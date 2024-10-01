"use client";

import PoolChart from "./poolChart";
import PoolStats from "./poolStats";

export default function PoolSection() {
  return (
    <div className="mt-[100px] flex gap-[2vw]">
      <div className="flex-grow">
        <PoolChart />
      </div>
      <div className="w-[26vw] flex-shrink-0">
        <PoolStats />
      </div>
    </div>
  );
}
