import { useEffect, useState } from 'react'
import { getBlog, updateLikes, deleter } from '../services/requests'
import { params } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from './NotificationContext'


const SingleBlog = () => {
  const { id } = params()
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => getBlog(id),
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

  const addLikes = async (id) => {
    try {
      updateBlogMutation.mutate(id)
    } catch (error) {
      showNotification('Failed to update likes!')
    }
  }

  const blog = result.data

  return (
    <div>
      <p>
        {blog.title}
      </p>
      <p>{blog.url}</p>
      <p>
        {blog.likes}{' '}
        <button onClick={() => addLikes(blog.id)} id="like">
          like
        </button>
      </p>
      <p>{blog.author}</p>
    </div>
  )
}

export default SingleBlog
