import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './Pages/LoginPage';
import SignInPage from './Pages/SignInPage';
import Global from './global'
import AdminPage from './Pages/AdminPage';
import AddItemPage from './Pages/AddItemPage';
import MoreinfoPage from './Pages/MoreinfoPage'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
   
  },
  {
    path: "/mainpage",
        element: <App/>
  },
  {
    path: "/Register",
        element: <SignInPage/>
  },
  {
    path: "/Adminpage",
        element: <AdminPage/>
  },
  {
    path: "/AddItems",
        element: <AddItemPage/>
  },
  {
    path: "/moreInfo",
        element: <MoreinfoPage/>
  },
  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global/>
    <RouterProvider  router={router} />
  </React.StrictMode>
);

 
