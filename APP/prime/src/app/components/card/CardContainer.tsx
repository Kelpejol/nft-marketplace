'use client'
import React from 'react';

interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14 py-8">
      {children}
    </div>
  );
};

export default CardContainer;