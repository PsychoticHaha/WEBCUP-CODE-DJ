import React, { useState } from 'react';
import { Image, Mic, Send } from 'lucide-react';
import { useThought } from '@/provider/ThoughtContext';
import CardPreview from './CardPreview';
import ThoughtInput from './ThoughtInput';
import EmotionSelector from './EmotionSelector';
import SafeFormattedMessage from '../SafeFormattedMessage/SafeFormattedMessage';
import { useIntl } from 'react-intl';

const ThoughtCreator: React.FC = () => {
  const { thought, updateThought, resetThought } = useThought();
  const [isRecording, setIsRecording] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const handleGenerateCard = () => {
    // In a real app, this would generate and save the card
    alert('Carte générée avec succès !');
    resetThought();
  };

  const intl = useIntl();

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, this would stop recording and process the speech
      setTimeout(() => {
        updateThought({ 
          text: thought.text + " Ceci est un texte généré par la reconnaissance vocale." 
        });
      }, 1000);
    } else {
      setIsRecording(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateThought({ imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const canGenerateCard = thought.text.trim().length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-primary-200 mb-4">
          <SafeFormattedMessage id="write-thougts"></SafeFormattedMessage>
        </h2>
        
        <EmotionSelector />
        
        <div className="relative">
          <ThoughtInput />
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button 
                className={`p-2 rounded-full ${isRecording ? 'bg-error-500 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'} transition-all duration-300`}
                onClick={toggleRecording}
                aria-label={isRecording ? "Arrêter l'enregistrement" : "Enregistrer la voix"}
              >
                <Mic className={`h-5 w-5 ${isRecording ? 'animate-pulse' : ''}`} />
              </button>
              
              <label className="p-2 rounded-full bg-dark-700 text-gray-300 hover:bg-dark-600 cursor-pointer transition-all duration-300">
                <Image className="h-5 w-5" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
              </label>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="with-gif" 
                  className="h-4 w-4 rounded bg-dark-700 border-dark-600 text-primary-500"
                />
                <label htmlFor="with-gif" className="ml-2 text-sm text-gray-300">
                  {intl.formatMessage({ id: "with-gif" })}
                </label>
              </div>
            </div>
            
            <button
              className={`btn ${canGenerateCard ? 'btn-accent' : 'btn-secondary opacity-50 cursor-not-allowed'} flex items-center`}
              onClick={handleGenerateCard}
              disabled={!canGenerateCard}
            >
              <span>{intl.formatMessage({ id: "generate-a-card" })}</span>
              <Send className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-medium text-primary-200 mb-4">{intl.formatMessage({ id: "preview" })}</h2>
        <CardPreview />
      </div>
    </div>
  );
};

export default ThoughtCreator;