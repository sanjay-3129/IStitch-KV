import React from "react";
import "./DeleteCard.css";

const DeleteCard = (props) => {
  let main = {
    item: "",
    mainImg: ""
    // genderId: "",
    // categoryId: "",
    // subcategoryId: "",
    // styleId: "",
    // patternId: ""
  };

  if (props.item.genderImg !== "") {
    main.mainImg = props.item.genderImg;
    main.item = "gender";
    // main.genderId = props.item.genderId;
  } else if (props.item.categoryImg !== "") {
    main.mainImg = props.item.categoryImg;
    main.item = "category";
    // main.genderId = props.item.genderId;
    // main.categoryId = props.item.categoryId;
  } else if (props.item.subcategoryImg !== "") {
    main.mainImg = props.item.subcategoryImg;
    main.item = "subcategory";
    // main.genderId = props.item.genderId;
    // main.categoryId = props.item.categoryId;
    // main.subcategoryId = props.item.subcategoryId;
  } else if (props.item.styleImg !== "") {
    main.mainImg = props.item.styleImg;
    main.item = "style";
    // main.genderId = props.item.genderId;
    // main.categoryId = props.item.categoryId;
    // main.subcategoryId = props.item.subcategoryId;
    // main.styleId = props.item.styleId;
  } else {
    main.mainImg = props.item.patternImg;
    main.item = "pattern";
    // main.genderId = props.item.genderId;
    // main.categoryId = props.item.categoryId;
    // main.subcategoryId = props.item.subcategoryId;
    // main.styleId = props.item.styleId;
    // main.patternId = props.item.patternId;
  }
  return (
    <div className="col-3 delete">
      <div className="flex-col">
        <div className="content">
          <div className="overlay">
            <img className="img-fluid" src={main.mainImg} alt={props.item.id} />
          </div>
          <div className="hovereffect">
            <img
              className="img-fluid p-0"
              src={main.mainImg}
              alt={props.item.id}
            />
          </div>
          <p>
            Gender: <small>{props.item.genderName}</small>
          </p>
          <p>
            Category:{" "}
            <small>
              {props.item.categoryName === "" ? " - " : props.item.categoryName}
            </small>
          </p>
          <p>
            Sub-Category:{" "}
            <small>
              {props.item.subcategoryName === ""
                ? " - "
                : props.item.subcategoryName}
            </small>
          </p>
          <p>
            Styles:{" "}
            <small>
              {props.item.styleName === "" ? " - " : props.item.styleName}
            </small>
          </p>
          <p>
            Pattern:{" "}
            <small>
              {props.item.patternName === "" ? " - " : props.item.patternName}
            </small>
          </p>
        </div>
        <div className="btn-set">
          <button type="button" onClick={() => props.restore(props.item, main)}>
            Restore
          </button>
          <button type="button" onClick={() => props.delete(props.item, main)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
  // });
};

export default DeleteCard;
