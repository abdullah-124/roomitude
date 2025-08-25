import React, { createContext, useContext, useReducer, useEffect, useState, useRef } from 'react';
import { debounce } from '../utils/debounce';
import { useMessage } from './MessageProvider';
import cartReducer from './cartReducer';
import { AppContext } from './AppContext';

const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { setCarts, carts, user } = useContext(AppContext)
  const latestQuantities = useRef(new Map());
  const { setToast } = useMessage()
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: false
  });

  const isLoggedIn = user || null;
  // FIXED: Save to localStorage whenever items change (for non-logged users)
  useEffect(() => {
    if (!isLoggedIn && state.items.length > 0) {
      // console.log('Saving to localStorage:', state.items);
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, isLoggedIn]);
  // Load cart on mount
  useEffect(() => {
    // console.log('Cart Provider', carts)
    mergeGuestCart()
    loadCart();
  }, [isLoggedIn, carts]);

  const loadCart = async () => {
    if (isLoggedIn) {
      // console.log('this is carts', carts)
      dispatch({ type: 'SET_CART', payload: carts });
    } else {
      loadLocalCart();
    }
  };

  const loadLocalCart = () => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    dispatch({ type: 'SET_CART', payload: localCart });
  };

  // Debounced API update for logged-in users
  const debouncedApiUpdate = async (itemId, quantity) => {
    if (!isLoggedIn) return;
    if (quantity <= 0) return;
    try {
      const res = await fetch(`${apiUrl}/api/cart/${itemId}/update_quantity/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ quantity })
      });
      const data = await res.json()
      // console.log(data)
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    // console.log('Adding to cart:', product, quantity);
    dispatch({ type: 'SET_LOADING', payload: true });
    if (isLoggedIn) {
      try {
        const res = await fetch(`${apiUrl}/api/cart/add_item/`, {
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
        const data = await res.json();
        dispatch({ type: 'ADD_ITEM', payload: data });
        const msg = `${data?.name} has been added to cart`;
        setToast(msg, 'success', 5000);
      } catch (error) {
        console.error('Failed to add to cart:', error);
        setToast('Failed to add item to cart', 'error', 3000);
      }
    } else {
      const newItem = {
        id: Date.now() + Math.random(),
        product_id: product.id,
        quantity,
        name: product.name,
        exact_price: product.exact_price,
        image: product.image
      };
      dispatch({ type: 'ADD_ITEM', payload: newItem });
      setToast(`${product.name} has been added to cart`, 'success', 3000);
    }

    dispatch({ type: 'SET_LOADING', payload: false });
  };


  const reset_cart_state = () => {
    // console.log('after logout reset cart state')
    dispatch({ type: 'RESET_CART_STATE' })
  }
  //  UPDATE QUANTITY
  const updateQuantity = (itemId, quantity) => {
    console.log('action fired', itemId, quantity)
    if (quantity <= 0) return
    // Immediate UI update
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });

    if (isLoggedIn) {
      debouncedApiUpdate(itemId, quantity)


    } else {
      // Update local state for guest users
      const updated_items = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      dispatch({ type: 'SET_CART_ITEMS', payload: updated_items });

    }
  };

  // REMOVE ITEM FROM CART MENU WITH CART ITEM ID 
  const removeFromCart = async (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });

    if (isLoggedIn) {
      try {
        const res = await fetch(`${apiUrl}/api/cart/${itemId}/remove_cart_item/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const data = await res.json()
        console.log(data)
        setToast('REMOVED FROM CART', 'error', 1000)
      } catch (error) {
        console.error('Failed to remove item:', error);
      }
    } else {
      const updatedItems = state.items.filter(item => item.id !== itemId);
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
    // console.log('this is guest cart')
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length <= 0 || !isLoggedIn) return;

    const guest_cart = cart.map(item => ({
      'product_id': item.product_id,
      'quantity': item?.quantity || 1
    }))
    try {
      const res = await fetch(`${apiUrl}/api/cart/merge/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ items: guest_cart })
      })
      const data = await res.json()
      dispatch({ type: 'SET_CART', payload: data.items });
      setCarts(data.items)
      setToast(data.message)
      localStorage.removeItem('cart')
    }
    catch (error) {
      console.log(error)
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
      loadCart,
      reset_cart_state
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