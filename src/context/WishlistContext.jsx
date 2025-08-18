import { createContext, useContext } from "react";
import { AppContext } from "./AppContext";
const initialState = {
  items: [], // {id,product_id, name, image, exact_price}
};

const WishlistContext = createContext()
function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.find(item => item.id == action.payload.id))
        return state
      return { ...state, items: [...state, action.payload] }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case "SET_WISHLIST":
      return { ...state, items: action.payload };
    default: 
      return state;
  }
}
export const WishlistProvider = ({ children }) => {
  const { wishlist, setWishlist } = useContext(AppContext)
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const addToWishlist = (product) => {
    dispatch({type: 'ADD_TO_WISHLIST', payload: product})

  }
  const remove_from_wishlist = (id) => {
    dispatch({type: 'REMOVE_FROM_WISHLIST', payload: id})
  }
  
  const set_wishlist = () => {
    dispatch({type:'SET_WISHLIST', payload: wishlist})
  }






  return <WishlistContext.Provider value={{ wishlist, setWishlist }}>
    {children}
  </WishlistContext.Provider>
}

export default function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a Wishlist Provier');
  }
  return context;
}