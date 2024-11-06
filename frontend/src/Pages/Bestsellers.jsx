import React from 'react';
import { products } from "../dumb_db/product"; 
import ProductCard from "../Components/ProductCard/ProductCard";

const Bestsellers = () => {
  return (
<div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Bestsellers;
