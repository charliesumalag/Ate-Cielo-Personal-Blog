import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import HomeBlogContent from "./HomeBlogContent";
import {useSearch} from '../context/SearchContext'
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/post');
        if (!res.ok) throw new Error(`HTTP Error! Status : ${res.status}`);
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Failed to fetch posts' , error);
      }
    }
    fetchPost();
  }, []);


  const {searchInput, setSearchInput} = useSearch();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;



  const filteredBlog = posts.filter((blog) => blog.title.toLowerCase().includes(searchInput.toLowerCase()) || blog.tags.split(',').some(tag => tag.toLowerCase().includes(searchInput.toLowerCase())));


  const displayBlog = filteredBlog.slice(pagesVisited, pagesVisited + postsPerPage).map((blog) => {
     const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const tags = blog.tags.split(',');


    return (
      <div className='flex gap-6 text-xl' key={blog.id} >
        <div className='w-[30%]'>
          <Link to={`/blog/${blog.slug}`}   state={{ blog }} key={blog.id}>
            <img src={blog.image_path ? `http://localhost:8000/storage/${blog.image_path}` : '/default-thumbnail.jpg'} loading='lazy' alt="" className='rounded-2xl w-full h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer'  />
          </Link>
        </div>
        <HomeBlogContent publishedAt={blog.published_at}  title={blog.title} blog={blog} date={formattedDate} category={blog.category} author={blog.user.name} slug={blog.slug} tags={tags} content={blog.description}  />
      </div>


    )
  });

  const pageCount = Math.ceil(filteredBlog.length / postsPerPage);

  const changePage = ({selected}) => {
    setLoading(true);
    setTimeout(() => {
      setPageNumber(selected);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {loading ? (
          <div> Loading ....</div>
        ) : (
          <div className='my-5 font-lora w-full flex flex-col gap-8'>
            {displayBlog}
          </div>
        )
      }
      <div className="my-10 flex justify-left">
        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="flex space-x-2"
          pageClassName="font-roboto text-[12px]"
          pageLinkClassName="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 hover:text-black"
          activeLinkClassName="bg-[#FF374A] text-white"
          previousClassName="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200"
          previousLinkClassName="w-full h-full flex items-center justify-center"
          nextClassName="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200"
          nextLinkClassName="w-full h-full flex items-center justify-center"
          disabledClassName="opacity-30 cursor-not-allowed"
        />
      </div>
    </>
  )
}

export default Home
