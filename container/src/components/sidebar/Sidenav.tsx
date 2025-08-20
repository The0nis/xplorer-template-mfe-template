import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiGroup2Line } from "react-icons/ri";
import { BsFileCheck } from "react-icons/bs";
import { RiCheckDoubleLine } from "react-icons/ri";
import { GoStack } from "react-icons/go";
import { RiToolsLine } from "react-icons/ri";
import { MdConnectWithoutContact } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { IoChevronDownSharp, IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

interface SidenavProps {
  className?: string;
}

const Sidenav: React.FC<SidenavProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSev, setIsOpenServ] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenServ, setIsDropdownOpenServ] = useState(false);
  const userData = {
    userData: {
      Data: {
        Email: "OnisamuelMichael@gmail.com",
        IsAdmin: true,
        Role: "Admin"
      },
    },
  };
  console.log("isAdminSide:", userData?.userData?.Data?.IsAdmin)

  // Roles
  // Admin
  const isAdmin = userData?.userData?.Data?.Role === "Admin" // has access to all parts of the appilication.
  // Supervisor
  // Compliance Officer
  const isComplianceOfficer = userData?.userData?.Data?.Role === "Compliance Officer"
  // Resolution Officer
  // Data and Insight Analyst
  // Contact center Agent
  // Super Admin
  // Quality Assurance
  // IT control
  // Back Office Support
  // Customer Support

  // console.log({ isComplianceOfficer }, userData?.userData?.Data?.Role)


  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

  const linkClassName = (isActive: boolean,) =>
    `flex items-center space-x-2 pt-3 pb-3 pl-2 font-medium text-[14px] h-[60px] cursor-pointer  ${isActive
      ? "text-[#6278FF] border-r-4 border-[#6278FF] bg-[#6278FF1A]" // Active state
      : "text-[#6C757D] border-r-0 hover:border-r-4 hover:border-[#6278FF] hover:bg-[#6278FF1A]" // Hover state
    }`;

  const nestedLinkClassName = (isActive: boolean,) =>
    `flex items-center space-x-2 pt-3 pb-3 pl-2 font-medium text-[14px] h-[60px]  ${isActive
      ? "text-[#000000] border-r-4 border-[#6C757D] bg-[#F8F9FA]" // Active state
      : "text-[#6C757D] border-r-0 hover:border-r-4 hover:border-[#6C757D] hover:bg-[#F8F9FA]" // Hover state
    }`;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsOpen(!isOpen)
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  const toggleDropdownServ = () => {
    setIsDropdownOpenServ(!isDropdownOpenServ)
    setIsOpenServ(!isOpenSev)
  }

  return (
    <nav
      className={`bg-white w-[14vw] h-screen space-y-2 pt-8 fixed md:relative md:block border-r border-[#E0E0E0]`}
    >
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => linkClassName(isActive)}
          >
            <MdDashboard size={24} />
            <p>Overview</p>
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) => linkClassName(isActive)}
          >
            <RiGroup2Line size={24} />
            <p>Customers</p>
          </NavLink>
          <NavLink
            to="/cases/home"
            className={({ isActive }) => linkClassName(isActive)}
          >
            <BsFileCheck size={24} />
            <p>Cases</p>
          </NavLink>
          {/* <NavLink
            to="/requests/home"
            className={({ isActive }) => linkClassName(isActive)}
          >
            <RiCheckDoubleLine size={24} />
            <p>Requests</p>
          </NavLink> */}
          <NavLink
            to="/activities/home"
            className={({ isActive }) => linkClassName(isActive)}
          >
            <GoStack size={24} />
            <p>Activities</p>
          </NavLink>
          {/* Tools */}
          {(isAdmin || isComplianceOfficer) && (<div>
            <div
              onClick={toggleDropdown}
              className={linkClassName(isOpen)}
            >
              <RiToolsLine size={24} />
              <p className="w-9/12">Tools</p>
              {isOpen ? <IoChevronDownSharp size={20} /> : <MdChevronRight size={22} />}
            </div>
            {isDropdownOpen && (
              <div className={`pl-6 overflow-hidden ${isDropdownOpen ? 'animate-slideDown' : 'animate-slideUp'}`}>
                {/* To be worked on in the future */}
                {/* <NavLink
                  to="/accountstatement/home"
                  className={({ isActive }) => nestedLinkClassName(isActive)}
                >
                  Account Statement Generator
                </NavLink>
                <NavLink
                  to="/transactions/home"
                  className={({ isActive }) => nestedLinkClassName(isActive)}
                >
                  NIP Trans. Status
                </NavLink>
                <NavLink
                  to="/bvn/home"
                  className={({ isActive }) => nestedLinkClassName(isActive)}
                >
                  BVN Checker
                </NavLink> */}
                <NavLink
                  to="/ccms/home"
                  className={({ isActive }) => nestedLinkClassName(isActive)}
                >
                  CCMS Reports
                </NavLink>
                {/* To be worked on in the future */}
                {/* <NavLink
                  to="/knowledgearticle/home"
                  className={({ isActive }) => nestedLinkClassName(isActive)}
                >
                  Knowledge Article
                </NavLink> */}
              </div>
            )}
          </div>)}
          {/* Settings */}
          {isAdmin && (<div>
            <div
              onClick={toggleSettingsDropdown}
              className={linkClassName(isSettingsDropdownOpen)}
            >
              <IoSettingsOutline size={24} />
              <p className="w-9/12">Settings</p>
              {isSettingsDropdownOpen ? <IoChevronDownSharp size={20} /> : <MdChevronRight size={22} />}
            </div>
            {isSettingsDropdownOpen && (
              <div className={`pl-6 overflow-y-scroll h-24 ${isSettingsDropdownOpen ? 'animate-slideDown' : 'animate-slideUp'}`}>
                <NavLink
                  to="/generalsettings/home"
                  className={({ isActive }) => nestedLinkClassName(isActive)}
                >
                  <p>General Settings</p>
                </NavLink>
                <NavLink
                  to="/casestructure/home"
                  className={({ isActive }) => nestedLinkClassName(isActive)}
                >
                  Cases Structure
                </NavLink>
                <NavLink
                  to="/usermanagement/home"
                  className={({ isActive }) => nestedLinkClassName(isActive)}
                >
                  <p>User Management</p>
                </NavLink>
              </div>
            )}
          </div>)}
        </li>

        {/* To be worked on in the future */}
        {/* <div>
          <div
            onClick={toggleDropdownServ}
            className={linkClassName(isOpenSev)}
          >
            <MdConnectWithoutContact size={24} />
            <p className="w-9/12">Service Status</p>
            {isOpenSev ? <IoChevronDownSharp size={20} /> : <MdChevronRight size={22} />}
          </div>
          {isDropdownOpenServ && (
            <div className={`pl-6 overflow-hidden ${isDropdownOpenServ ? 'animate-slideDown' : 'animate-slideUp'}`}>
              <NavLink
                to="/services/home"
                className={({ isActive }) => nestedLinkClassName(isActive)}
              >
                Services Dashboard
              </NavLink>
            </div>
          )}
        </div> */}
      </ul>
    </nav>
  );
};

export default Sidenav;
