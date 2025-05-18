import React, { useState } from 'react';
import { Palette, User } from 'lucide-react';
import { useThought } from '@/provider/ThoughtContext';
import { useEmotion } from '@/hooks/useEmotion';
import { useIntl } from 'react-intl';

const BACKGROUND_COLORS = [
  '#121A2C', // dark-800
  '#1A263C', // dark-700
  '#312E81', // primary-900
  '#4338CA', // primary-700
  '#7C2D12', // accent-900
  '#C2410C', // accent-700
];

const CardPreview: React.FC = () => {
  const { thought, updateThought } = useThought();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const intl = useIntl()
  const handleColorChange = (color: string) => {
    updateThought({ backgroundColor: color });
    setShowColorPicker(false);
  };

  const {getEmotion,emotion} = useEmotion(thought?.text ,true)

  useEffect(() => {
    if (thought.text) {
      getEmotion(thought.text);
    }
  }
  , [thought.text]);

  return (
    <div className="card-preview h-[450px] md:h-[480px] flex flex-col">
      <div 
        className="flex-1 p-6 flex flex-col relative transition-all duration-300"
        style={{ backgroundColor: thought.backgroundColor }}
      >
        {thought.imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden h-40 bg-dark-900">
            <img 
              src={thought.imageUrl} 
              alt="Image téléchargée" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex space-x-2 items-center mb-4">
          <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">
          {intl.formatMessage({ id: "your-emo" })}
          </span>
          {thought.emotion && (
            <span className="text-xl ml-2" role="img" aria-label="Émotion">
              {
                thought.emotion === 'happy' ? '😄' :
                thought.emotion === 'sad' ? '😢' :
                thought.emotion === 'angry' ? '😠' :
                thought.emotion === 'love' ? '😍' :
                thought.emotion === 'surprised' ? '😮' :
                thought.emotion === 'laughing' ? '🤣' : ''
              }
            </span>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {(thought.text && emotion) ? (
            <p className="text-white text-base md:text-lg whitespace-pre-wrap">
              {emotion}
            </p>
          ) : (
            <p className="text-gray-400 text-base md:text-lg italic">
              {intl.formatMessage({ id: "your-inspi" })}
            </p>
          )}
        </div>
        
        <button 
          className="absolute bottom-4 right-4 p-2 bg-dark-700 bg-opacity-50 rounded-full transition-all duration-300 hover:bg-opacity-80"
          onClick={() => setShowColorPicker(!showColorPicker)}
          aria-label="Changer la couleur de fond"
        >
          <Palette className="w-5 h-5 text-white" />
        </button>
        
        {showColorPicker && (
          <div className="absolute bottom-14 right-4 bg-dark-800 p-2 rounded-lg shadow-lg grid grid-cols-3 gap-2 z-10">
            {BACKGROUND_COLORS.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white transition-all duration-300"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                aria-label={`Couleur ${color}`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 bg-dark-700 text-center">
        <span className="text-xs text-gray-300">Généré avec CodeDj</span>
      </div>
    </div>
  );
};

export default CardPreview;
