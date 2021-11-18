import React, { createContext, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import ErrorPage from './components/ErrorPage'
import Logout from './components/Logout'
import { initialState, reducer } from "../src/reducer/UseReducer"
//type rafce to get this snippet

//add config.env in .gitignore while hosting

export const UserContext = createContext()

const Routing = () => {     //jsx Component
  return (
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)   //initialState is the initial value of the state
                                                                //dispatch will trigger action method in reducer
                                                                //whenever there is a change in dispatch, then the action method in reducer will be used to change the state
  
  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>    {/* Here we are pasing state and dispatch to all our components */}
      <Navbar/>
      <Routing/>
      </UserContext.Provider>
    </>
  )
}

export default App    //Every page can have only one default export
                      //Normal exports can be many

