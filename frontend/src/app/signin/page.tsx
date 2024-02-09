'use client'
import { UserInterface, useAppContext } from '@/context';
import SignInFetch from '@/fetches/SignInFetch';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useAppContext();
  const { push } = useRouter();

  const handelForm = (e: React.FormEvent) => {
    e.preventDefault();
    SignInFetch(username, password)
      .then((responseUser: UserInterface) => {
        if (username === responseUser.user.username) {
          setUser(responseUser);
          localStorage.setItem('authToken', responseUser.token);
          push('/'); 
        } else {
          alert("This user does not exist");
        }
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        alert("This user does not exist");
      });
  };

  return (
    <div className="text-white p-4 sm:w-1/2 py-20 px-8 mx-auto mt-10">
      <h1>{user?.user.username}</h1>
      <form className='flex flex-col justify-center align-middle' onSubmit={handelForm}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-md"
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-md"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
