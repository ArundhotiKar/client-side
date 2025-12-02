import { createBrowserRouter } from "react-router";
import HomePage from "../page/homePage";
import Register from "../page/Register";
import Login from "../page/Login";


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