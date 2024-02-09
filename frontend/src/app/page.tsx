'use client'
import Link from "next/link";
import { getblogs } from "@/fetches/blogs";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react"; 
import Image from "next/image";

export interface Blog {
  id: number;
  author: string;
  description: string;
  title: string;
}

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { user } = useAppContext();
  let isUserBlog = false
  useEffect(() => {
    const fetchData = async () => {
      const fetchedBlogs = await getblogs();
      setBlogs(fetchedBlogs);
      
    };

    fetchData(); 
  }, []);
  useEffect(() => {
    blogs.map((blog) => {
      console.log(blog.author);
      console.log(user?.user.username);
      if(blog.author == user?.user.username){
        isUserBlog = true;
      }
    })
  })
  return (
    <div className="bg-gray-900 min-h-screen text-white py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog: Blog) => (
          <div key={blog.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="mb-4">{blog.description.substring(0, 20)}...</p>
            </div>
            <div className="h-40 relative">
              <Image priority alt="maccabi tel aviv image" height={150} width={150} src={`/Maccabi_Tel_Aviv.png`}  
              className="rounded-b-lg mx-auto" />
            </div>
            <div className="p-4">
              {isUserBlog &&(
                <div>
                  <h1>fds</h1>
                  <button>delete</button>
                </div>
              )}
              <Link href={`/blog/${blog.id}`}>
                <p className="block bg-blue-600 mt-10 text-white py-2 px-4 rounded-md text-center">Read More</p>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;
