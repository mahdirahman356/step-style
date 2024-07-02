import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "./style.css"
import { router } from './Route/Route';
import { RouterProvider } from 'react-router-dom';
import Context from './Context/Context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
    <QueryClientProvider client={queryClient}>
      <div className='nunito'>
      <RouterProvider router={router} />
      </div>
      </QueryClientProvider>
    </Context>
  </React.StrictMode>,
)
