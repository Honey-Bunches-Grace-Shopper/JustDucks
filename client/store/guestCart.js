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

function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length

  while (i--) {
    values.push(JSON.parse(localStorage.getItem(keys[i])))
  }
  return values
}

export const setGuestCart = () => dispatch => {
  try {
    const storageData = allStorage()
    dispatch(initialCart(storageData))
  } catch (err) {
    console.log('trouble with local storage', err)
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
