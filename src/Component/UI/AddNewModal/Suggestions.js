import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import Card from "../Card/Card";

import classes from "./ChangeModal.module.css";
import "./NewStyleModal.css";
import $ from "jquery";
import Spinner from "../../UI/Spinner/Spinner";
import firebase from "../../../Services/firebase/firebase";
import StyleCard from "../AddNewModal/StyleCard";

const Suggestion = (props) => {
  const db = firebase.firestore();
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);

  useEffect(() => {
    // console.log("genderId", props.style.genderId);
    // props.action
    let dbRef = db
      .collection("gender")
      .doc(props.style.genderId)
      .collection(props.type)
      .doc("categories")
      .collection("category")
      .doc(props.style.categoryId)
      .collection("subcategory");
    // length - 2
    dbRef
      .where("delete", "==", false)
      .orderBy("subcategoryName", "asc") // subcategoryName
      .get()
      .then((data) => {
        // console.log(data.exists);
        let list = [];
        data.forEach((doc) => {
          let data = doc.data();
          if (data.subcategoryId !== props.style.subcategoryId) {
            list.push(data);
          }
        });
        setSubcategoryList(list);
      })
      .catch((e) => console.log(e));
    // setStylesList(listOfStylesList);
  }, []);

  const getFile = () => {
    $("#uploadButton").on("click", function () {
      $("#img").click();
    });

    $("#img").change(function () {
      var file = this.files[0];
      // console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton").css(
          "background-image",
          'url("' + reader.result + '")'
        );
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
      }
    });
  };

  const onSelectHandler = (style) => {
    let list = [...selectedStyles];
    let sty = {
      genderId: style.genderId,
      categoryId: style.categoryId,
      subcategoryId: style.categoryId,
      styleId: style.styleId,
      type: props.type
      // checked: true
    };
    // console.log(style, i);
    // initally set data, if again same data, delete it
    let index = list.findIndex((s) => sty.styleId === s.styleId);
    if (index !== -1) {
      // checked: false
      // list[index].checked = false; // no problem even if we not give
      list.splice(index, 1);
    } else {
      // checked: true
      // sty.checked = true;
      list.push(sty);
      // list[index].checked = true;
    }
    setSelectedStyles(list);
  };

  let relations = null;
  if (subcategoryList === null) {
    relations = <Spinner />;
  } else if (subcategoryList !== null) {
    // console.log("92", stylesList);
    relations = subcategoryList.map((item, index) => {
      // console.log(item.data);
      return (
        <div class="subcs" key={index}>
          {/* <p>disc</p> */}
          <p>{item.subcategoryName}</p>
          <StyleCard data={item} type={props.type} onSelect={onSelectHandler} />
        </div>
      );
    });
  }

  return (
    <div className="addnew col-12">
      {/* {console.log("selectedStyles", selectedStyles)} */}

      <h2>Add New Style</h2>
      <form method="post" name="form" className={classes.form}>
        <div class="container-fluid">
          <label htmlFor="styleName">Enter Style Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={props.newData.name}
            onChange={props.onChange}
          />
          <label>Upload Image</label>
          <div class="upload-img">
            <input
              type="file"
              name="img"
              id="img"
              accept=".gif, .jpg, .png"
              // value={newData.img} // it may cause error
              onChange={props.onChange}
            />
            <label onClick={getFile} htmlFor="img" id="uploadButton">
              <span>+</span>
            </label>
          </div>
        </div>
        <div class="container-fluid">
          <h4>Pickup Relations</h4>
          {relations}
        </div>
        <button
          type="button"
          class="draft m-3"
          onClick={() => props.saveAsDraft(selectedStyles)}
        >
          Save as draft
        </button>
        <button type="button" class="draft m-3" onClick={props.goBack}>
          Go Back
        </button>
      </form>
    </div>
  );
};

export default Suggestion;

/**
 * we have to show muliple styles into each subcategory
 * Problem: first need to get data
 * solved: using another component
 */
