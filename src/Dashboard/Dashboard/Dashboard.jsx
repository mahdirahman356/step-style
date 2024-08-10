import { BsCardText } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import { HiOutlineHome } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineChecklist } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const Admin = false
    return (
        <div className="lg:flex">
            <div>
                <div className="drawer lg:drawer-open fixed lg:relative lg:w-72 z-20">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                            Open drawer
                        </label>
                    </div>
                    <div className="drawer-side z-20">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-12 fixed">
                            {/* Sidebar content here */}
                            {Admin
                                ? <><NavLink className="flex items-center gap-2 mb-3" to="profile"><LuUser2 className="text-xl" />Admin Profile</NavLink>
                                    <NavLink className="flex items-center gap-2 mb-3" to="all-orders"> <MdOutlineChecklist className="text-xl" />All Orders</NavLink>
                                    <NavLink className="flex items-center gap-2 mb-3" to="add-Product"> <BsCardText className="text-xl" />Add product</NavLink>
                                    <NavLink className="flex items-center gap-2 mb-3" to="all-Product"> <TbListDetails className="text-xl" />All product</NavLink>
                                </>
                                :
                                <><NavLink className="flex items-center gap-2 mb-3" to="profile"><LuUser2 className="text-xl" /> Profile</NavLink>
                                  <NavLink className="flex items-center gap-2 mb-3" to="order"> <TbListDetails className="text-xl" />My Orders</NavLink></>
                            }


                            <NavLink className="flex items-center gap-2 border-t-2 pt-3 mt-7 mb-3" to="/"><HiOutlineHome className="text-xl" />Home</NavLink>
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