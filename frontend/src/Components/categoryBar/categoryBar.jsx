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
    { name: "Bangles & Bracelets", path: "/bracelets" },
    { name: "Solitaires", path: "/solitaires" },
    { name: "Mangalsutras & Pendants", path: "/mangalsutras-pendants" },
    { name: "Other Jewellery", path: "/other-jewellery" },
    { name: "Gifts", path: "/gifts" },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    navigate(`/category${category.path}`);
  };

  return (
    <div className="bg-white w-full py-3 flex flex-wrap justify-center gap-2 md:space-x-4">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(category)}
          className={`text-xs md:text-sm uppercase px-3 py-1 transition-colors duration-300 ${
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
