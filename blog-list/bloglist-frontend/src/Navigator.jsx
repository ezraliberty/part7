import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import SingleBlog from './components/SingleBlog'
import { useContext } from 'react'
import { useNotification } from './NotificationContext'
import UserContext from './UserContext'
import LoginForm from './components/LoginForm'

const Navigater = () => {
  const { user, userDispatch } = useContext(UserContext)
  const { showNotification } = useNotification()

  const padding = {
    padding: 5,
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
    showNotification('logout success')
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <Link style={padding}>
            {user.name} Logged in <button onClick={handleLogout}>Logout</button>
          </Link>
        ) : (
          <Link style={padding} to={'/login'}>Login
          </Link>
        )}
      </div>
      <Routes>
        <Route element={<Users />} path="/users" />
        <Route element={<User />} path="/users/:id" />
        <Route element={<SingleBlog />} path="/blogs/:id" />
        <Route path="/login" element={<LoginForm />}  />
        <Route element={<Blog />} path="/" />
      </Routes>
    </Router>
  )
}

export default Navigater
