import React from 'react';

const IntroSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      <p className="mb-2">Find your next favorite game.</p>
      <p>Swipe right for 'Yes', or left for 'No'.</p>
    </div>
  );
};

export default IntroSlide; 