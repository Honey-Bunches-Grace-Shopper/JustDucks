import axios from 'axios'

//action types

const SET_CART = 'SET_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const ADD_PRODUCT = 'ADD_PRODUCT'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

const initialState = []

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const removeProduct = orderId => ({
  type: REMOVE_ITEM,
  orderId
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const changeQuant = (quantity, id) => ({
  type: CHANGE_QUANTITY,
  quantity,
  id
})

export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/user/${userId}`)
    console.log('data in set cart--->', data)
    dispatch(setCart(data))
  } catch (err) {
    console.error('Error fetching cart: ', err)
  }
}

export const removeItem = orderId => async dispatch => {
  try {
    await axios.delete(`/api/cart/${orderId}`)
    dispatch(removeProduct(orderId))
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
    console.log(data)
    dispatch(addProduct(data))
  } catch (err) {
    console.error('Error adding item to cart', err)
  }
}

export const changeQuantity = (quantity, id) => async dispatch => {
  try {
    const update = await axios.patch(`/api/cart/${id}`, {
      quantity
    })
    dispatch(changeQuant(quantity, id))
  } catch (err) {
    console.error('Error changing quantity', err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case ADD_PRODUCT:
      return [...state, action.product]
    case CHANGE_QUANTITY:
      return [
        ...state.map(cart => {
          if (cart.id === action.id) {
            return {...cart, numberOfItems: action.quantity}
          } else {
            return cart
          }
        })
      ]
    case REMOVE_ITEM:
      return [
        ...state.filter(order => {
          if (order.id !== action.orderId) {
            return order
          }
        })
      ]
    default:
      return state
  }
}
