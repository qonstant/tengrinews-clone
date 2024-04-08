import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineSearch, HiOutlineX } from "react-icons/hi";

import logo from "../images/tengri-news-logo.png";
import { useGlobalContext } from "../context";
import style from "./navbar.module.css";

const classNames = require("classnames");

const Navbar = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState(""); // State to track active section
  // Navbar menu (mobile and tablet view)
  const [showMenu, setShowMenu] = useState(false);
  // Search input (desktop view)
  const [showSearch, setShowSearch] = useState(false);

  const { sections, logoSections, formatSection, sectionMappings } = useGlobalContext(); // Use logoSections and sectionMappings from context

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine whether to show languageIcon based on windowWidth
  const showLanguageIcon = windowWidth >= 1024;

  // Stop body from scrolling when nav menu is open after checking if ref current is not undefined
  if (showMenu && props.container.current) {
    props.container.current.style.overflowY = "hidden";
    props.container.current.style.position = "relative";
  } else if (props.container.current) {
    props.container.current.style.overflowY = "visible";
    props.container.current.style.position = "relative";
  }

  // Search articles
  const handleSearch = (e) => {
    e.preventDefault();
    // Search only if user typed something in input field
    if (search) {
      setShowMenu(false);
      setShowSearch(false);
      setSearch("");
      navigate(`/search/${search}`);
    }
  };

  // Handle click on section link
  const handleSectionClick = (section) => {
    setActiveSection(section);
    const formattedSection = sectionMappings[section]; // Get the corresponding section from sectionMappings
    navigate(`/section/${formattedSection}`);
  };

  return (
    <nav className={style.navbarContainer}>
      {/* Navbar menu in desktop view */}
      <ul className={style.sections}>
        {sections.map((section, index) => (
          <li
            key={index}
            className={classNames({ [style.active]: activeSection === section })}
            onClick={() => handleSectionClick(section)}
          >
            {section === "home" ? (
              <NavLink to={`/`}>{formatSection(section)}</NavLink>
            ) : (
              <NavLink to={`/section/${section}`}>
                {formatSection(section)}
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* Main navbar with logo */}
      <div className={style.navbar}>
        {showMenu ? (
          <HiOutlineX
            className={classNames(style.icon, style.menuIcon)}
            onClick={() => setShowMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            className={classNames(style.icon, style.menuIcon)}
            onClick={() => setShowMenu(true)}
          />
        )}

        <Link to="/">
          <img src={logo} alt="Tengri News Logo" className={style.logo} />
        </Link>

        {/* Render three logo sections next to the logo */}
        <ul className={style.logoSections}>
          {logoSections.map((section, index) => (
            <li key={index}>
              <NavLink to={`/section/${section}`}>
                {formatSection(section)}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Static language selection */}
        {showLanguageIcon && (
          <div className={classNames(style.icon, style.languageIcon)}>KZ</div>
        )}

        <HiOutlineSearch
          className={classNames(style.icon, style.searchIcon)}
          onClick={() => setShowSearch(!showSearch)}
        />
      </div>

      {/* Search form in desktop view */}
      {showSearch && (
        <form className={style.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="search"
            className={style.searchInput}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className={classNames("btn", style.searchButton)}
          >
            <HiOutlineSearch />
          </button>
        </form>
      )}

      {/* Navbar menu in mobile and tablet view */}
      {showMenu && (
        <div className={style.sectionMenu}>
          <form className={style.searchForm} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="search"
              className={style.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className={classNames("btn", style.searchButton)}
            >
              <HiOutlineSearch />
            </button>
          </form>
          <ul className={style.menu}>
            {sections.map((section, index) => {
              return (
                <li key={index}>
                  {section === "home" ? (
                    <NavLink to={`/`} onClick={() => setShowMenu(false)}>
                      {formatSection(section)}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/section/${section}`}
                      onClick={() => setShowMenu(false)}
                    >
                      {formatSection(section)}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* Static clickable div with green background and white font color */}
      <a href="https://www.instagram.com/qonstan/" className={style.staticDiv} target="_blank" rel="noopener noreferrer">
        Подписывайтесь на мой Instagram
      </a>
    </nav>
  );
};

export default Navbar;