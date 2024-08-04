import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import signinService from './services/signin'
import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from './reducers/notifyReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const notification = useSelector(state => state)

  useEffect(() => {
    blogService.getAll().then(blog => setBlogs(blog))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await signinService.signin({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(createNotification('Login Success', true))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    } catch (exception) {
      console.log(exception.response.data.error)
      dispatch(createNotification(`${exception.response.data.error}`))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const newPost = async (createBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.newPost(createBlog)
      const returnedPost = await blogService.getAll()
      setBlogs(returnedPost)
      dispatch(createNotification(
        `A new Blog ${returnedPost.title} by ${returnedPost.author} added`
        , true))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    } catch (exception) {
      console.log(exception.response.data.error)
      setPassed()
      setNotify(`${exception.response.data.error}`)
      setTimeout(() => {
        setNotify(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
    setPassed()
    setNotify('logout success')
    setTimeout(() => {
      setNotify(null)
    }, 5000)
  }

  const deletePost = async (blog) => {
    try {
      if (window.confirm(`Remove post ${blog.title} by ${blog.author}`)) {
        await blogService.deleter(blog.id)
        const updatedBlogs = blogs.filter((item) => item.id !== blog.id)
        setBlogs(updatedBlogs)

        setPassed(true)
        setNotify('Operation Successful')
        setTimeout(() => {
          setNotify(null)
        }, 5000)
      }
    } catch (error) {
      setPassed()
      setNotify('Failed')
      setTimeout(() => {
        setNotify(null)
      }, 5000)
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
      const liker = await blogService.updateLikes(id)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: liker.likes } : blog
      )
      setBlogs(updatedBlogs)
    } catch (error) {
      setNotify('Failed to update likes')
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
