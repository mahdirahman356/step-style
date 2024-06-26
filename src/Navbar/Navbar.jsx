import { Link, NavLink } from "react-router-dom";
import image from "../assets/image/logo.png"
import profile from "../assets/image/user.avif"
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { VscSignOut } from "react-icons/vsc";
import { TbUserEdit } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext)

  const handleSignOut = () => {
    userLogOut()
      .then(() => {
        console.log("Sign Out")
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return (
    <div className="bg-white">
      <div className="navbar w-[95%] md:w-[85%] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost mb-4">
            <img className="w-24 h-16 " src={image} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/shop'>Shop</NavLink>
          </ul>
        </div>
        <div className="navbar-end">
        <span className="hidden md:grid mr-5"><Link to="/profile"><TbUserEdit className="text-2xl text-gray-500" /></Link></span>
        <span  className="hidden md:grid mr-8"><MdOutlineShoppingCart className="text-2xl text-gray-500" /></span>
          {
            user &&
            <>
              <details className="dropdown dropdown-end">
                <summary className="btn btn-ghost p-0 rounded-full m-1">
                  <img className="object-cover w-12 h-12 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={user.photoURL ? user.photoURL : profile} />
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-10 bg-base-100 rounded-box w-52">
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