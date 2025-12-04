import { createBrowserRouter } from "react-router-dom";

import Register from "../page/Register";
import Login from "../page/Login";
import HomePage from "../page/homePage";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/Home";
import CategoryFilteredPage from "../page/CategoryFilteredPage";
import AddList from "../page/AddList";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      }, 
      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryFilteredPage />
      },
      {
        path: "/add-listing",
        element: <AddList></AddList>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }

]);

export default router;