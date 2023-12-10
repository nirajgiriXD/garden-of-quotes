/**
 * Internal dependencies.
 */
import { NavItemProp } from "./types/navbarProp";

const NavItem = ({ name, link, id, openInNewTab, isButton }: NavItemProp) => {
  return (
    <li className="nav-item me-3">
      {isButton ? (
        <button className="nav-link" id={id}>
          {name}
        </button>
      ) : (
        <a
          className="nav-link"
          href={link}
          id={id}
          target={openInNewTab ? "_blank" : "_self"}
        >
          {name}
        </a>
      )}
    </li>
  );
};

export default NavItem;
