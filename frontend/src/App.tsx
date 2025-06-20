import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './components/SwipeCard';
import SwipeContainer from './components/SwipeContainer';
import IntroSlide from './components/IntroSlide';
import ProgressBar from './components/ProgressBar';
import Spinner from './components/Spinner';
import RecommendationCarousel from './components/RecommendationCarousel';
import { getQuestions } from './api/questions';
import { getRecommendations } from './api/recommendations';
import type { Question, UserAnswer, Recommendation } from './types';

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
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions();
        setAllQuestions(fetchedQuestions);
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
    const currentItem = items[items.length - 1];
    if (typeof currentItem !== 'string') {
      const answer: UserAnswer = {
        questionId: currentItem.id,
        answer: swipeDirection === 'right' ? 'positive' : 'negative',
      };
      const newAnswers = [...userAnswers, answer];
      setUserAnswers(newAnswers);

      // If that was the last question, fetch recommendations
      if (items.length === 1) {
        fetchRecommendations(newAnswers);
      }
    }

    setDirection(swipeDirection);
    setItems((prevItems) => prevItems.slice(0, prevItems.length - 1));
  };

  const fetchRecommendations = async (answers: UserAnswer[]) => {
    setIsFetchingRecommendations(true);
    try {
      console.log('Fetching recommendations with answers:', answers);
      const fetchedRecommendations = await getRecommendations(answers);
      console.log('Fetched recommendations:', fetchedRecommendations);
      setRecommendations(fetchedRecommendations);
    } catch (err) {
      setError('Failed to get recommendations.');
      console.error(err);
    } finally {
      setIsFetchingRecommendations(false);
    }
  };

  const handleRestart = () => {
    setRecommendations([]);
    setUserAnswers([]);
    setError(null);
    setDirection(null);
    const shuffled = shuffleArray(allQuestions);
    setItems([...shuffled, 'Intro']);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading questions...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (isFetchingRecommendations) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Spinner />
        <p className="mt-4 text-lg">Finding your next favorite game...</p>
      </div>
    );
  }

  if (recommendations.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Here are your recommendations!</h1>
        <RecommendationCarousel recommendations={recommendations} />
        <button
          onClick={handleRestart}
          className="mt-8 bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }
  
  const totalQuestions = allQuestions.length;
  const remainingQuestions = items.filter(item => typeof item !== 'string').length;
  const questionsAnswered = totalQuestions - remainingQuestions;
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
