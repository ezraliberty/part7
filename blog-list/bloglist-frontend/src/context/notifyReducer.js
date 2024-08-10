import { createContext, useReducer, useContext, Children } from 'react'

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

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notifyReducer, initialState)

  const showNotification = (message, passed = false, timeout = 5) => {
    return (dispatch) => {
      dispatch({ type: 'NOTIFICATION', payload: { message, passed } })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, timeout * 1000) // Convert timeout to milliseconds
    }
  }

  return (
    <NotificationContext.Provider value={{ state, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}
