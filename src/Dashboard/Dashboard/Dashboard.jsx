import { BsCardText } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import { HiOutlineHome } from "react-icons/hi";
import { LuHistory, LuUser2 } from "react-icons/lu";
import { MdOutlineChecklist } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { FaChevronRight } from "react-icons/fa";

const Dashboard = () => {
    const [isAdmin] = useAdmin()
    console.log(isAdmin)
    return (
        <div className="lg:flex">
            <div>
                <div className="drawer lg:drawer-open fixed lg:relative lg:w-72 z-20">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex ">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn bg-[#1A2130] border-none text-white rounded-r-3xl rounded-l-none drawer-button lg:hidden">
                            Open drawer
                            <FaChevronRight />
                        </label>
                    </div>
                    <div className="drawer-side z-20">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-[#1A2130] text-white min-h-full w-72 p-12 fixed">
                            {/* Sidebar content here */}
                            <NavLink className={({ isActive }) => isActive ? "text-black bg-white py-3 px-4 rounded-3xl flex items-center gap-2 mb-7" : "text-white flex items-center gap-2 mb-7"} to="profile"><LuUser2 className="text-xl" />Profile</NavLink>
                            {isAdmin
                                ? <>
                                    <NavLink className={({ isActive }) => isActive ? "text-black bg-white py-3 px-4 rounded-3xl flex items-center gap-2 mb-7" : "text-white flex items-center gap-2 mb-7"} to="all-orders"> <MdOutlineChecklist className="text-xl" />All Orders</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? "text-black bg-white py-3 px-4 rounded-3xl flex items-center gap-2 mb-7" : "text-white flex items-center gap-2 mb-7"} to="add-product"> <BsCardText className="text-xl" />Add product</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? "text-black bg-white py-3 px-4 rounded-3xl flex items-center gap-2 mb-7" : "text-white flex items-center gap-2 mb-7"} to="all-product"> <TbListDetails className="text-xl" />All product</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? "text-black bg-white py-3 px-4 rounded-3xl flex items-center gap-2 mb-7" : "text-white flex items-center gap-2 mb-7"} to="all-users"> <PiUsersThree className="text-xl" />All Users</NavLink>
                                </>
                                :
                                <>
                                    <NavLink className={({ isActive }) => isActive ? "text-black bg-white py-3 px-4 rounded-3xl flex items-center gap-2 mb-7" : "text-white flex items-center gap-2 mb-7"} to="order"> <TbListDetails className="text-xl" />My Orders</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? "text-black bg-white py-3 px-4 rounded-3xl flex items-center gap-2 mb-7" : "text-white flex items-center gap-2 mb-7"} to="payment-history"> <LuHistory className="text-xl" />Payment History</NavLink>
                                </>
                            }


                            <NavLink className="flex items-center gap-2 border-t-2 pt-7 mb-7" to="/"><HiOutlineHome className="text-xl" />Home</NavLink>
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