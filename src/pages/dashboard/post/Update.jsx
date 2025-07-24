import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate, useParams } from 'react-router-dom';


const Update = () => {
  const [message, setMessage] = useState(null);
  const [pending, setPending] = useState(false);
  const {id} = useParams()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    slug: '',
    description: '',
    tags: '',
    image: null,
    published: false,
  })

  async function getPost() {
    const res = await fetch(`/api/post/${id}`);
    const data = await res.json();
    if (res.ok) {
      setFormData({
      ...data.post,
    category: typeof data.post.category === 'object' ? data.post.category.name : data.post.category,
  });
    }
    console.log(data.post);

  }
  useEffect(() => {
    getPost();
  }, []);

   useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  const handleChange = (e) => {
    const {name, value, files, type} = e.target;
     setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const token = localStorage.getItem("token");

    const form = new FormData();
      form.append('category', formData.category);
      form.append('title', formData.title);
      form.append('slug', formData.slug);
      form.append('description', formData.description);
      form.append('tags', formData.tags);
      form.append('published', formData.published ? 1 : 0);
      form.append('_method', 'PUT');
      if (formData.image) {
        form.append('image', formData.image);
      }


  try {
    const res = await fetch(`/api/post/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });


    const data = await res.json();
    if (!res.ok) {
      console.log('Validation errors:', data.errors);
    }else{
      setMessage(data.message)
      navigate('/dashboard/mypost');
    }
  } catch (err) {
    console.error('Error submitting form:', err);
    alert('An error occurred.');
  } finally {
    setPending(false);
  }
};


  return (
    <>
      {!pending ? (<div className='w-full pr-12 '>
        <div className='flex justify-between items-center'>
          <h2 className='font-roboto font-bold text-[22px]'>Add Post</h2>
          {message && (<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Here is a gentle confirmation that your action was successful.
          </Alert>)}
        </div>
        <form className='w-full mt-8 flex flex-col gap-6' onSubmit={handleSubmit}>
          <div className='w-full flex flex-col gap-1'>
            <label htmlFor="" className='font-roboto font-medium'>Category</label>
            <select name="category" id="" value={formData.category} className='w-full border border-gray-400 px-2 text-[15px] py-2 rounded-sm outline-none focus:border-green-700 text-gray-600' onChange={handleChange}>
              <option value="" disabled hidden>Select category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
          <div className='flex w-full  gap-4'>
            <div className='w-1/2 flex flex-col gap-1'>
              <label htmlFor="name" className='font-roboto font-medium'>Title</label>
              <input type="text" value={formData.title} className='w-full font-roboto border border-gray-400 px-2 py-2 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600' name='title' onChange={handleChange} />
            </div>
            <div className='w-1/2 flex flex-col gap-1'>
              <label htmlFor="name" className='font-roboto font-medium'>Slug</label>
              <input type="text" name='slug' value={formData.slug} className='w-full font-roboto border border-gray-400 px-2 py-2 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600' onChange={handleChange}/>
            </div>
          </div>
          <div>
            <div>
            <label htmlFor="name" className='font-roboto font-medium'>Description</label>
            <textarea type="text" name='description' value={formData.description} className='w-full border font-roboto border-gray-400 px-2 py-2 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600 min-h-[120px]' onChange={handleChange}/>
            </div>
          </div>
          <div className='flex w-full  gap-4'>
            <div className='w-1/2 flex flex-col gap-1'>
              <label htmlFor="name" className='font-roboto font-medium'>Image</label>
              <input type="file" name='image'  className='w-full border font-roboto border-gray-400 px-2 py-2 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600' onChange={handleChange}/>
            </div>
            <div className='w-1/2 flex flex-col gap-1'>
              <label htmlFor="name" className='font-roboto font-medium'>Tags <span className='text-sm font-normal text-gray-500'>Separated by commas</span></label>
              <input type="text" name='tags' value={formData.tags} className='w-full border font-roboto border-gray-400 px-2 py-2 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600'  placeholder='ex: food, japan, culture' onChange={handleChange}/>
            </div>
          </div>
          <div>
            <button className='px-5 py-3 bg-green-900 text-white font-roboto font-bold tracking-[0.6px] rounded-lg text-sm  cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in-out'>Create Post</button>
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

export default Update
