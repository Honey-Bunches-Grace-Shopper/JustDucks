import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_PRODUCTS = 'SET_PRODUCTS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(setProducts(data))
  } catch (err) {
    console.error('Error fetching products: ', err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
