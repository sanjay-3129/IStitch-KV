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
            {/* <li className={style.list_item}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/myProfile`}
              >
                <i className={`${style.fas} fas fa-user-shield`}></i>My Profile
              </NavLink>
            </li> */}
            <li className={style.list_item}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/orders/preorders`}
              >
                <i className={`${style.fas} fas fa-warehouse`}></i>Orders
              </NavLink>
            </li>
            <li className={style.list_item}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/banner`}
              >
                <i className={`${style.fas} fas fa-warehouse`}></i>Banner Image
              </NavLink>
            </li>
            <li className={style.list_item}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/tailor`}
              >
                <i className={`${style.fas} fas fa-boxes`}></i>Tailor
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
            <li className={`${style.list_item}`}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/myBin`}
              >
                <i className={`${style.fas} fas fa-trash`}></i>Bin
              </NavLink>
            </li>
            <li className={`${style.list_item}`}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/user`}
              >
                <i className={`${style.fas} fas fa-users`}></i>Users
              </NavLink>
            </li>
          </ul>
          <h4>Account</h4>
          <ul className={style.list}>
            {/* <li className={style.list_item}>
              <NavLink
                activeClassName={style.activeLink}
                className={style.list_link}
                to={`${props.match.url}/settings`}
              >
                <i className={`${style.fas} fas fa-user-cog`}></i>Settings
              </NavLink>
            </li> */}
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
