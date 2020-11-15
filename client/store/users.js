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

export const updateOneUser = async (id, userInfo) => {
  try {
    console.log('ok updating')
    await axios.put(`/api/users/${id}`, userInfo)
  } catch (err) {
    console.error('Error updating single user', err)
  }
}

export const deleteOneUser = async id => {
  try {
    await axios.delete(`/api/users/${id}`)
  } catch (err) {
    console.error('Error removing single user', err)
  }
}

export const createUser = async user => {
  try {
    await axios.post(`/api/users/`, user)
  } catch (err) {
    console.error('Error creating user', err)
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
