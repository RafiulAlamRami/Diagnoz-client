import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './Components/Pages/Home/Home.jsx';
import Root from './Components/Root.jsx';
import AllTests from './Components/Pages/AllTests/AllTests.jsx';
import Login from './Components/Pages/Login.jsx';
import Register from './Components/Pages/Register.jsx';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import AuthProviderr from './Providerr/AuthProviderr.jsx';
import Dashboard from './Components/Dashboard/Page/Dashboard.jsx';
import AllUsers from './Components/Dashboard/Page/AllUsers.jsx';
import AdminHome from './Components/Dashboard/Page/AdminHome.jsx';
import UserHome from './Components/Dashboard/UserPageD/UserHome.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import AdminRoute from './Components/Dashboard/AdminRoute.jsx';
// import AuthProvider from './Provider/AuthProvider.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/allTests',
        element: <AllTests></AllTests>
      }
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      
      //admin routes

      {
        path:'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },

      //user routes

      {
        path:'userHome',
        element:<UserHome></UserHome>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProviderr>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProviderr>

  </React.StrictMode>,
)
