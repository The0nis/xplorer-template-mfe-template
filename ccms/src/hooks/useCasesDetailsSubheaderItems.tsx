import { useNavigate } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import { RiRefreshLine, RiDownloadLine, RiDeleteBin2Line } from 'react-icons/ri';
import { MdOutlineCheckBox, MdRoute } from 'react-icons/md';
import { PiQueueThin } from "react-icons/pi";
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IDashboardSubheaderItems } from '../config/all_interfaces';

interface IActivitiesSubHeader {
  onNavigate?: (path: string) => void;
  setState: React.Dispatch<React.SetStateAction<any>>;
  toggleDialog: () => void;
}

// Custom hook to return subheader items
const useActivityDetailsSubheaderItems = ({ onNavigate, setState, toggleDialog }: IActivitiesSubHeader): IDashboardSubheaderItems => {
  const navigate = useNavigate();

  const items: IDashboardSubheaderItems = [
    {
      subheaderText: 'Create New',
      subheaderIcon: GoPlus,
      iconColor: '#009CBD',
      onClick: () => {
        navigate('/cases/create-new-case');
        if (onNavigate) {
          onNavigate('/cases/create-new-case');
        }
      },
      type: 'Create',
      classes: '',
    },
    {
      subheaderText: 'Refresh',
      subheaderIcon: RiRefreshLine,
      iconColor: '#495057',
      // onClick: () => console.log('Hello...2'),
      type: 'refresh',
      classes: 'mx-2',
    },
    {
      subheaderText: 'Assign',
      subheaderIcon: AiOutlineUserAdd,
      iconColor: '#495057',
      // onClick: () => console.log('Hello...3'),
      type: 'assign',
      classes: 'mx-2',
    },
    {
      subheaderText: 'Manual Route',
      subheaderIcon: MdRoute,
      iconColor: '#495057',
      onClick: () => {
        // console.log('Hello...4');
        setState(true);
      },
      type: 'manual_route',
      classes: 'mx-3',
    },
    {
      subheaderText: 'Resolve Case',
      subheaderIcon: MdOutlineCheckBox,
      iconColor: '#495057',
      onClick: () => {
        // console.log('Hello...5');
        setState(true);
      },
      type: 'resolve_case',
      classes: 'mx-2',
    },
    {
      subheaderText: 'Cancel Case',
      subheaderIcon: RiDeleteBin2Line,
      iconColor: '#495057',
      onClick: toggleDialog,
      type: 'cancel_case',
      classes: 'mx-2',
    },
    {
      subheaderText: 'Add To Queue',
      subheaderIcon: PiQueueThin,
      iconColor: '#495057',
      onClick: toggleDialog,
      type: 'add_to_queue',
      classes: 'mx-2',
    },
  ];

  return items;
};

export default useActivityDetailsSubheaderItems;
