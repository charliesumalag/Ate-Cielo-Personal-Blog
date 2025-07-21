import {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import image1 from "../assets/img/travel.jpg";
import image3 from "../assets/img/travel3.jpg";
import image2 from "../assets/img/travel4.jpg";
import Footer from './Footer';



const Blog = () => {
   const location = useLocation();
  const { slug } = useParams();
  const [blog, setBlog] = useState(location.state?.blog || null);

   useEffect(() => {
    if (!blog) {
      // Fallback: fetch post by slug
      fetch(`http://localhost:8000/api/posts/${slug}`)
        .then((res) => res.json())
        .then((data) => setBlog(data))
        .catch((err) => console.error('Failed to fetch blog:', err));
    }
  }, [slug, blog]);

   if (!blog) return <p className="p-6">Loading...</p>;

     const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  return (
    <div>
       <div className='flex flex-col gap-4 mb-6'>
        <h1 className='font-roboto text-[23px] font-bold text-center tracking-[0.8px] leading-[32px]'>{blog.title}</h1>
        <div className='flex justify-center items-center gap-3' >
          <h5 className='uppercase font-roboto font-bold text-[#333] text-[13px] leading-[16px] tracking-[0.6px]'> {blog.user.name}</h5>
          <p className='uppercase leading-[14px] tracking-[0.6px] font-roboto text-[11.5px] text-[#999]'>Travel</p>
          <p className='uppercase leading-[14px] tracking-[0.6px] font-roboto text-[11.5px] text-[#999]'>--{formattedDate}--</p>
        </div>
      </div>
      <div>
        <img src={blog.image_path ? `http://localhost:8000/storage/${blog.image_path}` : '/default-thumbnail.jpg'} alt="" className='rounded-2xl w-full'/>
      </div>
      <div className='flex flex-col justify-center gap-[21px] mt-8 font-lora text-[16px] leading-[29px] w-full text-[#222]'>
      {blog.description.split(/\n+/).map((para, idx) => (
  <p key={idx} className=" text-gray-800 leading-relaxed">
    {para}
  </p>
))}
        {/* <p className=''><span className='font-semibold'>It's no secret </span> {blog.description}</p> */}
      </div>
     <hr className="mt-8 border-t-1 border-gray-200" />

      <div className='mb-20'>
        <h2 className='text-[1.17em] font-lora font-bold mb-4'>3 comments</h2>
        <div className='flex gap-5 my-5'>
          <div className='overflow-hidden'>
            <img src={image1} alt="" className='w-[60px] h-[40px] rounded-[50%]' />
          </div>
          <div>
            <div>
              <h3 className='font-bold'>Charlie</h3>
              <span className='text-xs text-gray-400 mr-2'>May 22, 2015 at 7:49 am</span> <span className='text-xs font-medium cursor-pointer' >  Reply</span>
              <p className='font-lora text-[16px] leading-[29px] w-[75%] text-[#222]'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
            </div>
            <div className='flex gap-5 my-5'>
              <div className='overflow-hidden'>
                <img src={image1} alt="" className='w-[60px] h-[40px] rounded-[50%]' />
              </div>
              <div>
                <h3 className='font-bold'>Charlie</h3>
                <span className='text-xs text-gray-400 mr-2'>May 22, 2015 at 7:49 am</span> <span className='text-xs font-medium cursor-pointer' >  Reply</span>
                <p className='font-lora text-[16px] leading-[29px] w-[75%] text-[#222]'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-5 my-5'>
          <div className='overflow-hidden'>
            <img src={image1} alt="" className='w-[60px] h-[40px] rounded-[50%]' />
          </div>
          <div>
            <h3 className='font-bold'>Charlie</h3>
            <span className='text-xs text-gray-400 mr-2'>May 22, 2015 at 7:49 am</span> <span className='text-xs font-medium cursor-pointer' >  Reply</span>
            <p className='font-lora text-[16px] leading-[29px] w-[75%] text-[#222]'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
          </div>
        </div>
      </div>

      <hr className="mb-8 border-t-1 border-gray-200" />
      <div className='mt-8'>
        <h2 className='text-[1.17em] font-lora font-bold mb-4'>Related Post:</h2>
        <div className='flex gap-8 justify-center'>
          <div className='w-[33%]'>
            <div className='h-[200px] w-full'>
              <img className='rounded-2xl h-full transition-transform duration-300 hover:scale-105 cursor-pointer' src={image1} alt="" />
            </div>
            <h3 className='text-[14px] leading-[22px] font-lora tracking-[0.8px] font-bold my-3'>Exploring the Hidden Gems of Northern Italy</h3>
          </div>
          <div className='w-[33%]'>
            <div className='h-[200px] w-full'>
              <img className='rounded-2xl h-full w-full transition-transform duration-300 hover:scale-105 cursor-pointer' src={image2} alt="" />
            </div>
            <h3 className='text-[14px] leading-[22px] font-lora tracking-[0.8px] font-bold my-3'>Chasing Sunrises in Peru: A Backpacker's Guide to the Sacred Valley</h3>
          </div>
          <div className='w-[33%]'>
            <div className='h-[200px] w-full'>
              <img className='rounded-2xl w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer' src={image3} alt="" />
            </div>
            <h3 className='text-[14px] leading-[22px] font-lora tracking-[0.8px] font-bold my-3'>Exploring the Hidden Gems of Northern Italy</h3>
          </div>
        </div>
      </div>
      <hr className="mb-8 mt-4 border-t-1 border-gray-200" />
    </div>
  )
}

export default Blog
