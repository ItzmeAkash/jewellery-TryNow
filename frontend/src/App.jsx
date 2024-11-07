import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Bestsellers from "./pages/Bestsellers";
import ProductDetails from "./Pages/ProductDetails";
import ProductList from "./Components/productList/productList";
import Footer from "./Components/Footer/footer";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Bestsellers />} />
          <Route path="/category/new-arrivals" element={<Bestsellers />} />
          <Route path="category/bestsellers" element={<Bestsellers />} />
          <Route path="/category/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
};

export default App;



