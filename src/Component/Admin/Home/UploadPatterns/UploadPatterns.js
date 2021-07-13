import React, { useState, useEffect } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Gender from "./Gender/Gender";
import Category from "./Category/Category";
import SubCategory from "./SubCategory/SubCategory";
import Styles from "./Styles/Styles";
import Patterns from "./Patterns/Patterns";
// import AddNewModal from "../../../UI/AddNewModal/AddNewModal";
// import firebase from "../../../../Services/firebase/firebase";
// import generateId from "../../../../Helpers/generateId";

import "./UploadPatterns.css";
// import style from "./UploadPatterns1.module.css";
import styled from "styled-components";

// const db = firebase.firestore();
const UploadPatterns = (props) => {
  // to open add new modal to add new gender, category etc.
  const [addNewItem, setAddNewItem] = useState("");
  // const [itemData, setItemData] = useState(); // to get all the details like gender, cat, sub, styl, patter
  // console.log(generateId("gender"), "id generated");
  const closeModalHandler = () => {
    setAddNewItem(null);
  };

  useEffect(() => {
    props.history.push(`${props.match.url}/createNewPattern/gender`);
  }, []);

  // const publishHandler = (newData) => {
  //   console.log("publish handler");
  //   // hide = false;
  //   setAddNewItem(null);
  // };

  // const draftHandler = (newData) => {
  //   // hide = true;
  //   let id = "";
  //   console.log("draft handler", newData);
  //   // gender - category - subcategory;
  //   if (
  //     newData.genderName !== "" &&
  //     newData.genderImg !== null &&
  //     newData.categoryName !== "" &&
  //     newData.categoryImg !== null &&
  //     newData.subcategoryName !== "" &&
  //     newData.subcategoryImg !== null
  //   ) {
  //     if (addNewItem === "gender") {
  //       id = generateId("gender");
  //       db.collection("gender")
  //         .doc(id)
  //         .set({
  //           genderId: id, // generate new id
  //           genderName: newData.genderName,
  //           genderImage: "", // store in storage
  //           noOfCategories: "",
  //           noOfSubcategories: "",
  //           noOfStyles: "",
  //           delete: false,
  //           hide: true
  //         })
  //         .then((genderRef) => {
  //           // id - update
  //           // category
  //           id = generateId("category");
  //           db.collection("gender")
  //             .doc(genderRef.id)
  //             .collection("mainProduct")
  //             .doc("categoriess")
  //             .collection("category")
  //             .doc(id)
  //             .set({
  //               genderId: genderRef.id,
  //               categoryId: id, // genderate new category id
  //               categoryName: newData.categoryName,
  //               categoryImage: "",
  //               noOfSubcategories: "",
  //               noOfStyles: "",
  //               delete: false,
  //               hide: true
  //             })
  //             .then((categoryRef) => {
  //               // gender - no_of_categories increment
  //               id = generateId("subcategory");
  //               db.collection("gender")
  //                 .doc(genderRef.id)
  //                 .collection("category")
  //                 .doc(categoryRef.id)
  //                 .collection("subcategory")
  //                 .doc(id)
  //                 .set({
  //                   genderId: genderRef.id,
  //                   categoryId: categoryRef.id,
  //                   subcategoryId: id, // genderate new category id
  //                   subcategoryName: newData.subcategoryName,
  //                   subcategoryImage: "",
  //                   noOfStyles: "",
  //                   delete: false,
  //                   hide: true
  //                 })
  //                 .then((subcategoryRef) => {
  //                   // gender - no_of_subcategories - increment
  //                   // category - no_of_subcategories - increment
  //                 })
  //                 .catch((e) => console.log(e));
  //             })
  //             .catch((e) => console.log(e));
  //         })
  //         .catch((e) => console.log(e));
  //     }

  //   // gender - category - !subcategory
  //   else if (
  //     newData.genderName !== "" &&
  //     newData.genderImg !== null &&
  //     newData.categoryName !== "" &&
  //     newData.categoryImg !== null &&
  //     newData.subcategoryName === "" &&
  //     newData.subcategoryImg === null
  //   ) {
  //     if (addNewItem === "gender") {
  //       id = generateId("gender");
  //       db.collection("gender")
  //         .doc(id)
  //         .set({
  //           genderId: id, // generate new id
  //           genderName: newData.genderName,
  //           genderImage: "", // store in storage
  //           noOfCategories: "",
  //           noOfSubcategories: "",
  //           noOfStyles: "",
  //           delete: false,
  //           hide: true
  //         })
  //         .then((genderRef) => {
  //           // id - update
  //           // category
  //           id = generateId("category");
  //           db.collection("gender")
  //             .doc(genderRef.id)
  //             .collection("mainProduct")
  //             .doc("categoriess")
  //             .collection("category")
  //             .doc(id)
  //             .set({
  //               genderId: genderRef.id,
  //               categoryId: id, // genderate new category id
  //               categoryName: newData.categoryName,
  //               categoryImage: "",
  //               noOfSubcategories: "",
  //               noOfStyles: "",
  //               delete: false,
  //               hide: true
  //             })
  //             .then((categoryRef) => {
  //               // gender - no_of_categories increment
  //             });
  //         });
  //     }

  //     // prevGender - category - subcategory
  //     else if (addNewItem === "category") {
  //       id = generateId("category");
  //       db.collection("gender")
  //         .doc(newData.genderId)
  //         .collection("mainProduct")
  //         .doc("categoriess")
  //         .collection("category")
  //         .doc(id)
  //         .set({
  //           genderId: newData.genderId,
  //           categoryId: id, // genderate new category id
  //           categoryName: newData.categoryName,
  //           categoryImage: "",
  //           noOfSubcategories: "",
  //           noOfStyles: "",
  //           delete: false,
  //           hide: true
  //         })
  //         .then((categoryRef) => {
  //           // gender - no_of_categories increment
  //           id = generateId("subcategory");
  //           db.collection("gender")
  //             .doc(newData.genderId)
  //             .collection("category")
  //             .doc(categoryRef.id)
  //             .collection("subcategory")
  //             .doc(id)
  //             .set({
  //               genderId: newData.genderId,
  //               categoryId: categoryRef.id,
  //               subcategoryId: id, // genderate new category id
  //               subcategoryName: newData.subcategoryName,
  //               subcategoryImage: "",
  //               noOfStyles: "",
  //               delete: false,
  //               hide: true
  //             })
  //             .then((subcategoryRef) => {
  //               // gender - no_of_subcategories - increment
  //               // category - no_of_subcategories - increment
  //             })
  //             .catch((e) => console.log(e));
  //         })
  //         .catch((e) => console.log(e));
  //     }
  //     // prevGender - prevCategory - subcategory
  //     else {
  //       id = generateId("subcategory");
  //       db.collection("gender")
  //         .doc(newData.genderId)
  //         .collection("category")
  //         .doc(newData.categoryId)
  //         .collection("subcategory")
  //         .doc(id)
  //         .set({
  //           genderId: newData.genderId,
  //           categoryId: newData.categoryId,
  //           subcategoryId: id, // genderate new category id
  //           subcategoryName: newData.subcategoryName,
  //           subcategoryImage: "",
  //           noOfStyles: "",
  //           delete: false,
  //           hide: true
  //         })
  //         .then((subcategoryRef) => {
  //           // gender - no_of_subcategories - increment
  //           // category - no_of_subcategories - increment
  //         })
  //         .catch((e) => console.log(e));
  //     }
  //   }

  //     // prevGender - category - !subcategory
  //     else if (addNewItem === "category") {
  //       id = generateId("category");
  //       db.collection("gender")
  //         .doc(newData.genderId)
  //         .collection("mainProduct")
  //         .doc("categoriess")
  //         .collection("category")
  //         .doc(id)
  //         .set({
  //           genderId: newData.genderId,
  //           categoryId: id, // genderate new category id
  //           categoryName: newData.categoryName,
  //           categoryImage: "",
  //           noOfSubcategories: "",
  //           noOfStyles: "",
  //           delete: false,
  //           hide: true
  //         })
  //         .then((categoryRef) => {
  //           // gender - no_of_categories increment
  //         });
  //     }
  //     // prevGender - prevCategory - !subcategory
  //     else {
  //       alert("You cant add empty subcategory data!!!");
  //     }
  //   }
  //   // gender - !category - !subcategory
  //   else if (
  //     newData.genderName !== "" &&
  //     newData.genderImg !== null &&
  //     newData.categoryName === "" &&
  //     newData.categoryImg === null &&
  //     newData.subcategoryName === "" &&
  //     newData.subcategoryImg === null
  //   ) {
  //     if (addNewItem === "gender") {
  //       id = generateId("gender");
  //       db.collection("gender")
  //         .doc(id)
  //         .set({
  //           genderId: id, // generate new id
  //           genderName: newData.genderName,
  //           genderImage: "", // store in storage
  //           noOfCategories: "",
  //           noOfSubcategories: "",
  //           noOfStyles: "",
  //           delete: false,
  //           hide: true
  //         })
  //         .then(console.log("gender only created", id));
  //     }
  //     // prevGender - !cagtegory - !subcategory
  //     else if (addNewItem === "category") {
  //       console.log("cant create empty category & empty subcategory");
  //     } else {
  //       console.log("last else...", addNewItem);
  //     }
  //   }
  //   setAddNewItem(null);
  // };

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
              to={`${props.match.url}/createNewPattern/gender`}
            >
              <span>Gender</span>
            </StyledLink>
          </li>
          <li className="nav_item">
            <StyledLink
              id="link2"
              to={`${props.match.url}/createNewPattern/category`}
            >
              <span>Category</span>
            </StyledLink>
          </li>
          <li className="nav_item">
            <StyledLink
              id="link3"
              to={`${props.match.url}/createNewPattern/subCategory`}
            >
              <span>Sub-Category</span>
            </StyledLink>
          </li>
          <li className="nav_item">
            <StyledLink
              id="link4"
              to={`${props.match.url}/createNewPattern/styles`}
            >
              <span>Styles</span>
            </StyledLink>
          </li>
          <li className="nav_item">
            <StyledLink
              id="link5"
              to={`${props.match.url}/createNewPattern/patterns`}
            >
              <span>Patterns</span>
            </StyledLink>
          </li>
        </ul>
      </div>

      {/* route's */}
      <div className="menu_item">
        {/* {addNewItem && (
          <AddNewModal
            title={addNewItem}
            closeModal={closeModalHandler}
            // publish={publishHandler}
            draft={draftHandler}
          />
        )} */}
        <Switch>
          <Route path={`${props.match.url}/createNewPattern/gender`}>
            <Gender
              // addNewGender={() => setAddNewItem("gender")}
              // addNewCategoryInGender={() => {
              //   setAddNewItem("category");
              // }}
              {...props}
            />
          </Route>
          <Route path={`${props.match.url}/createNewPattern/category`}>
            <Category
              // addNewCategory={() => {
              //   setAddNewItem("category");
              // }}
              // addNewSubCategory={() => setAddNewItem("subcategory")}
              {...props}
            />
          </Route>
          <Route path={`${props.match.url}/createNewPattern/subCategory`}>
            <SubCategory
              // addNewSubCategory={() => setAddNewItem("subcategory")}
              // addNewStyles={() => setAddNewItem("styles")}
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
