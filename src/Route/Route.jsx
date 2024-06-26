import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import SignUp from "../component/Login/SignUp";
import Profile from "../component/Profile/Profile";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import Shop from "../component/Shop/Shop";
import ShoesDetails from "../component/ShoesDetails/ShoesDetails";

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
                path: "/profile",
                element:<PrivetRoute><Profile></Profile></PrivetRoute>
            },
            {
                path: "/shoes-details/:id",
                loader: ({params}) => fetch(`http://localhost:5000/shoes-details/${params.id}`),
                element:<PrivetRoute><ShoesDetails></ShoesDetails></PrivetRoute>
            }
        ]
    },
]);