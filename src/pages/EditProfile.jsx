import React, {  useContext, useReducer, useState } from 'react'
import { initialEditProfileState,  EditProfileReducer} from "../reducers/EditProfileReducer";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const {token} = useContext(AppContext);
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(EditProfileReducer, initialEditProfileState);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', state.name);

        if (state.image instanceof File) {
            formData.append('image', state.image);
        }
        formData.append('_method', 'PUT');
          console.log('Submitting name:', state.name);
          const res = await fetch('/api/updateprofile', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

         const data = await res.json();
        if (res.ok) {
            console.log('Profile updated');
            dispatch({ type: 'submitSuccess' }); // clear loading/errors
            navigate('/');
        } else if (res.status === 422) {
            dispatch({ type: 'setErrors', errors: data.errors });
            console.error('Validation errors:', data.errors);
        } else {
            console.error('Unexpected error:', data);
        }


    }
    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        dispatch({
            type: 'updateField',
            field: name,
            value: type === 'file' ? files[0] : value,
        });
    };

    return (
    <div className='flex flex-col justify-center items-center mt-44 font-roboto '>
        <div className='w-[380px]'>
            <div className='mb-6 flex flex-col gap-2'>
                <h2 className='text-xl font-bold tracking-wide text-[#013220]'>Edit Profile</h2>
            </div>
            <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                       <p className="text-red-500 text-sm">{state.errors.backerror}</p>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={state.name}   onChange={handleChange}  placeholder='Enter your new name' className='p-2 border border-gray-300 font-roboto rounded-md outline-0'  />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Profile Picture</label>
                    <input type="file" name="image"  className='p-2 border border-gray-300 font-roboto rounded-md outline-0 w-full'  onChange={handleChange}/>
                </div>
                {state.errors.name && ( <p className="text-red-500 text-sm">{state.errors.name[0]}</p>)}
                {state.errors.image && ( <p className="text-red-500 text-sm">{state.errors.image[0]}</p> )}
                <button className='bg-green-900 font-roboto tracking-widest text-white p-2 mt-6 rounded-md cursor-pointer hover:bg-green-600 duration-300 transition-all ease-in-out'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfile
