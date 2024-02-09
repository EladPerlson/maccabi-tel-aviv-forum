'use client'
import { getEachblog } from '@/fetches/blogs';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Blog } from '@/app/page';

const InfoBlog = () => {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = Number(parts[parts.length - 1]);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBlog = await getEachblog(id);
      if (id === fetchedBlog.id) {
        setBlog(fetchedBlog);
      }
    };
    fetchData();
  }, [id]);

  const formatDescription = (description: string) => {
    const chunks = [];
    const maxChars = 500;
    let processedChars = 0;

    for (let i = 0; i < description.length; i += 100) {
      chunks.push(description.substring(i, i + 100));
      processedChars += 40;
    }
    return chunks.join("<br>");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg p-6 shadow-md">
        {blog ? (
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 text-center">{blog.title}</h1>
            <p className="text-gray-300"><strong>By:</strong> {blog.author}</p>
            <p className="text-gray-300 text-center text-lg tracking-wide leading-relaxed"
             dangerouslySetInnerHTML={{ __html: formatDescription(blog.description) }} />
          </div>
        ) : (
          <h2 className="text-white">Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default InfoBlog;
