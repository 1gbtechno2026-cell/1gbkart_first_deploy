import { createContext, useContext, useReducer, useState } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.product.id)
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.product, qty: 1 }] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'INC':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i
        ),
      }
    case 'DEC':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
        ),
      }
    case 'SET_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: action.qty } : i
        ),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [quickView, setQuickView] = useState(null)
  const [recentlyAdded, setRecentlyAdded] = useState(null)

  const addToCart = (product) => {
    dispatch({ type: 'ADD', product })
    setRecentlyAdded(product.id)
    setTimeout(() => setRecentlyAdded(null), 1500)
  }

  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id })

  const updateQty = (id, qty) => {
    if (qty < 1) return dispatch({ type: 'REMOVE', id })
    dispatch({ type: 'SET_QTY', id, qty })
  }

  const toggleWishlist = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id])
  }

  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = state.items.reduce((s, i) => s + i.qty, 0)
  const cart = state.items

  return (
    <CartContext.Provider value={{
      cart,
      items: state.items,
      total,
      count,
      cartOpen,
      setCartOpen,
      wishlist,
      toggleWishlist,
      quickView,
      setQuickView,
      recentlyAdded,
      addToCart,
      removeFromCart,
      updateQty,
      dispatch,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
