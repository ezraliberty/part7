import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './UserContext'
import { NotificationProvider } from './NotificationContext'
import Navigator from './Navigator'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationProvider>
        <Navigator />
      </NotificationProvider>
    </UserContextProvider>
  </QueryClientProvider>
)