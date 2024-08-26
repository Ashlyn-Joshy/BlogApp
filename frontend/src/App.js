import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//pages and components
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";
import Home from "./Pages/Home";
import BlogHome from "./Pages/BlogHome";
import SingleBlog from "./Pages/SingleBlog";
import AddBlog from "./Pages/AddBlog";

const AppComponent = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footbar />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/featuredblogs",
        element: <BlogHome />,
      },
      {
        path: "/featuredblogs/:id",
        element: <SingleBlog />,
      },
      {
        path: "/addblog",
        element: <AddBlog />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
