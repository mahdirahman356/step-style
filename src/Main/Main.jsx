import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Main = () => {
    const location = useLocation()
    let hideNavbaerAndFooter = location.pathname.includes('/login') || location.pathname.includes('/sign-up')
    return (
        <div>
            {hideNavbaerAndFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;