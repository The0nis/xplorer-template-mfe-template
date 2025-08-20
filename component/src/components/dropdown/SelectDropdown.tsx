import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { truncateText } from "../../helper/general";

export interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode | null;
  [key: string]: any; 
}

export interface SelectDropdownProps {
  options: Option[];
  name?: string;
  placeholder?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
  height?: string;
  iconSize?: number;
  listContainerWidth?: string;
  maxLengthTextVal?: number
}

const DropdownContainer = styled.div < { width?: string; height?: string; name?: string; }>`
  position: relative;
  width: ${({ width }) => width || "200px"};
  height: ${({ height }) => height || "auto"};
  name: ${({ name }) => name || "auto"};
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

const DropdownListContainer = styled.div<{ listContainerWidth?: string }>`
  position: absolute;
  width: ${({ listContainerWidth }) => `${listContainerWidth} !important` || "100%"};
  margin-top: 5px;
  border-radius: 5px;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #fafafa;
`;

const DropdownList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  max-height: 250px;
  overflow-y: auto;
  color: #495057;
  font-size: 14px;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #96989a;
    border-radius: 10px;
    border: 3px solid transparent;
  }
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Aligns items to the extremes */
  padding: 10px;
  color: #495057;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Placeholder = styled.span`
  color: #495057;
  font-size: 14px;
  font-weight: 400;
`;

const IconContainer = styled.div<{ size?: number }>`
  margin-left: 20px;
  font-size: ${({ size }) =>
    size ? `${size}px` : "16px"}; // Use size prop here, with default
`;

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  placeholder,
  value,
  name,
  onChange,
  width,
  height,
  iconSize, 
  listContainerWidth, 
  maxLengthTextVal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  // Create a ref for the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);

    const event = {
      target: {
        value: optionValue,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    onChange(event); // Pass the event to onChange
    setIsOpen(false);
  };

  const selectedOption = options?.find(
    (option) => option?.value === selectedValue
  );

  return (
    <DropdownContainer width={width} height={height} ref={dropdownRef} name={name}>
      <DropdownHeader onClick={handleToggle} >
        {selectedOption ? (
          truncateText(selectedOption?.label, maxLengthTextVal || 16)
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}
        <IconContainer size={iconSize}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </IconContainer>
      </DropdownHeader>
      {isOpen && (
        <DropdownListContainer listContainerWidth={listContainerWidth}>
          <DropdownList>
            {options?.map((option) => {
              let OptionIcon = option?.icon;
              return (
                <DropdownItem
                  key={option?.value}
                  onClick={() => handleOptionClick(option?.value)}
                >
                  <span>{option.label}</span>
                  {OptionIcon && (
                    <IconContainer size={iconSize}>{OptionIcon}</IconContainer>
                  )}
                </DropdownItem>
              );
            })}
          </DropdownList>
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
};

export default SelectDropdown;
