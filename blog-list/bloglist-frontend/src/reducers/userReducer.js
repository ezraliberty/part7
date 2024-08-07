import axios from 'axios'
import storage from '../services/storage'

const initialState = null

// a reducer is a function that is given the current state and an action as parameters. It returns a new state.
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGGEDUSER':
    return action.payload
  default:
    return state
  }
}

export function signIn(credentials) {
  return async function saveBlog(dispatch, getState) {
    const response = await axios.post(
      'http://localhost:3003/api/signin',
      credentials
    )
    storage.saveUser(response.data)
    dispatch({ type: 'LOGGEDUSER', payload: response.data })
  }
}

export default blogReducer
