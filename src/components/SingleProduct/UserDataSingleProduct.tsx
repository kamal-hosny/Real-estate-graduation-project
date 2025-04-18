import { useNavigate } from "react-router-dom";
import Img from "../ui/Img";
import { ChevronRight } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getOneUser } from "../../store/user/act/actGetOneUser";

import defaultPerson from "../../assets/defaultImages/defaultPerson.jpeg"; 
import { useTranslation } from "react-i18next";

interface UserDataSingleProductProps {
  userId: string | null;
}

const UserDataSingleProduct = ({ userId }: UserDataSingleProductProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) =>
        userId && state.user.usersById[userId] ? state.user.usersById[userId] : null
    );

    useEffect(() => {
        if (userId && !user) {
            dispatch(getOneUser({ id: userId }));
        }
    }, [userId, user, dispatch]);

    if (!userId || !user) {
        return (
            <div className="company flex flex-col gap-4">
                <div className="head flex items-center justify-between">
                    <h2 className="text-2xl font-medium text-color-text-1">{t("singlePropertyPage.publisher")}</h2>
                    <p className="text-color-text-2">{t("singlePropertyPage.loading")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="company flex flex-col gap-4">
            <div className="head flex items-center justify-between">
                <h2 className="text-2xl font-medium text-color-text-1">{t("singlePropertyPage.publisher")}</h2>
                <p
                    onClick={() => navigate(`/properties?companyId=${userId}`)}
                    className="text-color-text-2 cursor-pointer transition-all hover:text-color-text-1 flex items-end"
                >
                    <span>{t("singlePropertyPage.view_more")}</span> <ChevronRight size={20} />
                </p>
            </div>
            <div className="card flex items-center gap-4">
                <div>
                    <Img
                        className="w-16 h-16 object-cover rounded-full border-color-border border-2"
                        src={user.image || defaultPerson}
                        alt={user.fullName || "User"}
                    />
                </div>
                <div className="space-y-1">
                    <p className="text-color-text-1 font-medium capitalize">{user.fullName || "User"}</p>
                    <p className="text-color-text-2">{user.email || "email"}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDataSingleProduct;