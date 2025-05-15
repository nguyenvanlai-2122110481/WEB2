import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SvgFavourite from '../../components/common/SvgFavourite';

const ProductCard = ({ id, title, description, price, discount, rating, brand, thumbnail, slug }) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const handleFavouriteClick = () => {
        setIsFavourite(!isFavourite);
        console.log(`Toggle favourite for product: ${id}, New state: ${!isFavourite}`);
        // TODO: Gọi API để lưu trạng thái yêu thích
    };

    const discountedPrice = discount ? (price * (1 - discount / 100)).toFixed(2) : null;

    return (
        <div className="group flex flex-col bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
            {/* Thumbnail */}
            <Link to={`/product/${slug}`} className="relative block">
                <img
                    className="w-full h-[280px] object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                    src={thumbnail}
                    alt={title}
                />
                {discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        -{discount}%
                    </span>
                )}
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <h3 className="text-[16px] font-semibold text-gray-800 truncate">{title}</h3>
                        {brand && (
                            <p className="text-[12px] text-gray-500 mt-1">{brand}</p>
                        )}
                    </div>
                </div>

                {/* Price and Rating */}
                <div className="mt-2 flex justify-between items-center">
                    <div>
                        {discountedPrice ? (
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-bold text-red-600">${discountedPrice}</p>
                                <p className="text-sm text-gray-500 line-through">${price}</p>
                            </div>
                        ) : (
                            <p className="text-lg font-bold text-gray-800">${price}</p>
                        )}
                    </div>
                    {rating && (
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                {/* Description (optional) */}
                {/* {description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
                )} */}
            </div>

            {/* Favourite Button */}
            <button
                onClick={handleFavouriteClick}
                className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
                    isFavourite ? 'text-red-500 bg-red-100' : 'text-gray-400 bg-white hover:bg-gray-100'
                }`}
            >
                <SvgFavourite className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ProductCard;