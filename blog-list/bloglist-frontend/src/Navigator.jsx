import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import SingleBlog from './components/SingleBlog'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import UserContext from './UserContext'

const Navigater = () => {
  const { user } = useContext(UserContext)

  return (
    <Router>
      <NavBar />
      {user && (<Routes>
        <Route element={<Users />} path="/users" />
        <Route element={<Blog />} path="/blogs" />
        <Route element={<User />} path="/users/:id" />
        <Route element={<SingleBlog />} path="/blogs/:id" />
      </Routes>)}
      <Routes>
        <Route path="/login" element={<LoginForm />}  />
        <Route element={<App />} path="/" />
      </Routes>
    </Router>
  )
}

export default Navigater
