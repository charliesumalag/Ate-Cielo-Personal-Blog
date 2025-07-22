import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from './Search';
import Dropdown from './Dropdown';
import { useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Nav = () => {
    const {user, setUser, setToken} = useContext(AppContext);
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();

    const handleOpenProfile = () => {
        setOpenProfile((prev) => !prev);
    }


    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target)
            ){
                setOpenProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e) => {
        setOpenProfile(false);
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
            <div className='flex items-center justify-center gap-2 text-[#323232] relative'>
                <Search />
                <div className='' ref={dropdownRef}>
                    {(openProfile && user) &&
                        <ul className=" before:content-[''] before:absolute before:top-[-0.7rem] before:right-[1.1rem] before:w-[20px] before:h-[20px] before:rotate-45 before:bg-white before:border-t before:border-l before:border-gray-400 flex flex-col gap-2 p-[15px] border border-gray-400 absolute rounded-[8px] w-[150px] top-[60px] right-[-5px]  bg-white font-roboto text-[12px] leading-[1.7em]  tracking-[0.6px ">
                            <li className='cursor-pointer text-black font-medium uppercase hover:text-[#FF374A] transition-colors duration-300 ease-in-outs' onClick={handleOpenProfile}>Post Dashboard</li>
                           <Link to="editprofile">
                                <li className='cursor-pointer text-black font-medium uppercase hover:text-[#FF374A] transition-colors duration-300 ease-in-out' onClick={handleOpenProfile}>Edit Profile</li>
                           </Link>
                            <li>
                                <form action="" onSubmit={handleSubmit} className='flex gap-2 items-center text-gray-400 '>
                                    <button   className='cursor-pointer text-black font-medium uppercase hover:text-[#FF374A] transition-colors duration-300 ease-in-out'>Log-out</button>
                                </form>
                            </li>
                        </ul>
                }
                </div>

                <div>
                    {user ? (<div className='flex justify-center items-center gap-2'>
                        <span className='cursor-pointer font-roboto text-[#323232] uppercase text-[12px] '>Hi, {user.name}</span>
                        <img onClick={handleOpenProfile} src={user.image_path ? `http://localhost:8000/storage/${user.image_path}`   : `http://localhost:8000/storage/${user.image_path}`} className='w-8 h-8 cursor-pointer rounded-full'/> </div>)  : <Link to='login'><button  onClick={() => setOpenProfile(false)} className='cursor-pointer font-roboto text-[#323232] uppercase text-[12px] hover:text-[#FF374A] transition-all duration-200 ease-in'>Login</button></Link>}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Nav
