import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondaryColor py-10 text-gray-700">
      <div className="container mx-auto px-4">
        {/* Subscription Section */}
        <div className="flex justify-center mb-8">
          <form className="flex space-x-3">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
              type="text"
              placeholder="Your mobile number"
              className="p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primaryColor text-white px-5 py-2 rounded-md hover:bg-primaryColor"
            >
              Subscribe Now
            </button>
          </form>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3 relative">
              ABOUT US
              <div className="absolute bottom-0 left-0 w-20 border-b-2 border-black"></div>
            </h3>
            <ul>
              <li>About Our Company</li>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>FAQ</li>
              <li>Offers T&Cs</li>
              <li>Customer Reviews</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 relative">
              WHY CANDERE?
              <div className="absolute bottom-0 left-0 w-24 border-b-2 border-black"></div>
            </h3>
            <ul>
              <li>15-Day Returns</li>
              <li>Cancel & Refund</li>
              <li>Lifetime Exchange</li>
              <li>DGRP</li>
              <li>Certified Jewellery</li>
              <li>Candere Wallet</li>
              <li>Jewellery Insurance</li>
              <li>Liquiloans</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 relative ">
              EXPERIENCE CANDERE
              <div className="absolute bottom-0 left-0 w-20 border-b-2 border-black"></div>
            </h3>
            <ul>
              <li>Refer And Earn</li>
              <li>DigiGold</li>
              <li>Lookbook</li>
              <li>Stylery Blog</li>
              <li>Video Gallery</li>
              <li>Order Tracking</li>
              <li>Virtual Try On</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 relative">
              JEWELLERY GUIDES
              <div className="absolute bottom-0 left-0 w-20 border-b-2 border-black"></div>{" "}
            </h3>
            <ul>
              <li>Diamond Education</li>
              <li>Gemstone Education</li>
              <li>Metal Education</li>
              <li>Size Guide</li>
              <li>Gold Rate Guide</li>
              <li>Jewellery Care</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 relative  ">
              CONTACT US
              <div className="absolute bottom-0 left-0 w-20 border-b-2 border-black"></div>
            </h3>
            <ul>
              <li>India +91 22 61066262</li>
              <li>(9am-9pm, 7 days a week)</li>
              <li>support@Coar.com</li>
              <li>Find Experience Centre</li>
              <li>Coar Store Locator</li>
              <li>Coar Jewellers Website</li>
              <li>Coar Stores</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Payment Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center border-t border-primaryColor pt-6">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2024 Coar.com . ALL RIGHTS RESERVED. SITE MAP
          </p>
          <div className="flex space-x-4">
            {/* Replace # with the actual links to each social media */}
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
