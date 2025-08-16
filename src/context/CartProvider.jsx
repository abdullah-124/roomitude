import React, { createContext, useContext, useReducer, useEffect, useState, useRef } from 'react';
import { debounce } from '../utils/debounce';
import { useMessage } from './MessageProvider';


const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };
    
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product === action.payload.product
              ? { ...item}
              : item
          )
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const hold = useRef([])
  const latestQuantities = useRef(new Map());
  const {setToast} = useMessage()
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    loading: false 
  });
  
  const isLoggedIn = !!localStorage.getItem('accessToken');

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, [isLoggedIn]);

  const loadCart = async () => {
    if (isLoggedIn) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/cart/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const data = await response.json();
        dispatch({ type: 'SET_CART', payload: data });
      } catch (error) {
        console.error('Failed to load cart:', error);
        loadLocalCart();
      }
    } else {
      loadLocalCart();
    }
  };

  const loadLocalCart = () => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    dispatch({ type: 'SET_CART', payload: localCart });
  };

  const saveToLocal = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  // Debounced API update for logged-in users
  const debouncedApiUpdate = debounce(async (itemId, quantity) => {
    if (!isLoggedIn) return;
    if(quantity<=0) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/cart/${itemId}/update_quantity/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ quantity })
      });
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  }, 3000);

  const addToCart = async (product, quantity = 1) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Optimistic update
    // const product = {id,name,image, exact_price, discount, is_featured}
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { 
        product_id: product.id, 
        quantity, 
        name: product.name,
        exact_price: product.exact_price,
        image: product.image
      } 
    });

    if (isLoggedIn) {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/cart/add_item/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({
            product_id: product.id,
            quantity
          })
        });
        const data = await res.json()
        // console.log(data);
        const msg = `${data?.name} has added to cart`
        setToast(msg, 'success', 5000)
        
      } 
      catch (error) {
        console.error('Failed to add to cart:', error);
        // Fallback to localStorage
        const updatedItems = [...state.items];
        saveToLocal(updatedItems);
      }
    } else {
      saveToLocal(state.items);
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const updateQuantity = (itemId, quantity) => {
    if(quantity <=0) return 
    // Immediate UI update
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    
    if (isLoggedIn) {
      if(hold.current.includes(itemId)){
        latestQuantities.current.set(itemId, quantity)
        return
      }
      else{
        hold.current.push(itemId)
        latestQuantities.current.set(itemId, quantity)
        setTimeout(() => {
          const latestQ = latestQuantities.current.get(itemId)
          debouncedApiUpdate(itemId, latestQ);
          hold.current.pop(itemId)
          latestQuantities.current.delete(itemId)
        }, 5000);
      }
      
    } else {
      const updatedItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveToLocal(updatedItems);
    }
  };

  // REMOVE ITEM FROM CART MENU WITH CART ITEM ID 
  const removeFromCart = async (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });

    if (isLoggedIn) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/cart/${itemId}/remove_cart_item/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        console.log(res)
        setToast('REMOVED FROM CART','error', 2000)
      } catch (error) {
        console.error('Failed to remove item:', error);
      }
    } else {
      const updatedItems = state.items.filter(item => item.id !== itemId);
      saveToLocal(updatedItems);
    }
  };

  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' });

    if (isLoggedIn) {
      try {
        await fetch('/api/cart/clear_cart/', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
          }
        });
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    } else {
      localStorage.removeItem('cart');
    }
  };

  const mergeGuestCart = async () => {
    const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (guestCart.length > 0) {
      try {
        await fetch('/api/cart/merge/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
          },
          body: JSON.stringify({ items: guestCart })
        });
        localStorage.removeItem('cart');
        loadCart(); // Reload cart from server
      } catch (error) {
        console.error('Failed to merge cart:', error);
      }
    }
  };

  const cartCount = state.items.length || 0;
  const cartTotal = Number(
  state.items.reduce((total, item) => 
    total + (item.exact_price * item.quantity), 
    0
  ).toFixed(2)
);

  return (
    <CartContext.Provider value={{
      ...state,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      mergeGuestCart,
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};