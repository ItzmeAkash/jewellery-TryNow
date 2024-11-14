import React, { useState } from "react";
import { FaStar, FaShareAlt, FaHeart, FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { products } from "../dumb_db/product"; // Assuming this is the data source
import TryNow from "../Components/TryNow/TryNow";

const ProductDetails = () => {
  const [isTryNowOpen, setIsTryNowOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(null);

  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)); // Find product by ID

  if (!product) {
    return <p>Product not found</p>;
  }

  // Open TryNow popup with loading and upload functionality
  const openTryNow = async () => {
    setCategory(product.category); // Set category from the product data
    setIsLoading(true); // Show loading state

    try {
      // Fetch the tryNowImage as a blob from the dummy database
      const response = await axios.get(product.tryNowImage, { responseType: "blob" });

      // Create FormData and append the blob with the name 'image'
      const formData = new FormData();
      formData.append("file", response.data, "image.png");

      // Use the category in the URL to make it dynamic
      const uploadUrl = `http://127.0.0.1:8000/upload/${product.category}`;

      // Send the FormData to the backend with the dynamic URL
      await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Bracelet image uploaded successfully");

      // Once upload is successful, close loading and open TryNow
      setIsLoading(false);
      setIsTryNowOpen(true);
    } catch (error) {
      console.error("Error uploading bracelet image:", error);
      setIsLoading(false); // Stop loading even on error
    }
  };

  const closeTryNow = () => setIsTryNowOpen(false);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Side: Product Images */}
      <div className="w-full lg:w-2/3 grid grid-cols-2 gap-4">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={product.title}
            className="w-full h-auto object-cover rounded-md shadow"
          />
        ))}
      </div>

      {/* Right Side: Product Details */}
      <div className="w-full lg:w-1/3 p-6 flex flex-col gap-4 bg-gray-50 rounded-lg shadow-md h-full">
        <h1 className="text-2xl font-semibold text-primaryColor">{product.title}</h1>
        <p className="text-sm text-red-600">780+ views in the last 48 Hours</p>

        {/* Rating and Details */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <span className="text-yellow-500 mr-1">
              <FaStar />
            </span>
            <span className="text-gray-800">{product.rating}</span>
          </div>
          <span className="text-gray-800">{product.reviews} reviews</span>
          <button className="bg-gray-100 px-3 py-1 rounded-full text-gray-800">
            View Details
          </button>
          <button className="bg-gray-100 p-2 rounded-full">
            <FaShareAlt className="text-gray-800" />
          </button>
          <button className="bg-gray-100 p-2 rounded-full">
            <FaHeart className="text-gray-800" />
          </button>
        </div>

        {/* Price Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="text-xs bg-secondaryColor text-primaryColor px-2 py-1 rounded-full font-semibold mr-2">
              OUR PICK
            </span>
            <span className="text-2xl font-bold text-primaryColor">{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through ml-2">
                {product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 ">
            OFFER: <span className="font-semibold ">{product.discount}</span>
            <span className="ml-2 text-primaryColor underline cursor-pointer">
              Notify me
            </span>{" "}
            When Price Drops
          </p>
        </div>

        {/* Sizing and Selection */}
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Sizing & Selection</h2>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">
              Select {product.category} Size
            </span>
            <span className="text-sm text-primaryColor underline cursor-pointer">
              Find your perfect size
            </span>
          </div>
          <select className="w-full mt-2 px-3 py-2 border rounded-md text-gray-800">
            {product.sizes.map((size, index) => (
              <option key={index}>{size}</option>
            ))}
          </select>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium text-gray-800">
              Customization
            </span>
            <span className="text-sm text-primaryColor underline cursor-pointer">
              Diamond Guide
            </span>
          </div>
          <select className="w-full mt-2 px-3 py-2 border rounded-md text-gray-800">
            {product.customizations.map((custom, index) => (
              <option key={index}>{custom}</option>
            ))}
          </select>
        </div>

        {/* Virtual Try On Section */}
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Virtual Try On</h2>
            <p className="text-sm text-gray-600">Try your favorite design now from your own device.</p>
          </div>
          <button onClick={openTryNow} className="flex flex-col items-center bg-primaryColor text-white p-3 rounded-lg">
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <FaCamera className="text-2xl mb-1" />
                <span className="text-sm font-semibold">Try Now</span>
              </>
            )}
          </button>
        </div>

        {/* Popup for Virtual Try-On */}
        {isTryNowOpen && <TryNow onClose={closeTryNow} category={category} />}

        {/* Delivery or Instore Pickup Section */}
        <div className="p-4 bg-white rounded-lg shadow-md mt-4">
          <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">Delivery or Instore Pickup</h2>
          <p className="text-sm text-gray-600 text-center">Expected Delivery Date</p>
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder="Enter Pincode"
              className="w-full px-3 py-2 border rounded-md text-gray-800"
            />
            <button className="p-2 text-primaryColor">
              <FaMapMarkerAlt className="text-xl" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Free shipping by 11th Nov 2024</p>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-4 w-full bg-primaryColor hover:bg-secondaryColor text-white font-semibold py-3 rounded-md shadow-lg transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    label: PropTypes.string,
    price: PropTypes.string,
    originalPrice: PropTypes.string,
    discount: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    sizes: PropTypes.arrayOf(PropTypes.string),
    customizations: PropTypes.arrayOf(PropTypes.string),
    tryNowImage: PropTypes.string,
    category: PropTypes.string,
  }),
};

export default ProductDetails;
