import { useState } from 'react';


const PostForm = () => {
  
   const [title, setTitle] = useState('');  
   const [author, setAuthor] = useState('');  
   const [content, setContent] = useState('');  
   const [isPublished, setIsPublished] = useState('false');  
   const [date, setDate] = useState('');  
 

    const handleSubmit = (e) => {
      e.preventDefault();
      const postdata = { title, author, content, isPublished, date };

      fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(postdata)
      })
      .then(() => {
      console.log('data added');
      })
      
  
  }

  return (
    <div className="postform d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '30rem' }}>
        <h2 className="text-center mb-4">Add New Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="content">Content:</label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="isPublished"
              name="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isPublished">
              Published
            </label>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="date">Year:</label>
            <input
              type="number"
              className="form-control"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default PostForm;