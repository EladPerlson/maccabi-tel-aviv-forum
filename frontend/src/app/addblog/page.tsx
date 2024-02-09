'use client'
import { useAppContext } from '@/context';
import { addBlogFetch } from '@/fetches/blogs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const addBlog = () => {
    const { user } = useAppContext();
    const { push } = useRouter();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    let username = "Anonymous"
    if(user?.user.username != undefined){
         username = user.user.username;
    }
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log({ title, description });
        setTitle('');
        setDescription('');
        const blog = addBlogFetch(username,title,description)
        push(`http://localhost:3000`)
        console.log(blog);
      };    
    if(user == undefined){
        push("/")
    }
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">Add Blog</h1>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="title" className="block text-white font-bold mb-2">Title</label>
              <textarea
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter title"
                required
              />
            </div>
           
            <div className="mb-4">
              <label htmlFor="description" className="block text-white font-bold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter description"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    };
    
    export default addBlog;