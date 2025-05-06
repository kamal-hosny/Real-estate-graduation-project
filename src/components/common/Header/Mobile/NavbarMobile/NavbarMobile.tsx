import { memo } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";

interface INavbarMobile {
  open: boolean;
  closeMenu: () => void;
}

const NavbarMobile = memo(({ open, closeMenu }: INavbarMobile) => {
  const { t } = useTranslation();

  return (
    <div
      className={`
        ${open ? "flex" : "hidden"}
        flex-col
        gap-4
        p-4
        text-color-text-1
        bg-main-color-background
        absolute
        w-screen
        h-screen
        z-50
        transition-transform
        duration-300
      `}
    >
      <ul className="flex flex-col gap-4">
      <li>
          <NavLink
            to="/"
            onClick={closeMenu}
            className="bg-section-color w-full px-3 py-2 block font-medium"
          >
            {t('navigation.home')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Properties"
            onClick={closeMenu}
            className="bg-section-color w-full px-3 py-2 block font-medium"
          >
            {t('navigation.properties')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            onClick={closeMenu}
            className="bg-section-color w-full px-3 py-2 block font-medium"
          >
            {t('navigation.about')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            onClick={closeMenu}
            className="bg-section-color w-full px-3 py-2 block font-medium"
          >
            {t('navigation.contact')}
          </NavLink>
        </li>
      </ul>
    </div>
  );
});

export default NavbarMobile;