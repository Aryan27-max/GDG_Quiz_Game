import  { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Question, UserProfile } from '../types';

interface DetailedResultsProps {
  questions: Question[];
  answers: (number | null)[];
  onRestart: () => void;
  userProfile: UserProfile | null;
}

const DetailedResults: React.FC<DetailedResultsProps> = ({ 
  questions, 
  answers, 
  onRestart,
  userProfile
}) => {
  // Calculate stats
  const correct = answers.filter((answer, index) => 
    answer !== null && answer === questions[index].correctAnswer
  ).length;
  
  const incorrect = answers.filter((answer, index) => 
    answer !== null && answer !== questions[index].correctAnswer
  ).length;
  
  const percentage = Math.round((correct / questions.length) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-indigo-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxxdWl6JTIwZWR1Y2F0aW9uJTIwa25vd2xlZGdlJTIwdGVzdCUyMGNvbG9yZnVsJTIwcGF0dGVybnxlbnwwfHx8fDE3NDU4NzczNDR8MA&ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Detailed Results</h2>
        </div>
        
        {userProfile && (
          <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
            <img 
              src={userProfile.avatar} 
              alt="User avatar" 
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
            />
            <div className="ml-3">
              <div className="font-medium text-gray-800">{userProfile.name}</div>
              <div className="text-sm text-gray-500">Age: {userProfile.age}</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-lg text-center shadow-md"
        >
          <div className="text-4xl font-bold text-indigo-600 mb-1">{percentage}%</div>
          <div className="text-sm text-gray-600">Overall Score</div>
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg text-center shadow-md"
        >
          <div className="text-4xl font-bold text-green-600 mb-1">{correct}</div>
          <div className="text-sm text-gray-600">Correct Answers</div>
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg text-center shadow-md"
        >
          <div className="text-4xl font-bold text-red-600 mb-1">{incorrect}</div>
          <div className="text-sm text-gray-600">Incorrect Answers</div>
        </motion.div>
      </div>
      
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-indigo-100 pb-2">Question Analysis</h3>
        
        {questions.map((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          const correctOption = question.options[question.correctAnswer];
          const userOption = userAnswer !== null ? question.options[userAnswer] : 'Not answered';
          
          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                userAnswer === null 
                  ? 'border-gray-200 bg-white shadow-sm' 
                  : isCorrect 
                    ? 'border-green-200 bg-gradient-to-r from-green-50 to-white shadow-md' 
                    : 'border-red-200 bg-gradient-to-r from-red-50 to-white shadow-md'
              }`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 mt-1 ${
                  userAnswer === null 
                    ? 'text-gray-400' 
                    : isCorrect 
                      ? 'text-green-500' 
                      : 'text-red-500'
                }`}>
                  {userAnswer === null ? (
                    <span className="inline-block w-6 h-6 rounded-full border-2 border-gray-400"></span>
                  ) : isCorrect ? (
                    <CheckCircle size={24} />
                  ) : (
                    <AlertTriangle size={24} />
                  )}
                </div>
                <div className="ml-3 flex-grow">
                  <h4 className="text-md font-medium text-gray-800 mb-2">
                    {index + 1}. {question.text}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <div className="text-sm">
                      <span className="text-gray-600">Your answer: </span>
                      <span className={userAnswer === null 
                        ? 'text-gray-500 italic' 
                        : isCorrect 
                          ? 'text-green-600 font-medium' 
                          : 'text-red-600 font-medium'
                      }>
                        {userOption}
                      </span>
                    </div>
                    
                    {!isCorrect && (
                      <div className="text-sm">
                        <span className="text-gray-600">Correct answer: </span>
                        <span className="text-green-600 font-medium">{correctOption}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors shadow-md"
        >
          <RefreshCw className="mr-2" size={18} />
          Restart Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DetailedResults;
 