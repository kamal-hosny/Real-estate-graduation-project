
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { Mail, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getOneUser } from "../../store/user/act/actGetOneUser";

interface IUserId {
    userId: string | null;
}

const UserCompany = ({userId}: IUserId ) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) => 
    userId && state.user.usersById[userId] ? state.user.usersById[userId] : null
    )

    console.log(user);
    

    useEffect(() => {
        if(userId && !user) {
            dispatch(getOneUser({id: userId}))
        }
    }, [userId, user, dispatch])

    const formatPhoneNumberForWhatsApp = (phone: string) => {
      const cleaned = phone.replace(/\D/g, '');
      return cleaned.startsWith('+') ? cleaned : `+20${cleaned}`;
    };

    if (!userId || !user) {
        return (
            <></>
        )
    }

  return (
<div className="bg-main-color-background p-4 rounded relative">
            <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg">
              <img
                className="w-full md:w-48 h-48 object-cover rounded-lg border-2 border-color-border"
                src={user?.image || `https://res.cloudinary.com/dizj9rluo/image/upload/v1744113485/defaultPerson_e7w75t.jpg` }
                alt="Property preview"
              />

              <div className="flex flex-col gap-4 flex-1">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-color-text-1">
                    { user?.fullName || t("properties_page.contact.property_name")}
                  </h2>
                  <div className="bg-section-color p-3 rounded-lg">
                    <p className="text-color-text-2 font-medium">
                      {t("properties_page.contact.title")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                 href={`https://wa.me/${formatPhoneNumberForWhatsApp(user.phoneNumber)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[150px]"
                  >
                    <div className="bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-lg border-2 border-green-300 flex items-center justify-center gap-2 transition-colors">
                      <FaWhatsapp size={24} />
                      <span className="font-medium">
                        {t("properties_page.contact.whatsapp")}
                      </span>
                    </div>
                  </a>

                  <a    href={`tel:${user.phoneNumber}`} className="flex-1 min-w-[150px]">
                    <div className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-lg border-2 border-blue-300 flex items-center justify-center gap-2 transition-colors">
                      <IoIosCall size={24} />
                      <span className="font-medium">
                        {t("properties_page.contact.call")}
                      </span>
                    </div>
                  </a>

                  <a  href={`mailto:${user.email}`} className="flex-1 min-w-[150px]">
                    <div className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg border-2 border-red-300 flex items-center justify-center gap-2 transition-colors">
                      <Mail size={24} />
                      <span className="font-medium">
                        {t("properties_page.contact.email")}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <span
              onClick={() => {
                navigate("/properties");
              }}
              className="bg-red-600 hover:bg-red-700 text-gray-200 hover:text-white transition-all absolute top-0 end-0 rounded"
            >
              <X className="cursor-pointer p-1 " />
            </span>
          </div>
  )
}

export default UserCompany