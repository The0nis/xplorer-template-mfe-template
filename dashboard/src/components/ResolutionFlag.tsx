import React from "react";

interface IResolutionFlag {
  title?: string;
  ballColor?: string;
  dataCount?: any;
}

function ResolutionFlag({ title, ballColor, dataCount }: IResolutionFlag) {
  return (
    <div>
      <div className="flex items-center">
        <div
          className={`h-3 bg-${ballColor ? `[${ballColor}]` : '#71CC98'} rounded-full `}
        ></div>
        <span className="text-base font-normal xplorer-grey">
          {title || "Resolved Cases"}
        </span>
      </div>
      <p className="text-lg font-bold mt-1 xplorer-black">
        {dataCount}
      </p>
    </div>
  );
}

export default ResolutionFlag;
