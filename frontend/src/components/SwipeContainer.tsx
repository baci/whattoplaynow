import React from 'react';

interface SwipeContainerProps {
  children: React.ReactNode;
}

const SwipeContainer: React.FC<SwipeContainerProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-sm h-96 mx-auto my-10">
      {children}
    </div>
  );
};

export default SwipeContainer; 