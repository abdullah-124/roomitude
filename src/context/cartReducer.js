

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return { ...state, items: action.payload };
        case 'RESET_CART_STATE':
            return {
                items: [],
                loading: false
            }
        case 'ADD_ITEM':
            const existingItemIndex = state.items.findIndex(
                item => item.product_id === action.payload.product_id
            );

            let newItems;
            if (existingItemIndex > -1) {
                // Update existing item
                newItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item with unique ID
                const newItem = {
                    ...action.payload,
                    id: action.payload.id || Date.now() + Math.random() // Ensure unique ID
                };
                newItems = [...state.items, newItem];
            }

            return { ...state, items: newItems };


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

export default cartReducer