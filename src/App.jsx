import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home.jsx';
import About from './routes/About.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Persons from './routes/Persons.jsx';
import Root from './routes/Root.jsx';
import Users from './routes/Users.jsx';
import axios from 'axios';
import PostForm from './components/PostForm.jsx'

function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Margit', title: 'CEO', age: 29, location: 'Helsinki' },
    { id: 2, name: 'Kati', title: 'developer', age: 25, location: 'NY' },
    { id: 3, name: 'Karin', title: 'designer', age: 45, location: 'Tartu' },
  ]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
      setUsers(res.data);
     });
  }, []);

  const [postform, setPostform] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5173/postform")
      .then((res) => {
        setPostform(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setPublishedStatus = (id, togglePub) => {
    const findPost = posts.find((post) => post.id === id); //find post by id
    const updateStatus = { ...findPost, published: !togglePub }; //combine found post with toggleable published boolean state in a new object

    axios
      .put(`http://localhost:5173/postform/${id}`, updateStatus) //axios updates published status to a post by id
      .then((res) => {
        setPostform(
          posts.map((post) =>
            postform.id === id ? { ...postform, published: !togglePub } : post //go through posts, if id found then go into post object and toggle published state
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        {path: '/users', element: <Users users={users}/>},
        { path: '/persons', element: <Persons persons={persons} /> },
        { path: '/postform', element: <PostForm postform={PostForm} /> },
        
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
