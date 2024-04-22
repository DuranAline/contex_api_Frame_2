import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebaseConnection';
import { collection, doc, setDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { useUser } from './UserContext';

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
}

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useUser();

  // Monitora as mudanças no carrinho do usuário no banco de dados em tempo real
  useEffect(() => {
    if (user) {
      const cartRef = doc(db, "carts", user.email);
      const unsubscribe = onSnapshot(cartRef, (doc) => {
        if (doc.exists()) {
          const cartData = doc.data();
          setItems(cartData.items);
        } else {
          setItems([]);
        }
      });

      // Desinscreve-se da escuta ao desmontar o componente para evitar vazamentos de memória
      return () => unsubscribe();
    }
  }, [user]);

  // Função para salvar os itens do carrinho no banco de dados
  const saveCartItems = async () => {
    if (user) {
      const cartDoc = doc(db, "carts", user.email);
      await setDoc(cartDoc, { items }, { merge: true });
    }
  };

  // Adiciona um item ao carrinho ou incrementa sua quantidade
  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === newItem.id);
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += newItem.quantity;
        saveCartItems();
        return updatedItems;
      }
      const newItems = [...prevItems, newItem];
      saveCartItems();
      return newItems;
    });
  };

  // Remove um item do carrinho
  const removeItem = (itemId: number) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      saveCartItems();
      return updatedItems;
    });
  };

  // Atualiza a quantidade de um item específico no carrinho
  const updateItemQuantity = (itemId: number, quantity: number) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => item.id === itemId ? {...item, quantity: quantity} : item);
      saveCartItems();
      return updatedItems;
    });
  };

  // Decrementa a quantidade de um item no carrinho, mas mantém ao menos um
  const decrementItemQuantity = (itemId: number) => {
    setItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === itemId);
      if (itemIndex > -1 && prevItems[itemIndex].quantity > 1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity -= 1;
        saveCartItems();
        return updatedItems;
      }
      return prevItems;
    });
  };

  // Limpa todos os itens do carrinho
  const clearCart = () => {
    setItems([]);  
    saveCartItems();
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItemQuantity, decrementItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
