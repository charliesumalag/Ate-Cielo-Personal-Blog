import React, {useEffect, useState, useContext} from 'react'
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const MyPost = () => {
  const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');
    const {user} = useContext(AppContext);


     const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/users/${user.id}/posts`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                const data = await res.json();
                console.log(data);
                setPosts(data);
            } catch (err) {
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };
    useEffect(() => {
        fetchPosts();
    }, [user]);

    function formatDate(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }




  return (
    <div>
      <h2 className='font-roboto font-bold text-[22px]'>My Post</h2>
      <table className="table-auto text-left border-separate border-spacing-y-4 border-spacing-x-2 w-full">
        <thead>
            <tr className="border-b border-gray-400">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Published At</th>
                <th className="px-4 py-2">Actions</th>
            </tr>
        </thead>
        <tbody>
            {posts.map((post) => (
            <tr key={post.id} className="bg-white shadow">
                <td className="px-4 py-2">{post.id}</td>
                <td className="px-4 py-2">{post.title}</td>
                <td className="px-4 py-2">{post.category}</td>
                <td className="px-4 py-2">{formatDate(post.created_at)}</td>
                <td className="px-4 py-2 flex gap-2">
                    <Link to={`update/${post.id}`} ><p className="text-green-900 cursor-pointer font-bold">Edit</p></Link>
                    <p className="text-red-900 cursor-pointer font-bold">Delete</p>
                </td>
            </tr>
            ))}
        </tbody>
    </table>


    </div>
  )
}

export default MyPost
