import { NavLink } from "react-router-dom";
import profile from "../assets/image/user.avif"
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { VscSignOut } from "react-icons/vsc";
import "../style.css"
import { PiShoppingCartLight } from "react-icons/pi";
import useOrders from "../Hooks/useOrders";
import useAdmin from "../Hooks/useAdmin";
const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext)

  const [order] = useOrders()
  const [isAdmin] = useAdmin()

  const handleSignOut = () => {
    userLogOut()
      .then(() => {
        console.log("Sign Out")
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  let changeNavbarColor = location.pathname.includes('/shop')

  console.log(changeNavbarColor)
  return (
    <div className={`relative z-10 w-full bg-transparent bg-black ${changeNavbarColor ? "text-black" : "text-white"}`}>
      <div className="navbar absolute	w-[95%] md:w-[85%] mx-auto" style={{ left: "50%", transform: "translateX(-50%)" }} >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost p-0 pr-2 lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1]  p-6 shadow bg-base-100 rounded-box gap-3 w-52 text-gray-700">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/shop'>Shop</NavLink>
            <NavLink to='/dashboard/profile'>Dashboard</NavLink>
            <NavLink>{user &&
              <div className={`flex flex-col ${isAdmin && "hidden"}`}>
                  <span className="indicator-item bg-[#1A2130]  text-white border-none badge badge-secondary">{order.length}+</span>
                <PiShoppingCartLight className={`text-2xl `} />
              </div>}
            </NavLink>
            </ul>
          </div>
          <a className=" text-xl lg:text-3xl font-semibold">
            STEP STYLE
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 gap-6 hidden lg:flex items-center mr-7">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/shop'>Shop</NavLink>
            <NavLink to='/dashboard/profile'>Dashboard</NavLink>
            <NavLink>{user &&
              <div className={`flex flex-col ${isAdmin && "hidden"}`}>
                  <span className="text-xs bg-[#1A2130] px-2 py-1 rounded-full -mb-3 ml-3 z-10 text-white">{order.length}+</span>
                <PiShoppingCartLight className={`text-2xl ${changeNavbarColor ? "text-black" : "text-white"}`} />
              </div>}
            </NavLink>
          </ul>
          {
            user &&
            <>
              <details className="dropdown dropdown-end">
                <summary className="btn btn-ghost p-0 rounded-full m-1">
                  <img className="object-cover w-12 h-12 border-2  rounded-full avatar" src={user.photoURL ? user.photoURL : profile} />
                </summary>
                <ul className="p-2 shadow menu dropdown-content text-black z-10 bg-base-100 rounded-box w-52">
                  <li><a>{user.displayName}</a></li>
                  <li onClick={handleSignOut}><a><VscSignOut className="text-xl" />Sign Out</a></li>
                </ul>
              </details>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;