import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout'
import {Home, InitializeTrip, MyTrips, Viewtrip} from './index.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<Home />} />
      <Route path='initialise-trip' element={<InitializeTrip />} />
      <Route path='view-trip/:tripId' element={<Viewtrip />} />
      <Route path='my-trips' element={<MyTrips />} />
    </Route>
  )
);

//when app is created get rid of firebase.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
