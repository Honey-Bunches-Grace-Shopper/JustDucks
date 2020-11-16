import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_USERS = 'SET_USERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const setUsers = users => ({
  type: SET_USERS,
  users
})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(setUsers(data))
  } catch (err) {
    console.error('Error fetching users: ', err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
