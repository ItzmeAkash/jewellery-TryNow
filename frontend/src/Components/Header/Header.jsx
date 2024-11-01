import React from "react";
import Navbar from "../Navbar/Navbar";
import CategoryBar from "../categoryBar/categoryBar";
import Banner from "../Banners/Banner";

const Header = () => {
  return (
    <div>
      <Navbar />
      <CategoryBar />
      <Banner/>
    </div>
  );
};

export default Header;
