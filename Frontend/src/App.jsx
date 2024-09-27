import { createContext, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainNavLInks from './components/MainNavLInks'
import MainRoute from './route/MainRoute'

export let GlobalVariableContext = createContext();
function App() {
const [token,setToken]= useState(localStorage.getItem("token"))
  return (
    <div>
      <GlobalVariableContext.Provider value={{token:token,setToken:setToken}}>
      <MainNavLInks></MainNavLInks>
      <MainRoute></MainRoute>
      </GlobalVariableContext.Provider>
    </div>
  )
}

export default App
