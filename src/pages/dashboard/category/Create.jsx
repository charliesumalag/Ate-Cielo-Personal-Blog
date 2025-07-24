import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const Create = () => {
  const [message, setMessage] = useState(null);
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  })

   useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  const handleChange = (e) => {
    const [name, value] = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const token = localStorage.getItem("token");

  try {
    const res = await fetch('http://localhost:8000/api/post', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error("validation error");
    }else{
      setMessage(data.message)
      setFormData({
        name: '',
      })
    }
  } catch (err) {
    console.error('Error submitting form:', err);
  } finally {
    setPending(false);
  }
};

  return (
    <>
      {!pending ? (<div className='w-full pr-12 '>
        <div className='flex justify-between items-center'>
            <h2 className='font-roboto font-bold text-[22px]'>Add Category</h2>
            {message &&
                (<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Category Added Successfully
                </Alert>)
            }
        </div>
        <form className='w-full mt-8 flex flex-col ' onSubmit={handleSubmit}>
            <label htmlFor="" className='font-roboto font-medium'>Name</label>
            <div className='w-full flex items-center gap-2'>
                <input name="name" id="" value={formData.name} placeholder='category name' className='w-full border border-gray-400 px-2 text-[15px] py-2 rounded-sm outline-none focus:border-green-700 text-gray-600' onChange={handleChange}>
                </input>
                <div>
                    <button className='px-8 py-3 bg-green-900 text-white font-roboto font-bold tracking-[0.6px] rounded-lg text-sm  cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in-out'>Save</button>
                </div>
            </div>

        </form>
        </div>) :  (
            <div>
                <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
          </div>
        )}
    </>
  )
}

export default Create
