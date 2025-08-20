import React, { FC, ReactNode, MouseEvent } from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  children: ReactNode;
  variant?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  className?: string;
  width?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const sizes = {
  small: {
    width: '17.8125rem', // 285px in rem
    height: '8.25rem',   // 132px in rem
  },
  medium: {
    width: '36.875rem', // 590px in rem
    height: '17.75rem', // 284px in rem
  },
  large: {
    width: '75rem',     // 1200px in rem
    height: '21.6rem',  // 344px in rem
  },
};

const CardContainer = styled.div<{ 
  variant: 'small' | 'medium' | 'large'; 
  backgroundColor?: string; 
  customWidth?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void; // Add onClick to type definition
}>`
  background: ${({ backgroundColor }) => backgroundColor || '#fff'};
  border-radius: 12px;
  border: 1px solid #DEE2E6; 
  padding: 1rem;
  ${({ variant, customWidth }) => css`
    width: ${customWidth || sizes[variant].width};
    height: ${sizes[variant].height};
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
    }
    @media (max-width: 480px) {
      padding: 0.5rem;
    }
  `}
`;

const Card: FC<CardProps> = ({ children, variant = 'small', backgroundColor, className, width, onClick }) => {
  return (
    <CardContainer
      variant={variant}
      backgroundColor={backgroundColor}
      className={className}
      customWidth={width}
      onClick={onClick}
    >
      {children}
    </CardContainer>
  );
};

export default Card;