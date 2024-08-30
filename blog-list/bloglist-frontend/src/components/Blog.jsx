import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NewBlog from './NewBlog'
import Toggle from './Toggle'
import {
  getBlogs,
  signin,
  newBlogPost,
  updateLikes,
  deleter,
  getUsers,
} from '../services/requests'

const Blog = () => {
  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })

  const newBlogMutation = useMutation({
    mutationFn: newBlogPost,
    onSuccess: (createBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(createBlog))
    },
  })

  if (result.isLoading) {
    return <div>Incoming Data....</div>
  }

  const blogs = result.data

  return (
    <div>
      <h2>blog app</h2>
      <Toggle buttonLabel="New Post" ref={blogFormRef}>
        <NewBlog newBlogMutation={newBlogMutation} />
      </Toggle>
      {blogs
        .map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        ))}
    </div>
  )
}

export default Blog
