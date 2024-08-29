import { useState } from 'react'

const NewBlog = ({ newBlogMutation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    newBlogMutation.mutate({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New</h2>
      <div>
        title:
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder='Enter Title'
          id='title'
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder='Enter Author'
          id='author'
        />
      </div>
      <div>
        url:
        <input value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder='Enter URL'
          id='url'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlog
