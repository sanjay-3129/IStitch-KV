import React from "react";

const InfoCard = (props) => {
    return (
      <div
        className="content_box"
        key={category.categoryId}
        onClick={() => props.selectedCategory(category)}
      >
        <img
          className="img_fluid"
          src={category.categoryImage}
          alt={category.categoryName}
        />
        <p className="name">{category.categoryName}</p>
      </div>
    );
  };

export default InfoCard;
