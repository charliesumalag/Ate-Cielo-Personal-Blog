import React, { useState } from 'react'

const Create = () => {
  const [message, setMessage] = useState(null);
  const [author, setAuthor] = useState({})
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    slug: '',
    description: '',
    tags: '',
    image: null,
    published: false,
  })


  const handleChange = (e) => {
    const {name, value, files, type} = e.target;
     setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  }
   const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  const form = new FormData();
  form.append('category', formData.category);
  form.append('title', formData.title);
  form.append('slug', formData.slug);
  form.append('description', formData.description);
  form.append('tags', formData.tags);
  form.append('image', formData.image); // nullable
  form.append('published', formData.published ? 1 : 0);

  const res = await fetch('http://localhost:8000/api/post', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  const data = await res.json();
  if (!res.ok) {
    console.log('Validation errors:', data.errors);
    alert('Validation failed. Check console for details.');
  } else {
    setMessage(data.message)
    setFormData({
      category: '',
      title: '',
      slug: '',
      description: '',
      tags: '',
      image: null,
      published: false,
    })

  }
};


  return (
    <div className='w-full pr-12 '>
      <div className='flex justify-between items-center'>
        <h2 className='font-roboto font-bold text-[22px]'>Add Post</h2>
        {message && <p className='text-green-700 font-bold text-lg'>{message}</p>}
      </div>
      <form className='w-full mt-8 flex flex-col gap-6' onSubmit={handleSubmit}>
        <div className='w-full flex flex-col gap-1'>
          <label htmlFor="" className='font-roboto font-medium'>Category</label>
          <select name="category" id="" value={formData.category} className='w-full border border-gray-400 px-2 text-[15px] py-1 rounded-sm outline-none focus:border-green-700 text-gray-600' onChange={handleChange}>
            <option value="" disabled hidden>Select category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
        <div className='flex w-full  gap-4'>
          <div className='w-1/2 flex flex-col gap-1'>
            <label htmlFor="name" className='font-roboto font-medium'>Title</label>
            <input type="text" value={formData.title} className='w-full font-roboto border border-gray-400 px-2 py-1 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600' name='title' onChange={handleChange} />
          </div>
          <div className='w-1/2 flex flex-col gap-1'>
            <label htmlFor="name" className='font-roboto font-medium'>Slug</label>
            <input type="text" name='slug' value={formData.slug} className='w-full font-roboto border border-gray-400 px-2 py-1 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600' onChange={handleChange}/>
          </div>
        </div>
        <div>
          <div>
           <label htmlFor="name" className='font-roboto font-medium'>Description</label>
           <textarea type="text" name='description' value={formData.description} className='w-full border font-roboto border-gray-400 px-2 py-1 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600 min-h-[120px]' onChange={handleChange}/>
          </div>
        </div>
        <div className='flex w-full  gap-4'>
          <div className='w-1/2 flex flex-col gap-1'>
            <label htmlFor="name" className='font-roboto font-medium'>Image</label>
            <input type="file" name='image' className='w-full border font-roboto border-gray-400 px-2 py-1 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600' onChange={handleChange}/>
          </div>
          <div className='w-1/2 flex flex-col gap-1'>
            <label htmlFor="name" className='font-roboto font-medium'>Tags <span className='text-sm font-normal text-gray-500'>Separated by commas</span></label>
            <input type="text" name='tags' value={formData.tags} className='w-full border font-roboto border-gray-400 px-2 py-1 rounded-sm outline-none focus:border-green-700 text-[15px] text-gray-600'  placeholder='ex: food, japan, culture' onChange={handleChange}/>
          </div>
        </div>
        <div>
          <button className='px-4 py-1.5 bg-green-600 text-white font-roboto font-normal text-sm rounded-sm cursor-pointer hover:bg-green-700 transition-all duration-300 ease-in-out'>Save Post</button>
        </div>
      </form>
    </div>
  )
}

export default Create
