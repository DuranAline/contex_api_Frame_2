import React from 'react';
import { useCart } from '../../context/CartContext';
import { CartButton } from "../style-componentns/card/style";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface Props {
  product: Product;
}

const AddToCartButton: React.FC<Props> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1  // Define a quantidade inicial como 1
    });
  };

  return <CartButton onClick={handleAddToCart}>Adicionar</CartButton>;
};

export default AddToCartButton;
