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
  // $("#img").hide();
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
    <Card className={classes.modal}>
      <div className="addnew">
        <h2>Add New {props.title}</h2>
        <form method="post" name="form" className={classes.form}>
          <label htmlFor="styleName">Enter {props.title} Name</label>
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
          {props.title === "Category" && (
            <>
              <div class="col-6">
                <label htmlfor="categorytype">Select Category Type</label>
                <select
                  name="categorytype"
                  id="categorytype"
                  value={props.newData.categorytype}
                  onChange={props.onChange}
                >
                  <option value="mainProduct">Main</option>
                  <option value="addOns">Add-On</option>
                </select>
              </div>
              {props.newData.categorytype === "addOns" ? (
                <>
                  <label for="exampleDataList1" class="form-label">
                    Select Main category
                  </label>
                  <input
                    name="mcategory"
                    class="form-control"
                    list="datalistOptions1"
                    id="exampleDataList1"
                    placeholder="Type to search..."
                    // value={props.newData.mainCategoryId}
                    onChange={props.onChange}
                    // onChange={props.onmChange}
                    onFocus={props.getCategoryList}
                  />
                  <datalist id="datalistOptions1">
                    {console.log("ffffff", props.mcategoryList)}
                    {props.mcategoryList.map((mcategory) => (
                      <option
                        key={mcategory.categoryId}
                        value={mcategory.categoryName}
                      />
                    ))}
                  </datalist>
                </>
              ) : (
                <></>
              )}
            </>
          )}

          <button
            type="button"
            class="draft"
            onClick={() => props.saveAsDraft(props.newData)}
          >
            Save as draft
          </button>
        </form>
      </div>
    </Card>
  );
};

const AddNewStyle = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          // onClose={props.closeModal}
          title={props.title}
          saveAsDraft={props.saveAsDraft}
          onChange={props.onChange}
          // onmChange={props.onmChange}
          getCategoryList={props.getCategoryList}
          newData={props.newData}
          mcategoryList={props.mcategoryList}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default AddNewStyle;
