import React, { FC } from "react";
import { IWidgetCard } from "./config";

import Card from "component/Card";

const WidgetCard: FC<IWidgetCard> = (item) => {
  const {
    cardClass,
    title,
    imgIcon_1: ImgIcon_1,
    imgIcon_2: ImgIcon_2,
    exploreCount,
    growth,
    growthValue,
    growthPercentage,
    duration,
  } = item;
  return (
    <Card
      variant="small"
      className={`border border-[#DEE2E6] rounded-xl p-5 hover:-translate-y-0.5 transition-transform duration-300 ease-in-out hover:shadow-lg !w-[32%] ${
        cardClass || ""
      }`}
      backgroundColor="white"
    >
      <div className="flex justify-between">
        <span className="text-base xplorer-grey">
          {title || "Cases logged"}
        </span>
        <span>
          <ImgIcon_1 size={24} color="#6C757D" />
        </span>
      </div>
      <div className="text-xl font-bold mt-2 xplorer-black">{exploreCount}</div>
      <div className="flex items-center mt-1.5">
        <span className="flex items-center text-sm  bg-[#EFF4FF] py-0.5 px-2 rounded mr-2 text-[#004EEB]">
          <ImgIcon_2 size={20} color="#004EEB" />
          {growth == "increase" ? "+" : "-"}
          {growthValue}
          {growthPercentage ? "%" : " New"}
        </span>
        <span className="text-sm xplorer-grey">
          {`Over the ${duration == "24hours" ? "last" : ""} ${duration?.toLowerCase()}`}
        </span>
      </div>
    </Card>
  );
};

export default WidgetCard;
