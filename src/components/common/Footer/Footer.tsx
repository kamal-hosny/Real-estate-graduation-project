// External imports
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

// Constants
const FOOTER_LINKS = [
  {
    key: "quickLinks",
    items: ["properties", "about", "contact"]
  },
  {
    key: "legal",
    items: ["privacy", "terms"]
  }
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      {/* Main Footer Section */}
      <div className="main-footer border-y border-color-border p-8 flex gap-y-6 flex-wrap justify-around text-sm max-md:flex-col max-md:justify-center max-md:text-center">
        {/* Logo Section */}
        <div className="logo flex flex-col gap-2 max-md:w-full">
          <div className="title font-bold text-2xl text-color-text-1">
            Aqarek
          </div>
          <p className="description max-md:text-center w-full text-color-text-2">
            {t("footer.description")}
          </p>
        </div>

        {/* Dynamic Links Sections */}
        {FOOTER_LINKS.map((section) => (
          <div key={section.key} className="flex flex-col gap-2">
            <p className="font-bold text-color-text-1">
              {t(`footer.sections.${section.key}.title`)}
            </p>
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/${item}`}
                    className="text-color-text-2 hover:text-color-hover-text-2"
                    aria-label={t(`footer.sections.${section.key}.items.${item}`)}
                  >
                    {t(`footer.sections.${section.key}.items.${item}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Section */}
        <div className="contact flex flex-col gap-2">
          <p className="font-bold text-color-text-1">
            {t("footer.sections.contact.title")}
          </p>
          <ul className="flex flex-col gap-1">
            <li>
              <address className="not-italic text-color-text-2 hover:text-color-hover-text-2">
                {t("footer.sections.contact.address")}
                <br />
                {t("footer.sections.contact.city")}
              </address>
            </li>
            <li>
              <a
                href="tel:1234567890"
                className="text-color-text-2 hover:text-color-hover-text-2"
              >
                {t("footer.sections.contact.phone")}
              </a>
            </li>
            <li>
              <a
                href="mailto:info@Aqarek.com"
                className="text-color-text-2 hover:text-color-hover-text-2"
              >
                {t("footer.sections.contact.email")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-color-text-2 text-sm p-8 text-center">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
};

export default Footer;