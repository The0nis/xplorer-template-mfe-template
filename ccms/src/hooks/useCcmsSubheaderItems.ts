import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { RiRefreshLine, RiDownloadLine } from "react-icons/ri";
import { MdOutlineFilterList, MdOutlineTableChart } from "react-icons/md";
import { BsBarChart } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import {
  IDashboardSubheaderItems,
  IDialogPosition,
} from "../config/all_interfaces";

interface CasesSubHeader {
  onNavigate?: (path: string) => void;
  setState: React.Dispatch<React.SetStateAction<any>>;
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<any>>;
  setDialogPosition?: React.Dispatch<React.SetStateAction<IDialogPosition>>;
  isDialogOpen?: boolean;
}

// Custom hook to return subheader items
const useCcmsSubheaderItems = ({
  onNavigate,
  setState,
  setIsDialogOpen,
  setDialogPosition,
  isDialogOpen,
}: CasesSubHeader): IDashboardSubheaderItems => {
  const navigate = useNavigate();

  const items: IDashboardSubheaderItems = [

    {
      subheaderText: "Focused View",
      subheaderIcon: RiRefreshLine,
      iconColor: "#495057",
      // onClick: () => console.log("Hello...2"),
      type: "",
      classes: "mx-2",
    },
    {
      subheaderText: "Show Chart",
      subheaderIcon: AiOutlineUserAdd,
      iconColor: "#495057",
      // onClick: () => console.log("Hello...3"),
      type: "",
      classes: "mx-2",
    },
    // {
    //   subheaderText: "Delete",
    //   subheaderIcon: MdOutlineTableChart,
    //   iconColor: "#495057",
    //   onClick: () => {
    //     console.log("Hello...4");
    //     // setState(true);
    //   },
    //   type: "",
    //   classes: "mx-3 !text-[black]",
    // },
    {
      subheaderText: "Refresh",
      subheaderIcon: MdOutlineFilterList,
      iconColor: "#495057",
      onClick: () => {
        // console.log("Hello...5");
        // setState(true);
      },
      type: "",
      classes: "mx-2",
    },
    {
      subheaderText: "Visualize with...",
      subheaderIcon: BsBarChart,
      iconColor: "#495057",
      onClick: (item, event) => {},
      type: "visualize",
      classes: "mx-2",
    },
    {
      subheaderText: "Email a link",
      subheaderIcon: AiOutlineUserAdd,
      iconColor: "#495057",
      // onClick: () => console.log("Hello...3"),
      type: "",
      classes: "mx-2",
    },
    {
      subheaderText: "Run Report",
      subheaderIcon: MdOutlineTableChart,
      iconColor: "#495057",
      onClick: () => {
        // console.log("Hello...4");
        // setState(true);
      },
      type: "run_report",
      classes: "mx-3",
    },
    {
      subheaderText: "Share",
      subheaderIcon: MdOutlineFilterList,
      iconColor: "#495057",
      onClick: () => {
        // console.log("Hello...5");
        // setState(true);
      },
      type: "",
      classes: "mx-2",
    },
  ];

  return items;
};

export default useCcmsSubheaderItems;
