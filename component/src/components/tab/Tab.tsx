import React from 'react';
import styled from 'styled-components';

interface TabProps {
  tabId: string;
  isActive?: boolean;
  onClick?: (tabId: string) => void;  // Modify the type to accept tabId
  className?: string;
  children?: React.ReactNode;
}

const TabButton = styled.a<{ isActive?: boolean }>`
  display: inline-block;
  padding: 1rem 10px;
  border-bottom: 4px solid ${(props) => (props.isActive ? '#2563eb' : 'transparent')};
  border-radius: 0.5rem 0.5rem 0 0;
  color: ${(props) => (props.isActive ? '#212529' : '#6b7280')};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #212529;
    border-bottom-color: 3px solid #6278FF;
  }
`;

const Tab: React.FC<TabProps> = ({ tabId, isActive, onClick, children, className }) => (
  <li className={className}>
    <TabButton
      isActive={isActive}
      onClick={() => onClick && onClick(tabId)}  // Pass the tabId to the onClick handler
      className={isActive ? '' : 'disabled'}
    >
      {children}
    </TabButton>
  </li>
);

export default Tab;
