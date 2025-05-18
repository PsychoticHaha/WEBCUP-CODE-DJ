import { Emotion, useThought } from '@/provider/ThoughtContext';
import { Box } from '@mui/material';
import React from 'react';
import GlobalContainer from '../GlobalContainer/GlobalContainer';

interface EmotionOption {
  type: Emotion;
  emoji: string;
  label: string;
}

const emotions: EmotionOption[] = [
  { type: 'happy', emoji: '😄', label: 'Heureux' },
  { type: 'sad', emoji: '😢', label: 'Triste' },
  { type: 'angry', emoji: '😠', label: 'En colère' },
  { type: 'love', emoji: '😍', label: 'Amoureux' },
  { type: 'surprised', emoji: '😮', label: 'Surpris' },
  { type: 'laughing', emoji: '🤣', label: 'Rire' },
];

const EmotionSelector: React.FC = () => {
  const { thought, updateThought } = useThought();

  const handleEmotionSelect = (emotion: Emotion) => {
    updateThought({ emotion });
  };

  return (
    <GlobalContainer className="flex justify-between items-center space-x-2 md:space-x-4 py-2">
      {emotions.map((emotion) => (
        <button
          key={emotion.type}
          className={`emoji-btn group relative ${thought.emotion === emotion.type ? 'scale-125' : ''}`}
          onClick={() => handleEmotionSelect(emotion.type)}
          aria-label={emotion.label}
        >
          <Box component="span" className="block transform transition-transform duration-300 group-hover:scale-110" sx={{ fontSize: "25px", cursor: "pointer" }}>
            {emotion.emoji}
          </Box>
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-dark-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {emotion.label}
          </span>
        </button>
      ))}
    </GlobalContainer>
  );
};

export default EmotionSelector;