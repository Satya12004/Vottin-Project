import { useState } from 'react'
import {BrowserRouter,Routes,Route, useNavigate, Navigate} from 'react-router-dom'

import Admin from './Pages/Admin'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Navbar from './Components/Navbar'
  import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import Home from './Pages/Home'

function App() {
 
  const [count, setCount] = useState(0)
let selector=useSelector((state)=>state.user)
console.log(selector)
let login=selector.login
console.log(login)
 
let role=selector.users.role;
console.log(role)
  return (
    <>
    <BrowserRouter>
    <Navbar/>
<Routes>
       
         <Route path='/signup' element={login===false?<Signup/>:<Navigate to={'/'}/>}/>
        <Route path='/login' element={login===false?<Login/>:<Navigate to={'/'}/>}/>
        
        <Route path="/admin" element={login===true?<Admin/>:<Navigate to={'/login'}/>}/>
        
       
        
        
        <Route path='/' element={login===true?<Home/>:<Navigate to={'/login'}/>}/>

      </Routes>
   
 
  <ToastContainer/>
</BrowserRouter>
    </>
  )
}

export default App
