import { CgShoppingCart } from "react-icons/cg";
import { HiOutlineHome } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="lg:flex">
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                            Open drawer
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-12">
                            {/* Sidebar content here */}
                            <NavLink className="flex items-center gap-2 mb-2" to="profile"><LuUser2 className="text-xl" /> Profile</NavLink>
                            <NavLink className="flex items-center gap-2 mb-2" to="order"> <RiMenuUnfold3Line className="text-xl" /> Order</NavLink>


                            <NavLink className="flex items-center gap-2 border-t-2 pt-3 mt-7 mb-2" to="/"><HiOutlineHome className="text-xl" />Home</NavLink>
                            <NavLink className="flex items-center gap-2" to="/shop"> <CgShoppingCart className="text-xl" />Shop</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;