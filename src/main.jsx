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
import Addtest from './Components/Dashboard/Page/Addtest.jsx';
import AllTest from './Components/Dashboard/Page/AllTest.jsx';
import Reservation from './Components/Dashboard/Page/Reservation.jsx';
import AddBanner from './Components/Dashboard/Page/AddBanner.jsx';
import DelailsPage from './Components/Pages/DelailsPage.jsx';
import AllBanner from './Components/Dashboard/Page/AllBanner.jsx';
import UpcommingApponment from './Components/Dashboard/UserPageD/UpcommingApponment.jsx';
import TestResult from './Components/Dashboard/UserPageD/TestResult.jsx';
import Blog from './Components/Pages/Blog.jsx';
import Emergency from './Components/Pages/Emergency .jsx';
import Carrer from './Components/Pages/Carrer.jsx';
import Contact from './Components/Pages/Contact.jsx';
import UpdateTest from './Components/Dashboard/Page/UpdateTest.jsx';
import Error from './Components/Pages/Error.jsx';
import Stats from './Components/Dashboard/Page/Stats.jsx';
// import AuthProvider from './Provider/AuthProvider.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Error></Error>,
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
      },
      {
        path:'/details/:id',
        element:<PrivateRoute><DelailsPage></DelailsPage></PrivateRoute>
      },
      {
        path:'/blog',
        element:<Blog></Blog>
      },
      {
        path:'/emergency',
        element:<Emergency></Emergency>
      },
      {
        path:'/career',
        element:<Carrer></Carrer>
      },
      {
        path:'/contact',
        element:<Contact></Contact>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [

      //admin routes

      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'allUsers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'addTest',
        element: <AdminRoute><Addtest></Addtest></AdminRoute>
      },
      {
        path: 'allTest',
        element: <AdminRoute><AllTest></AllTest></AdminRoute>
      },
      {
        path: 'reservation/:id',
        element: <AdminRoute><Reservation></Reservation></AdminRoute>
      },
      {
        path: 'addBanner',
        element: <AdminRoute><AddBanner></AddBanner></AdminRoute>
      },
      {
        path:'allBanner',
        element:<AdminRoute><AllBanner></AllBanner></AdminRoute>
      },
      {
        path:'updateTest/:id',
        element:<UpdateTest></UpdateTest>
      },
      {
        path:'stats',
        element:<Stats></Stats>
      },

      //user routes

      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path:'appoinment',
        element:<UpcommingApponment></UpcommingApponment>
      },
      {
        path:'testResult',
        element:<TestResult></TestResult>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviderr>

        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>

      </AuthProviderr>
    </QueryClientProvider>
  </React.StrictMode>,
)
