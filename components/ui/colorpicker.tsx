import React from 'react';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  colors, 
  selectedColor, 
  onChange, 
  onClose 
}) => {
  return (
    <div className="absolute bottom-14 right-4 bg-dark-800 p-3 rounded-lg shadow-lg z-10">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full transition-all duration-300 ${
              selectedColor === color ? 'ring-2 ring-white' : 'hover:ring-1 hover:ring-gray-300'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={`Sélectionner couleur ${color}`}
          />
        ))}
      </div>
      <button 
        className="w-full text-xs text-center text-gray-300 hover:text-white mt-2"
        onClick={onClose}
      >
        Fermer
      </button>
    </div>
  );
};

export default ColorPicker;