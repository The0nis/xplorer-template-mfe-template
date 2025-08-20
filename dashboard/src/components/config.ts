import { RxArrowTopRight } from "react-icons/rx";
import { FaRegSquareCheck } from "react-icons/fa6";
import { RiCheckDoubleLine } from "react-icons/ri";
import { RiNotification3Line } from "react-icons/ri";

// INTERFACES - INTERFACES - INTERFACES - STARTS
export interface IWidgetCard {
  id: number;
  cardClass: string | null;
  title: string;
  imgIcon_1: any;
  imgIcon_2: any;
  exploreCount: number;
  growth: string;
  growthValue: number;
  growthPercentage: boolean;
  subTitle: string;
  duration?: string;
}

// INTERFACES - INTERFACES - INTERFACES - ENDS

// DROPDOWN INTERFACES AND DUMMY ARRAYS - STARTS
export const dashboardWidgetsArr: Array<IWidgetCard> = [
  {
    id: 1,
    cardClass: "mb-4",
    title: "Cases Logged",
    imgIcon_1: FaRegSquareCheck,
    imgIcon_2: RxArrowTopRight,
    exploreCount: 18,
    growth: "increase",
    growthValue: 2,
    growthPercentage: true,
    subTitle: "",
  },
  {
    id: 2,
    cardClass: "mb-4",
    title: "Cases Resolved",
    imgIcon_1: RiCheckDoubleLine,
    imgIcon_2: RxArrowTopRight,
    exploreCount: 10,
    growth: "increase",
    growthValue: 12,
    growthPercentage: false,
    subTitle: "",
  },
  {
    id: 3,
    cardClass: "mb-4",
    title: "Cases Pending On You",
    imgIcon_1: FaRegSquareCheck,
    imgIcon_2: RxArrowTopRight,
    exploreCount: 51,
    growth: "increase",
    growthValue: 1,
    growthPercentage: false,
    subTitle: "",
  },
  {
    id: 5,
    cardClass: null,
    title: "Cases Pending On Team",
    imgIcon_1: RiCheckDoubleLine,
    imgIcon_2: RxArrowTopRight,
    exploreCount: 30,
    growth: "increase",
    growthValue: 3,
    growthPercentage: true,
    subTitle: "",
  },
  {
    id: 6,
    cardClass: null,
    title: "Total Request",
    imgIcon_1: FaRegSquareCheck,
    imgIcon_2: RxArrowTopRight,
    exploreCount: 21,
    growth: "increase",
    growthValue: 7,
    growthPercentage: true,
    subTitle: "",
  },
  {
    id: 7,
    cardClass: null,
    title: "Notifications",
    imgIcon_1: RiNotification3Line,
    imgIcon_2: RxArrowTopRight,
    exploreCount: 32,
    growth: "increase",
    growthValue: 9,
    growthPercentage: true,
    subTitle: "",
  },
];

// Calculate dateFrom and dateTo for the last 24 hours
export const calculateDateRange = (duration: string) => {
  const now = new Date();
  let dateFrom: string;

  switch (duration) {
    case "last24hrs":
      dateFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      break;
    case "past7days":
      dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      break;
    case "past2weeks":
      dateFrom = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      break;
    case "past1month":
      dateFrom = new Date(now.setMonth(now.getMonth() - 1))
        .toISOString()
        .split("T")[0];
      break;
    case "past3months":
      dateFrom = new Date(now.setMonth(now.getMonth() - 3))
        .toISOString()
        .split("T")[0];
      break;
    case "past6months":
      dateFrom = new Date(now.setMonth(now.getMonth() - 6))
        .toISOString()
        .split("T")[0];
      break;
    default:
      throw new Error("Invalid duration provided");
  }

  const dateTo = new Date().toISOString().split("T")[0]; 
  return { dateFrom, dateTo };
};

export const dashboardFilteroptions = [
  { label: "Past 24 hours", value: "last24hrs", dateFrom: "", dateTo: "" },
  { label: "Past 7 days", value: "past7days" },
  { label: "Past 2 weeks", value: "past2weeks" },
  { label: "Past 1 month", value: "past1month" },
  { label: "Past 3 months", value: "past3months" },
  { label: "Past 6 months", value: "past6months" },
];

export const casesOptions = [
  { label: "All", value: "all" },
  { label: "Inbound", value: "inbound" },
  { label: "Outbound", value: "outbound" },
  { label: "Assigned", value: "assigned" },
  { label: "Kiki", value: "kiki" },
  { label: "Email", value: "email" },
];

export const statusOptions = [
  { label: "All", value: "all" },
  { label: "Breached", value: "Breached" },
  { label: "In-progress", value: "In-progress" },
  { label: "Almost Breached", value: "Almost Breached" }
];

export const requestOptions = [
  { label: "Request", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Resolved", value: "resolved" },
  { label: "Approved", value: "approve" },
];
// DROPDOWN INTERFACES AND DUMMY ARRAYS - STARTS
