import { memo } from "react";
import { NavLink } from "react-router-dom";
interface INavbarMobile {
    open: boolean;
    closeMenu: () => void
}

const NavbarMobile = memo(({open, closeMenu}: INavbarMobile) => {

  return (
<div 
  className={` ${open ? "flex" : "hidden"}  flex-col gap-4 p-4 text-color-text-1 bg-main-color-background absolute w-screen h-screen z-50 transition-transform duration-300`}
>

        <ul className="flex flex-col gap-4">
            <li className="">
            <NavLink to={"/"} onClick={closeMenu} className={"bg-section-color w-full px-3 py-2 block font-medium "}>Home</NavLink>
            </li>
            <li>
            <NavLink to={"/products"} onClick={closeMenu} className={"bg-section-color w-full px-3 py-2 block font-medium "}>Products</NavLink>
            </li>
            <li>
            <NavLink to={"/about"} onClick={closeMenu} className={"bg-section-color w-full px-3 py-2 block font-medium "}>About</NavLink>
            </li>
            <li>
            <NavLink to={"/contact"} onClick={closeMenu} className={"bg-section-color w-full px-3 py-2 block font-medium "}>Contact</NavLink>
            </li>
        </ul>
    </div>
  )
})

export default NavbarMobile