import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthLayout, Container } from "./components/index.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store/Store.js";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Account from "./pages/Account.jsx";
import AccountInfo from "./pages/AccountInfo.jsx";
import AccountSecurity from "./pages/AccountSecurity.jsx";
import AccountAdvance from "./pages/AccountAdvance.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
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
            <Signin />
          </AuthLayout>
        ),
      },
      {
        path: "/account",
        element: (
          <AuthLayout auth={false}>
            <Account />
          </AuthLayout>
        ),
      },
      {
        path: "/account/info",
        element: (
          <AuthLayout auth={false}>
            <Account>
              <AccountInfo />
            </Account>
          </AuthLayout>
        ),
      },
      {
        path: "/account/security",
        element: (
          <AuthLayout auth={false}>
            <Account>
              <AccountSecurity />
            </Account>
          </AuthLayout>
        ),
      },
      {
        path: "/account/advance",
        element: (
          <AuthLayout auth={false}>
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
