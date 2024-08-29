import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Toggle from './components/Toggle'
// import blogService from './services/blogs'
// import signinService from './services/signin'
// import { useSelector, useDispatch } from 'react-redux'
// import { showNotification } from './context/notifyReducer'
// import { newBlog, likeBlog, deleteBlog } from './context/blogReducer'
import storage from './services/storage'
// import { signIn } from './context/userReducer'
import { useNotification } from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getBlogs,
  signin,
  newBlogPost,
  updateLikes,
  deleter,
  getUsers
} from './services/requests'
import UserContext from './UserContext'


const App = () => {
  const blogFormRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
  const { user, userDispatch } = useContext(UserContext)

  const newBlogMutation = useMutation({
    mutationFn: newBlogPost,
    onSuccess: (createBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(createBlog))
    },
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })


  if (result.isLoading) {
    return <div>Incoming Data....</div>
  }

  const blogs = result.data


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await signin({ username, password })
      userDispatch({ type: 'USER', payload: user })
      storage.saveUser(user)
      setUsername('')
      setPassword('')
      showNotification('Login Success', true)
    } catch (exception) {
      showNotification(`${exception.response.data.error}`, false)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
    dispatch(showNotification('logout success'))
  }

  const loginForm = () => (
    <Toggle buttonLabel="Login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Toggle>
  )

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} Logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <Toggle buttonLabel="New Post" ref={blogFormRef}>
        <NewBlog newBlogMutation={newBlogMutation} />
      </Toggle>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            id={blog.id}
            blog={blog}
            user={user.username}
          />
        ))}
    </div>
  )

  return (
    <div>
      <Notification />
      {!user && loginForm()}
      {user && blogsList()}
    </div>
  )
}

export default App
