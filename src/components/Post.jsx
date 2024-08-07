import React from "react";

const Post = ({ posts, togglePublished }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.author}</p>
          <p>Published: {post.published ? "true" : "false"}</p>
          <button onClick={() => togglePublished(post.id)}>toggle</button>
        </div>
      ))}
    </div>
  );
};

export default Post;
