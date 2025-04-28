import  { motion } from 'framer-motion';

interface QuizOptionProps {
  option: string;
  index: number;
  selected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  correctAnswerIndex: number;
  onClick: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  index,
  selected,
  isAnswered,
  isCorrect,
  correctAnswerIndex,
  onClick
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  
  const getBgColor = () => {
    if (!isAnswered) return selected ? 'bg-indigo-100' : 'bg-white';
    if (index === correctAnswerIndex) return 'bg-green-100';
    if (selected) return 'bg-red-100';
    return 'bg-white';
  };
  
  const getBorderColor = () => {
    if (!isAnswered) return selected ? 'border-indigo-500' : 'border-gray-200';
    if (index === correctAnswerIndex) return 'border-green-500';
    if (selected) return 'border-red-500';
    return 'border-gray-200';
  };

  const getShadow = () => {
    if (!isAnswered) return selected ? 'shadow-md' : 'shadow-sm';
    if (index === correctAnswerIndex) return 'shadow-md';
    if (selected) return 'shadow-md';
    return 'shadow-sm';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex items-center p-4 mb-3 rounded-lg border ${getBgColor()} ${getBorderColor()} ${getShadow()} cursor-pointer transition-all duration-200`}
      onClick={!isAnswered ? onClick : undefined}
      whileHover={!isAnswered ? { scale: 1.02, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' } : {}}
    >
      <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
        selected 
          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
          : 'bg-gray-100 text-gray-600'
      }`}>
        {letters[index]}
      </div>
      <span className="text-gray-800 font-medium">{option}</span>
    </motion.div>
  );
};

export default QuizOption;
 