import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import {
  RiRefreshLine,
  RiDownloadLine,
  RiDeleteBin2Line,
} from "react-icons/ri";
import { MdOutlineTableChart } from "react-icons/md";
import { LuUserRoundX } from "react-icons/lu";
import {
  IDashboardSubheaderItems,
  IDialogPosition,
} from "../config/all_interfaces";
// import {
//   IDashboardSubheaderItems,
//   IDialogPosition,
// } from "../components/config/all_interfaces";

interface ReportSubHeader {
  onNavigate?: (path: string) => void;
  setState: React.Dispatch<React.SetStateAction<any>>;
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<any>>;
  setDialogPosition?: React.Dispatch<React.SetStateAction<IDialogPosition>>;
  isDialogOpen?: boolean;
  activeTab: string;
}

// Custom hook to return subheader items
const useReportSubheaderItems = ({
  onNavigate,
  setState,
  setIsDialogOpen,
  setDialogPosition,
  isDialogOpen,
  activeTab,
}: ReportSubHeader): IDashboardSubheaderItems => {
  // const navigate = useNavigate();

  const commonItems = [
    {
      subheaderText: "Refresh",
      subheaderIcon: RiRefreshLine,
      iconColor: "#495057",
      // onClick: () => console.log("Refresh"),
      type: "refresh",
      classes: "mx-3",
    },
    {
      subheaderText: "Disable User",
      subheaderIcon: LuUserRoundX,
      iconColor: "#495057",
      onClick: () => {
        // console.log("Disable User");
      },
      type: "disable_user",
      classes: "mx-3",
      disabled: true,
    },
    {
      subheaderText: "Delete",
      subheaderIcon: RiDeleteBin2Line,
      iconColor: "#495057",
      onClick: () => {
        // console.log("Delete");
      },
      type: "delete_item",
      classes: "mx-2",
    },
  ];

  const usersItems = [
    {
      subheaderText: "Refresh",
      subheaderIcon: RiRefreshLine,
      iconColor: "#495057",
      // onClick: () => console.log("Refresh"),
      type: "refresh",
      classes: "mx-3",
    },
    {
      subheaderText: "Delete",
      subheaderIcon: RiDeleteBin2Line,
      iconColor: "#495057",
      onClick: () => {
        // console.log("Delete");
      },
      type: "delete_item",
      classes: "mx-2 !text-[black]",
    },
  ];

  // Items specific to the Roles tab (tab4)
  const rolesItems = [
    // {
    //   subheaderText: "Create New",
    //   subheaderIcon: GoPlus,
    //   iconColor: "#009CBD",
    //   onClick: () => {
    //     console.log("Create New Role");
    //   },
    //   type: "create_new_role",
    //   classes: "",
    // },
    {
      subheaderText: "Refresh",
      subheaderIcon: RiRefreshLine,
      iconColor: "#495057",
      // onClick: () => console.log("Refresh"),
      type: "refresh",
      classes: "mx-3",
    },
    // {
    //   subheaderText: "Disable User",
    //   subheaderIcon: LuUserRoundX,
    //   iconColor: "#495057",
    //   onClick: () => {
    //     console.log("Disable User");
    //   },
    //   type: "disable_user",
    //   classes: "mx-3",
    //   disabled: true,
    // },
    {
      subheaderText: "Delete",
      subheaderIcon: RiDeleteBin2Line,
      iconColor: "#495057",
      onClick: () => {
        // console.log("Delete");
      },
      type: "delete_item",
      classes: "mx-2",
    },
  ];

  const caseTypesItems = [
    // {
    //   subheaderText: "Add New",
    //   subheaderIcon: GoPlus,
    //   iconColor: "#009CBD",
    //   onClick: () => {
    //     // navigate("/cases/add-new-case");
    //     if (onNavigate) {
    //       onNavigate("/cases/add-new-case");
    //     }
    //   },
    //   type: "add_new",
    //   classes: "",
    // },
    // ...commonItems,
  ];

  return activeTab === "tab4" ? rolesItems : usersItems;
};

export default useReportSubheaderItems;
