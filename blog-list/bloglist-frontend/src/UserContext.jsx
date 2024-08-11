import { createContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'USER':
    return state
  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer)

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext