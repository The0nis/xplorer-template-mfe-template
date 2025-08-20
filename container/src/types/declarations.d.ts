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

declare module 'component/Button' {
  import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
    size?: 'small' | 'medium' | 'large';
  }

  const Button: FC<ButtonProps>;
  export default Button;
}

declare module 'component/Input' {
  import { FC, InputHTMLAttributes, ReactNode } from 'react';
  interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    variant?: "default" | "outlined" | "filled";
    type?: string; // Allow type to be passed in, including 'password'
    className?: string;
    icon?: React.ReactNode; // New prop to accept an icon
    iconPosition?: "start" | "end"; // New prop to specify icon position
    options?: { value: string; label: string }[];
    onChange?: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
  }

  const Input: FC<InputProps>;
  export default Input;
}

declare module 'component/Card' {
  import { FC, ReactNode } from 'react';
  interface CardProps {
    children: ReactNode;
    variant?: 'small' | 'medium' | 'large';
    backgroundColor?: string;
    className?: string;
  }

  const Card: FC<CardProps>;
  export default Card;
}

// src/declarations.d.ts
declare module 'component/Tab' {
  import { FC, ReactNode } from 'react';

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

declare module 'component/Tabs' {
  import { FC, ReactNode } from 'react';

  interface TabsProps {
    children: ReactNode;
    defaultActiveTab?: string;
  }

  const Tabs: FC<TabsProps>;
  export default Tabs;
}

declare module 'component/Table' {
  import { FC, ReactNode } from 'react';

  interface TableProps {
    headers: string[];
    data: any[];
    // renderRow: (row: any) => ReactNode;
    itemsPerPage?: number;
    showCheckbox?: boolean;
    isVerticalDotIcon?: boolean;
    isHavePagination?: boolean;
  }

  const Table: FC<TableProps>;
  export default Table;
}

declare module 'component/ProgressBar' {
  import { FC, ReactNode } from 'react';
  interface ProgressBarProps {
    sections?: Section[];
    usePercentage?: boolean;
    maxValue?: number;
    defaultColor?: string;
    height?: 'small' | 'medium';
  }

  const ProgressBar: FC<ProgressBarProps>;
  export default ProgressBar;
}

declare module 'component/TableCell' {
  import { FC, ReactNode } from 'react';

  interface TableCellProps {
    children?: ReactNode;
    className?: string;
  }

  const TableCell: FC<TableCellProps>;
  export default TableCell;
}

declare module 'component/Modal' {
  import { FC, ReactNode } from 'react';

  interface ModalProps {
    isOpen?: boolean;
    onClose?: (value: React.SetStateAction<boolean>) => void | boolean;
    position?: string;
    children?: ReactNode;
    className?: string;
    buttonRef?: any;
    height?: string;
    width?: string;
    headerText?: string;
    closeXBtn?: boolean;
  }

  const Modal: FC<ModalProps>;
  export default Modal;
}
