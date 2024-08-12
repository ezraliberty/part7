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
import User from './components/User'


const App = () => {
  const blogFormRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
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

  const updateBlogMutation = useMutation({
    mutationFn: updateLikes,
    onSuccess: (liked) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map((blog) =>
        blog.id === liked.id ? { ...blog, likes: liked.likes } : blog
      )

      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleter,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])

      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      queryClient.setQueryData(['blogs', updatedBlogs])
    },
  })
  // const dispatch = useDispatch()
  // const notification = useSelector(state => state.notification)
  // const blogs = useSelector(state => state.blogs.blogs)

  useEffect(() => {
    // blogService.getAll().then(blog => setBlogs(blog))
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })

  const userResult = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  if (userResult.isLoading) {
    return <div>Incoming Data....</div>
  }

  const users = userResult.data
  console.log('users app.js: ', users)

  if (result.isLoading) {
    return <div>Incoming Data....</div>
  }

  const blogs = result.data

  
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     // blogService.setToken(user.token)
  //   }
  // }, [])


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

  const newPost = async (createBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      newBlogMutation.mutate(createBlog)
      // dispatch(newBlog(createBlog))
      // await blogService.newPost(createBlog)
      // const returnedPost = await blogService.getAll()
      showNotification(
        `A new Blog ${createBlog.title} by ${createBlog.author} added`,
        true
      )
    } catch (exception) {
      showNotification(`${exception.response.data.error}`)
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
        deleteBlogMutation.mutate(blog.id)
        // dispatch(deleteBlog(blog.id))
        // await blogService.deleter(blog.id)
        // const updatedBlogs = blogs.filter((item) => item.id !== blog.id)
        // setBlogs(updatedBlogs)
        showNotification('Operation Successful')
      }
    } catch (error) {
      showNotification('Failed')
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
      updateBlogMutation.mutate(id)
      // dispatch(likeBlog(id))
      // const liker = await blogService.updateLikes(id)
      // const updatedBlogs = blogs.map((blog) =>
      //   blog.id === id ? { ...blog, likes: liker.likes } : blog
      // )
      // setBlogs(updatedBlogs)
    } catch (error) {
      showNotification('Failed to update likes')
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
      <h2>Users</h2>
      {users.map(user => <User key={user.username} username={user.username} blogsCount={user.blogs.length} />)}
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
      <Notification />
      {!user && loginForm()}
      {user && blogsList()}
    </div>
  )
}

export default App
