import React, { useState } from 'react';
import { colorSelector } from '../../components/Filters/ColorsFilter';

const ProductColors = ({ colors, onChange }) => {
  const [selectedColor, setSelectedColor] = useState('');

  const handleSelect = (color) => {
    const newColor = color === selectedColor ? '' : color;
    setSelectedColor(newColor);
    onChange && onChange(newColor);
  };

  return (
    <div className="flex pt-2">
      {colors?.map((color, index) => {
        const isSelected = selectedColor === color;
        return (
          <div
            key={index}
            onClick={() => handleSelect(color)}
            className={`rounded-[50%] w-6 h-6 mx-2 cursor-pointer border-2 transition 
              ${isSelected ? 'border-black scale-110' : 'border-gray-300'}`}
            style={{ background: colorSelector[color] }}
          ></div>
        );
      })}
    </div>
  );
};

export default ProductColors;
