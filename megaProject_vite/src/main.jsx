import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './store/Store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login, Signup } from './components/index.js'

import Home from './pages/Home.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
 {
  path: "/",
  element: <App />,
  children: [
   { path: "/", element: <Home /> },
   { path: "/login", element: (
    <AuthLayout authentication={false}>
    <Login />
    </AuthLayout>
   )
   },
   { path: "/signup", element: (
    <AuthLayout authentication={false}>
    <Signup />
    </AuthLayout>
   )
   },
   { path: "/all-posts", element: (
    <AuthLayout authentication={true}>
    {" "}
    <AllPosts />
    </AuthLayout>
   )
   },
   { path: "/add-post", element: (
    <AuthLayout authentication={true}>
    {" "}
    <AddPost />
    </AuthLayout>
   )
   },
   { path: "/edit-posts/:slug", element: (
    <AuthLayout authentication={true}>
    {" "}
    <EditPost />
    </AuthLayout>
   )
   },
   { path: "/post/:slug", 
    element: <Post />
   },

  ]
 }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
  <RouterProvider router={router}/>
  </Provider>,
)
