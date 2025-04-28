import  { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile, Avatar } from '../types';
import { avatars } from '../data/avatarData';
import { Brain, User, Calendar, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onStart: (profile: UserProfile) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!age.trim()) {
      setError('Please enter your age');
      return;
    }
    
    if (!selectedAvatar) {
      setError('Please select an avatar');
      return;
    }
    
    onStart({
      name: name.trim(),
      age: age.trim(),
      avatar: selectedAvatar
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-indigo-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1455612693675-112974d4880b?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw2fHxxdWl6JTIwZWR1Y2F0aW9uJTIwa25vd2xlZGdlJTIwdGVzdCUyMGNvbG9yZnVsJTIwcGF0dGVybnxlbnwwfHx8fDE3NDU4NzczNDR8MA&ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
      }}
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white shadow-md"
          >
            <Brain size={40} />
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">Welcome to Aryan's Quiz</h1>
        <p className="text-gray-600">Let's start by getting to know you a bit!</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 text-red-700 p-3 rounded-md mb-6 shadow-sm"
          >
            {error}
          </motion.div>
        )}
        
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
          <div className="relative">
            <User className="absolute top-3 left-3 text-indigo-500" size={18} />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="age" className="block text-gray-700 font-medium mb-2">Your Age</label>
          <div className="relative">
            <Calendar className="absolute top-3 left-3 text-indigo-500" size={18} />
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              placeholder="Enter your age"
              min="1"
              max="120"
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-gray-700 font-medium mb-4">Select Your Avatar</h3>
          <div className="grid grid-cols-3 gap-4">
            {avatars.map((avatar: Avatar) => (
              <motion.div
                key={avatar.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer rounded-lg p-2 shadow-sm transition-all ${
                  selectedAvatar === avatar.url
                    ? 'ring-2 ring-indigo-500 bg-indigo-50 shadow-md'
                    : 'hover:bg-gray-50 border border-gray-100'
                }`}
                onClick={() => setSelectedAvatar(avatar.url)}
              >
                <img
                  src={avatar.url}
                  alt={avatar.alt}
                  className="w-full h-24 object-cover rounded-md mx-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-md inline-flex items-center transition-colors shadow-md"
          >
            Start Quiz
            <ChevronRight className="ml-2" size={18} />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default LandingPage;
 