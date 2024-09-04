import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import SignUp from "../component/Login/SignUp";
import Profile from "../Dashboard/Profile/Profile";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import Shop from "../component/Shop/Shop";
import ShoesOrder from "../component/ShoesOrder/ShoesOrder";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import Orders from "../Dashboard/Orders/Orders";
import AllOrders from "../Dashboard/AllOrders/AllOrders";
import OrderDetails from "../Dashboard/OrderDetails/OrderDetails";
import AddProduct from "../Dashboard/AddProduct/AddProduct";
import AllProduct from "../Dashboard/AllProduct/AllProduct";
import ShoesDetails from "../Dashboard/ShoesDetails/ShoesDetails";
import ProductUpdate from "../Dashboard/ProductUpdate/ProductUpdate";
import Payment from "../Dashboard/Dashboard/Payment/Payment";
import PaymentHistory from "../Dashboard/PaymentHistory/PaymentHistory";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";

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
                path: "/shoes-order/:id",
                loader: ({params}) => fetch(`http://localhost:5000/shoes-details/${params.id}`),
                element:<PrivetRoute><ShoesOrder></ShoesOrder></PrivetRoute>
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
            {
                path: "/dashboard/order/payment/:id",
                loader: ({params}) => fetch(`http://localhost:5000/order/${params.id}`),
                element:<Payment></Payment>
            },
            {
                path: "all-orders",
                element: <AdminRoute><AllOrders></AllOrders></AdminRoute>
            },
            {
                path: "/dashboard/all-orders/order-details/:id",
                loader: ({params}) => fetch(`http://localhost:5000/order/${params.id}`),
                element: <AdminRoute><OrderDetails></OrderDetails></AdminRoute>
            },
            {
                path: "add-product",
                element:<AdminRoute><AddProduct></AddProduct></AdminRoute>
            },
            {
                path: "all-product",
                element:<AdminRoute><AllProduct></AllProduct></AdminRoute>
            },
            {
                path: "all-users",
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: "/dashboard/all-Product/shoes-details/:id",
                loader: ({params}) => fetch(`http://localhost:5000/shoes-details/${params.id}`),
                element:<AdminRoute><ShoesDetails></ShoesDetails></AdminRoute>
            },
            {
                path: "/dashboard/all-Product/product-update/:id",
                loader: ({params}) => fetch(`http://localhost:5000/shoes-details/${params.id}`),
                element:<AdminRoute><ProductUpdate></ProductUpdate></AdminRoute>
            },
            {
                path: "payment-history",
                element:<PrivetRoute><PaymentHistory></PaymentHistory></PrivetRoute>
            }
        ]
    }
]);