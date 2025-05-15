import React, { useCallback, useState } from 'react';

export const sizeSelector = [
    { id: 'S', name: 'S' },
    { id: 'M', name: 'M' },
    { id: 'L', name: 'L' },
    { id: 'XL', name: 'XL' },
    { id: 'XXL', name: 'XXL' },
];

const SizeFilter = ({ onChange }) => {
    const [appliedSize, setAppliedSize] = useState([]);

    const onClickDiv = useCallback((item) => {
        let newSizes;
        if (appliedSize.includes(item)) {
            newSizes = appliedSize.filter(size => size !== item);
        } else {
            newSizes = [...appliedSize, item];
        }
        setAppliedSize(newSizes);
        onChange(newSizes);
    }, [appliedSize, onChange]);

    return (
        <div className="flex flex-col mb-4">
            <p className="text-[16px] text-black mt-5 mb-5">Size</p>
            <div className="flex flex-wrap px-2">
                {sizeSelector.map((item) => (
                    <div key={item.id} className="flex flex-col mr-2">
                        <div
                            className={`w-[50px] border text-center mb-4 rounded-lg mr-4 cursor-pointer hover:scale-110
                                ${appliedSize.includes(item.id) ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-500'}`}
                            onClick={() => onClickDiv(item.id)}
                        >
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SizeFilter;