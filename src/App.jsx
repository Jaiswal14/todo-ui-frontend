import { useState } from 'react'
import './App.css'
import ListTodoComponent from './components/ListTodoComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({ children }){
    const isAuth = isUserLoggedIn();

    if(isAuth){
      return children;
    }
    return <Navigate to="/" />  
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>

          {/* http://localhost:8080 */}
          <Route path="/" element={<LoginComponent/>} />

          {/* http://localhost:8080/todos */}
          <Route path="/todos"
           element={
            <AuthenticatedRoute>
              <ListTodoComponent/>
            </AuthenticatedRoute>
          }/>

          {/* http://localhost:8080/add-todo */}
          <Route path='/add-todo' 
            element={
              <AuthenticatedRoute>
                <TodoComponent/>
              </AuthenticatedRoute>
            }
          />

          {/* http://localhost:8080/update-todo/todoId */}
          <Route path='/update-todo/:id' 
            element={
              <AuthenticatedRoute>
                <TodoComponent/>
              </AuthenticatedRoute>
            }
          />

          {/* http://localhost:8080/register */}
          <Route path='/register' element={<RegisterComponent/>}/>

          {/* http://localhost:8080/login */}
          <Route path='/login' element={<LoginComponent/>}/>

        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
