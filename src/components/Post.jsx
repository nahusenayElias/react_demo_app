import React, { useState } from 'react';
import postsData from '../db.json';

const Post = ({ post, onUpdate }) => (
  <div>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
    <p>Published: {post.published ? 'Yes' : 'No'}</p>
    <button onClick={() => onUpdate(post.id, !post.published)}>
      {post.published ? 'Unpublish' : 'Publish'}
    </button>
  </div>
);

const App = () => {
  const [posts, setPosts] = useState(postsData.posts);

  const handleUpdatePost = (postId, newPublishedStatus) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, published: newPublishedStatus } : post
    ));
  };

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <Post key={post.id} post={post} onUpdate={handleUpdatePost} />
      ))}
    </div>
  );
};

export default App;
 