import { ChevronDown, ChevronUp, Heart, HousePlus, Languages, LogOut, User, UserRound } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../../../../store/auth/authSlice";
import { useAppSelector } from "../../../../../store/hooks";
import Button from "../../../../ui/Button";
import i18n from "../../../../../language";
import { useTranslation } from "react-i18next";

const MenuNavAuth = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const [direction, setDirection] = useState(document.dir || "ltr");


  const wishlist =
    useAppSelector((state) => state.wishlist?.items?.length) || 0;

  const handleLogin = useCallback(() => {
    navigate("/login");
    setOpen(false);
  }, [navigate]);

  const handleRegister = useCallback(() => {
    navigate("/register");
    setOpen(false);
  }, [navigate]);

  const handleWishlist = useCallback(() => {
    navigate("/wishlist");
    setOpen(false);
  }, [navigate]);

  const { token } = useAppSelector((state ) => state.auth);
console.log("token", token);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const handleLogout = () => {
        
    dispatch(authLogout())
    
    
}

const handleGotoProfile = () => {
  navigate("/Profile")
}

useEffect(() => {
  const observer = new MutationObserver(() => {
    setDirection(document.dir || "ltr");
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir"],
  });

  return () => observer.disconnect();
}, []);

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer text-color-text-2 gap-1 items-center bg-section-color hover:bg-color-border border-2 border-color-border p-1.5 rounded-md hover:bg-color-border/80 transition-colors"
      >
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        <span className="bg-main-color-background p-1 rounded-full">
          <UserRound size={20} />
        </span>
        {wishlist > 0 && (
          <span className="absolute cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-full text-xs w-3 h-3 flex justify-center items-center -top-1.5 -end-2">
            {wishlist}
          </span>
        )}
      </div>

      {/* Dropdown menu */}
      <div
        ref={menuRef}
        className={`absolute top-full mt-2 space-y-3 end-0 min-w-72 bg-section-color border-color-border border-2 p-2 rounded-md shadow-lg transition-all duration-200 ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="head">
          {token ? (<><p className="text-color-text-1 text-lg font-medium">  {t("auth_menu.profile")}</p></>) : (<><p className="text-color-text-1 text-lg font-medium">  {t("auth_menu.sign_in")}</p></>) }
          <p className="text-color-text-2 text-sm">
            {t("auth_menu.description")}
          </p>
        </div>
        <div>{token && (
            <ul
            className={`text-color-text-1 text-sm  `}
            >
            <li onClick={handleGotoProfile} className="flex border-color-border items-center gap-2 p-3 hover:bg-main-color-background transition-all cursor-pointer rounded hover:ps-4">
                <User size={20} />
                <p>{t("auth_menu.profile")}</p>
            </li>
            <li onClick={handleLogout} className="flex border-color-border items-center gap-2 p-3 hover:bg-main-color-background transition-all cursor-pointer rounded hover:ps-4">
                <LogOut size={20} />
                <p>{t("auth_menu.sign_out")}</p>
            </li>
            </ul>
        )}</div>
        {!token && (
          <div className="btn flex flex-col gap-1.5 justify-center items-center">
            <Button
              onClick={handleLogin}
              className="bg-transparent hover:bg-section-color border-border border-2 w-full !text-color-text-1"
            >
            {t("auth_menu.login")}
            </Button>
            <Button
              onClick={handleRegister}
              className="bg-button-color hover:bg-button-hover-color border-border border-2 w-full text-main-color-background"
            >
   {t("auth_menu.register")}
            </Button>
          </div>
        )}

        <span className="inline-block bg-color-text-2 w-full h-[1px]"></span>

        <p className="text-color-text-2 text-sm font-medium ">{t("auth_menu.my_activities")}</p>
        <ul className="p-1 text-color-text-1">
          <li
            onClick={handleWishlist}
            className="flex items-center gap-3 p-2 hover:bg-main-color-background transition-all cursor-pointer rounded"
          >
            <div className="relative">
              <Heart size={20} />
              {wishlist > 0 && (
                <span className="absolute cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-full text-xs w-3 h-3 flex justify-center items-center -top-1.5 -end-2">
                  {wishlist}
                </span>
              )}
            </div>
            <span>{t("auth_menu.my_favorites")}</span>
          </li>
{direction === "rtl" ? (
  <li    onClick={() => i18n.changeLanguage("en")} className="flex items-center gap-3 p-2 hover:bg-main-color-background transition-all cursor-pointer rounded">
          <Languages size={20} />
          <span>تحويل اللغة إلي الانجليزية</span>
          </li>

) : (

  <li   onClick={() => i18n.changeLanguage("ar")} className="flex items-center gap-3 p-2 hover:bg-main-color-background transition-all cursor-pointer rounded">
  <Languages size={20} />
  <span>Converting the language to Arabic</span>
  </li>
)}
         
          



          <li onClick={()=>{navigate("/advertise-property")}} className="flex items-center gap-3 p-2 hover:bg-main-color-background transition-all cursor-pointer rounded">
          <HousePlus size={20} />
          <span>{t("auth_menu.advertise_property")}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuNavAuth;