import React from "react";
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
  // $("#img").hide();
  const getFile = () => {
    $("#uploadButton1").on("click", function () {
      $("#genderImg").click();
    });

    $("#genderImg").change(function () {
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

  return (
    <Card className={classes.modal}>
      <div className="addnew">
        <h2>Add New</h2>
        <form method="post" name="form" className={classes.form}>
          <label htmlFor="genderName">Enter Style Name</label>
          <input type="text" id="styleName" name="styleName" />
          <label>Upload Image</label>
          <div class="upload-img">
            <input
              type="file"
              name="styleImg"
              id="styleImg"
              accept=".gif, .jpg, .png"
              // value={newData.styleImg}
            />
            <label onClick={getFile} htmlFor="styleImg" id="uploadButton">
              <span>+</span>
            </label>
          </div>
        </form>
      </div>
    </Card>
  );
};

const AddNewStyle = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default AddNewStyle;
