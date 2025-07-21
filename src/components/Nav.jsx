import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';
import Dropdown from './Dropdown';

const Nav = () => {
  return (
    <nav className='w-full flex'>
        <div className='w-[1000px] flex mx-auto justify-between py-5 mb-10 border-b border-gray-300'>
             <ul className='flex gap-3  font-roboto text-[12px] leading-[1.7em]  tracking-[0.6px]'>
                <li>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'text-black font-medium uppercase  ' : 'text-[#323232] uppercase font-medium'}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/shop' className={({ isActive }) => isActive ? 'text-black font-medium uppercase  ' : 'text-[#323232] uppercase font-medium'}>Shop</NavLink>
                </li>
                <li>
                    <NavLink to='/about' className={({ isActive }) => isActive ? 'text-black font-medium uppercase  ' : 'text-[#323232] uppercase font-medium'}>About</NavLink>
                </li>
            </ul>
            <h1 className='text-3xl font font-birthStone'><NavLink to='/' >ThoughtHatch<span className='text-[#FF374A] font-bold'>.</span> </NavLink></h1>
            <div className='flex items-center gap-2 text-[#323232]'>
                  <Search />
                <i className="fa-brands fa-square-twitter cursor-pointer text-[15px] hover:text-black hover:scale-140 transition-transform duration-300" ></i>
                <i className="fa-brands fa-square-facebook cursor-pointer text-[15px] hover:text-black hover:scale-140 transition-transform duration-300"></i>
                <i className="fa-brands fa-square-instagram cursor-pointer text-[15px] hover:text-black hover:scale-140 transition-transform duration-300"></i>
                <i className="fa-brands fa-linkedin cursor-pointer text-[15px] hover:text-black hover:scale-140 transition-transform duration-300"></i>
            </div>
        </div>
    </nav>
  )
}

export default Nav
