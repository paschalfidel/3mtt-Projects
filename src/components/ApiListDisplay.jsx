import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponents.jsx';
import '../styles/listStyles.css';

const ApiListDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading data...</div>;
  }

  if (error) {
    return <div className="error">Error fetching data: {error}</div>;
  }

  const renderPostItem = (post) => (
    <div className="post-item">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
    </div>
  );

  return (
    <div className="api-list-container">
      <h1>Omens Blog API Posts</h1>
      <ListComponent 
        items={data.slice(0, 10)}
        renderItem={renderPostItem}
        emptyMessage="No posts available"
        listClassName="post-list"
        itemClassName="post-list-item"
      />
    </div>
  );
};

export default ApiListDisplay;