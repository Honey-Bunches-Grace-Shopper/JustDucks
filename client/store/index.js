import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './product'
import cart from './cart'
import singleProduct from './singleProduct'
import users from './users'
import guestCart from './guestCart'

const reducer = combineReducers({
  user: user,
  users: users,
  products: product,
  selectedProduct: singleProduct,
  cart: cart,
  guestCart: guestCart
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
