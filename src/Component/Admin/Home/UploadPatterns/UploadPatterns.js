import React, { useState } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Gender from "./Gender/Gender";
import Category from "./Category/Category";
import SubCategory from "./SubCategory/SubCategory";
import Styles from "./Styles/Styles";
import Patterns from "./Patterns/Patterns";
import AddNewModal from "../../../UI/AddNewModal/AddNewModal";

import "./UploadPatterns.css";
// import style from "./UploadPatterns1.module.css";
import styled from "styled-components";

const UploadPatterns = (props) => {
  // to open add new modal to add new gender, category etc.
  const [addNewItem, setAddNewItem] = useState("");
  // const [itemData, setItemData] = useState(); // to get all the details like gender, cat, sub, styl, patter

  const closeModalHandler = () => {
    setAddNewItem(null);
  };

  const publishHandler = () => {
    console.log("publish handler");
  };

  const draftHandler = () => {
    console.log("draft handler");
  };
  const activeClassName = "nav-item-active";
  const StyledLink = styled(NavLink).attrs({ activeClassName })`
    &.${activeClassName} {
      background: #005b7f;
      ::after {
        border-left: 20px solid #005b7f !important;
      }
      ::before {
        border-top: 22px solid #005b7f !important;
        border-bottom: 22px solid #005b7f !important;
      }
      /*  span - vertical line
  position: absolute;
  display: none;
  content: "";
  top: 44px;
  left: 75px;
  width: 2px;
  padding: 2px;
  height: 85px;
  background-color: #005b7f; */
    }
  `;

  return (
    <div>
      <h1 className="heading">Upload or View</h1>
      <div className="mini_nav">
        <ul className="nav_list">
          <li className="nav_item">
            <StyledLink
              id="link1"
              // activeClassName={style.activeLink}
              to={`${props.match.url}/createNewPattern/gender`}
            >
              <span>Gender</span>
            </StyledLink>
          </li>
          <li className="nav_item">
            <StyledLink
              id="link2"
              // activeClassName={style.activeLink}
              to={`${props.match.url}/createNewPattern/category`}
            >
              <span>Category</span>
            </StyledLink>
          </li>
          <li className="nav_item">
            <StyledLink
              id="link3"
              // activeClassName={style.activeLink}
              to={`${props.match.url}/createNewPattern/subCategory`}
            >
              <span>Sub-Category</span>
            </StyledLink>
          </li>
          <li className="nav_item">
            <StyledLink
              id="link4"
              // activeClassName={style.activeLink}
              to={`${props.match.url}/createNewPattern/styles`}
            >
              <span>Styles</span>
            </StyledLink>
          </li>
          <li className="nav_item">
            <StyledLink
              id="link5"
              // activeClassName={style.activeLink}
              to={`${props.match.url}/createNewPattern/patterns`}
            >
              <span>Patterns</span>
            </StyledLink>
          </li>
        </ul>
      </div>

      {/* route's */}
      <div className="menu_item">
        {addNewItem && (
          <AddNewModal
            title={addNewItem}
            closeModal={closeModalHandler}
            publish={publishHandler}
            draft={draftHandler}
          />
        )}
        <Switch>
          <Route path={`${props.match.url}/createNewPattern/gender`}>
            <Gender
              addNewGender={() => setAddNewItem("Gender")}
              addNewCategoryInGender={() => {
                setAddNewItem("Category");
              }}
              {...props}
            />
          </Route>
          <Route path={`${props.match.url}/createNewPattern/category`}>
            <Category
              addNewSubCategory={() => setAddNewItem("SubCategory")}
              {...props}
            />
          </Route>
          <Route path={`${props.match.url}/createNewPattern/subCategory`}>
            <SubCategory
              addNewStyles={() => setAddNewItem("Styles")}
              {...props}
            />
          </Route>
          <Route path={`${props.match.url}/createNewPattern/styles`}>
            <Styles {...props} />
          </Route>
          <Route path={`${props.match.url}/createNewPattern/patterns`}>
            <Patterns {...props} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default UploadPatterns;
