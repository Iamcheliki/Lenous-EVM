"use client";
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.FC;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [tooltip, setTooltip] = useState<boolean>(false);

  return (
    <div className="max-w-6xl mx-auto mt-24 bg-neutral-button  rounded-3xl overflow-hidden ">
      <div className="">
        <div className="inline-flex bg-neutral-button rounded-t-3xl">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative">
              <button
                onMouseOver={() => {
                  tab.id === "2" ? setTooltip(true) : setTooltip(false);
                }}
                onMouseLeave={() => setTooltip(false)}
                disabled={tab.id === "2"}
                className={`px-20 text-xl py-2 text-sm font-medium text-white focus:outline-none rounded-t-3xl ${
                  activeTab === tab.id
                    ? "bg-teal-bg  border-t-2  border-green-border"
                    : tab.id === "2"
                    ? ""
                    : "hover:text-blue-500 "
                }`}
                style={{ opacity: tab.id === "2" ? 0.5 : 1 }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
              {tooltip && tab.id === "2" && (
                <span className="absolute top-[80%] left-[70%] bg-gray-500 text-black block p-[10px] rounded-[5px] z-10 w-fit text-nowrap">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-[400px] bg-teal-bg">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? "block" : "hidden"}  h-full`}
          >
            <tab.content />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
