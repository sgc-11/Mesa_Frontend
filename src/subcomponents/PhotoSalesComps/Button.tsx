import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'icon';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default',
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-md transition-colors duration-200';
  const variantClasses = {
    default: 'bg-pink-500 text-white hover:bg-pink-600',
    outline: 'bg-white text-pink-500 border border-pink-500 hover:bg-pink-50',
  };
  const sizeClasses = {
    default: 'px-4 py-2',
    sm: 'px-2 py-1 text-sm',
    icon: 'p-2',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };