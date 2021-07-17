import React from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import Card from "../Card/Card";

import classes from "./ChangeModal.module.css";
import "./NewStyleModal.css";

import $ from "jquery";

const NewStyleModal = () => {
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

  return (
    <div className="addnew">
      <h2>Add New Style</h2>
      <form method="post" name="form" className={classes.form}>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#style">
              Gender
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#relation">
              Category
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane container active" id="style">
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
            <button
              type="button"
              class="draft"
              // onClick={() => props.saveAsDraft(props.newData)}
            >
              Save as draft
            </button>
          </div>
          <div class="tab-pane container" id="relation">
            <h4>Pickup Relations</h4>
            <div class="subcs">
              <p>Sub-Category Name</p>
              <div class="scrollview">
                <div class="styles">
                  <img class="img-fluid" src="" alt="style" />
                  <p class="sname"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewStyleModal;
