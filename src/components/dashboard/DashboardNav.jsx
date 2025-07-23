import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';


const DashboardNav = () => {
    const {user, setUser, setToken} = useContext(AppContext);
    const navigate = useNavigate();
    console.log(user);

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
    const [activeMenu, setActiveMenu] = useState(false);
    const handleMenuClick = (menu) => {
        setActiveMenu(prev => (prev === menu ? null : menu));
    };
  return (
    <nav className='bg-[#F8F8FA] flex flex-col justify-between text-black py-6 w-[350px] px-6 h-full'>
        <div className='w-full'>
            <div className='flex justify-between pr-2 pl-3 items-center mb-8'>
                <div className='flex gap-3 '>
                    <span><i className="fa-solid fa-blog text-[#013220]"></i></span>
                    {user ? (<h2 className='font-roboto  text-xl font-bold text-[#678579] tracking-[0.9px] '>{userNameFormat(user.name)}</h2>) : (<h2 className='font-roboto  text-xl font-bold text-[#678579] tracking-[0.9px] '>User</h2>)}

                </div>
                <span className='cursor-pointer'><i className="fa-solid fa-compress font-bold text-sm" ></i></span>
            </div>
            <ul className='flex flex-col gap-3 w-full font-roboto'>
                <li className='flex gap-2 w-full text-gray-700 text-[14px]'>
                    <NavLink onClick={() => setActiveMenu(null)} className={({isActive}) => isActive ? 'bg-[#E2F0ED] w-full px-4 py-1 text-[#013220] font-medium' : ' w-full px-4 py-1 ' } to='/dashboard'><span><i className="fa-solid fa-border-all mr-2 text-gray-500"></i></span>Dashboard</NavLink>
                </li>
                <li className='flex flex-col gap-2 w-full text-gray-700 text-[14px]'>
                    <NavLink onClick={() => handleMenuClick('post')} className={({isActive}) => isActive ? ' w-full px-4 py-1 font-medium text-[#013220]' : 'w-full px-4 py-1 '}><span className='mr-2'><i className="fa-solid fa-list"></i></span>Posts</NavLink>
                    {activeMenu === 'post' && (
                        <ul className='pl-12 text-gray-400 w-full  text-[13px]'>
                        <li className='w-full'>
                            <NavLink to='create' onClick={() => setActiveMenu('post')} className={({isActive}) => isActive ? 'bg-[#E2F0ED] w-full px-4 block py-1 font-medium text-[#013220]' : 'w-full px-4 py-1 block '}><span className='mr-2'><i className="fa-solid fa-plus"></i></span>Create Post</NavLink>
                        </li>
                    </ul>
                    )}
                </li>
                <li className='flex gap-2 w-full text-gray-700 text-[14px]'>
                    <NavLink to='/categories' className={({isActive}) => isActive ? 'bg-[#E2F0ED] w-full px-4 py-1 font-medium text-[#013220]' : 'w-full px-4 py-1 '}><span className='mr-2 text-gray-500'><i className="fa-solid fa-layer-group"></i></span>Categories</NavLink>
                </li>
                <li className='flex gap-2 w-full text-gray-700 text-[14px]'>
                    <NavLink to='/settings' className={({isActive}) => isActive ? 'bg-[#E2F0ED] w-full px-4 py-1 font-medium text-[#013220]' : 'w-full px-4 py-1 '}><span className='mr-2 text-gray-500'><i className="fa-solid fa-gear"></i></span>Settings</NavLink>
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

            <form action="" onSubmit={handleSubmit} className='flex gap-2 items-center pl-6 text-gray-400 '>
                <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
                <button className='font-roboto text-sm hover:cursor-pointer'>Logout</button>
            </form>
        </div>
    </nav>
  )
}

export default DashboardNav
