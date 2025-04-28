import  { motion } from 'framer-motion';
import { Award, HelpCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  userProfile: UserProfile | null;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ 
  currentQuestion, 
  totalQuestions, 
  score,
  userProfile 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row justify-between items-center mb-6"
    >
      <div className="flex items-center mb-4 md:mb-0">
        {userProfile && (
          <div className="flex items-center mr-4">
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt="User avatar" 
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                {userProfile.age}
              </div>
            </div>
            <span className="ml-3 font-medium text-gray-700">{userProfile.name}</span>
          </div>
        )}
        <HelpCircle className="text-indigo-500 mr-2" size={28} />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Aryan's Quiz</h1>
      </div>
      <div className="flex space-x-4">
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 px-4 py-2 rounded-md shadow-sm">
          <span className="font-medium">Question {currentQuestion + 1}/{totalQuestions}</span>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 px-4 py-2 rounded-md flex items-center shadow-sm">
          <Award className="mr-2" size={18} />
          <span className="font-medium">Score: {score}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizHeader;
 