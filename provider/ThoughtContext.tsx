import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Emotion = 'happy' | 'sad' | 'angry' | 'love' | 'surprised' | 'laughing' | null;

export interface ThoughtState {
  text: string;
  emotion: Emotion;
  backgroundColor: string;
  imageUrl: string | null;
}

interface ThoughtContextType {
  thought: ThoughtState;
  updateThought: (updates: Partial<ThoughtState>) => void;
  emotionText?: string;
  updateEmotionText?: (text: string) => void;
  resetThought: () => void;
}

const defaultThought: ThoughtState = {
  text: '',
  emotion: null,
  backgroundColor: '#121A2C', // dark-800
  imageUrl: null,
};

const ThoughtContext = createContext<ThoughtContextType | undefined>(undefined);

export const ThoughtProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [thought, setThought] = useState<ThoughtState>(defaultThought);
  const [emotionText, setEmotionText] = useState<string | undefined>(undefined);
  const updateThought = (updates: Partial<ThoughtState>) => {
    setThought((prev) => ({ ...prev, ...updates }));
  };

  const resetThought = () => {
    setThought(defaultThought);
  };

  return (
    <ThoughtContext.Provider value={{ thought, updateThought, resetThought, emotionText, updateEmotionText: setEmotionText }}>
      {children}
    </ThoughtContext.Provider>
  );
};

export const useThought = (): ThoughtContextType => {
  const context = useContext(ThoughtContext);
  if (context === undefined) {
    throw new Error('useThought must be used within a ThoughtProvider');
  }
  return context;
};