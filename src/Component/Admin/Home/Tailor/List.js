import React from "react";
import TailorList from "./TailorList";

const List = (props) => {
  return (
    // <div class="list fas" style={{ display: "block", lineHeight: "initial" }}>
    <div class="list">
      <i class="fas abs-arrow fa-sort-down"></i>
      {/* <div class="box head">
        <p class="id">Tailor Id</p>
        <p class="tname">Name</p>
        <p class="no">Number</p>
        <p class="spec">Specalization</p>
        <p class="add">Address</p>
        <p class="timg">Tailor Image</p>
      </div> */}
      <TailorList tailor={props.tailor} payHandler={props.payHandler} />
    </div>
  );
};

export default List;
