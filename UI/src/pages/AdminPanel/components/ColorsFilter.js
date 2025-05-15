import React, { useCallback, useState } from 'react';

export const colorSelector = [
  { name: 'Purple', code: '#8434E1' },
  { name: 'Black', code: '#252525' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Gray', code: '#808080' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Red', code: '#FF0000' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Navy', code: '#000080' },
  { name: 'Grey', code: '#808080' },
  { name: 'Yellow', code: '#FFFF00' },
  { name: 'Pink', code: '#FFC0CB' },
  { name: 'Green', code: '#008000' },
];

const ColorsFilter = ({ onChange }) => {
  const [appliedColors, setAppliedColors] = useState([]);

  const onClickDiv = useCallback((item) => {
    let newColors;
    if (appliedColors.includes(item.name)) {
      newColors = appliedColors.filter(color => color !== item.name);
    } else {
      newColors = [...appliedColors, item.name];
    }
    setAppliedColors(newColors);
    onChange(newColors);
  }, [appliedColors, onChange]);

  return (
    <div className="flex flex-col mb-4">
      <p className="text-[16px] text-black mt-5 mb-5">Colors</p>
      <div className="flex flex-wrap px-2">
        {colorSelector.map((item) => (
          <div key={item.name} className="flex flex-col mr-2 items-center">
            <div
              className="w-8 h-8 border rounded-xl mr-4 cursor-pointer hover:scale-110"
              onClick={() => onClickDiv(item)}
              style={{
                background: item.code,
                border: appliedColors.includes(item.name) ? '2px solid black' : '1px solid gray'
              }}
            ></div>
            <p
              className="text-sm text-gray-400 mb-2"
              style={{ color: appliedColors.includes(item.name) ? 'black' : '' }}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorsFilter;
