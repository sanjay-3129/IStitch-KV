import React from "react";
import "./DeleteCard.css";

const DeleteCard = (props) => {
  return (
    <div className="col-3 delete">
      <div className="flex-col">
        <div className="content">
          <div className="overlay">
            <img className="img-fluid" src={props.mainImg} alt="" />
          </div>
          <div className="hovereffect">
            <img className="img-fluid p-0" src={props.mainImg} alt="" />
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
