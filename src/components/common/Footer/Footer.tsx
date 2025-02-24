import { NavLink } from "react-router-dom";

const Footer = () => {
  const links = [
    {
      title: "Quick Links",
      items: [
        { label: "Properties", to: "/properties" },
        { label: "About Us", to: "/about" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy Policy", to: "/privacy-policy" },
        { label: "Terms of Service", to: "/terms-of-service" },
      ],
    },
  ];

  return (
    <footer>
      <div className="main-footer border-y border-color-border p-8 flex gap-y-6 flex-wrap justify-around text-sm max-md:flex-col max-md:justify-center max-md:text-center">
        {/* Logo */}
        <div className="logo flex flex-col gap-2 max-md:w-full">
          <div className="title font-bold text-2xl text-color-text-1">Aqarek</div>
          <p className="description max-md:text-center w-full text-color-text-2">
          Your go-to destination for finding the best properties quickly and easily.
          </p>
        </div>

        {/* Dynamic Links */}
        {links.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <p className="font-bold text-color-text-1">{section.title}</p>
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="text-color-text-2 hover:text-color-hover-text-2"
                    aria-label={item.label}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="contact flex flex-col gap-2">
          <p className="font-bold text-color-text-1">Contact</p>
          <ul className="flex flex-col gap-1">
            <li>
              <address className="not-italic text-color-text-2 hover:text-color-hover-text-2">
                123 Business Ave <br /> Houston, TX 77001
              </address>
            </li>
            <li>
              <a href="tel:1234567890" className="text-color-text-2 hover:text-color-hover-text-2">
                (123) 456-7890
              </a>
            </li>
            <li>
              <a href="mailto:info@Aqarek.com" className="text-color-text-2 hover:text-color-hover-text-2">
                info@Aqarek.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer  */}
      <div className="text-color-text-2 text-sm p-8 text-center">
        {new Date().getFullYear()} &copy; Aqarek. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
