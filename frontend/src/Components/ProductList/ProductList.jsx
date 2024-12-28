// ProductList.js
import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../../dumb_db/product"; 
import ProductCard from "../ProductCard/ProductCard";

const ProductList = () => {
  const { category } = useParams();

  // Filter products by categorys
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="flex flex-wrap justify-center">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
