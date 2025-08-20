import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import SharedButton from "component/Button";
import EditColumnsGroup from "./EditColumnsGroup";

type EditColumnsGroupProps = {
  activeTab: string;
};

function EditColumns() {
  const [activeTab, setActiveTab] = useState<string>("default");

  return (
    <div className="mt-9">
      {/* Buttons section - starts */}
      <div className="px-1 flex justify-end">
        <SharedButton
          className="!py-2 !px-4 !rounded-md flex items-center"
          size="small"
          variant="primary"
        >
          <p className="text-white text-sm font-medium">Apply</p>
          <FiCheck size={24} className="text-white ml-2" />
        </SharedButton>
        <SharedButton
          className="!bg-[#E8EBFF] !py-2 !px-4 !rounded-md flex items-center ml-4"
          size="small"
          variant="primary"
        >
          <p className="!text-[#6278FF] text-sm font-medium">
            Reset to default
          </p>
          <RiArrowGoBackLine size={24} className="!text-[#6278FF] ml-2" />
        </SharedButton>
        <SharedButton
          className="!bg-[#E8EBFF] !py-2 !px-4 !rounded-md flex items-center ml-4"
          size="small"
          variant="primary"
        >
          <p className="!text-[#6278FF] text-sm font-medium">Cancel</p>
          <IoCloseOutline size={24} className="!text-[#6278FF] ml-2" />
        </SharedButton>
      </div>
      {/* Buttons section - ends */}

      {/* Lower section(checkbox, table title, dropdown) - starts */}
      <div className="border-t border-[#E0E0E0] mt-4">
        {/* <EditUserColumnsGroup activeTab={activeTab} /> */}
        <EditColumnsGroup />
      </div>
      {/* Lower section(checkbox, table title, dropdown) - ends */}
    </div>
  );
}

export default EditColumns;
