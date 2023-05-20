import React from "react";
import "./Navbar.css";
import { Outlet } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav>
        <a className="logo" href="/">
          <img src="/logo.png" alt="" />
          <span>Glassberry</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/upload">Upload</a>
          </li>
          <li>
            <a href="/">Shop</a>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
