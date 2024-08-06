import axios from 'axios'
import storage from '../services/storage'

const config = () => ({
  headers: { Authorization: `Bearer ${storage.getUser().token}` },
})

const initialState = {
  blogs: [],
}

// a reducer is a function that is given the current state and an action as parameters. It returns a new state.
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'blogs/blogsLoaded':
    return {
      ...state,
      loading: false,
      blogs: action.payload,
    }
  case 'ADDED':
    return { ...state, blogs: [...state.blogs, action.payload] }
  case 'LIKED':
    return {
      ...state,
      blogs: state.blogs.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: action.payload.likes }
          : blog
      ),
    }
  case 'REMOVE':
    return {
      ...state,
      blogs: state.blogs.filter(blog => blog.id !== action.payload)
    }
  default:
    return state
  }
}

export async function fetchBlogs(dispatch, getState) {
  const response = await axios.get('http://localhost:3003/api/blogs')
  dispatch({ type: 'blogs/blogsLoaded', payload: response.data })
}

export function newBlog(newPost) {
  return async function saveBlog(dispatch, getState) {
    const response = await axios.post(
      'http://localhost:3003/api/blogs',
      newPost,
      config()
    )
    dispatch({ type: 'ADDED', payload: response.data })
  }
}

export function likeBlog(id) {
  return async function saveBlog(dispatch, getState) {
    const response = await axios.put(
      `http://localhost:3003/api/blogs/${id}/likes`,
      {},
      config()
    )
    dispatch({ type: 'LIKED', payload: response.data })
  }
}

export function deleteBlog(id) {
  return async function saveBlog(dispatch, getState) {
    await axios.delete(
      `http://localhost:3003/api/blogs/${id}`,
      config()
    )
    dispatch({ type: 'REMOVE', payload: id })
  }
}

export default blogReducer
