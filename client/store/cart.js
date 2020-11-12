import axios from 'axios'

//action types

const SET_CART = 'SET_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

const initialState = []

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const removeItem = item => ({
  type: REMOVE_ITEM,
  item
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

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
