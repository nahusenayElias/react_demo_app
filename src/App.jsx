import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Persons from "./routes/Persons.jsx";
import Root from "./routes/Root.jsx";
import Users from "./routes/Users.jsx";
import axios from "axios";
import Post from "./components/Post.jsx";

function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: "Margit", title: "CEO", age: 29, location: "Helsinki" },
    { id: 2, name: "Kati", title: "developer", age: 25, location: "NY" },
    { id: 3, name: "Karin", title: "designer", age: 45, location: "Tartu" },
  ]);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const togglePublished = async (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, published: !post.published } : post
    );
    setPosts(updatedPosts);

    try {
      await axios.patch(`http://localhost:3001/posts/${postId}`, {
        published: !posts.find((post) => post.id === postId).published,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
//Paths
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/users", element: <Users users={users} /> },
        { path: "/persons", element: <Persons persons={persons} /> },
        {
          path: "/post",
          element: <Post posts={posts} togglePublished={togglePublished} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
