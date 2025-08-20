import React, { ReactNode, useState } from 'react';
import Tab from './Tab';

interface TabProps {
  tabId: string;
  isActive?: boolean;
  onClick?: (tabId: string) => void;
  className?: string;
  children?: React.ReactNode;
}

interface TabsProps {
  children: ReactNode;
  defaultActiveTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultActiveTab);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // console.log(`Clicked Tab: ${tabId}`);  // Log the tabId when the tab is clicked
  };

  return (
    <div>
      <ul className="flex flex-wrap mb-0 list-none">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Tab) {
            return React.cloneElement(child as React.ReactElement<TabProps>, {
              isActive: activeTab === child.props.tabId,
              onClick: (id: string) => {
                handleTabClick(id);
                if (child.props.onClick) {
                  child.props.onClick(id);
                }
              },
            });
          }
          return null;
        })}
      </ul>
    </div>
  );
};


export default Tabs;

