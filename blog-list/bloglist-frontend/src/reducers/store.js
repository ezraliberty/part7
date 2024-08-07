import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import bloglistReducer from './blogReducer'
import notifyReducer from './notifyReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  blogs: bloglistReducer,
  notification: notifyReducer,
  user: userReducer
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(rootReducer, composedEnhancer)

export default store