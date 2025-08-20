import React, { FC, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

// Interface for the Table component props
interface TableProps {
  headers: string[];
  data: any[];
  itemsPerPage?: number;
  showCheckbox?: boolean;
  isVerticalDotIcon?: boolean;
  customAction?: React.ReactNode; // Add this prop
  isHavePagination?: boolean;
  onRowClick?: (row: RowData) => void;
  onCheckboxChange?: (row: RowData, isChecked: boolean) => void;
  isItemSelected?: (row: RowData) => boolean; 
  title?: string;
  withWrapper?: boolean;
  getCellStyle?: (key: string, value: any) => React.CSSProperties;
  totalCount?: number;
  totalPages?: number;
  handleTablePagination?: (page: number) => void;
  pageNumber?: number;
  isSliceData?: boolean;
  HasNextPage?: boolean;
  HasPreviousPage?: boolean;
}

// Keyframes for the animations
const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    max-height: 1000px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
`;

// Styled components
const WrapperContainer = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
`;

const WrapperContent = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  ${({ isOpen }) => css`
    animation: ${isOpen ? slideDown : slideUp} 0.3s ease forwards;
  `}
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  overflow-x: auto; /* Add horizontal scrolling */
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* Add horizontal scrolling */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px; /* Set a minimum width to allow for horizontal scrolling */
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  text-align: left;
  border-radius: 8px;
  background: #f8f9fa;
  color: #333;
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap; /* Prevent wrapping */
  overflow: hidden; /* Hide overflow content */
  text-overflow: ellipsis; /* Add ellipsis for overflowed content */
`;

const TableRow = styled.tr`
  font-size: 14px;
  font-weight: normal;
  color: #616161;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;

const TableCell = styled.td`
  font-size: 14px;
  padding: 8px;
  font-weight: normal;
  color: #333;
  white-space: nowrap; /* Prevent wrapping */
  overflow: hidden; /* Hide overflow content */
  text-overflow: ellipsis; /* Add ellipsis for overflowed content */
  &:first-child {
    padding-left: 16px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  background: white;
`;

const PaginationButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  margin: 0 4px;
  border-radius: 4px;
  background: ${({ active }) => (active ? "#6278FF" : "#e0e0e0")};
  color: ${({ active }) => (active ? "white" : "#333")};
  cursor: pointer;
  border: none;

  &:hover {
    background: ${({ active }) => (active ? "#505fcb" : "#d0d0d0")};
  }
`;

const TableBodyCon = styled.tbody`
  padding: 8px;
`;

const TableHead = styled.thead`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* Adjust the spacing between the text and icon */
`;

const TableCellContent = styled.span<{ style?: React.CSSProperties }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ style }) => style?.backgroundColor || "inherit"};
`;

interface TableHeaderProps {
  headers: string[];
  showCheckbox: boolean;
  data: any[];
  onSelectAll?: (isChecked: boolean) => void;
  isAllSelected?: boolean;
}

const TableHeader: FC<TableHeaderProps> = ({
  headers,
  showCheckbox,
  data,
  onSelectAll,
  isAllSelected,
}) => {
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectAll) {
      onSelectAll(event.target.checked);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {showCheckbox && (
          <TableHeaderCell>
            <input
              type="checkbox"
              checked={isAllSelected || false}
              onChange={handleSelectAll}
            />
          </TableHeaderCell>
        )}
        {headers?.map((header, index) => (
          <TableHeaderCell key={index}>
            <FlexContainer>
              <span>{header}</span>
              <MdKeyboardArrowDown />
            </FlexContainer>
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type RowData = Record<string, string | number | JSX.Element | null | any>;

interface TableBodyProps {
  data: RowData[];
  headers: string[];
  showCheckbox: boolean;
  isVerticalDotIcon?: boolean;
  onRowClick?: (row: RowData) => void;
  onCheckboxChange?: (row: RowData, isChecked: boolean) => void;
  isItemSelected?: (row: RowData) => boolean;
  getCellStyle?: (key: string, value: any) => React.CSSProperties;
  customAction?: React.ReactNode | ((rowIndex: number) => React.ReactNode);
}

const TableBody: FC<TableBodyProps> = ({
  data,
  headers,
  showCheckbox,
  onCheckboxChange,
  isItemSelected,
  isVerticalDotIcon,
  onRowClick,
  getCellStyle,
  customAction,
}) => {
  const handleRowClick = (row: RowData, event: React.MouseEvent) => {
    // Don't trigger row click when checkbox is clicked
    if ((event.target as HTMLInputElement).type === "checkbox") {
      return;
    }

    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleCheckboxChange = (
    row: RowData,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation(); // Prevent row click when checkbox is clicked
    if (onCheckboxChange) {
      onCheckboxChange(row, event.target.checked);
    }
  };

  return (
    <TableBodyCon>
      {data?.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          onClick={(event) => handleRowClick(row, event)}
        >
          {showCheckbox && (
            <TableCell>
              <input
                type="checkbox"
                checked={isItemSelected ? isItemSelected(row) : false}
                onChange={(event) => handleCheckboxChange(row, event)}
              />
            </TableCell>
          )}
          {Object?.entries(row)?.map(([key, value], cellIndex) => (
            <TableCell key={cellIndex}>
              <TableCellContent
                style={getCellStyle ? getCellStyle(key, value) : {}}
              >
                {value && typeof value === "object" && value?.displayText
                  ? value?.displayText // Display the text part of the object
                  : value !== undefined
                  ? value // Display the value directly
                  : "N/A"}
              </TableCellContent>
            </TableCell>
          ))}
          {customAction && (
            <TableCell>
              {typeof customAction === "function"
                ? customAction(rowIndex)
                : customAction}
            </TableCell>
          )}
          {isVerticalDotIcon && (
            <TableCell>
              <BsThreeDotsVertical />
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBodyCon>
  );
};

interface TablePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  HasNextPage?: boolean;
  HasPreviousPage?: boolean;
  onPageChange: (page: number) => void;
}

const TablePagination: FC<TablePaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  HasPreviousPage,
  HasNextPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getVisiblePages = (
    current: number,
    total: number
  ): (number | "...")[] => {
    const range: (number | "...")[] = [];
    const show = (i: number) => i > 1 && i < total;

    range.push(1);
    if (current > 3) range.push("...");

    for (let i = current - 1; i <= current + 1; i++) show(i) && range.push(i);

    if (current < total - 2) range.push("...");
    if (total > 1) range.push(total);

    return range;
  };

  return (
    <PaginationContainer>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center justify-start">
        {/* Previous Button */}
        {HasPreviousPage && (
          <PaginationButton
            active={false}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <GrFormPrevious size={24} />
          </PaginationButton>
        )}

        {getVisiblePages(currentPage, totalPages).map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="mx-1">
              <IoIosMore size={16} />
            </span>
          ) : (
            <PaginationButton
              key={`page-${page}`}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationButton>
          )
        )}
        {/* Next Button */}
        {HasNextPage && (
          <PaginationButton
            active={false}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <GrFormNext size={24} />
          </PaginationButton>
        )}
      </div>
    </PaginationContainer>
  );
};

// Main Table component
const Table: FC<TableProps> = ({
  headers,
  data,
  itemsPerPage = 10,
  showCheckbox = false,
  isVerticalDotIcon,
  isHavePagination = true,
  onRowClick,
  onCheckboxChange,
  isItemSelected,
  title,
  withWrapper = false,
  getCellStyle,
  customAction,
  totalCount,
  totalPages,
  HasNextPage,
  HasPreviousPage,
  handleTablePagination,
  pageNumber,
  isSliceData,
}) => {
  const [currentPage, setCurrentPage] = React.useState(pageNumber ?? 1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Check if all items on current page are selected
  const isAllSelected = () => {
    const dataToCheck = isSliceData ? data : currentData;
    return (
      dataToCheck?.length > 0 &&
      dataToCheck?.every((row) =>
        isItemSelected ? isItemSelected(row) : false
      )
    );
  };

  // Handle select all for current page
  const handleSelectAll = (isChecked: boolean) => {
    const dataToSelect = isSliceData ? data : currentData;
    dataToSelect?.forEach((row) => {
      if (onCheckboxChange) {
        onCheckboxChange(row, isChecked);
      }
    });
  };

  return withWrapper ? (
    <WrapperContainer>
      <WrapperHeader onClick={toggleOpen}>
        <span>{title}</span>
        {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
      </WrapperHeader>
      <WrapperContent isOpen={isOpen}>
        <TableContainer>
          <TableWrapper>
            <StyledTable>
              <TableHeader
                headers={headers}
                showCheckbox={showCheckbox}
                data={isSliceData ? data : currentData}
                onSelectAll={showCheckbox ? handleSelectAll : undefined}
                isAllSelected={showCheckbox ? isAllSelected() : false}
              />
              <TableBody
                data={isSliceData ? data : currentData}
                headers={headers}
                showCheckbox={showCheckbox}
                isVerticalDotIcon={isVerticalDotIcon}
                onRowClick={onRowClick}
                onCheckboxChange={onCheckboxChange}
                isItemSelected={isItemSelected}
                getCellStyle={getCellStyle}
                customAction={customAction}
              />
            </StyledTable>
          </TableWrapper>
        </TableContainer>
        {isHavePagination && (
          <TablePagination
            HasNextPage={HasNextPage}
            HasPreviousPage={HasPreviousPage}
            totalItems={totalCount ?? data?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handleTablePagination ?? handlePageChange}
          />
        )}
      </WrapperContent>
    </WrapperContainer>
  ) : (
    <TableContainer>
      <TableWrapper>
        <StyledTable>
          <TableHeader
            headers={headers}
            showCheckbox={showCheckbox}
            data={isSliceData ? data : currentData}
            onSelectAll={showCheckbox ? handleSelectAll : undefined}
            isAllSelected={showCheckbox ? isAllSelected() : false}
          />
          <TableBody
            data={isSliceData ? data : currentData}
            headers={headers}
            showCheckbox={showCheckbox}
            isVerticalDotIcon={isVerticalDotIcon}
            onRowClick={onRowClick}
            onCheckboxChange={onCheckboxChange}
            isItemSelected={isItemSelected}
            getCellStyle={getCellStyle}
            customAction={customAction}
          />
        </StyledTable>
      </TableWrapper>
      {isHavePagination && (
        <TablePagination
          HasNextPage={HasNextPage}
          HasPreviousPage={HasPreviousPage}
          totalItems={totalCount ?? data?.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handleTablePagination ?? handlePageChange}
        />
      )}
    </TableContainer>
  );
};

export default Table;
