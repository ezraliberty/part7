import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('all tests', () => {
  let container
  beforeEach(() => {
    const blog = {
      title: 'SandMan: Dark Storm Returns',
      author: 'Bart Phils',
      url: 'bartphils@gmail.com',
      likes: 15
    }
    container=render(<Blog blog={blog} />).container
  })

  test('renders the blog\'s title and author', () => {
    const element = container.querySelector('.first')
    expect(element).toBeDefined()
    expect(element).toHaveTextContent('SandMan: Dark Storm Returns Bart Phils')
    expect(element).not.toHaveTextContent('bartphils@gmail.com')
    expect(element).not.toHaveTextContent(15)
  })

  test('show URL and likes on Click', () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    user.click(button)

    const body = container.querySelector('.second')
    expect(body).toHaveTextContent('bartphils@gmail.com15')
  })
})

test('like clicked twice and component called twice', async () => {
  const blog = {
    title: 'SandMan: Dark Storm Returns',
    author: 'Bart Phils',
    url: 'bartphils@gmail.com',
    likes: 15
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLikes={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
