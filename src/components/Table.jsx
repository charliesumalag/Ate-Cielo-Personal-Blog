import react from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';






export default function ColumnGroupingTable() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');

    const {user} = useContext(AppContext)
    useEffect(() => {
        if (!user?.id) return;
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/users/${user.id}/posts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const data = await res.json();
                console.log(data);

                setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

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
                    <p className="text-green-900 cursor-pointer font-bold">Edit</p>
                    <p className="text-red-900 cursor-pointer font-bold">Delete</p>
                </td>

            </tr>
            ))}
        </tbody>
    </table>
  );
}
