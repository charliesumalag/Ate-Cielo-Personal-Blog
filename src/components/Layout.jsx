import React, {createContext} from 'react'
import { NavLink, Outlet     } from "react-router-dom";
import Nav from './Nav';
import Footer from './Footer';



const Layout = () => {
  return (
    <div className='font-roboto '>
        <Nav />
        <div className='w-[1000px] mx-auto font-lora'>
            <Outlet />
            <Footer />
        </div>

    </div>
  )
}

export default Layout
