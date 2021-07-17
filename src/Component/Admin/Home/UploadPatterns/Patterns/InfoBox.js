import { useEffect } from "react";
import "./InfoBox.css";
// import Tooltip from "@material-ui/core/Tooltip";
// import Button from "@material-ui/core/Button";

const InfoBox = (props) => {
  // useEffect(() => {
  //   console.log("----------", props.patternsDetails);
  // }, []);
  return (
    <div className="info_box">
      {/* <Tooltip title="Add" placement="top">
        <Button>top</Button>
      </Tooltip> */}
      <h1 className="heading">{props.patternsDetails.patternName}</h1>
      <article className="content">
        <div className="wrap">
          <img
            className="img-fluid"
            src={props.patternsDetails.patternImage}
            alt={props.patternsDetails.patternName}
          />
          <div className="btn-set">
            <button
              type="button"
              className="change-name"
              onClick={props.changeName}
              // onClick={() => console.log("Change Name")}
            >
              Change Name
            </button>
            <button
              type="button"
              className="change-btn"
              onClick={props.changeImage}
            >
              Change Image
            </button>
            <button
              type="button"
              className="delete-gender"
              onClick={() =>
                props.deleteHandler(props.patternsDetails.patternId)
              }
            >
              Delete
            </button>
            <div class="can-toggle">
              <input id="a" type="checkbox" />
              <label for="a">
                <div
                  class="can-toggle__switch"
                  data-checked="Show"
                  data-unchecked="Hide"
                ></div>
              </label>
            </div>
          </div>
        </div>
        <div className="count">
          <p>
            Gender
            <span className="category-count">
              {props.genderName || props.patternsDetails.genderName}
            </span>{" "}
          </p>
          <p>
            Category
            <span className="category-count">
              {props.categoryName || props.patternsDetails.categoryName}
            </span>{" "}
          </p>
          <p style={{ textAlign: "center" }}>
            SubCategory
            <span className="category-count">
              {props.subcategoryName || props.patternsDetails.subcategoryName}
            </span>
          </p>

          <p style={{ textAlign: "center" }}>
            Style
            <span className="category-count">
              {props.styleName || props.patternsDetails.styleName}
            </span>
          </p>
        </div>
        <div className="view-all">
          <button onClick={props.goBack}>GO BACK</button>
        </div>
      </article>
    </div>
  );
};

export default InfoBox;
