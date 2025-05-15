import React, { useState } from 'react';

export const colorSelector = {
  Purple: '#8434E1',
  Black: '#252525',
  White: '#FFFFFF',
  Gray: '#808080',
  Blue: '#0000FF',
  Red: '#FF0000',
  Orange: '#FFA500',
  Navy: '#000080',
  Grey: '#808080',
  Yellow: '#FFFF00',
  Pink: '#FFC0CB',
  Green: '#008000',
};

const ColorsFilter = ({ colors, onChange }) => {
  const [selectedColor, setSelectedColor] = useState('');

  const handleClick = (color) => {
    const newColor = color === selectedColor ? '' : color;
    setSelectedColor(newColor);
    onChange && onChange(newColor);
  };

  return (
    <div className="flex flex-col mb-4">
      <p className="text-[16px] text-black mt-5 mb-5">Colors</p>
      <div className="flex flex-wrap px-2">
        {colors.map((item) => {
          const isSelected = selectedColor === item;
          return (
            <div key={item} className="flex flex-col mr-2 items-center">
              <div
                onClick={() => handleClick(item)}
                className={`w-8 h-8 border rounded-xl mr-4 cursor-pointer hover:scale-110 transition
                ${isSelected ? 'ring-2 ring-black scale-110' : ''}`}
                style={{ background: colorSelector[item] }}
              ></div>
              <p className="text-sm text-gray-400 mb-2">{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorsFilter;
