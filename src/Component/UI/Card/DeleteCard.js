import React from "react";
import "./DeleteCard.css";

const DeleteCard = (props) => {
  props.items.map((item, index) => {
    return (
      <div className="col-3 delete" key={index}>
        <div className="flex-col">
          <div className="content">
            <div className="overlay">
              <img className="img-fluid" src={props.mainImg} alt="" />
            </div>
            <div className="hovereffect">
              <img className="img-fluid p-0" src={props.mainImg} alt="" />
            </div>
            <p>
              Gender: <small>{item.genderName}</small>
            </p>
            <p>
              Category:{" "}
              <small>
                {item.categoryName === "" ? " - " : item.categoryName}
              </small>
            </p>
            <p>
              Sub-Category:{" "}
              <small>
                {item.subcategoryName === "" ? " - " : item.subcategoryName}
              </small>
            </p>
            <p>
              Styles:{" "}
              <small>{item.styleName === "" ? " - " : item.styleName}</small>
            </p>
            <p>
              Pattern:{" "}
              <small>
                {item.patternName === "" ? " - " : item.patternName}
              </small>
            </p>
          </div>
          <div className="btn-set">
            <button type="button" onClick={() => props.restore(item)}>
              Restore
            </button>
            <button type="button" onClick={() => props.delete(item)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
};

export default DeleteCard;
