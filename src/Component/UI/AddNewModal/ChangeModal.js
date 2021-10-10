import React from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
import Card from "../Card/Card";

import classes from "./ChangeModal.module.css";
import "./ChangeModal.css";

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

  let change = null;
  if (props.title === "name") {
    change = (
      <>
        <label htmlFor="name">Enter New {props.title}</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={props.onChange}
          value={props.newName}
        />
      </>
    );
  } else if (props.title === "price") {
    change = (
      <>
        <label htmlFor="price">Enter New {props.title}</label>
        <input
          type="number"
          id="price"
          name="price"
          onChange={props.onChange}
          value={props.newPrice}
        />
      </>
    );
  } else {
    change = (
      <>
        <label>Upload Image</label>
        <div className="upload-img">
          <input
            type="file"
            name="img"
            id="img"
            accept=".gif, .jpg, .png"
            onChange={props.onChange}
          />
          <label onClick={getFile} htmlFor="img" id="uploadButton">
            <span>+</span>
          </label>
        </div>
      </>
    );
  }

  return (
    <Card className={classes.modal}>
      <div className="addnew">
        <h2 className>Change {props.title}</h2>
        <form name="form">
          <div>
            {change}
            <button
              type="button"
              className="draft"
              onClick={() => props.submit()}
            >
              Change
            </button>
            <button
              type="button"
              className="publish"
              onClick={props.closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

const ChangeModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          closeModal={props.closeModal}
          onChange={props.onChange}
          change={() => props.change(props.title)}
          newName={props.newName}
          // newPrice={props.newPrice}
          submit={props.submit}
          // category={props.category}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ChangeModal;
