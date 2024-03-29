import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthLayout } from "./components/index.js"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store/Store.js";
import {
  Home,
  Login,
  Signup,
  Account,
  AccountInfo,
  AccountSecurity,
  AccountAdvance,
  Post,
  AddPost,
  EditPost,
  MyPosts,
  Test,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout auth>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/signup",
        element: (
          <AuthLayout auth={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout auth={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: `/post/:slug`,
        element: (
          <AuthLayout auth>
            <Post />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout auth>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post",
        element: (
          <AuthLayout auth>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <AuthLayout auth>
            <MyPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/account",
        element: (
          <AuthLayout auth>
            <Account>
              <AccountInfo />
            </Account>
          </AuthLayout>
        ),
      },
      {
        path: "/account/info",
        element: (
          <AuthLayout auth>
            <Account>
              <AccountInfo />
            </Account>
          </AuthLayout>
        ),
      },
      {
        path: "/account/security",
        element: (
          <AuthLayout auth>
            <Account>
              <AccountSecurity />
            </Account>
          </AuthLayout>
        ),
      },
      {
        path: "/account/advance",
        element: (
          <AuthLayout auth>
            <Account>
              <AccountAdvance />
            </Account>
          </AuthLayout>
        ),
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
