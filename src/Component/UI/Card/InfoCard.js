import React from "react";

const InfoCard = (props) => {
  return (
    <div class="col-3">
      <div
        className="content_box"
        key={props.item.categoryId}
        onClick={() => props.selectedCategory(props.item)}
      >
        <img
          className="img_fluid"
          src={props.item.categoryImage}
          alt={props.item.categoryName}
        />
        <p className="name">{props.item.categoryName}</p>
      </div>
    </div>
  );
};

export default InfoCard;
