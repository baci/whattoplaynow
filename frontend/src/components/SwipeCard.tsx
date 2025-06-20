import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

interface SwipeCardProps {
  children: React.ReactNode;
  onSwipe: (direction: 'left' | 'right') => void;
  index: number;
}

const cardVariants = {
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'right' ? 200 : -200,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

const SwipeCard: React.FC<SwipeCardProps> = ({ children, onSwipe, index }) => {
  const x = useMotionValue(0);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  const rotate = useTransform(x, [-200, 200], [-30, 30]);

  return (
    <motion.div
      className="absolute h-full w-full rounded-lg border-2 border-gray-200 bg-white shadow-md p-4 cursor-grab"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      variants={cardVariants}
      exit="exit"
      animate={{ scale: 1 - index * 0.05, y: index * 10 }}
    >
      {children}
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-lg text-4xl font-bold text-green-500 opacity-0"
        style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
      >
        Yes
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-lg text-4xl font-bold text-red-500 opacity-0"
        style={{ opacity: useTransform(x, [0, -100], [0, 1]) }}
      >
        No
      </motion.div>
    </motion.div>
  );
};

export default SwipeCard; 