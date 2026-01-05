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
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Dashboard/Profile";
import Community from "../Dashboard/Community";
import DashboardAnalytics from "../Dashboard/DashboardAnalytics";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        handle: { title: 'Home — PawMart' }
      },
      {
        path: "/register",
        element: <Register></Register>,
        handle: { title: 'Register — PawMart' }
      },
      {
        path: "/login",
        element: <Login></Login>,
        handle: { title: 'Login — PawMart' }
      },
      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryFilteredPage />,
        handle: { title: (match) => `${match.params?.categoryName || 'Category'} — PawMart` }
      },
      {
        path: "/add-listing",
        element: <AddList></AddList>,
        handle: { title: 'Add Listing — PawMart' }
      },
      {
        path: "/listing/:id",
        element: <PrivateRoute><ListDetailsPage></ListDetailsPage></PrivateRoute>,
        handle: { title: (match) => `Listing ${match.params?.id ? '(' + match.params.id + ')' : ''} — PawMart` }
      },
      {
        path: "/pets",
        element: <PetSupplyPage></PetSupplyPage>,
        handle: { title: 'Pets & Supplies — PawMart' }
      },
      {
        path: "/my-lists",
        element: <MyLists></MyLists>,
        handle: { title: 'My Listings — PawMart' }
      },
      {
        path: "/update-list/:id",
        element: <UpdateList></UpdateList>,
        handle: { title: (match) => `Update Listing ${match.params?.id || ''} — PawMart` }
      },
      {
        path: "/my-orders",
        element: <MyOrders></MyOrders>,
        handle: { title: 'My Orders — PawMart' }
      },
      {
        path: "/my-profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
        handle: { title: 'My Profile — PawMart' }
      }
      ,
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          { index: true, element: <DashboardAnalytics /> },
          { path: "profile", element: <Profile /> },
          { path: "community", element: <Community /> },
          { path: "analytics", element: <DashboardAnalytics /> }
        ],
        handle: { title: 'Dashboard — PawMart' }
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
    handle: { title: '404 — Page Not Found' }
  }

]);

export default router;