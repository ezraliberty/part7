const initialState = {
  message: null,
  passed: false
}

// a reducer is a function that is given the current state and an action as parameters. It returns a new state.
const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return {
      ...state,
      message: action.payload.message,
      passed: action.payload.passed
    }
  default:
    return state
  }
}

export const createNotification = (message, passed = false) => {
  return {
    type: 'NOTIFICATION',
    payload: {
      message,
      passed,
    }
  }
}

export default notifyReducer