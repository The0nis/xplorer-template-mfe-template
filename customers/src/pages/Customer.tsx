import React, { useCallback, useState, useMemo } from "react";
import Tab from "component/Tab";
import Tabs from "component/Tabs";
import Button from "component/Button";
import Input from "component/Input";
import { LiaDownloadSolid } from "react-icons/lia";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { PiSquareSplitHorizontal } from "react-icons/pi";
import { IoIosList } from "react-icons/io";

interface CustomerProp {
  onNavigate?: (path: string) => void;
}

const Customer: React.FC<CustomerProp> = ({ onNavigate }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [currentTable, setCurrentTable] = useState("table1");

  const [formData, setFormData] = useState({
    searchInput: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full p-3 border-b border-[#E0E0E0] ">
        <div className="flex items-center space-x-3">
          <h1 className="font-semibold text-[20px] text-black">Customers</h1>
          <p className="text-[14px] bg-[#EFF4FF] p-1 text-[#004EEB] rounded-md">
            1,009,233 customers
          </p>
          <p className="text-[14px] text-[#96989A]">
            Last updated 2 minutes ago
          </p>
        </div>
        <div className="space-y-4">
          <Button
            // onClick={handleCliky}
            variant="primary"
            size="small"
            className="text-[14px] !text-[#495057] border border-[#ADB5BD] flex items-center space-x-3 !bg-transparent"
          >
            <span className="pr-2">
              <LiaDownloadSolid size={20} />
            </span>
            Export
          </Button>
        </div>
      </div>
      <div className="w-full">
        <div className="border-b border-[#E0E0E0] font-medium text-[14px] pl-4">
          <Tabs defaultActiveTab="tab1">
            <Tab
              tabId="tab1"
              // onClick={(tabId) => {
              //   console.log(tabId);
              // }}
            >
              All Customers
            </Tab>
          </Tabs>
        </div>
        <div className="flex items-center w-full space-x-3 pl-3 py-3 border-b border-[#E0E0E0]">
          <Input
            className="w-[45%]"
            id="search-input"
            name="searchInput"
            type="text"
            placeholder="Search name, BVN, account number, phone number, email"
            variant="filled"
            icon={<RiSearch2Line />}
            iconPosition="end"
            // value={formData.customerBvn}
            onChange={handleChange}
          />
          <div className="flex items-center justify-center">
            <span className="text-[#6C757D] mr-1 text-[14px]">Filter by :</span>
            <Input
              className=""
              type="select"
              options={[
                { value: "option1", label: "none" },
                { value: "option2", label: "Individual" },
                { value: "option3", label: "Bank Account" },
              ]}
              value="option1"
              onChange={handleSelectChange}
            />
          </div>
          <div className="flex justify-center items-center space-x-3">
            <Button
              onClick={() => {}}
              variant="primary"
              size="medium"
              className=" !px-10"
            >
              Search
            </Button>
            <label className="">View:</label>
            <button
              className={`flex items-center ${
                currentTable === "table1"
                  ? "font-bold opacity-100"
                  : "font-normal opacity-35"
              }`}
              onClick={() => setCurrentTable("table1")}
            >
              <IoIosList size={20} />
            </button>
            <button
              className={`flex items-center ${
                currentTable === "table2"
                  ? "font-bold opacity-100"
                  : "font-normal opacity-35"
              }`}
              onClick={() => setCurrentTable("table2")}
            >
              <PiSquareSplitHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
