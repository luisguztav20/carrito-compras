import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = JSON.parse(window.localStorage.getItem('cart')) || [];

export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;

    switch (actionType){
        case 'ADD_TO_CART': {
            const { id } = actionPayload;
            const productInCartIndex = state.findIndex( item => item.id === id);

            if (productInCartIndex >= 0) {
            
                const newState = structuredClone(state);//hace copias profundas de los arrays y de los objetos
               
                newState[productInCartIndex].quantity += 1;
                updateLocalStorage(newState);
                return newState;
            }

            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }  
            ]
            updateLocalStorage(newState);
            return newState;
        }

        case 'REMOVE_FROM_CART':{
            const { id } = actionPayload;
            const newState = state.filter(item => item.id != id);
            updateLocalStorage(newState);
            return newState;
        }

        case 'CLEAR_CART': {
            const newState = [];
            updateLocalStorage(newState);
            return newState;// hacemos un reset
        }
    }
}

export function CartProvider ({ children }){

    const [ state, dispatch] = useReducer (reducer, initialState);

    const addToCart = product => dispatch ({
        type: 'ADD_TO_CART',
        payload: product
    })
    
    const removeFromCart = product => dispatch ({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({ type: 'CLEAR_CART'})

    return(
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            { children }
        </CartContext.Provider>
    )
}