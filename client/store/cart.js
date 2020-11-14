import axios from 'axios'

//action types

const SET_CART = 'SET_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const ADD_PRODUCT = 'ADD_PRODUCT'

const initialState = []

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const removeProduct = product => ({
  type: REMOVE_ITEM,
  product
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(setCart(data))
  } catch (err) {
    console.error('Error fetching cart: ', err)
  }
}

export const deleteItem = () => async dispatch => {
  try {
    const {data} = await axios.delete('/api/cart')
    dispatch(removeItem(data))
  } catch (err) {
    console.error('Error deleting item from cart', err)
  }
}

export const addCartProduct = (
  selectedProduct,
  numberOfItems,
  userId
) => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart', {
      selectedProduct,
      numberOfItems,
      userId
    })
    dispatch(addProduct(data))
  } catch (err) {
    console.error('Error adding item to cart', err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
