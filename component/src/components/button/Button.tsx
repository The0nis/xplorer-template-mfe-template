import React, { FC, ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const sizeStyles = {
  small: '8px 16px',
  medium: '12px 24px',
  large: '16px 32px',
};

const variantStyles = {
  primary: `
    background-color: #6278FF;
    color: white;
    &:hover {
      background-color: #4a5ad0;
    }
  `,
  secondary: `
    background-color: #6c757d;
    color: white;
    &:hover {
      background-color: #5a6268;
    }
  `,
  tertiary: `
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    &:hover {
      background-color: #f1f1f1;
    }
  `,
  disabled: `
    background-color: #e0e0e0;
    color: #6c757d;
    cursor: not-allowed;
  `,
  danger: `
  background-color: #DB353A;
  color: white;
  &:hover {
    background-color: #DB353A;
  }
`,
};

const Button = styled.button<ButtonProps>`
  font-weight: 600;
  border-radius: 10px;
  outline: none;
  transition: background-color 0.3s ease;
  padding: ${({ size }) => sizeStyles[size || 'medium']};
  ${({ variant, disabled }) => variantStyles[disabled ? 'disabled' : variant || 'primary']}
`;

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'medium', disabled = false, ...props }, ref) => {
    return (
      <Button ref={ref} variant={variant} size={size} disabled={disabled} {...props}>
        {children}
      </Button>
    );
  }
);

ButtonComponent.displayName = 'ButtonComponent';

export default Button;
