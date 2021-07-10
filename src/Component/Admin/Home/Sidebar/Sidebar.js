import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Sidebar.module.css";

const SideBar = (props) => {
  return (
    <div className="col-md-2 col-lg-2 col-xl-2 p-0">
      <div className={style.sidebar}>
        <button type="button" className={`${style.btn} btn`}>
          <i className={`${style.fas} fas fa-tshirt`}></i>Brand Name
        </button>
        <div className={style.content}>
          <h4>Dashboard</h4>
          <ul className={style.list}>
            <li className={style.list_item}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/myProfile`}
              >
                <i className={`${style.fas} fas fa-user-shield`}></i>My Profile
              </NavLink>
            </li>
            <li className={style.list_item}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/myUploads`}
              >
                <i className={`${style.fas} fas fa-warehouse`}></i>My Uploads
              </NavLink>
            </li>
            <li className={style.list_item}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/saved`}
              >
                <i className={`${style.fas} fas fa-boxes`}></i>Saved
              </NavLink>
            </li>
            <li className={`${style.list_item}`}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/createNewPattern`}
              >
                <i className={`${style.fas} fas fa-folder-plus`}></i>Create
                Pattern
              </NavLink>
            </li>
          </ul>
          <h4>Account</h4>
          <ul className={style.list}>
            <li className={style.list_item}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/settings`}
              >
                <i className={`${style.fas} fas fa-user-cog`}></i>Settings
              </NavLink>
            </li>
            <li className={style.list_item}>
              <a className={style.list_link} href="#l" onClick={props.logout}>
                <i className={`${style.fas} fas fa-sign-out-alt`}></i>Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
