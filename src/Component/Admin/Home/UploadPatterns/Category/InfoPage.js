import React, { useEffect, useState } from "react";
import "./Info.css";
import InfoCard from "../../../../UI/Card/InfoCard";
import Spinner from "../../../..//UI/Spinner/Spinner";

// will create a state

const Pagination = (props) => {
  const [pages] = useState(Math.round(props.length / 8));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState([]);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * 8 - 8;
    const endIndex = startIndex + 8;
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 3) * 3;
    let total = new Array(3).fill().map((_, idx) => start + idx + 1);
    setPageGroup(total);
  };
};

const InfoPage = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  // props.length
  useEffect(() => {
    setCategoryList(props.categoryList);
    // console.log("categoryList", props.categoryList);
  }, []);

  // const next = () => {};

  // if (categoryList < 8) {
  //   return (
  //     <div className="info">
  //       <Pagination
  //         length={props.length}
  //         categoryList={categoryList}
  //         selectedCategory={props.selectedCategory}
  //       />
  //     </div>
  //   );
  // } else if (categoryList >= 8) {
  //   return (
  //     <div className="info">
  //       <Pagination
  //         length={props.length}
  //         categoryList={categoryList}
  //         selectedCategory={props.selectedCategory}
  //       />
  //       <button type="button" class="" onClick={next}>
  //         Load More
  //       </button>
  //     </div>
  //   );
  // }

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
        {categoryList.map((category) => {
          return (
            <InfoCard
              item={category}
              selectedCategory={props.selectedCategory}
            />
          );
        })}
        {/* <Pagination
          length={props.length}
          categoryList={categoryList}
          selectedCategory={props.selectedCategory}
        /> */}
        {/* <button onClick>prev</button> */}
        {/* <button>1</button> */}
        {/* <button onClick>next</button> */}
      </div>
    </div>
  );
};

export default InfoPage;
