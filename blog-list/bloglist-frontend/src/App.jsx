import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import signinService from './services/signin'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from './reducers/notifyReducer'
import { newBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import storage from './services/storage'
import { signIn } from './reducers/userReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs.blogs)

  useEffect(() => {
    // blogService.getAll().then(blog => setBlogs(blog))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(signIn({ username, password }))
      // const user = await signinService.signin({ username, password })
      storage.saveUser(user)
      // window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      // blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(showNotification('Login Success', true))
    } catch (exception) {
      dispatch(showNotification(`${exception.response.data.error}`, false))
    }
  }

  const newPost = async (createBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(newBlog(createBlog))
      // await blogService.newPost(createBlog)
      // const returnedPost = await blogService.getAll()
      dispatch(showNotification(
        `A new Blog ${createBlog.title} by ${createBlog.author} added`
        , true))
    } catch (exception) {
      dispatch(showNotification(`${exception.response.data.error}`))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
    dispatch(showNotification('logout success'))
  }

  const deletePost = async (blog) => {
    try {
      if (window.confirm(`Remove post ${blog.title} by ${blog.author}`)) {
        dispatch(deleteBlog(blog.id))
        // await blogService.deleter(blog.id)
        // const updatedBlogs = blogs.filter((item) => item.id !== blog.id)
        // setBlogs(updatedBlogs)
        dispatch(showNotification('Operation Successful'))
      }
    } catch (error) {
      dispatch(showNotification('Failed'))
    }
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

  const addLikes = async (id) => {
    try {
      dispatch(likeBlog(id))
      // // const liker = await blogService.updateLikes(id)
      // const updatedBlogs = blogs.map((blog) =>
      //   blog.id === id ? { ...blog, likes: liker.likes } : blog
      // )
      // setBlogs(updatedBlogs)
    } catch (error) {
      dispatch(showNotification('Failed to update likes'))
    }
  }

  // const checker = (blog) => blog.user.username === user.username


  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} Logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <Toggle buttonLabel="New Post" ref={blogFormRef}>
        <NewBlog createBlog={newPost} />
      </Toggle>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            remove={() => deletePost(blog)}
            addLikes={addLikes}
            user={user.username}
          />
        ))}
    </div>
  )

  return (
    <div>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && blogsList()}
    </div>
  )
}

export default App
