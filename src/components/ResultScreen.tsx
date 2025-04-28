import  { motion } from 'framer-motion';
import { Award, RefreshCw, FileText } from 'lucide-react';
import { UserProfile } from '../types';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onShowDetails: () => void;
  userProfile: UserProfile | null;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ 
  score, 
  totalQuestions, 
  onRestart,
  onShowDetails,
  userProfile
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 70) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto text-center border border-indigo-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1517196084897-498e0abd7c2d?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxxdWl6JTIwZWR1Y2F0aW9uJTIwa25vd2xlZGdlJTIwdGVzdCUyMGNvbG9yZnVsJTIwcGF0dGVybnxlbnwwfHx8fDE3NDU4NzczNDR8MA&ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.94)'
      }}
    >
      {userProfile && (
        <div className="mb-6">
          <img 
            src={userProfile.avatar} 
            alt="User avatar" 
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 mx-auto shadow-lg"
          />
          <h3 className="mt-3 text-xl font-medium text-gray-700">{userProfile.name}</h3>
        </div>
      )}
      
      <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 mb-6 shadow-inner">
        <Award className="text-gradient-to-r from-indigo-600 to-purple-600" size={48} />
      </div>
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">Quiz Completed!</h2>
      <p className="text-gray-600 mb-6">{getMessage()}</p>
      
      <div className="mb-8">
        <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">{score}/{totalQuestions}</div>
        <div className="text-xl text-gray-600">Final Score</div>
        <div className="mt-2 text-green-600 font-medium">{percentage}% Correct</div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShowDetails}
          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 font-semibold px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors shadow-md"
        >
          <FileText className="mr-2" size={18} />
          View Detailed Results
        </motion.button>
        
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

export default ResultScreen;
 