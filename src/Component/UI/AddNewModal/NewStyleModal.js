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

const NewStyleModal = (props) => {
  const db = firebase.firestore();
  const [subcategoryList, setSubcategoryList] = useState([]);
  // const [stylesList, setStylesList] = useState(null);

  // useEffect(() => {
  //   // console.log("genderId", props.style.genderId);
  //   let dbRef = db
  //     .collection("gender")
  //     .doc(props.style.genderId)
  //     .collection(props.type)
  //     .doc("categories")
  //     .collection("category")
  //     .doc(props.style.categoryId)
  //     .collection("subcategory");

  //   dbRef
  //     .where("delete", "==", false)
  //     .orderBy("subcategoryName", "asc") // subcategoryName
  //     .get()
  //     .then((data) => {
  //       // console.log(data.exists);
  //       let list = [];
  //       data.forEach((doc) => {
  //         let data = doc.data();
  //         if (data.subcategoryId !== props.style.subcategoryId) {
  //           list.push(data);
  //           // dbRef
  //           //   .doc(data.subcategoryId)
  //           //   .collection("styles")
  //           //   .where("delete", "==", false)
  //           //   .orderBy("styleName", "asc") // subcategoryName
  //           //   .limit(5)
  //           //   .get()
  //           //   .then((docs) => {
  //           //     let styles = [];
  //           //     // styles may be empty
  //           //     docs.forEach((doc) => {
  //           //       styles.push(doc.data());
  //           //     });
  //           //     return styles;
  //           //   })
  //           //   .catch((e) => console.log(e));
  //         }
  //       });
  //       setSubcategoryList(list);
  //     })
  //     .catch((e) => console.log(e));
  //   // setStylesList(listOfStylesList);
  // }, []);

  // useEffect(() => {
  //   let list = [];
  //   let dbRef = db
  //     .collection("gender")
  //     .doc(props.style.genderId)
  //     .collection(props.type)
  //     .doc("categories")
  //     .collection("category")
  //     .doc(props.style.categoryId)
  //     .collection("subcategory");
  //   if (subcategoryList !== null) {
  //     for (let i = 0; i < subcategoryList.length; i++) {
  //       // console.log(subcategoryList[i].subcategoryId);
  //       dbRef
  //         .doc(subcategoryList[i].subcategoryId)
  //         .collection("styles")
  //         .where("delete", "==", false)
  //         .orderBy("styleName", "asc") // subcategoryName
  //         .limit(5)
  //         .get()
  //         .then((docs) => {
  //           let styles = [];
  //           // styles may be empty
  //           docs.forEach((doc) => {
  //             styles.push(doc.data());
  //             // console.log(doc.data());
  //           });
  //           list.push(styles);
  //         })
  //         .catch((e) => console.log(e));
  //     }
  //   }
  //   setStylesList(list);
  //   // console.log(list);
  // }, [subcategoryList]);

  useEffect(() => {
    // console.log("genderId", props.style.genderId);
    let dbRef = db
      .collection("gender")
      .doc(props.style.genderId)
      .collection(props.type)
      .doc("categories")
      .collection("category")
      .doc(props.style.categoryId)
      .collection("subcategory");
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
            dbRef
              .doc(data.subcategoryId)
              .collection("styles")
              .where("delete", "==", false)
              .orderBy("styleName", "asc") // subcategoryName
              .limit(5)
              .get()
              .then((docs) => {
                let styles = [];
                // styles may be empty
                docs.forEach((doc) => {
                  styles.push(doc.data());
                });
                let det = {
                  data,
                  listOfStyles: styles
                };
                list.push(det);
                // update state if there is
                setSubcategoryList((prevState) => [...prevState, det]);
              })
              .catch((e) => console.log(e));
          }
        });
        // setSubcategoryList(list);
        // console.log("111", subcategoryList);
        // setStylesList(listOfStylesList);
      })
      .catch((e) => console.log(e));
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

  let relations = null;
  if (subcategoryList === null) {
    relations = <Spinner />;
  } else if (subcategoryList !== null) {
    // console.log("92", stylesList);
    relations = subcategoryList.map((item, index) => {
      console.log(item.data);
      return (
        <div class="subcs" key={index}>
          {/* <p>disc</p> */}
          <p>{item.data.subcategoryName}</p>
          <div class="scrollview">
            {/* to add styles for particular subcategory */}
            {item.listOfStyles.map((style, i) => {
              return (
                <div class="styles" key={i}>
                  <img
                    class="img-fluid"
                    src={style.styleImage}
                    alt={style.styleName}
                  />
                  <p class="sname">{style.styleName}</p>
                  <input type="checkbox" id="select" />
                  <label class="stretched" for="select"></label>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="addnew col-12">
      {console.log("return", subcategoryList)}
      <h2>Add New Style</h2>
      <form method="post" name="form" className={classes.form}>
        <div class="container-fluid">
          <label htmlFor="styleName">Enter Style Name</label>
          <input
            type="text"
            id="name"
            name="name"
            // value={props.newData.name}
            // onChange={props.onChange}
          />
          <label>Upload Image</label>
          <div class="upload-img">
            <input
              type="file"
              name="img"
              id="img"
              accept=".gif, .jpg, .png"
              // value={newData.img} // it may cause error
              // onChange={props.onChange}
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
          // onClick={() => props.saveAsDraft(props.newData)}
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

export default NewStyleModal;
