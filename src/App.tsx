import  { motion } from 'framer-motion';
import QuizContainer from './components/QuizContainer';
import { questions } from './data/quizData';
import { Brain } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background pattern elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-100 opacity-50"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-indigo-100 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-100 opacity-50"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white shadow-lg"
            >
              <Brain size={40} />
            </motion.div>
          </div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">Aryan's Quiz</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with these 10 challenging questions!
          </p>
        </header>
        
        <QuizContainer questions={questions} />
      </motion.div>
    </div>
  );
}

export default App;
 