import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
import Card from "../Card/Card";

import classes from "./AddNewModal.module.css";
import "./AddNew.css";

import $ from "jquery";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  // $("#img").hide();
  const getFile = () => {
    $("#uploadButton").on("click", function () {
      $("#verborgen_file").click();
    });

    $("#img").change(function () {
      var file = this.files[0];
      console.log(file);
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

  $(function () {
    $(".btn").click(function () {
      $(".form1").toggleClass("form1-left");
      $(".form2").toggleClass("form2-left");
      $(".form2-inactive").toggleClass("form2-active");
      $(".form1-active").toggleClass("form1-inactive");
      $(this).removeClass("idle").addClass("active");
    });
  });

  return (
    <Card className={classes.modal}>
      <div className="addnew">
        <h2 className>Add New</h2>
        <form action="" method="post" name="form">
          <div className={classes.nav}>
            <ul className="links">
              <li className="form1-active sty">
                <Link className="btn">{props.title}</Link>
              </li>
              <li className="form2-inactive sty">
                <Link className="btn">Category</Link>
              </li>
            </ul>
          </div>
          <div ng-app ng-init="checked = false" className="ht">
            <div className="form1">
              <label htmlFor="name">Enter {props.title} Name</label>
              <input type="text" id="name" />
              <label>Upload Image</label>
              <div className="upload-img">
                <input
                  type="file"
                  name="prfl_img"
                  id="img"
                  accept=".gif, .jpg, .png"
                />
                <label onClick={getFile} for="img" id="uploadButton">
                  <span>+</span>
                </label>
              </div>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">
                <span className="ui"></span>Add Category into New Gender?
              </label>
            </div>

            <div class="form2">
              <label htmlFor="namen">Enter {props.title} Name</label>
              <input type="text" id="namen" />
              <label>Upload Image</label>
              <div class="upload-img">
                <input
                  type="file"
                  name="prfl_img"
                  id="img"
                  accept=".gif, .jpg, .png"
                />
                <label for="img" id="uploadButton">
                  <span>+</span>
                </label>
              </div>
            </div>
          </div>
          <button type="submit" class="publish">
            Publish
          </button>
          <button type="submit" class="draft">
            Save as draft
          </button>
        </form>
      </div>
    </Card>
  );
};

const AddNewModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          publish={props.publish}
          saveAsDraft={props.draft}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default AddNewModal;
