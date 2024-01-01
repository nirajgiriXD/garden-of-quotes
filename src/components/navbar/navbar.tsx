/**
 * Internal dependencies.
 */
import NavItem from "./navitem";
import { navItemsList } from "./constant";
import { type NavbarProp } from "./types/navbarProp";
import SearchPage from "../searchBox/searchBox";

const Navbar = ({ logo, quotes }: NavbarProp) => {
  return (
    <nav className="navbar navbar-expand-lg shadow">
      <div className="container">
        <a className="navbar-brand" href="./index.html">
          <img src={logo} alt="Logo" width="36" height="36" />
        </a>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <div className="w-100">
            <ul className="navbar-nav my-2 my-lg-0">
              {navItemsList.map((navItem) => {
                return navItem.id === "search-quote-btn" ? (
                  <SearchPage key={navItem.id} quotes={quotes} />
                ) : (
                  <NavItem
                    key={navItem.id}
                    name={navItem.name}
                    link={navItem.link}
                    id={navItem.id}
                    isButton={navItem.isButton}
                    openInNewTab={navItem.openInNewTab}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
