import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';


const DashboardNav = () => {
    const {user, setUser, setToken} = useContext(AppContext);
    const navigate = useNavigate();


    const userNameFormat = (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

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
                navigate('/login')
            }


        } catch (err) {
            console.log('Error logging out', err);
        }

    }

  return (
    <nav className='bg-[#F8F8FA] flex flex-col justify-between text-black py-6 w-[350px] px-6 h-full'>
        <div className='w-full'>
            <div className='flex justify-between pr-2 pl-3 items-center mb-8'>
                <div className='flex gap-3 '>
                    <span><i className="fa-solid fa-blog text-[#013220]"></i></span>
                    {user ? (<h2 className='font-roboto  text-xl font-bold text-[#678579] tracking-[0.9px] '>Hi, {userNameFormat(user.name)}</h2>) : (<h2 className='font-roboto  text-xl font-bold text-[#678579] tracking-[0.9px] '>User</h2>)}

                </div>
                <span className='cursor-pointer'><i className="fa-solid fa-compress font-bold text-sm" ></i></span>
            </div>
            <ul className='flex flex-col mt-20 gap-6 w-full font-roboto'>
                <li className="w-full">
                    <NavLink
                        to="/dashboard" end
                        className={({ isActive }) =>
                            isActive
                            ? 'bg-green-900 text-white w-full px-4 py-3 block rounded-xl'
                            : 'w-full px-4 py-3 block rounded-xl'
                            }
                        > <span className='mr-2'><i className="fa-solid fa-house"></i></span> Dashboard
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        to="/dashboard/create"
                        className={({ isActive }) =>
                            isActive
                            ? 'bg-green-900 text-white w-full px-4 py-3 block rounded-xl'
                            : 'w-full px-4 py-3 block rounded-xl'
                        }>
                        <span className='mr-2'><i className="fa-solid fa-circle-plus text-lg"></i></span> New Post
                    </NavLink>
                </li>
                {/* <li className="w-full">
                    <NavLink
                        to="/dashboard/category"
                        className={({ isActive }) =>
                            isActive
                            ? 'bg-green-900 text-white w-full px-4 py-3 block rounded-xl'
                            : 'w-full px-4 py-3 block rounded-xl'
                        }>
                        <span className='mr-2'><i className="fa-solid fa-layer-group"></i></span> Category
                    </NavLink>
                </li> */}
                <li className="w-full">
                    <NavLink
                        to="/dashboard/mypost"
                        className={({ isActive }) =>
                            isActive
                            ? 'bg-green-900 text-white w-full px-4 py-3 block rounded-xl'
                            : 'w-full px-4 py-3 block rounded-xl'
                        }>
                        <span className='mr-2'><i className="fa-solid fa-clipboard-list text-lg"></i></span> My Post
                    </NavLink>
                </li>
            </ul>
        </div>
        <div className='flex flex-col gap-8'>
            {user && (<div className='flex items-center gap-2'>
                <img src={user.image_path ? `http://localhost:8000/storage/${user.image_path}`   : `http://localhost:8000/storage/${user.image_path}`} alt="" className='w-[50px] rounded-full' />
                <div>
                    {user ? (<p className='text-base font-roboto font-bold text-[#013220]'>{userNameFormat(user.name)}</p>) : (<p className='text-base font-roboto font-bold text-[#013220]'>User</p>)}

                    <p className='text-gray-400 text-sm font-roboto' >User</p>
                </div>
            </div>)}
            <Link to={'/'}>
                <div className='flex gap-2 items-center pl-6 text-gray-400 '>
                    <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
                    <button className='font-roboto text-sm hover:cursor-pointer'>Go to homepage</button>
                </div>
            </Link>
        </div>
    </nav>
  )
}

export default DashboardNav
