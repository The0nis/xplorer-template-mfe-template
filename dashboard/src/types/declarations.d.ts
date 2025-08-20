// src/declarations.d.ts
declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.jpeg" {
  const content: any;
  export default content;
}

declare module "*.webp" {
  const content: any;
  export default content;
}

declare module "component/Button" {
  import { FC, ButtonHTMLAttributes, ReactNode } from "react";

  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "tertiary" | "disabled";
    size?: "small" | "medium" | "large";
  }

  const Button: FC<ButtonProps>;
  export default Button;
}

declare module "component/Input" {
  import { FC, InputHTMLAttributes } from "react";
  interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    variant?: "default" | "outlined" | "filled";
    type?: string; // Allow type to be passed in, including 'password' and 'select'
    className?: string;
    icon?: React.ReactNode; // New prop to accept an icon
    iconPosition?: "start" | "end"; // New prop to specify icon position
    options?: Option[];
    onChange?: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
    width?: string;
    height?: string;
    iconSize?: number;
    placeholder?: string;
    value?: string;
    listContainerWidth?: string;
    autocompleteData?: Option[];
    maxLengthTextVal?: number;
    filterField?: string;
    dropdownIcon?: React.ReactNode;
  }

  const Input: FC<InputProps>;
  export default Input;
}

declare module "component/SelectDropdown" {
  import { FC, ReactNode } from "react";

  interface SelectDropdownProps {
    options: Option[];
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    width?: string;
  }

  const SelectDropdown: FC<SelectDropdownProps>;
  export default SelectDropdown;
}

declare module "component/Card" {
  import { FC, ReactNode } from "react";
  interface CardProps {
    children: ReactNode;
    variant?: "small" | "medium" | "large";
    backgroundColor?: string;
    className?: string;
    width?: string; // Optional width property
  }

  const Card: FC<CardProps>;
  export default Card;
}

declare module "component/Tab" {
  import { FC, ReactNode } from "react";

  interface TabProps {
    tabId: string;
    isActive?: boolean;
    onClick?: (tabId: string) => void;
    className?: string;
    children?: ReactNode;
  }

  const Tab: FC<TabProps>;
  export default Tab;
}

declare module "component/Tabs" {
  import { FC, ReactNode } from "react";

  interface TabsProps {
    children: ReactNode;
    defaultActiveTab?: string;
  }

  const Tabs: FC<TabsProps>;
  export default Tabs;
}

declare module "component/Card" {
  import { FC, ReactNode } from "react";
  interface CardProps {
    children: ReactNode;
    variant?: "small" | "medium" | "large";
    backgroundColor?: string;
    className?: string;
  }

  const Card: FC<CardProps>;
  export default Card;
}

declare module "component/Table" {
  import { FC, ReactNode } from "react";

  interface TableProps {
    headers: string[];
    data: any[];
    itemsPerPage?: number;
    showCheckbox?: boolean;
    isVerticalDotIcon?: boolean;
    isHavePagination?: boolean;
  }

  const Table: FC<TableProps>;
  export default Table;
}

declare module "component/TableCell" {
  import { FC, ReactNode } from "react";

  interface TableCellProps {
    children?: ReactNode;
    className?: string;
  }

  const TableCell: FC<TableCellProps>;
  export default TableCell;
}

declare module "component/ProgressBar" {
  import { FC, ReactNode } from "react";

  interface Section {
    color: string;
    percentage?: number;
    value?: number;
    maxValue?: number;
  }

  interface ProgressBarProps {
    sections: Section[];
    usePercentage?: boolean;
    maxValue?: number;
    defaultColor?: string;
    height?: "small" | "medium";
  }

  const TableCell: FC<ProgressBarProps>;
  export default ProgressBar;
}

declare module "component/DoughnutChart" {
  import { FC, ReactNode } from "react";

  interface DoughnutChartProps {
    data: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    options?: any;
    width?: string;
    height?: string;
  }

  const DoughnutChart: FC<DoughnutChartProps>;
  export default DoughnutChart;
}

declare module "container/store";
declare module "component/Loader";
declare module "component/FullPageLoader"
