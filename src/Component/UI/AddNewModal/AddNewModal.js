import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
import Card from "../Card/Card";

import classes from "./AddNewModal.module.css";
import "./AddNew.css";

import $ from "jquery";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  const [newData, setNewData] = useState({
    genderId: "", // prevGender
    genderName: "",
    genderImg: null,
    categoryId: "", // prevCategory
    categoryName: "",
    categoryImg: null,
    subcategoryId: "",
    subcategoryName: "",
    subcategoryImg: null
  });

  useEffect(() => {
    if (props.title === "category") {
      // console.log(props.genderId, "addnewmodal");
      setNewData((prevState) => {
        return {
          ...prevState,
          genderId: props.genderId,
          genderName: props.genderName,
          genderImg: props.genderImg
        };
      });
    } else if (props.title === "subcategory") {
      console.log(props.categoryName, props.categoryImg, "addnewModal");
      setNewData((prevState) => {
        return {
          ...prevState,
          genderId: props.genderId,
          genderName: props.genderName,
          genderImg: props.genderImg,
          categoryId: props.categoryId,
          categoryName: props.categoryName,
          categoryImg: props.categoryImg
        };
      });
    }
  }, []);

  // $("#img").hide();
  const getFile1 = () => {
    $("#uploadButton1").on("click", function () {
      $("#genderImg").click();
    });

    $("#genderImg").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton1").css(
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

  const getFile2 = () => {
    $("#uploadButton2").on("click", function () {
      $("#categoryImg").click();
    });

    $("#categoryImg").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton2").css(
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

  const getFile3 = () => {
    $("#uploadButton3").on("click", function () {
      $("#subcategoryImg").click();
    });

    $("#subcategoryImg").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton3").css(
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

  const onChangeHandler = (event) => {
    let value = null;
    if (
      event.target.name === "genderImg" ||
      event.target.name === "categoryImg" ||
      event.target.name === "subcategoryImg"
    ) {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    setNewData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value
      };
    });
  };

  return (
    <Card className={classes.modal}>
      <div className="addnew">
        <h2>Add New</h2>
        <form method="post" name="form" className={classes.form}>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#gender">
                Gender
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#category">
                Category
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#subcategory">
                Sub-Category
              </a>
            </li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane container active" id="gender">
              <label htmlFor="genderName">Enter Gender Name</label>
              <input
                type="text"
                id="genderName"
                name="genderName"
                value={newData.genderName}
                onChange={onChangeHandler}
                disabled={
                  props.title === "category" || props.title === "subcategory"
                    ? true
                    : false
                }
              />
              <label>Upload Image</label>
              <div class="upload-img">
                <input
                  type="file"
                  name="genderImg"
                  id="genderImg"
                  accept=".gif, .jpg, .png"
                  // value={newData.categoryImg}
                  onChange={onChangeHandler}
                  disabled={props.title === "category" ? true : false}
                />
                <label
                  onClick={getFile1}
                  htmlFor="genderImg"
                  id="uploadButton1"
                  aria-disabled={props.title === "category" ? true : false}
                  style={{
                    backgroundImage: `url('${props.genderImg}')`
                  }}
                >
                  <span>+</span>
                </label>
              </div>
            </div>
            <div class="tab-pane container" id="category">
              <label htmlFor="categoryName">Enter Category Name</label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={newData.categoryName}
                onChange={onChangeHandler}
                disabled={props.title === "subcategory" ? true : false}
              />
              <div class="row m-0">
                <div class="col-6 p-0">
                  <label>Upload Image</label>
                  <div class="upload-img">
                    <input
                      type="file"
                      name="categoryImg"
                      id="categoryImg"
                      accept=".gif, .jpg, .png"
                      // value={newData.categoryImg}
                      onChange={onChangeHandler}
                      disabled={props.title === "subcategory" ? true : false}
                    />
                    <label
                      onClick={getFile2}
                      htmlFor="categoryImg"
                      id="uploadButton2"
                      aria-disabled={
                        props.title === "subcategory" ? true : false
                      }
                      style={{
                        backgroundImage: `url('${props.categoryImg}')`
                      }}
                    >
                      <span>+</span>
                    </label>
                  </div>
                </div>
                <div class="col-6">
                  <label htmlfor="categorytype">Select Category Type</label>
                  <select name="" id="categorytype">
                    <option value="main">Main</option>
                    <option value="addon">Add-On</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="tab-pane container" id="subcategory">
              <label htmlFor="subcategoryName">Enter Sub Category Name</label>
              <input
                type="text"
                id="subcategoryName"
                name="subcategoryName"
                value={newData.subcategoryName}
                onChange={onChangeHandler}
              />
              <div class="row m-0">
                <div class="col-6 p-0">
                  <label>Upload Image</label>
                  <div class="upload-img">
                    <input
                      type="file"
                      name="subcategoryImg"
                      id="subcategoryImg"
                      accept=".gif, .jpg, .png"
                      // value={newData.categoryImg}
                      onChange={onChangeHandler}
                    />
                    <label
                      onClick={getFile3}
                      htmlFor="subcategoryImg"
                      id="uploadButton3"
                    >
                      <span>+</span>
                    </label>
                  </div>
                </div>
                <div class="col-6">
                  <label htmlfor="subcategorytype">
                    Select Sub-Category Type
                  </label>
                  <select name="" id="subcategorytype">
                    <option value="main">Main</option>
                    <option value="addon">Add-On</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* <button
            type="submit"
            class="publish"
            onClick={() => props.publish(newData)}
          >
            Publish
          </button> */}
          <button
            type="button"
            class="draft"
            onClick={() => props.saveAsDraft(newData)}
          >
            Save as draft
          </button>
        </form>
      </div>
    </Card>
  );
};

const AddNewModal = (props) => {
  const draftHandler = (values) => {
    // console.log(values);
    props.draft(values);
  };
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          // publish={props.publish}
          saveAsDraft={draftHandler}
          genderId={props.genderId}
          genderName={props.genderName}
          genderImg={props.genderImg}
          categoryId={props.categoryId}
          categoryName={props.categoryName}
          categoryImg={props.categoryImg}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default AddNewModal;
