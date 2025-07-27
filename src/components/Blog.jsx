import {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import image1 from "../assets/img/travel.jpg";
import image3 from "../assets/img/travel3.jpg";
import image2 from "../assets/img/travel4.jpg";
import Footer from './Footer';



const Blog = () => {
  const location = useLocation();
  const { slug } = useParams();
  const [comments, setComments] = useState([]);
  const [blog, setBlog] = useState(location.state?.blog || null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const token = localStorage.getItem('token');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const res = await fetch(`/api/posts/${blog.id}/comments`, {
        method: 'POST',
        headers : {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        setContent('');
        fetchComments(); // <- this was missing
      } else {
        const errorData = await res.json();
        console.error("Validation error:", errorData);
        alert("Failed to submit comment.");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/comments/${commentId}/reply`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: replyContent }),
      });

      if (!res.ok) throw new Error('Failed to post reply');
      setReplyContent('');
      setReplyingTo(null);
      fetchComments(); // Refresh comments with new reply
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/posts/${blog.id}/comments`);
      const data = await res.json();
      setComments(data.comments);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  useEffect(() => {
  if (blog) {
    fetch(`/api/posts/${blog.id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments))
      .catch((err) => console.error('Failed to fetch comments:', err));
    }
  }, [blog]);

  useEffect(() => {
    if (!blog) {
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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        month: 'short',  // "Feb"
        day: '2-digit',  // "12"
        year: 'numeric', // "2025"
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,    // 12-hour format with am/pm
    });
  };



  return (
    <div>
      <div className='flex flex-col gap-4 mb-6'>
        <h1 className='font-roboto text-[23px] font-bold text-center tracking-[0.8px] leading-[32px]'>{blog.title}</h1>
        <div className='flex justify-center items-center gap-3'>
          <h5 className='uppercase font-roboto font-bold text-[#333] text-[13px] leading-[16px] tracking-[0.6px]'>{blog.user.name}</h5>
          <p className='uppercase text-[11.5px] text-[#999]'>Travel</p>
          <p className='uppercase text-[11.5px] text-[#999]'>--{formattedDate}--</p>
        </div>
      </div>

      <div>
        <img src={blog.image_path ? `http://localhost:8000/storage/${blog.image_path}` : '/default-thumbnail.jpg'} alt="" className='rounded-2xl w-full' />
      </div>


      <div className='mt-8 text-[#222] font-lora leading-[29px]'>
        {blog.description.split(/\n+/).map((para, idx) => (
          <p key={idx} className="mb-4">{para}</p>
        ))}
      </div>

      <hr className="mt-8 border-t border-gray-200" />


      <div className='mb-20 mt-8'>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-[1.17em] font-lora'>{comments.length} <span className='text-orange-900 underline'>comments</span></span>
          {/* <span><i className="fa-solid fa-thumbs-up text-blue-400 mr-1"></i> 3 Likes</span> */}
        </div>


        <form onSubmit={handleSubmit}>
          <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} className='w-full border border-gray-500 p-2 mb-2 rounded' placeholder='Write your comment...' ></textarea>
          <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">Comment</button>
        </form>


        {comments.map((comment) => (
          <div key={comment.id} className="mt-6">
            <div className="flex gap-4">
              <img src={comment.user.image_path ? `http://localhost:8000/storage/${comment.user.image_path}` : '/default-avatar.png'} alt="" className="w-[40px] h-[40px] rounded-full" />
              <div className="flex-1">
                <h3 className="font-bold">{comment.user.name}</h3>
                <span className="text-xs text-gray-400 mr-2">{formatDate(comment.created_at)}</span>
                <span className="text-xs font-medium cursor-pointer ml-2 text-blue-600" onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} > Reply </span>
                <p className="mt-1 font-lora text-[16px] text-[#222]">{comment.content}</p>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-10 border-l-2 border-gray-200 pl-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3 mb-4">
                        <img src={reply.user.image_path ? `http://localhost:8000/storage/${reply.user.image_path}` : '/default-avatar.png'} alt="" className="w-[35px] h-[35px] rounded-full" />
                        <div>
                          <h4 className="font-bold">{reply.user.name}</h4>
                          <span className="text-xs text-gray-400">{reply.created_at}</span>
                          <p className="text-gray-700">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {replyingTo === comment.id && (
                  <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-4 ml-10">
                    <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} className="w-full p-2 border border-gray-400 rounded" placeholder="Write a reply..." ></textarea>
                    <button type="submit" className="bg-green-600 text-white px-3 py-1 mt-1 rounded">Reply</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default Blog



      {/* <hr className="mb-8 border-t border-gray-200" />
      <div className='mt-8'>
        <h2 className='text-[1.17em] font-lora font-bold mb-4'>Related Post:</h2>
        <div className='flex gap-8 justify-center'>
          {[image1, image2, image3].map((img, i) => (
            <div key={i} className='w-[33%]'>
              <div className='h-[200px] w-full'>
                <img className='rounded-2xl h-full w-full hover:scale-105 transition-transform duration-300 cursor-pointer' src={img} alt="" />
              </div>
              <h3 className='text-[14px] leading-[22px] font-lora tracking-[0.8px] font-bold my-3'>Exploring Beautiful Places</h3>
            </div>
          ))}
        </div>
      </div> */}
