import Login from "./components/Login"
import Profile from "./components/Profile"
import UserContextProvider from "./context/UserContextProvider"

function App() {

  return (
    <UserContextProvider>
   <Profile />
   <Login />
    </UserContextProvider>
  )
}

export default App
