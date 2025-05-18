import { useThought } from '@/provider/ThoughtContext';
import React, { useState } from 'react';

const MAX_CHARS = 280;

const ThoughtInput: React.FC = () => {
  const { thought, updateThought } = useThought();
  const [isFocused, setIsFocused] = useState(false);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value.slice(0, MAX_CHARS);
    updateThought({ text });
  };

  const remainingChars = MAX_CHARS - thought.text.length;
  const isNearLimit = remainingChars <= 20;
  
  return (
    <div className={`relative rounded-lg transition-all duration-300 ${isFocused ? 'ring-2 ring-primary-500' : ''}`}>
      <textarea
        className="input-dark min-h-32 shadow-inner-dark resize-none text-base md:text-lg"
        placeholder="Exprimez-vous......"
        value={thought.text}
        onChange={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={MAX_CHARS}
      />
      
      <div className={`absolute bottom-2 right-3 text-xs ${isNearLimit ? 'text-error-500' : 'text-gray-400'} transition-colors duration-300`}>
        {remainingChars}
      </div>
    </div>
  );
};

export default ThoughtInput;