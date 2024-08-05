import axios from 'axios'

const initialState = {
  blogs: [],
  loading: false,
  error: null
}

// a reducer is a function that is given the current state and an action as parameters. It returns a new state.
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'blogs/blogsLoading':
    return {
      ...state,
      loading: true,
      error: null
    }
  case 'blogs/blogsLoaded':
    return {
      ...state,
      loading: false,
      blogs: action.payload
    }
  case 'blogs/blogsError':
    return {
      ...state,
      loading: false,
      error: action.payload
    }
  default:
    return state
  }
}

export async function fetchBlogs(dispatch, getState) {
  const response = await axios.get('http://localhost:3003/api/blogs')
  dispatch({ type: 'blogs/blogsLoaded', payload: response.data })
}

export function newBlog(post) {
  return async function saveBlog(dispatch, getState) {
    const newBlog = { post }
    const response = await axios.post('http://localhost:3003/api/blogs', { post: newBlog })
    dispatch({ type:'blogs/blogAdded', payload: response.post })
  }
}

export default blogReducer