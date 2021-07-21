import React, { useEffect, useState } from "react";
import "./Info.css";
import InfoCard from "../../../../UI/Card/InfoCard";

const InfoPage = (props) => {
  const [cat, setCat] = useState([]);

  useEffect(() => {}, []);
  return (
    <div className="info">
      <div className="flex">
        <div className="left">
          <button
            type="button"
            className={`link ${props.type === "mainProduct" ? "active" : ""}`}
            // onClick={props.selectMain}
            onClick={() => props.selectedType("mainProduct")}
          >
            Main
          </button>
          <button
            type="button"
            className={`link ${props.type === "addOns" ? "active" : ""}`}
            // onClick={props.selectAddOn}
            onClick={() => props.selectedType("addOns")}
          >
            Add-ons
          </button>
        </div>
        <div className="right">
          <input type="search" placeholder="search using this" />
        </div>
      </div>
      <div className="content">
        {props.categoryList.map((category) => {
          return (
            <InfoCard
              item={category}
              selectedCategory={props.selectedCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InfoPage;
