'use client'
import { useEffect } from 'react';
import { useAppContext } from '@/context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

const Nav = () => {
  const { user, setUser } = useAppContext();
  const { push } = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      fetchUser(authToken)
        .then((responseUser) => {
          setUser(responseUser);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setUser(undefined);
          localStorage.removeItem('authToken'); // Remove invalid token from local storage
        });
    }
  }, []);

  const fetchUser = async (token: string) => {
  try {
    if (!user || !user.user || !user.user.id) {
      throw new Error('User data is incomplete');
    }

    const response = await fetch(`http://127.0.0.1:8000/api/blog/${user.user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    throw error;
  }
};

  const handleSignOut = () => {
    setUser(undefined);
    localStorage.removeItem('authToken'); // Remove authentication token from local storage upon sign out
    push('/signin');
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <div>
        <Link href="/" className="text-white text-xl font-bold">Maccabi Tel Aviv</Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center invisible md:visible">
            <p className="text-white mr-4">Hello, {user.user.username}</p>
            <button onClick={handleSignOut} className="text-red-500 hover:text-blue-700">Sign Out</button>
          </div>
        ) : (
          <Link href="/signin">
            <p className="text-blue-500 mx-10 hover:text-blue-700">Sign In</p>
          </Link>
        )}
      </div>
      {user && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link href="/addblog">
            <p className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600">
              <FaPlus />
            </p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;