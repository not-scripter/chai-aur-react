import { useEffect, useState } from "react"
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import ThemeBtn from "./components/ThemeBtn.jsx";
import Card from "./components/Card.jsx";

export default function App() {

const [theme, settheme] = useState("dark")

 useEffect(() => {
  const html = document.querySelector("html")
  html.classList.remove("dark", "light")
  html.classList.add(theme)
 }, [theme])

  return (
  <ThemeProvider value={{theme, settheme}}>


   <div className="flex flex-wrap min-h-screen items-center">
   <div className="w-full">
   <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
   <ThemeBtn />
   </div>

   <div className="w-full max-w-sm mx-auto">
   <Card />
   </div>
   </div>
   </div>


  </ThemeProvider>
  )
}

