import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//pages and components
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";
import Home from "./Pages/Home";

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
