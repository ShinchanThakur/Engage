import React, { createContext, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import About from './components/navbar/About'
import Contact from './components/navbar/Contact'
import Login from './components/navbar/Login'
import Signup from './components/navbar/Signup'
import ErrorPage from './components/navbar/ErrorPage'
import Logout from './components/navbar/Logout'
import { initialState, reducer } from "../src/reducer/UseReducer"
//type rafce to get this snippet
//add config.env in .gitignore while hosting

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//HOME PAGE IMPORTS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/homePage/home/Home'
import NotesApp from './components/homePageRoutes/notesApp/NotesApp';
import SubjectPreference from './components/homePageRoutes/subjectPreference/SubjectPreference'
import VaccinationDetails from './components/homePageRoutes/VaccinationDetails'
import QuestionCategory from './components/homePageRoutes/quiz/QuestionCategory'
import Questions from './components/homePageRoutes/quiz/Questions'
import TodoList from './components/homePageRoutes/todo/TodoList';
import ClientApp from './components/homePageRoutes/chatClient/App' ;
//Environment Variables
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})
export const UserContext = createContext()

const Routing = () => {     //jsx Component
  return (
    <Routes>
      {/* Navbar Routes */}
      <Route exact path="/" element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/signup' element={<Signup/>}/>

      {/* Home Page Routes */}
      <Route path='/notes' element={<NotesApp/>} />
      <Route path='/SubjectPreference' element={<SubjectPreference/>} />
      <Route path='/VaccinationDetail' element={<VaccinationDetails/>}/>
      <Route path='/quiz' element={<QuestionCategory/>}/>
      <Route path='/q/:cat/:dif/:no' element={<Questions/>}/>
      <Route path='/taskManager' element={<TodoList/>}/>
      <Route path='/chat' element={<ClientApp/>}  />

      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

const App = () => {
  let [state, dispatch] = useReducer(reducer, initialState)   //initialState is the initial value of the state
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