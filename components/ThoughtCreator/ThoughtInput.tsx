import { useThought } from '@/provider/ThoughtContext';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const MAX_CHARS = 280;

const ThoughtInput: React.FC = () => {
  const { thought, updateThought } = useThought();
  const [isFocused, setIsFocused] = useState(false);
  const intl = useIntl();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value.slice(0, MAX_CHARS);
    updateThought({ text });
  };

  const remainingChars = MAX_CHARS - thought.text.length;
  const isNearLimit = remainingChars <= 20;

  return (
    <Box className={`relative rounded-lg transition-all duration-300 ${isFocused ? 'ring-primary-500' : ''}`}>
      <Box component="textarea" sx={{ padding: "10px", marginTop: "25px" }}
        className="input-dark min-h-32 shadow-inner-dark resize-none text-base md:text-lg w-full"
        placeholder={intl.formatMessage({ id: "express-yourself" })}
        value={thought.text}
        onChange={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={MAX_CHARS}
      />

      <div className={`absolute bottom-2 right-3 text-xs ${isNearLimit ? 'text-error-500' : 'text-gray-400'} transition-colors duration-300`}>
        {remainingChars}
      </div>
    </Box>
  );
};

export default ThoughtInput;