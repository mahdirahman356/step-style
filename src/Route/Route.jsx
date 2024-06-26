import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import SignUp from "../component/Login/SignUp";
import Profile from "../Dashboard/Profile/Profile";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import Shop from "../component/Shop/Shop";
import ShoesDetails from "../component/ShoesDetails/ShoesDetails";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import Orders from "../Dashboard/Orders/Orders";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/sign-up',
                element:<SignUp />
            },
            {
                path:'/shop',
                element:<Shop></Shop>
            },
            {
                path: "/shoes-details/:id",
                loader: ({params}) => fetch(`http://localhost:5000/shoes-details/${params.id}`),
                element:<PrivetRoute><ShoesDetails></ShoesDetails></PrivetRoute>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path: "profile",
                element:<PrivetRoute><Profile></Profile></PrivetRoute>
            },
            {
                path: "order",
                element:<PrivetRoute><Orders></Orders></PrivetRoute>
            },
        ]
    }
]);