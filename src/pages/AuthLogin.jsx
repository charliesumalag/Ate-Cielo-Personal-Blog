import React, {  useContext, useReducer, useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import { initialAuthState,  AuthLoginReducer} from "../reducers/AuthReducer";
import { AppContext } from '../context/AppContext';

const AuthLogin = () => {
    const {setToken} = useContext(AppContext)
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(AuthLoginReducer, initialAuthState)
    const [isHover, setIsHover] = useState(false);

    const handleChange =  (e) => {
        const {name, value} = e.target;
        dispatch({
            type: 'updateField',
            field: name,
            value: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

    // 1. Client-side validation
        const errs = {};
        if (!state.username) {
            errs.username = 'Username Required';
        }
        if (!state.password) {
            errs.password = 'Password Required';
        } else if (state.password.length < 4) {
            errs.password = 'Password must be at least 4 characters';
        }

        if (Object.keys(errs).length > 0) {
            dispatch({ type: 'setErrors', errors: errs });
            return;
        }else{
            dispatch({ type: 'submit' });
            try {
                const res = await fetch("/api/login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: state.username,
                        password: state.password
                    })
                });

                // console.log(state.errors);


                // 3. Check for server-side validation errors
                const data = await res.json();

                if (!res.ok) {
                    dispatch({
                        type: 'setErrors',
                        errors: data.errors
                    });
                    return;
                }
                console.log(data.token);

                setToken(data.token);
                localStorage.setItem("token", data.token);
                navigate('/');
            } catch (errs) {
                dispatch({
                    type: 'setErrors',
                    errors: { general: `.Something went wrong. Please try again. ${errs}` }
                });
            }
        }
    };

    return (
    <div className='flex flex-col justify-center items-center h-screen font-roboto '>
        <div className='w-[380px]'>
            <div className='mb-10 flex flex-col gap-2'>
                <h2 className='text-4xl font-bold tracking-wide text-[#013220]'>Login</h2>
                <p>Hi, Welcome back admin 👏</p>
            </div>
            <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                       <p className="text-red-500 text-sm">{state.errors.backerror}</p>
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' value={state.username}   onChange={handleChange}  placeholder='Enter your username' className='p-2 border border-gray-300 font-roboto rounded-md outline-0'  />
                    {state.errors.username && (
                        <p className="text-red-500 text-sm">{state.errors.username}</p>
                    )}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={state.password} onChange={handleChange} name='password' placeholder='Enter your password' className='p-2 border border-gray-300 font-roboto rounded-md outline-0' />
                    {state.errors.password && (
                        <p className="text-red-500 text-sm">{state.errors.password}</p>
                    )}
                </div>
                <div className='flex justify-between'>
                    <div className='flex flex-row-reverse gap-1 justify-center'>
                        <label htmlFor="">Remember Me</label>
                        <input type="checkbox" className='cursor-pointer'/>
                    </div>
                    <button className='text-[#013220] cursor-pointer'>Forgot Password?</button>
                </div>
                <button className='bg-[#013220] font-roboto tracking-widest text-white p-2 mt-6 rounded-md cursor-pointer'>Login</button>
                <NavLink to='/register' className='text-gray-500' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>Not registered yet?
                    <span className='text-[#013220] ml-1 cursor-pointer'>Create an account</span>
                    <span>
                        <i className={isHover ? 'fa-solid fa-arrow-up cursor-pointer rotate-45 text-[#013220] font-extralight text-xs pb-1.5 pr-3 ' : 'fa-solid fa-arrow-up rotate-45 cursor-pointer font-extralight text-[#013220] text-xs pb-1.5 pr-2 '}></i>
                    </span>
                </NavLink>
            </form>
        </div>
    </div>
  )
}

export default AuthLogin
