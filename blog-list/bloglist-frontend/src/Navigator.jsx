import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'

const Navigater = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Users />} path="/users" />
        <Route element={<User />} path="/users/:id" />
        <Route element={<SingleBlog />} path="/blogs/:id" />
        <Route element={<App />} path="/" />
      </Routes>
    </Router>
  )
}

export default Navigater
