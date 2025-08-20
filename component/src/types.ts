// src/types/declarations.d.ts
declare module 'component/Button' {
  import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
    size?: 'small' | 'medium' | 'large';
  }

  const Button: FC<ButtonProps>;
  export default Button;
}
