import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './components/SwipeCard';
import SwipeContainer from './components/SwipeContainer';
import IntroSlide from './components/IntroSlide';
import ProgressBar from './components/ProgressBar';
import { getQuestions } from './api/questions';
import type { Question } from './types';

type CardItem = Question | 'Intro';

const shuffleArray = (array: Question[]): Question[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function App() {
  const [items, setItems] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions();
        const shuffled = shuffleArray(fetchedQuestions);
        setItems([...shuffled, 'Intro']);
      } catch (err) {
        setError('Failed to load questions. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection);
    setItems((prevItems) => prevItems.slice(0, prevItems.length - 1));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading questions...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }
  
  const totalQuestions = items.filter(item => typeof item !== 'string').length;
  const questionsAnswered = totalQuestions - items.filter(item => item !== 'string' && items.indexOf(item) >= items.length - 1).length;
  const currentItem = items[items.length - 1];
  const isIntro = typeof currentItem === 'string' && currentItem === 'Intro';

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
                  key={typeof item === 'string' ? item : item.id}
                  onSwipe={handleSwipe}
                  index={index}
                >
                  {isIntro ? (
                    <IntroSlide />
                  ) : (
                    <h1 className="text-2xl font-bold text-center">{(item as Question).questionText}</h1>
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
