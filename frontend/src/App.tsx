import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './components/SwipeCard';
import SwipeContainer from './components/SwipeContainer';
import IntroSlide from './components/IntroSlide';
import ProgressBar from './components/ProgressBar';

const questions = ['Question 1', 'Question 2', 'Question 3'];
const totalQuestions = questions.length;

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const initialItems = [...shuffleArray(questions), 'Intro'];

function App() {
  const [items, setItems] = useState(initialItems);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection);
    setItems((prevItems) => prevItems.slice(0, prevItems.length - 1));
  };

  const questionsAnswered = totalQuestions - items.filter(item => item !== 'Intro').length;
  const currentItem = items[items.length - 1];
  const isIntro = currentItem === 'Intro';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        {!isIntro && <ProgressBar current={questionsAnswered} total={totalQuestions} />}
        <SwipeContainer>
          <AnimatePresence custom={direction}>
            {items.map((item, index) => {
              const isTopCard = index === items.length - 1;
              if (!isTopCard) return null;
              return (
                <SwipeCard
                  key={item}
                  onSwipe={handleSwipe}
                  index={index}
                >
                  {isIntro ? (
                    <IntroSlide />
                  ) : (
                    <h1 className="text-2xl font-bold text-center">{item}</h1>
                  )}
                </SwipeCard>
              );
            })}
          </AnimatePresence>
        </SwipeContainer>
      </div>
    </div>
  );
}

export default App;
