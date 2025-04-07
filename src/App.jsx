import { useState, useEffect } from 'react';
import ListComponent from './components/ListComponent';
import './App.css';




function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Something went wrong!');
      const data = await response.json();
      setPosts(data.slice(0, 10)); // Just get first 10
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div className="App">
        <h1>📃 Omens Blog - Posts</h1>
        <ListComponent
          items={posts}
          renderItem={(post) => (
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          )}
          />
      </div>
  );
};

export default App
