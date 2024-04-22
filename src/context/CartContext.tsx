import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  decrementItemQuantity: (itemId: number) => void;
  clearCart: () => void;
  cartQuantity: number; // Nova propriedade para a quantidade total no carrinho
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

export const CartProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === newItem.id);
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      return [...prevItems, newItem];
    });
  };

  const removeItem = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: number, quantity: number) => {
    setItems(prevItems => prevItems.map(item => item.id === itemId ? {...item, quantity: quantity} : item));
  };

  const decrementItemQuantity = (itemId: number) => {
    setItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === itemId);
      if (itemIndex > -1 && prevItems[itemIndex].quantity > 1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity -= 1;
        return updatedItems;
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setItems([]);  // Limpa todos os itens do carrinho
  };

  const cartQuantity = items.reduce((sum, item) => sum + item.quantity, 0); // Calcula a quantidade total

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItemQuantity, decrementItemQuantity, clearCart, cartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};