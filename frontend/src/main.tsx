import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import Home from './pages/Home.tsx'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='*' element={<Navigate to="/" />} />
      <Route path='/' element={<Home />} />

    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0ProviderWithNavigate >
      <RouterProvider router={router}>
      </RouterProvider>
    </Auth0ProviderWithNavigate>
  </StrictMode>,
)
