import axios from 'axios'

//actions types

const SET_GUEST_CART = 'SET_GUEST_CART'

//initial state

const initialState = []

//action creators

export const initialCart = cart => ({
  type: SET_GUEST_CART,
  cart
})

//thunk

export const setGuestCart = () => {
  return dispatch => {
    const data = JSON.parse()
    dispatch(initialCart(data.results))
  }
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GUEST_CART:
      return action.cart
    default:
      return state
  }
}
