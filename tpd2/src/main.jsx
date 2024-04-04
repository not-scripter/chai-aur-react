import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthLayout } from "./components/index.js";
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
  Posts,
  AddPost,
  EditPost,
  Profile,
  ProfilePosts,
  ProfileReplies,
  Test,
  Replies,
  MyPosts,
  Saves,
  NewReply,
  Reply,
} from "./pages";

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
        path: `/:userId/:postId`,
        element: (
          <AuthLayout auth>
            <Post />
          </AuthLayout>
        ),
      },
      {
        path: `/:userId/:replyId`,
        element: (
          <AuthLayout auth>
            <Reply />
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
        path: `/posts`,
        element: (
          <AuthLayout auth>
            <MyPosts />
          </AuthLayout>
        ),
      },
      {
        path: `/replies`,
        element: (
          <AuthLayout auth>
            <Replies />
          </AuthLayout>
        ),
      },
      {
        path: `/saves`,
        element: (
          <AuthLayout auth>
            <Saves />
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
      {
        path: `/:userId`,
        element: (
          <AuthLayout auth>
            <Profile>
              <ProfilePosts />
            </Profile>
          </AuthLayout>
        ),
      },
      {
        path: `/:userId/posts`,
        element: (
          <AuthLayout auth>
            <Profile>
              <ProfilePosts />
            </Profile>
          </AuthLayout>
        ),
      },
      {
        path: `/:userId/replies`,
        element: (
          <AuthLayout auth>
            <Profile>
              <ProfileReplies />
            </Profile>
          </AuthLayout>
        ),
      },
      // {
      //   path: `/:username/:postId`,
      //   element: (
      //     <AuthLayout auth>
      //       <Post />
      //     </AuthLayout>
      //   ),
      // },
      {
        path: `/:userId/:postId/new-reply`,
        element: (
          <AuthLayout auth>
            <NewReply />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>,
);
// <React.StrictMode>
