import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import Card from "../Card/Card";

import classes from "./ChangeModal.module.css";
import "./NewStyleModal.css";
import $ from "jquery";
import Spinner from "../../UI/Spinner/Spinner";
import firebase from "../../../Services/firebase/firebase";
// import StyleCard from "../AddNewModal/StyleCard";
import StyleCardUpdate from "../AddNewModal/StyleCardUpdate";

const SuggestionsUpdate = (props) => {
  const db = firebase.firestore();
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [oldRelations, setOldRelations] = useState([]); // old
  const [newRelations, setNewRelations] = useState([]); // new
  const [deleteRelations, setDeleteRelations] = useState([]); // to be delted in db

  useEffect(() => {
    // console.log("genderId", props.style.genderId);
    // props.action
    console.log("update", props.style.relations);

    // console.log("sugUpdate", props.style);
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
        setOldRelations(props.style.relations);
        // already relations availabel
      })
      .catch((e) => console.log(e));
    // setStylesList(listOfStylesList);
    // console.log("selectedStyles1", selectedStyles);
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
    let oldList = [...oldRelations];
    let newList = [...newRelations];
    let deleteList = [...deleteRelations];
    let dbRef = db
      .collection("gender")
      .doc(style.genderId)
      .collection(props.type)
      .doc("categories")
      .collection("category")
      .doc(style.categoryId)
      .collection("subcategory")
      .doc(style.subcategoryId)
      .collection("styles")
      .doc(style.styleId);

    let sty = {
      ref: dbRef,
      genderId: style.genderId,
      categoryId: style.categoryId,
      subcategoryId: style.subcategoryId,
      styleId: style.styleId,
      type: props.type
    };
    // console.log(style, i);
    // initally set data, if again same data, delete it
    let oldIndex = oldList.findIndex((s) => sty.styleId === s.styleId);
    if (oldIndex !== -1) {
      // checked: false
      // list[index].checked = false;
      let deletedItem = oldList.splice(oldIndex, 1);
      deleteList.push(deletedItem[0]);
      // newList.sp
    } else {
      let deletedIndex = deleteList.findIndex((s) => sty.styleId === s.styleId);
      if (deletedIndex !== -1) {
        let deletedItem = deleteList.splice(deletedIndex, 1);
        oldList.push(deletedItem[0]);
      } else {
        // newList.push(sty);
        let newIndex = newList.findIndex((s) => sty.styleId === s.styleId);
        if (newIndex !== -1) {
          // checked: false
          // list[index].checked = false;
          newList.splice(newIndex, 1);
        } else {
          // checked: true
          // sty.checked = true;
          newList.push(sty);
          // list[index].checked = true;
        }
      }
    }
    setNewRelations(newList);
    setOldRelations(oldList);
    setDeleteRelations(deleteList);
  };
  // const onSelectHandler = (style) => {
  //   let list = [...oldRelations];
  //   // console.log(
  //   //   "check ref",
  //   //   list[0].ref.get().then((doc) => console.log(doc.data()))
  //   // );
  //   let dbRef = db
  //     .collection("gender")
  //     .doc(style.genderId)
  //     .collection(props.type)
  //     .doc("categories")
  //     .collection("category")
  //     .doc(style.categoryId)
  //     .collection("subcategory")
  //     .doc(style.subcategoryId)
  //     .collection("styles")
  //     .doc(style.styleId);
  //   // console.log("DBREF", dbRef);-
  //   let sty = {
  //     ref: dbRef,
  //     genderId: style.genderId,
  //     categoryId: style.categoryId,
  //     subcategoryId: style.subcategoryId,
  //     styleId: style.styleId,
  //     type: props.type
  //     // checked: true
  //   };
  //   // console.log(style, i);
  //   // initally set data, if again same data, delete it
  //   let index = list.findIndex((s) => sty.styleId === s.styleId);
  //   if (index !== -1) {
  //     // checked: false
  //     // list[index].checked = false;
  //     list.splice(index, 1);
  //   } else {
  //     // checked: true
  //     // sty.checked = true;
  //     list.push(sty);
  //     // list[index].checked = true;
  //   }
  //   setOldRelations(list);
  // };

  let relations = null;
  if (subcategoryList === null) {
    relations = <Spinner />;
  } else if (subcategoryList !== null) {
    // console.log("92", stylesList);
    relations = subcategoryList.map((item, index) => {
      // console.log(item.data);
      // console.log("selectedStyles2", selectedStyles);
      return (
        <div class="subcs" key={index}>
          {/* <p>disc</p> */}
          <p>{item.subcategoryName}</p>
          <StyleCardUpdate
            data={item}
            relations={[...oldRelations, ...newRelations]}
            style={props.style}
            type={props.type}
            onSelect={onSelectHandler}
            // currentRelations={currentRelations}
            // setCurrentRelations={(list) => setCurrentRelations(list)}
          />
        </div>
      );
    });
  }

  return (
    <div className="addnew col-12">
      <h2>Add New Style</h2>
      <form method="post" name="form" className={classes.form}>
        <div class="container-fluid">
          <label htmlFor="styleName">Enter Style Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={props.style.styleName}
            onChange={props.onChange}
            disabled
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
              disabled
            />
            <label
              onClick={getFile}
              htmlFor="img"
              id="uploadButton"
              disabled
              style={{
                backgroundImage: `url('${props.style.styleImage}')`
              }}
            >
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
          onClick={() =>
            props.saveAsDraft(oldRelations, newRelations, deleteRelations)
          }
        >
          Update Relations
        </button>
        <button type="button" class="draft m-3" onClick={props.goBack}>
          Go Back
        </button>
      </form>
    </div>
  );
};

export default SuggestionsUpdate;

/**
 * we have to show muliple styles into each subcategory
 * Problem: first need to get data
 * solved: using another component
 */
