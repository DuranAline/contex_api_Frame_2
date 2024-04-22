import React from 'react';
import AddToCartButton from '../../components/AddToCart/index.tsx';


const ProductDetail: React.FC = () => {
  const product = {
    id: 1,
    title: "Example Product",
    price: 19.99
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Price: ${product.price.toFixed(2)}</p>
      <AddToCartButton product={product} />
    </div>
  );
};

export default ProductDetail;
