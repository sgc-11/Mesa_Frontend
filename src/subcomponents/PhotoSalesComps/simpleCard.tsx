import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export { Card, CardContent };