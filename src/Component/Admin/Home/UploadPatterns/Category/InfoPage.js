import React, { useEffect, useState } from "react";
import "./Info.css";
import InfoCard from "../../../../UI/Card/InfoCard";
// import Spinner from "../../../..//UI/Spinner/Spinner";
import $ from "jquery";

const InfoPage = (props) => {
  // const [categoryList, setCategoryList] = useState([]);
  // props.length
  // useEffect(() => {
  //   setCategoryList(props.categoryList);
  //   // console.log("categoryList", props.categoryList);
  // }, []);

  const onScrollHandler = (e) => {
    const bottom =
      e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
      e.target.clientHeight;
    // bottom && data empty dont call db again
    // if there is no data from, then length will be 0, so no need to call db again
    if (bottom) {
      props.onScroll();
    }
  };

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
      <div id="content" className="content" onScroll={onScrollHandler}>
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
