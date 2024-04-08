import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";
import style from "./footer.module.css";
import logo from "../images/tengri-news-white-logo.png"; // Import logo image here

const Footer = () => {
  const { sections, formatSection, sectionMappings } = useGlobalContext();

  // Scroll to top when a nav link is clicked
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <hr className={style.divider} />
      <footer className={`${style.footerContainer} ${style.greyBackground}`}>
        <Link to="/" onClick={scrollToTop}>
          <img src={logo} alt="Tengri News Logo" className={style.logo} />
        </Link>
        <ul className={style.nav}>
          {sections.map((section, index) => {
            const formattedSection = sectionMappings[section];
            return (
              <li key={index}>
                {section === "home" ? (
                  <NavLink to={`/`} onClick={scrollToTop}>
                    {formatSection(section)}
                  </NavLink>
                ) : (
                  <NavLink to={`/section/${formattedSection}`} onClick={scrollToTop}>
                    {formatSection(section)}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
        <div className={style.copyright}>
          <small>&copy; Copyright 2024, Rakymzhan Zhabagin</small>
        </div>
      </footer>
    </>
  );
};

export default Footer;
