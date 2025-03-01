import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../ui/Button";
import DarkMode from "./DarkMode/DarkMode";
import NavbarMobile from "./Mobile/NavbarMobile/NavbarMobile";
import MenuNavAuth from "./auth/MenuNavAuth/MenuNavAuth";

const Header = () => {
  const { t } = useTranslation();
  const [openNav, setOpenNav] = useState<boolean>(false);

  const closeMenu = () => setOpenNav(prev => !prev);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-color-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="absolute inset-0 bg-main-color-background -z-[1] opacity-80"></div>
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="logo font-bold text-color-text-1 text-xl">
          <NavLink to="/">Aqarek</NavLink>
        </div>
        
        <nav className="max-md:hidden">
          <ul className="flex gap-1 justify-center items-center md:gap-6 font-medium">
            <li>
              <NavLink
                to="/"
                className="text-color-text-2 hover:text-color-hover-text-2 active:text-color-hover-text-2"
              >
                {t("header.nav.home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="properties"
                className="text-color-text-2 hover:text-color-hover-text-2 active:text-color-hover-text-2"
              >
                {t("header.nav.properties")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="about"
                className="text-color-text-2 hover:text-color-hover-text-2 active:text-color-hover-text-2"
              >
                {t("header.nav.about")}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="o-nav flex justify-center items-center gap-3">
          <div className="action-nav flex gap-1.5 justify-center items-center">
            <DarkMode />
          </div>

          <MenuNavAuth />

          <div className="menu md:hidden">
            <Button
              onClick={closeMenu}
              className="bg-transparent !text-color-text-1 hover:bg-section-color !p-2"
              aria-label={openNav ? "Close menu" : "Open menu"}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative">
        <NavbarMobile open={openNav} closeMenu={closeMenu} />
      </div>
    </header>
  );
};

export default memo(Header);