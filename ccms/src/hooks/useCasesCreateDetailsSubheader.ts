import { useNavigate } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import { LiaSimCardSolid } from "react-icons/lia";
import { LuWalletCards } from "react-icons/lu";
import { IDashboardSubheaderItems } from '../config/all_interfaces';

// Custom hook to return subheader items
const useCasesCreateSubheaderItems = (): IDashboardSubheaderItems => {

  const items: IDashboardSubheaderItems = [
    {
      subheaderText: 'Create New',
      subheaderIcon: GoPlus,
      iconColor: '#009CBD',
      // onClick: () => console.log('Hey...'),
      classes: 'cursor-not-allowed',
    },
    {
      subheaderText: 'Save',
      subheaderIcon: LiaSimCardSolid,
      iconColor: '#495057',
      // onClick: () => console.log('Hello...2'),
      classes: 'ml-3 mr-1',
    },
    {
      subheaderText: 'Save & Close',
      subheaderIcon: LuWalletCards,
      iconColor: '#495057',
      // onClick: () => console.log('Hello...3'),
      classes: 'mx-2',
    }
  ];

  return items;
};

export default useCasesCreateSubheaderItems;
