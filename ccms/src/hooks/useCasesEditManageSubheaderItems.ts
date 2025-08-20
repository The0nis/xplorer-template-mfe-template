import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { RiRefreshLine, RiDownloadLine, RiDeleteBin2Line } from "react-icons/ri";
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
const useCasesEditManageSubheaderItems = ({
  onNavigate,
  setState,
  setIsDialogOpen,
  setDialogPosition,
  isDialogOpen,
}: CasesSubHeader): IDashboardSubheaderItems => {
  const navigate = useNavigate();

  const items: IDashboardSubheaderItems = [
    {
      subheaderText: "Create New View",
      subheaderIcon: GoPlus,
      iconColor: "#009CBD",
      onClick: () => {
        navigate("/cases/create-new-case");
        if (onNavigate) {
          onNavigate("/cases/create-new-case");
        }
      },
      type: "create_new_view",
      classes: "",
    },
    {
      subheaderText: "Refresh",
      subheaderIcon: RiRefreshLine,
      iconColor: "#495057",
      // onClick: () => console.log("Hello...2"),
      type: "refresh",
      classes: "mx-3",
    },
    {
      subheaderText: "Edit Columns",
      subheaderIcon: MdOutlineTableChart,
      iconColor: "#495057",
      onClick: () => {
        // console.log("Hello...4");
        setState(true);
      },
      type: "Columns",
      classes: "mx-3",
    },
    {
      subheaderText: "Export",
      subheaderIcon: RiDownloadLine,
      iconColor: "#495057",
      onClick: (event) => {
        // console.log("Hello");
      },
      type: "export",
      classes: "mx-2",
    },
    {
        subheaderText: "Delete Now",
        subheaderIcon: RiDeleteBin2Line,
        iconColor: "#495057",
        onClick: (event) => {
          // console.log("Hello");
        },
        type: "delete_case",
        classes: "mx-2",
      },
  ];

  return items;
};

export default useCasesEditManageSubheaderItems;
