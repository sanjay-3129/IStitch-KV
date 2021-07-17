import React from "react";
import "./DeleteCard.css";

const DeleteCard = (props) => {
  let mainImg = null;
  if (props.item.genderImg !== "") {
    mainImg = props.item.genderImg;
  } else if (props.item.categoryImg !== "") {
    mainImg = props.item.categoryImg;
  } else if (props.item.subcategoryImg !== "") {
    mainImg = props.item.subcategoryImg;
  } else if (props.item.styleImg !== "") {
    mainImg = props.item.styleImg;
  } else {
    mainImg = props.item.patternImg;
  }
  return (
    <div className="col-3 delete">
      <div className="flex-col">
        <div className="content">
          <div className="overlay">
            <img className="img-fluid" src={mainImg} alt={mainImg.name} />
          </div>
          <div className="hovereffect">
            <img className="img-fluid p-0" src={mainImg} alt={mainImg.name} />
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
          <button type="button" onClick={() => props.restore(props.item)}>
            Restore
          </button>
          <button type="button" onClick={() => props.delete(props.item)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
  // });
};

export default DeleteCard;
