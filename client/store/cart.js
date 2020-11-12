import axios from 'axios'

//action types

const SET_CART = 'SET_CART'

const initialState = []

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(setCart(data))
  } catch (err) {
    console.error('Error fetching cart: ', err)
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
