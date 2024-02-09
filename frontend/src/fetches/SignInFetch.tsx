


const SignInFetch = async(username: string,  password: string) => {
    try {
      const response = await fetch(' http://127.0.0.1:8000/api/blog/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,password}),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Sign-in failed');
        return null;
      }
    } catch (error) {
      console.error('Error during sign-in fetch', error);
      throw error;
    }
  };

export default SignInFetch;
