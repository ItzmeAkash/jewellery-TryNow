import React from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import storeImage from "../../assets/findStore.webp";
import deliveryImage from "../../assets/expressDelivery.png";
import referFriendImage from "../../assets/referFriend.png";

const Navbar = () => {
  return (
    <div>
      {/* Top Bar with primaryColor */}
      <div className="bg-primaryColor w-full h-7 flex items-center justify-between px-4 sm:px-10">
        {/* Left Section - Order Tracker */}
        <div className="flex items-center space-x-2">
          <i className="fas fa-truck text-white text-sm"></i>
          <span className="text-white text-sm tracking-wider">
            ORDER TRACKING
          </span>
        </div>

        {/* Right Section - Contact Us and Blog */}
        <div className="flex items-center space-x-4 sm:space-x-10">
          <a
            href="#"
            className="flex items-center space-x-1 text-white text-sm no-underline hover:no-underline"
          >
            <i className="fas fa-headset text-sm"></i>
            <span>CONTACT US</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-white text-sm no-underline hover:no-underline"
          >
            <i className="fas fa-sticky-note text-sm"></i>
            <span>BLOG</span>
          </a>
        </div>
      </div>

      {/* Main Navbar Section */}
      <div className="bg-gray-100 w-full">
        <div className="flex flex-wrap items-center justify-between mx-0 py-4">
          {/* Logo and Store Section */}
          <div className="flex items-center space-x-4 lg:space-x-8 ml-4 lg:ml-8">
            <a href="/">
              <img
                src={logo}
                alt="Logo"
                className="object-contain"
                style={{ width: "80px", height: "auto" }}
              />
            </a>

            {/* Responsive Hidden Items (Hidden on small screens) */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 group relative">
                <img
                  src={storeImage}
                  alt="storeImage"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-gray-800 text-sm uppercase mb-1">
                  Find Store
                </span>
                <span className="absolute bottom-0 -left-4 h-0.5 bg-primaryColor w-0 group-hover:w-[120%] transition-all duration-300"></span>
              </div>
              <div className="flex items-center space-x-2 group relative">
                <img
                  src={referFriendImage}
                  alt="referFriendImage"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-gray-800 text-sm uppercase mb-1">
                  Refer & Earn
                </span>
                <span className="absolute bottom-0 -left-4 h-0.5 bg-primaryColor w-0 group-hover:w-[120%] transition-all duration-300"></span>
              </div>
              <div className="flex items-center space-x-2 group relative">
                <img
                  src={deliveryImage}
                  alt="deliveryImage"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-gray-800 text-sm uppercase mb-1">
                  Readily Available
                </span>
                <span className="absolute bottom-0 -left-4 h-0.5 bg-primaryColor w-0 group-hover:w-[120%] transition-all duration-300"></span>
              </div>
            </div>

            {/* Search Box (Full-width on small screens) */}
            <div className="flex items-center w-full lg:w-[400px] mt-4 lg:mt-0">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-l px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
              <div className="bg-primaryColor h-11 flex items-center justify-center px-4 rounded-r">
                <FaSearch className="text-white" />
              </div>
            </div>
          </div>

          {/* Right Section - Account, Wishlist, Cart Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-12 mt-4 lg:mt-0 mr-4 lg:mr-8">
            {/* Location Icon and Pincode Text */}
            <div className="flex items-center">
              <FaLocationDot className="w-5 h-5 text-[#7C0B3B]" />
              <span className="text-gray-800 text-sm uppercase pl-2">
                Pincode
              </span>
            </div>

            {/* Profile Icon */}
            <div className="flex items-center justify-center">
              <FaUser className="text-gray-700 w-5 h-5" />
            </div>

            {/* Wishlist Icon with Count */}
            <div className="relative flex items-center justify-center">
              <FaHeart className="text-gray-700 w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-primaryColor text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                0
              </span>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center justify-center">
              <FaShoppingCart className="text-gray-700 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
