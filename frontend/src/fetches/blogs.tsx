export const getblogs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/blog")
      const data = response.json();
      return data;
    } catch (error) {
      return error;
    }

}

export const getEachblog = async (id:number) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/blog/${id}`)
    
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }

}
export const addBlogFetch = async (author:string,title:string,description:string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/blog`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author, title, description }),
    })
    
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }

}