import React from 'react';
import { useCart } from '../../context/CartContext'; 
import styles from './CartDisplay.module.css';       

const CartDisplay: React.FC = () => {
  const { items, updateItemQuantity, removeItem, decrementItemQuantity } = useCart();  // Extrai as funções e o estado 'items' do contexto do carrinho de compras

  return (
    <div className={styles.cartContainer}>
      {items.length > 0 ? (  // Verifica se há itens no carrinho para exibir cada item ou uma mensagem de carrinho vazio
        items.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <span className={styles.cartTitle}>{item.title} - {item.quantity} x ${item.price.toFixed(2)}</span>
            <div className={styles.cartActions}>
              <button onClick={() => decrementItemQuantity(item.id)} className={styles.cartButton}>-</button>
              <span className={styles.cartQuantity}>{item.quantity}</span>
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className={styles.cartButton}>+</button>
              <button onClick={() => removeItem(item.id)} className={styles.cartButtonRemove}>Remover</button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.cartEmpty}>Seu carrinho esta vazio.</p>  // Mensagem exibida quando não há itens no carrinho
      )}
    </div>
  );
};

export default CartDisplay;
