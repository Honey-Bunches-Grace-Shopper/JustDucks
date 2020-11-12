import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
export const setSelectedProduct = product => ({
  type: SET_SELECTED_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const fetchSelectedProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(setSelectedProduct(data))
  } catch (err) {
    console.error('Error fetching selected product: ', err)
  }
}

/**
 * REDUCER
 */
export default function singleProduct(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_PRODUCT:
      return action.product
    default:
      return state
  }
}
