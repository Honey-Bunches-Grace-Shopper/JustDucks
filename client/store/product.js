import axios from 'axios'
import {setCart} from './cart'

/**
 * ACTION TYPES
 */

const SET_PRODUCTS = 'SET_PRODUCTS'

const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

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

export const updateProducts = productInfo => ({
  type: UPDATE_PRODUCTS,
  productInfo
})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(setProducts(data))
  } catch (error) {
    console.error('Error fetching products: ', error)
  }
}

export const updateOneProduct = async (id, productInfo) => {
  try {
    await axios.put(`/api/stock/${id}`, productInfo)
  } catch (error) {
    console.error('Error updating single product stock', error)
  }
}

export const updateSubmittedProducts = submittedInfo => async dispatch => {
  try {
    await axios.put('/api/stock', submittedInfo)
    dispatch(setCart([]))
  } catch (error) {
    console.error('Error updating submitted product info', error)
  }
}

export const deleteOneProduct = async id => {
  try {
    await axios.delete(`/api/stock/${id}`)
  } catch (error) {
    console.error('Error deleting single product stock', error)
  }
}

export const createProduct = async product => {
  try {
    await axios.post(`/api/stock/`, product)
  } catch (error) {
    console.error('Error creating product', error)
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
