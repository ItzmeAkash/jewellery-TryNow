import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const navigate = useNavigate();
  
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: "Bestsellers", path: "/bestsellers" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Rings", path: "/rings" },
    { name: "Earrings", path: "/earrings" },
    { name: "Necklace", path: "/necklace" },
    { name: "Bangles & Bracelets", path: "/bangles-bracelets" },
    { name: "Solitaires", path: "/solitaires" },
    { name: "Mangalsutras & Pendants", path: "/mangalsutras-pendants" },
    { name: "Other Jewellery", path: "/other-jewellery" },
    { name: "Gifts", path: "/gifts" },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name); // Update selected category
    navigate(category.path);
  };

  return (
    <div className="bg-white-100 w-full py-3 flex justify-center space-x-4">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(category)}
          className={`text-sm uppercase px-2 py-1 transition-colors duration-300 ${
            selectedCategory === category.name
              ? 'text-primaryColor' // Selected category color
              : 'text-gray-700 hover:text-primaryColor'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
