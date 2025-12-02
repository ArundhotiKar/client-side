import { createBrowserRouter } from "react-router-dom";

import Register from "../page/Register";
import Login from "../page/Login";
import HomePage from "../page/homePage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
        {
            path: "/register",
            element: <Register></Register>
        },
        {
            path: "/login",
            element: <Login></Login>
        }
    ]
  }
    
]);

export default router;