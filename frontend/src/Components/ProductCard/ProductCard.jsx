import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="no-underline text-inherit">
      <div className="border rounded-lg p-4 m-4 w-64 shadow-sm hover:shadow-md">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          {product.label && (
            <span className="absolute top-2 left-2 bg-pink-200 text-pink-800 font-bold px-2 py-1 rounded-lg text-xs">
              {product.label}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add favorite functionality here
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          >
             <FaHeart />
          </button>
        </div>
        <div className="p-2">
          <h3 className="text-gray-700 text-lg font-semibold">{product.title}</h3>
          <div className="flex items-center space-x-2 text-sm mt-1">
            <span className="text-primaryColor font-semibold">{product.price}</span>
            <span className="text-gray-400 line-through">{product.originalPrice}</span>
          </div>
          {product.discount && (
            <p className="text-primaryColor text-xs mt-1">{product.discount}</p>
          )}
          <div className="flex items-center space-x-1 text-yellow-500 text-sm mt-1">
            <span>{product.rating} ★</span>
            <span className="text-gray-400">({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
