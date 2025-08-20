import React, { FC } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { LuClock3 } from "react-icons/lu";
import { IWidgetCard } from "./config";

interface IWidcardCardSpanTwoRows {
  item: {
    growth: string;
    growthValue: number;
    duration: string;
    upcomingSLA: number;
  };
}

// function WidcardCardSpanTwoRows({ item }: IWidgetCard) {
const WidcardCardSpanTwoRows: FC<IWidcardCardSpanTwoRows> = ({ item }) => {
  const { growth, growthValue, duration, upcomingSLA } = item;
  // console.log("duration", duration);
  return (
    <div className="border border-[#DEE2E6] rounded-xl row-span-2 px-6 py-7 bg-[#6278FF] text-white">
      <div className="flex justify-between">
        <span className="text-base font-normal">Upcoming SLAs</span>
        <span className="text-2xl font-bold">{upcomingSLA}</span>
      </div>
      <div className="mt-4">
        <LuClock3 size={120} />
      </div>
      <div className="flex items-center mt-8">
        <span className="flex items-center text-sm  bg-[#889BFF] py-0.5 px-2 rounded mr-2 text-white">
          <RxArrowTopRight size={20} className="mr-1" />
          {growth == "increase" ? "+" : "-"}
          {growthValue}%
        </span>
        <span className="text-sm text-white">
          {`Over the ${duration == "24hours" ? "last" : ""} ${duration?.toLowerCase()}`}
        </span>
      </div>
    </div>
  );
};

export default WidcardCardSpanTwoRows;
