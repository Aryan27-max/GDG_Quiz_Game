import  { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface FeedbackMessageProps {
  isCorrect: boolean;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ isCorrect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-md mb-5 flex items-center shadow-md ${
        isCorrect 
          ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-l-4 border-green-500' 
          : 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-l-4 border-red-500'
      }`}
    >
      {isCorrect ? (
        <>
          <CheckCircle className="mr-3" size={24} />
          <span className="font-medium">Correct answer! Great job!</span>
        </>
      ) : (
        <>
          <AlertTriangle className="mr-3" size={24} />
          <span className="font-medium">Incorrect answer! Try to remember for next time.</span>
        </>
      )}
    </motion.div>
  );
};

export default FeedbackMessage;
 