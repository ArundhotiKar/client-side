import { createBrowserRouter } from "react-router-dom";

import Register from "../page/Register";
import Login from "../page/Login";
import HomePage from "../page/homePage";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/Home";
import CategoryFilteredPage from "../page/CategoryFilteredPage";


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
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }

]);

export default router;