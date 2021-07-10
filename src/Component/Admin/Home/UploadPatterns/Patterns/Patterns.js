import React from "react";
import "./Patterns.css";
import $ from "jquery";

const Patterns = (props) => {
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
  return (
    <>
      <div className="flex">
        <div className="img">
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
        {/* <img
            className="img_fluid"
            src="https://32iio.csb.app/images/kid.png"
            alt="kid"
          /> */}
        {/* <button type="button">+</button> */}

        <div className="innerwrap">
          <label htmlFor="patternName">Enter Pattern Name</label>
          <input type="text" id="patternName" name="patternName" />
          <br />
          <br />
          <button type="submit" className="draft">
            Save as draft
          </button>
          <br />
          <br />
          <button type="submit" className="publish">
            Publish
          </button>
        </div>
        <div className="selected">
          <div className="selected_value">
            <p className="name">Category1</p>
          </div>
          <div className="selected_value">
            <p className="name">Category2</p>
          </div>
          <div className="selected_value">
            <p className="name">Add-on Category1</p>
          </div>
          <div className="selected_value">
            <p className="name">Category3</p>
          </div>
          <div className="selected_value">
            <p className="name">Add-on Category2</p>
          </div>
          <div className="selected_value">
            <p className="name">Style1</p>
          </div>
          <div className="selected_value">
            <p className="name">Style2</p>
          </div>
        </div>
      </div>
      <div className="category_list">
        <h2>Main Category</h2>
        <small>
          Search more Categories
          <input type="search" />
        </small>
        <div className="row">
          <div className="cards">
            <img className="card_img" src="images/women.png" />
            <p className="card_name">Category1</p>
          </div>
          <div className="cards">
            <img className="card_img" src="images/girl.png" />
            <p className="card_name">Category2</p>
          </div>
          <div className="cards">
            <img className="card_img" src="images/women.png" />
            <p className="card_name">Category3</p>
          </div>
          <div className="cards">
            <img className="card_img" src="images/girl.png" />
            <p className="card_name">Category4</p>
          </div>
          <div className="cards add_new">
            <div className="inner">
              <i className="fas fa-upload"></i>
              <p>Add New</p>
              <a className="stretched-link" href="#"></a>
            </div>
          </div>
        </div>
      </div>
      <div className="category_list">
        <h2>Add-on Category</h2>
        <small>
          Search more
          <input type="search" />
        </small>
        <div className="row">
          <div className="cards">
            <img className="card_img" src="images/men.png" />
            <p className="card_name">Add-on Category1</p>
          </div>
          <div className="cards">
            <img className="card_img" src="images/men2.png" />
            <p className="card_name">Add-on Category2</p>
          </div>
          <div className="cards">
            <img className="card_img" src="images/men.png" />
            <p className="card_name">Add-on Category3</p>
          </div>
          <div className="cards">
            <img className="card_img" src="images/men2.png" />
            <p className="card_name">Add-on Category4</p>
          </div>
          <div className="cards add_new">
            <div className="inner">
              <i className="fas fa-upload"></i>
              <p>Add New</p>
              <a className="stretched-link" href="#"></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patterns;
