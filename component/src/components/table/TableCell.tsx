// src/components/TableCell.tsx
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledTableCell = styled.td`
  font-size: 14px;
  padding: 8px;
  font-weight: normal;
`;

interface TableCellProps extends React.HTMLProps<HTMLTableCellElement> {
  children?: React.ReactNode;  // Correctly typing children
}

const TableCell: FC<TableCellProps> = ({ children, ...props }) => {
  return <StyledTableCell {...props}>{children}</StyledTableCell>;
};

export default TableCell;
