import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from './Search';
import Dropdown from './Dropdown';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Nav = () => {
    const {user, setUser, setToken} = useContext(AppContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await fetch("/api/logout", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (res.ok) {
                console.log('logout successful');

               setToken(null);
                setUser(null);
                localStorage.removeItem('token');
                navigate('/')
            }


        } catch (err) {
            console.log('Error logging out', err);
        }

    }
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
            <div className='flex items-center justify-center gap-2 text-[#323232]'>
                <Search />
                <form action="">
                    {user ? <p className='cursor-pointer font-roboto text-[#323232] uppercase text-[12px] hover:text-[#FF374A] transition-all duration-200 ease-in'>{user.name}</p> : <Link to='login'><button className='cursor-pointer font-roboto text-[#323232] uppercase text-[12px] hover:text-[#FF374A] transition-all duration-200 ease-in'>Login</button></Link>}
                </form>
                {user &&
                    <form action="" onSubmit={handleSubmit} className='flex gap-2 items-center pl-6 text-gray-400 '>
                        <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
                        <button className='font-roboto text-sm hover:cursor-pointer'>Logout</button>
                    </form>
                }
            </div>

        </div>
    </nav>
  )
}

export default Nav
