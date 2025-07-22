import React, {createContext} from 'react'
import { NavLink, Outlet     } from "react-router-dom";
import Nav from './Nav';
import Footer from './Footer';



const Layout = () => {
  return (
    <div className='font-roboto flex flex-col h-screen '>
      <Nav />
      <div className='flex-grow w-[1000px] mx-auto'>
      <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
