import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Question, QuizState, UserProfile } from '../types';
import ProgressBar from './ProgressBar';
import QuizOption from './QuizOption';
import FeedbackMessage from './FeedbackMessage';
import QuizHeader from './QuizHeader';
import ResultScreen from './ResultScreen';
import DetailedResults from './DetailedResults';
import LandingPage from './LandingPage';
import { ChevronRight } from 'lucide-react';

interface QuizContainerProps {
  questions: Question[];
}

const QuizContainer: React.FC<QuizContainerProps> = ({ questions }) => {
  const [confetti, setConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedOption: null,
    showResult: false,
    isAnswered: false,
    isCorrect: null,
    answers: Array(questions.length).fill(null),
    showLanding: true,
    showDetailedResults: false
  });
  
  const currentQuestion = questions[state.currentQuestionIndex];
  
  const handleOptionSelect = (index: number) => {
    if (state.isAnswered) return;
    
    setState(prev => ({
      ...prev,
      selectedOption: index,
    }));
  };
  
  const handleNextQuestion = () => {
    if (state.selectedOption === null) return;
    
    const isCorrect = state.selectedOption === currentQuestion.correctAnswer;
    
    // Update answers array with the selected option
    const updatedAnswers = [...state.answers];
    updatedAnswers[state.currentQuestionIndex] = state.selectedOption;
    
    setState(prev => ({
      ...prev,
      isAnswered: true,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: updatedAnswers
    }));
    
    // Show confetti for correct answers - ENHANCED
    if (isCorrect) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 4000); // Increased duration
    }
    
    setTimeout(() => {
      if (state.currentQuestionIndex < questions.length - 1) {
        setState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedOption: null,
          isAnswered: false,
          isCorrect: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          showResult: true,
        }));
      }
    }, 1500);
  };
  
  const handleRestart = () => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      selectedOption: null,
      showResult: false,
      isAnswered: false,
      isCorrect: null,
      answers: Array(questions.length).fill(null),
      showLanding: false,
      showDetailedResults: false
    });
  };
  
  const handleStartQuiz = (profile: UserProfile) => {
    setUserProfile(profile);
    setState(prev => ({ ...prev, showLanding: false }));
  };
  
  const handleShowDetailedResults = () => {
    setState(prev => ({ 
      ...prev, 
      showResult: false,
      showDetailedResults: true 
    }));
  };
  
  // Landing page
  if (state.showLanding) {
    return <LandingPage onStart={handleStartQuiz} />;
  }
  
  // Results page
  if (state.showResult) {
    return (
      <ResultScreen 
        score={state.score} 
        totalQuestions={questions.length} 
        onRestart={handleRestart}
        onShowDetails={handleShowDetailedResults}
        userProfile={userProfile}
      />
    );
  }
  
  // Detailed results page
  if (state.showDetailedResults) {
    return (
      <DetailedResults
        questions={questions}
        answers={state.answers}
        onRestart={handleRestart}
        userProfile={userProfile}
      />
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      {confetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500} // Increased from 200 to 500
          gravity={0.15} // Reduced gravity for slower falling
          colors={['#4F46E5', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6']} // More vibrant colors
          tweenDuration={5000} // Longer animation
        />
      )}
      
      <QuizHeader 
        currentQuestion={state.currentQuestionIndex} 
        totalQuestions={questions.length}
        score={state.score}
        userProfile={userProfile}
      />
      
      <ProgressBar 
        currentQuestion={state.currentQuestionIndex + 1} 
        totalQuestions={questions.length} 
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentQuestionIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-indigo-100"
        >
          {state.isCorrect !== null && (
            <FeedbackMessage isCorrect={state.isCorrect} />
          )}
          
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.text}
          </h2>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                selected={state.selectedOption === index}
                isAnswered={state.isAnswered}
                isCorrect={state.isCorrect === true}
                correctAnswerIndex={currentQuestion.correctAnswer}
                onClick={() => handleOptionSelect(index)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextQuestion}
          disabled={state.selectedOption === null || state.isAnswered}
          className={`px-6 py-3 rounded-md font-semibold flex items-center shadow-md ${
            state.selectedOption === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
          } ${state.isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next Question
          <ChevronRight className="ml-2" size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default QuizContainer;
 