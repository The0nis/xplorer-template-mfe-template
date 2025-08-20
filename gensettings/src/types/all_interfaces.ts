// Interface for the cases sub header items
export interface IDashboardSubheaderItem {
  subheaderText: string;
  subheaderIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  classes?: string;
  iconColor?: string;
  onClick?: (type?: any, event?: React.MouseEvent) => void;
  type?: string;
  item?: any;
}

export interface IDashboardSubheaderItemNew {
  subheaderText: string;
  subheaderIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  classes?: string;
  iconColor?: string;
  onClick?: (item?: any, event?: React.MouseEvent) => void;
  item?: any;
  type?: string;
  isFormDataValid?: boolean;
  isSavedFormDataValid?: boolean; 
}

export type IDashboardSubheaderItems = IDashboardSubheaderItem[];

export interface IWidgetCard {
  cardClass: string | null;
  title: string;
  imgIcon_1: any;
  imgIcon_2: any;
  exploreCount: number;
  growth: "increase" | "decrease";
  growthValue: number;
  growthPercentage: boolean;
  subTitle: string;
}

// Checkbox interface
export interface CheckboxStates {
  case_title: boolean;
  case_number: boolean;
  description: boolean;
  priority: boolean;
  customer: boolean;
  created_on: boolean;
  status: boolean;
  status_reason: boolean;
}

export interface CheckboxStatesUser {
  user_name: boolean;
  role: boolean;
  created_by: boolean;
  created_on: boolean;
  status: boolean;
  email: boolean;
  more: boolean;
  entry_1: boolean;
  entry_2: boolean;
  entry_3: boolean;
  entry_4: boolean;
  entry_5: boolean;
  entry_6: boolean;
  entry_7: boolean;
  supervisor_name?: boolean;
  team_name?: boolean;
  category?: boolean;
  staff_count?: boolean;
}

// Opening and closing of modals
export interface IOpened {
  status: boolean;
  type?: any;
}

// Opening and closing of dialog box
export interface IDialogPosition {
  top: number;
  left: number;
}

// Dropdown select
export type IDropdownSelect = {
  label: string;
  value: string;
  icon: any;
};

export type IDropdownSelectList = IDropdownSelect[];
