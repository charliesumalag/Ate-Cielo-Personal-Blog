import React, { useContext, useState } from 'react'
import { useReducer } from 'react'
import { authRegisterInitialState,  authRegisterReducer} from "../reducers/AutRegisterReducer";
import { useNavigate, NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const AuthRegister = () => {
  const {setToken} = useContext(AppContext);
  const [state, dispatch] = useReducer(authRegisterReducer, authRegisterInitialState);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e)  => {
     e.preventDefault();

    const errs = {};
    if (!state.name) {
      errs.name = 'Name Required';
    }
    if (!state.username) {
      errs.username = 'Username Required';
    }
    if (!state.password) {
      errs.password = 'Password Required';
    } else if (state.password.length < 4) {
      errs.password = 'Password must be at lease 4 character';
    }
    if (!state.password_confirmation) {
      errs.password_confirmation = 'Confirm Password Required'
    }else if (state.password_confirmation.length < 4) {
      errs.password_confirmation = 'Confirm Password must be at lease 4 character';
    }

    if (state.password !== state.password_confirmation) {
      errs.password_confirmation = 'Pasword Confirmation do not match';
    }

    if (Object.keys(errs).length > 0) {
     dispatch({
      type: 'setErrors',
      errors: errs,
     });
    }else{
      console.log('form submitted');

      // saving to database
      try {
        const res = await fetch("/api/register", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: state.name,
            username: state.username,
            password: state.password,
            password_confirmation : state.password_confirmation
          })
        })
        const data = await res.json();
        if (!res.ok) {
          dispatch({
            type: 'setErrors',
            errors: data.errors,
          });
          return;
        }
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/")
      } catch (err) {
        dispatch({
          type: 'setErrors',
          errors: { general: 'Something went wrong. Please try again.' }
        });
      }
    }

  }
  const handleChange =  (e) => {
    const {name, value} = e.target;
    dispatch({
      type: 'updateField',
      field: name,
      value: value
    })
  }

  console.log(state);

  return (
    <div className='flex flex-col justify-center items-center h-screen font-roboto '>
        <div className='w-[380px]'>
            <div className='mb-10 flex flex-col gap-2'>
                <h2 className='text-4xl font-bold tracking-wide text-[#013220]'>Register</h2>
                <p>Create an account👏</p>
            </div>
            <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                       <p className="text-red-500 text-sm">{}</p>
                    <label htmlFor="username">Name</label>
                    <input type="text" name='name' value={state.name}   onChange={handleChange}  placeholder='Enter your name' className='p-2 border border-gray-300 font-roboto rounded-md outline-0'  />
                    {state.errors.name && (
                        <p className="text-red-500 text-sm">{state.errors.name}</p>
                    )}
                </div>
                <div className='flex flex-col gap-1'>
                       <p className="text-red-500 text-sm">{}</p>
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
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password_confirmation">Password</label>
                    <input type="password" value={state.password_confirmation}  onChange={handleChange} name='password_confirmation' placeholder='Conirm Password' className='p-2 border border-gray-300 font-roboto rounded-md outline-0' />
                    {state.errors.password_confirmation && (
                        <p className="text-red-500 text-sm">{state.errors.password_confirmation}</p>
                    )}
                </div>
                <button className='bg-[#013220] font-roboto tracking-widest text-white p-2 mt-6 rounded-md cursor-pointer'>Register</button>
                <NavLink to='/login' className='text-gray-500' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>Already have an account?
                    <span className='text-[#013220] ml-1 cursor-pointer'>Login</span>
                    <span>
                        <i className={isHover ? 'fa-solid fa-arrow-up cursor-pointer rotate-45 text-[#013220] font-extralight text-xs pb-1.5 pr-3 ' : 'fa-solid fa-arrow-up rotate-45 cursor-pointer font-extralight text-[#013220] text-xs pb-1.5 pr-2 '}></i>
                    </span>
                </NavLink>
            </form>
        </div>
    </div>
  )
}

export default AuthRegister
