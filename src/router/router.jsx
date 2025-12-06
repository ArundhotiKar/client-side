import { createBrowserRouter } from "react-router-dom";

import Register from "../page/Register";
import Login from "../page/Login";
import HomePage from "../page/homePage";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/Home";
import CategoryFilteredPage from "../page/CategoryFilteredPage";
import AddList from "../page/AddList";
import ListDetailsPage from "../page/ListDetailsPage";
import PetSupplyPage from "../page/PetSupplyPage";
import MyLists from "../page/MyLists";
import UpdateList from "../page/UpdateList";
import PrivateRoute from "./PrivateRoute";
import MyOrders from "../page/MyOrders";


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
      },
      {
        path: "/listing/:id",
        element: <PrivateRoute><ListDetailsPage></ListDetailsPage></PrivateRoute> 
      },
      {
        path: "/pets",
        element: <PetSupplyPage></PetSupplyPage>
      },
      {
        path: "/my-lists",
        element: <MyLists></MyLists>
      },
      {
        path: "/update-list/:id",
        element: <UpdateList></UpdateList>
      },
      {
        path: "/my-orders",
        element:<MyOrders></MyOrders>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }

]);

export default router;