import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './reducers/store'
import { fetchBlogs } from './reducers/blogReducer'

import './index.css'

store.dispatch(fetchBlogs)

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// import ReactDOM from 'react-dom/client'
// import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { Provider } from 'react-redux'
// import { composeWithDevTools } from 'redux-devtools/extension'

// import App from './App'
// import bloglistReducer from './reducers/notifyReducer'
// import './index.css'

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
// const store = createStore(bloglistReducer, composedEnhancer)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )
