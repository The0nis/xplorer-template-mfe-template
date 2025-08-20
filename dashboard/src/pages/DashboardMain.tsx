import React, { useState } from "react";
import {
  casesOptions,
  dashboardFilteroptions,
  dashboardWidgetsArr,
  IWidgetCard,
  requestOptions,
} from "../components/config";
import WidgetCard from "../components/WidgetCard";
import WidcardCardSpanTwoRows from "../components/WidcardCardSpanTwoRows";
import { BsExclamationCircle } from "react-icons/bs";
import { RxArrowTopRight, RxQuestionMarkCircled } from "react-icons/rx";
import ResolutionFlag from "../components/ResolutionFlag";
import {
  chartData,
  chartOptions,
  nipPercentageSections,
  percentageSections,
  topCaseSourcesPercentage,
} from "../components/sample_db";

import Input from "component/Input";
import CustomTable from "component/Table";
import ProgressBar from "component/ProgressBar";
import DoughnutChart from "component/DoughnutChart";
import {
  FILTER_TYPES,
  FilterType,
  formatCurrentDate,
  getInitials,
} from "../helper/general";

interface IActivitiesLandingPage {
  onNavigate?: (path: string) => void;
}

// Dummy data to replace API responses
const DUMMY_DATA = {
  casesLogged: 125,
  casesResolved: 89,
  casesActive: 36,
  casesPending: 15,
  casesPendingOnUser: 7,
  casesPendingOnTeam: 8,
  casesLoggedPercentage: 12.5,
  casesResolvedPercentage: 8.9,
  casesActivePercentage: -3.6,
  casesPendingPercentage: 1.5,
  casesPendingOnUserPercentage: 0.7,
  casesPendingOnTeamPercentage: 0.8,
  upcomingSLA: 5,
  upcomingSLAPercentage: 0.5,
  requestTotal: 42,
  requestPending: 18,
  requestCompleted: 24,
  notifications: 3,
  unresolvedCases: 15,
  resolResolvedCases: 89,
  resolPendingCases: 15,
  resolUnresolvedCases: 21,
  resolTotalCases: 125,
  resolSuccessRate: 71.2,
  nipInward: 85,
  nipOutward: 78,
  newNipOutward: 92,
  nipNap: 67,
  nipTotal: 322,
  topCasesKiki: 45,
  topCasesSocialMedia: 32,
  topCasesInboundCalls: 28,
  topCasesEmail: 20,
};

// Dummy table data
const DUMMY_TABLE_DATA = [
  {
    case_title: { displayText: "Login Issue", id: "1" },
    customer: "John Doe",
    created_on: "15/12/2023, 10:30",
    status: "Open",
  },
  {
    case_title: { displayText: "Payment Failed", id: "2" },
    customer: "Jane Smith",
    created_on: "14/12/2023, 14:22",
    status: "In Progress",
  },
  {
    case_title: { displayText: "Feature Request", id: "3" },
    customer: "Acme Corp",
    created_on: "13/12/2023, 09:15",
    status: "Pending",
  },
  {
    case_title: { displayText: "Bug Report", id: "4" },
    customer: "Tech Solutions",
    created_on: "12/12/2023, 16:45",
    status: "Resolved",
  },
  {
    case_title: { displayText: "Account Setup", id: "5" },
    customer: "Robert Johnson",
    created_on: "11/12/2023, 11:30",
    status: "Open",
  },
];

export const dashboardCasesTableHeader = [
  "Case Title",
  "Customer",
  "Created On",
  "Status",
];

function DashboardMain({ onNavigate }: IActivitiesLandingPage) {
  const user = localStorage.getItem("user");const decryptedUser = {
    userData: {
      Data: {
        Email: "OnisamuelMichael@gmail.com",
        IsAdmin: true,
        Role: "Admin"
      },
    },
  };;

  const [duration, setDuration] = useState("last24hrs");
  const [caseResolution, setCaseResolution] = useState("all");
  const [caseStatus, setCaseStatus] = useState("all");
  const [isFetching, setIsFetching] = useState(false);

  // Use dummy data instead of Redux state
  const {
    casesLogged,
    casesResolved,
    casesActive,
    casesPending,
    casesPendingOnUser,
    casesPendingOnTeam,
    casesLoggedPercentage,
    casesResolvedPercentage,
    casesActivePercentage,
    casesPendingPercentage,
    casesPendingOnUserPercentage,
    casesPendingOnTeamPercentage,
    upcomingSLA,
    upcomingSLAPercentage,
    requestTotal,
    resolResolvedCases,
    resolPendingCases,
    resolUnresolvedCases,
    resolTotalCases,
    resolSuccessRate,
    nipInward,
    nipOutward,
    newNipOutward,
    nipNap,
    topCasesKiki,
    topCasesSocialMedia,
    topCasesInboundCalls,
    topCasesEmail,
  } = DUMMY_DATA;

  // Function to map the counts to those returned from the api
  const getWidgetCount = (title: string) => {
    switch (title) {
      case "Cases Logged":
        return casesLogged;
      case "Cases Resolved":
        return casesResolved;
      case "Cases Active":
        return casesActive;
      case "Cases Pending":
        return casesPending;
      case "Cases Pending On You":
        return casesPendingOnUser;
      case "Cases Pending On Team":
        return casesPendingOnTeam;
      case "Total Request":
        return requestTotal;
      case "Upcoming SLA":
        return upcomingSLA;
      default:
        return 0;
    }
  };

  // Function to map the percentage to those returned from the api
  const getWidgetPercentage = (title: string) => {
    switch (title) {
      case "Cases Logged":
        return casesLoggedPercentage;
      case "Cases Resolved":
        return casesResolvedPercentage;
      case "Cases Active":
        return casesActivePercentage;
      case "Cases Pending":
        return casesPendingPercentage;
      case "Cases Pending On You":
        return casesPendingOnUserPercentage;
      case "Cases Pending On Team":
        return casesPendingOnTeamPercentage;
      case "Total Request":
        return requestTotal;
      case "Upcoming SLA":
        return upcomingSLAPercentage;
      default:
        return 0;
    }
  };

  // Function to render the duration based off the dropdown
  const getDuration = (filterOption: string) => {
    switch (filterOption) {
      case "last24hrs":
        return "24hours";
      case "past7days":
        return "Past 7days";
      case "past2weeks":
        return "Past 2wks";
      case "past1month":
        return "Past 1month";
      case "past3months":
        return "Past 3months";
      case "past6months":
        return "Past 6months";
      default:
        return "Nil";
    }
  };

  // Map the data to the widgets
  const updatedWidgetsArr = dashboardWidgetsArr.map((item) => ({
    ...item,
    exploreCount: getWidgetCount(item.title),
    duration: getDuration(duration),
    growth: getWidgetPercentage(item.title) >= -1 ? "increase" : "decrease",
    growthValue: getWidgetPercentage(item.title),
  }));

  // Function to handle onchange event handler
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    type: FilterType
  ) => {
    const value = e.target.value;
    setIsFetching(true);

    // Simulate API call delay
    setTimeout(() => {
      if (type === FILTER_TYPES.DURATION) {
        setDuration(value);
      } else if (type === FILTER_TYPES.RESOLUTION_CASE_TYPE) {
        setCaseResolution(value);
      } else if (type === FILTER_TYPES.RESOLUTION_CASE_STATUS) {
        setCaseStatus(value);
      }
      setIsFetching(false);
    }, 500);
  };

  // Function to navigate to the cases page
  const handleNavigate = () => {
    const MESSAGE_TYPE = "cases-mfe-navigation";
    window.parent.postMessage({ type: MESSAGE_TYPE, path: "/home" }, "*");
  };

  return (
    <div className="dashboard-box">
      {/* Welcome Admin Section - starts  */}
      <div className="flex justify-between items-center border-b border-[#E0E0E0] py-4 px-5">
        <div className="text-xl">
          Welcome Back,{" "}
          <span className="font-semibold">
            {decryptedUser?.userData?.Data?.Email?.split("@")[0].split(".")[0]}
          </span>{" "}
          <span className="text-[#96989A] text-sm leading-5">
            Your dashboard{" "}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-[#96989A] text-sm leading-5 mr-2">
            Viewing data for:
          </span>
          <Input
            value={duration}
            type="select"
            options={dashboardFilteroptions}
            variant="outlined"
            placeholder="Past 24 hours"
            onChange={(e) => handleFilterChange(e, "duration")}
            listContainerWidth={"100%"}
          />
        </div>
      </div>
      {/* Welcome Admin Section - ends  */}

      {/* Dashboard widgets new - starts  */}
      <div className="px-5 mt-5 w-[100%]">
        <div className="flex justify-between w-[100%]">
          <div className="flex justify-between flex-wrap w-[75%]">
            {updatedWidgetsArr?.map((item: IWidgetCard, index: number) => (
              <WidgetCard key={item?.id || index} {...item} />
            ))}
          </div>
          <div className="w-[24%]">
            <WidcardCardSpanTwoRows
              item={{
                duration: getDuration(duration),
                growth: "increase",
                growthValue: upcomingSLAPercentage,
                upcomingSLA: upcomingSLA,
              }}
            />
          </div>
        </div>
      </div>
      {/* Dashboard widgets new - ends  */}

      {/* Graph section - starts  */}
      <div className="px-5 mt-5">
        <div className="grid grid-cols-2 gap-5">
          {/* Card-1 - starts  */}
          <div className="border border-[#DEE2E6] rounded-xl p-5">
            {/* Header and select dropdown - starts  */}
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold">Resolutions</h4>
              <div className="flex">
                <Input
                  value={caseResolution}
                  type="select"
                  options={casesOptions}
                  variant="outlined"
                  placeholder="Cases"
                  onChange={(e) => handleFilterChange(e, "resolution_caseType")}
                  listContainerWidth={"100%"}
                />
              </div>
            </div>
            {/* Header and select dropdown - ends  */}

            {/* Cases and usage bar - starts  */}
            <div className="mt-3">
              <p className="text-base xplorer-grey">Total Cases</p>
              <p className="text-xl font-bold mt-2 xplorer-black">
                {resolTotalCases}
              </p>
              <div className="mt-2">
                <ProgressBar sections={percentageSections} height="medium" />
              </div>
              <div className="flex items-center mt-3">
                <p className="text-base font-normal xplorer-grey">
                  Success rate
                </p>
                <div className="flex items-center ml-2">
                  <span>
                    <RxArrowTopRight />
                  </span>
                  <div className="text-[#71CC98] font-bold">
                    {resolSuccessRate}%
                  </div>
                </div>
              </div>

              {/* Usage flags - starts  */}
              <div className="mt-4 flex justify-between">
                <ResolutionFlag
                  title="Resolved cases"
                  ballColor="#71CC98"
                  dataCount={resolResolvedCases}
                />
                <ResolutionFlag
                  title="Pending cases"
                  ballColor="#FDD757"
                  dataCount={resolPendingCases}
                />
                <ResolutionFlag
                  title="Unresolved cases"
                  ballColor="#E3595D"
                  dataCount={resolUnresolvedCases}
                />
              </div>
              {/* Usage flags - ends */}
            </div>
            {/* Cases and usage bar - ends  */}
          </div>
          {/* Card-1 - ends  */}

          {/* Card-2 - starts  */}
          <div className="border border-[#DEE2E6] rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <h4 className="text-lg font-bold">NIP Delivery Rates</h4>{" "}
                <p className="xplorer-grey font-normal text-sm ml-2">
                  as of Date: {formatCurrentDate()}
                </p>
              </div>
              <div>
                <BsExclamationCircle size={24} color="#6C757D" />
              </div>
            </div>
            <div>
              <div className="mt-4">
                <div className="flex justify-between mt-2">
                  <p className="text-base xplorer-grey">Nip Inward</p>
                  <p className="text-base font-bold">{nipInward}%</p>
                </div>
                <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                  <ProgressBar sections={nipPercentageSections.nip_inward} />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mt-4">
                  <p className="text-base xplorer-grey">New Nip Outward</p>
                  <p className="text-base font-bold">{nipOutward}%</p>
                </div>
                <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                  <ProgressBar
                    sections={nipPercentageSections.new_nip_outward}
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mt-4">
                  <p className="text-base xplorer-grey">New Nip Outward</p>
                  <p className="text-base font-bold">{newNipOutward}%</p>
                </div>
                <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                  <ProgressBar
                    sections={nipPercentageSections.new_nip_outward_2}
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mt-4">
                  <p className="text-base xplorer-grey">NAPS</p>
                  <p className="text-base font-bold">{nipNap}%</p>
                </div>
                <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                  <ProgressBar sections={nipPercentageSections.naps} />
                </div>
              </div>
            </div>
          </div>
          {/* Card-2 - ends  */}
        </div>
      </div>
      {/* Graph section - ends */}

      {/* Table section - starts  */}
      <div className="px-5 mt-5">
        <div className="grid grid-cols-2 gap-5">
          {/* Card-1 - starts  */}
          <div className="border border-[#DEE2E6] rounded-xl p-5">
            {/* Header and select dropdown - starts  */}
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold">Cases Created</h4>
              <button
                className="text-base font-normal text-[#6278FF]"
                onClick={() => handleNavigate()}
              >
                View All Cases
              </button>
            </div>
            {/* Header and select dropdown - ends  */}
            <div className="mt-7">
              <CustomTable
                headers={dashboardCasesTableHeader}
                data={DUMMY_TABLE_DATA}
                itemsPerPage={5}
                showCheckbox={false}
                isVerticalDotIcon={false}
                isHavePagination={false}
              />
            </div>
          </div>
          {/* Card-1 - ends  */}

          {/* Card-2 - starts  */}
          <div className="border border-[#DEE2E6] rounded-xl p-5">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold">Cases Resolved</h4>
              <Input
                value={caseStatus}
                type="select"
                options={requestOptions}
                placeholder="Request"
                variant="outlined"
                onChange={(e) => handleFilterChange(e, "resolution_caseStatus")}
                listContainerWidth={"100%"}
              />
            </div>
            <div className="mt-4">
              <CustomTable
                headers={dashboardCasesTableHeader}
                data={DUMMY_TABLE_DATA.slice(0, 3)} // Show only resolved cases
                itemsPerPage={5}
                showCheckbox={false}
                isVerticalDotIcon={false}
                isHavePagination={false}
              />
            </div>
          </div>
          {/* Card-2 - ends  */}
        </div>
      </div>
      {/* Table section - ends */}

      {/* Last section - starts */}
      <div className="p-5 mb-10">
        <div className="mt-4">
          <div className="grid grid-cols-8 gap-3">
            <div className="border border-[#DEE2E6] col-span-6 rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <h4 className="text-lg font-bold">Top Case Sources</h4>{" "}
                </div>
                <div>
                  <RxQuestionMarkCircled size={24} color="#6C757D" />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3 mt-4">
                <div className="col-span-1 flex justify-center items-center">
                  <DoughnutChart
                    data={chartData}
                    options={chartOptions}
                    width="160%"
                  />
                </div>
                <div className="col-span-4">
                  <div className="">
                    <div className="flex justify-between">
                      <p className="text-base xplorer-grey">Kiki</p>
                      <p className="text-base font-bold">{topCasesKiki}</p>
                    </div>
                    <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                      <ProgressBar sections={topCaseSourcesPercentage.kiki} />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between mt-4">
                      <p className="text-base xplorer-grey">Social Media</p>
                      <p className="text-base font-bold">
                        {topCasesSocialMedia}
                      </p>
                    </div>
                    <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                      <ProgressBar
                        sections={topCaseSourcesPercentage.social_media}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between mt-4">
                      <p className="text-base xplorer-grey">Inbound Calls</p>
                      <p className="text-base font-bold">
                        {topCasesInboundCalls}
                      </p>
                    </div>
                    <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                      <ProgressBar
                        sections={topCaseSourcesPercentage.inbound_calls}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between mt-4">
                      <p className="text-base xplorer-grey">Email</p>
                      <p className="text-base font-bold">{topCasesEmail}</p>
                    </div>
                    <div className="h-2 rounded-xl mt-2 bg-slate-100 w-full">
                      <ProgressBar sections={topCaseSourcesPercentage.email} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 border border-[#DEE2E6] rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <h4 className="text-lg font-bold">
                    {" "}
                    {decryptedUser?.userData?.Data?.Role || "User"}
                  </h4>{" "}
                </div>
                <div>
                  <BsExclamationCircle size={24} color="#6C757D" />
                </div>
              </div>
              <div>
                <div className="h-24 w-24 bg-[#009CBD] text-5xl font-bold text-white flex items-center justify-center rounded-full mt-8 mx-auto">
                  {"OM"}
                </div>
                <div className="mt-4 text-center">
                  <h4 className="text-[#004EEB] text-lg font-medium">
                Monitech
                  </h4>
                  <span className="text-[#212529] text-base font-normal">
                    Software Developer
                  </span>
                  <p className="text-[#6C757D] text-sm font-normal">
                    {decryptedUser?.userData?.Data?.Email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Last section - ends */}

      {/* Display loader  */}
      {isFetching && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-center">
              Fetching data
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardMain;
