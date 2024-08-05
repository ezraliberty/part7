const initialState = {
  message: null,
  passed: false,
}

// a reducer is a function that is given the current state and an action as parameters. It returns a new state.
const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return {
      ...state,
      message: action.payload.message,
      passed: action.payload.passed,
    }
  case 'RESET':
    return initialState
  default:
    return state
  }
}

const createNotification = (message, passed = false) => {
  return {
    type: 'NOTIFICATION',
    payload: {
      message,
      passed,
    }
  }
}

export const showNotification = (message, passed = false, timeout = 5) => {
  return (dispatch) => {
    dispatch(createNotification(message, passed))
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, timeout * 1000) // Convert timeout to milliseconds
  }
}

export default notifyReducer
