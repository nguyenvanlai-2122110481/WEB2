import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SizeFilter = ({ sizes, hideTitle, onChange, multi }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleClick = (size) => {
    let updatedSizes;

    if (multi) {
      if (selectedSizes.includes(size)) {
        updatedSizes = selectedSizes.filter((s) => s !== size);
      } else {
        updatedSizes = [...selectedSizes, size];
      }
    } else {
      updatedSizes = [size];
    }

    setSelectedSizes(updatedSizes);
    onChange && onChange(updatedSizes);
  };

  return (
    <div className={`flex flex-col ${hideTitle ? '' : 'mb-4'}`}>
      {!hideTitle && <p className="text-[16px] text-black mt-5 mb-5">Size</p>}
      <div className="flex flex-wrap px-2">
        {sizes.map((size) => {
          const isSelected = selectedSizes.includes(size);
          return (
            <div key={size} className="flex flex-col mr-2">
              <div
                onClick={() => handleClick(size)}
                className={`w-[50px] border text-center mb-4 rounded-lg mr-4 cursor-pointer hover:scale-110 transition
                  ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-500'}`}
              >
                {size}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

SizeFilter.propTypes = {
  hideTitle: PropTypes.bool,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  multi: PropTypes.bool,
};

SizeFilter.defaultProps = {
  hideTitle: false,
  multi: false,
};

export default SizeFilter;
