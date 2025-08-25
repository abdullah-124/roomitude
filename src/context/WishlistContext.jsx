import { createContext, useContext, useEffect, useReducer } from "react";
import { AppContext } from "./AppContext";
import { useMessage } from "./MessageProvider";
import { request_to_api } from "../utils/request_to_api";

const initialState = {
  items: [], // {id, product, createdAt}
};

const WishlistContext = createContext();

function wishlistReducer(state, action) {
  
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload)
      };
    case "SET_WISHLIST":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export const WishlistProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { setToast } = useMessage();
  const { wishlist } = useContext(AppContext);
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Initialize state from AppContext once on mount
  useEffect(() => {
      dispatch({ type: "SET_WISHLIST", payload: wishlist });
  }, [wishlist]);

  const add_item_in_wishlist = async (product_id) => {
    const item = state.items.find(item => item.product.id === product_id);
    if (item) {
      setToast(`${item.product.name} already in the list`);
      return;
    }
    try {
      const data = await request_to_api(
        `${apiUrl}/api/wishlist/`,
        'POST',
        { product_id },
        localStorage.getItem('accessToken')
      );
      dispatch({ type: 'ADD_TO_WISHLIST', payload: data });
      setToast(`${data.product.name} has been added`, 'success');
    } catch (error) {
      setToast(error?.message || 'Something went wrong', 'error');
    }
  };

  const remove_item_from_wishlist = async (id) => {
    try {
      const data = await request_to_api(
        `${apiUrl}/api/wishlist/${id}/`,
        'DELETE',
        null,
        localStorage.getItem('accessToken')
      );
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
      setToast(data.message, 'success');
    } catch (error) {
      setToast(error?.message || 'Something went wrong', 'error');
    }
  };

  const items_count_in_wishlist = state.items.length;

  return (
    <WishlistContext.Provider
      value={{
        items_in_wishlist: state.items,
        items_count_in_wishlist,
        add_item_in_wishlist,
        remove_item_from_wishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
