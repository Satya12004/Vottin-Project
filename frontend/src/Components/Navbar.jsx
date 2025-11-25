import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogOut } from '../store/UserSlice'

const Navbar = () => {

  let dispatch=useDispatch()
  return (
<header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
  <div className="flex flex-wrap items-center justify-between gap-5 w-full">
    
  
    <div id="collapseMenu" className="max-lg:hidden max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
      <button id="toggleClose" className="lg:hidden fixed top-2 right-4 rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer">
     
      </button>
      <ul className="lg:flex gap-x-4 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
        <li className="mb-6 hidden max-lg:block">
          
       
        </li>
        <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
          <Link to={'/'} className="hover:text-blue-700 text-blue-700 block font-medium text-[15px]">Home</Link>
        </li>
     
    
      
        <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3"><Link to={'/login'} className="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">Login</Link>
        </li>
        <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3"><Link to={'/signup'} className="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">SignUp</Link>
        </li>
         <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3"><Link to={'/admin'} className="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">Admin</Link>
        </li>
       
      </ul>
    </div>
    <div className="flex max-lg:ml-auto space-x-4">
      <button className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all" onClick={()=>dispatch(userLogOut())}>LogOut</button>
     
      
    </div>
  </div>
</header>

  )
}

export default Navbar