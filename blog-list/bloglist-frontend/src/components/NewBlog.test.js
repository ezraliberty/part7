import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

test('test for the new blog form', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<NewBlog createBlog={createBlog}/>)

  const input0 = screen.getByPlaceholderText('Enter Title')
  const input1 = screen.getByPlaceholderText('Enter Author')
  const input2 = screen.getByPlaceholderText('Enter URL')
  const sendButton = screen.getByText('create')

  await user.type(input0, 'tester testing....')
  await user.type(input1, 'tester testing....')
  await user.type(input2, 'tester testing....')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
})