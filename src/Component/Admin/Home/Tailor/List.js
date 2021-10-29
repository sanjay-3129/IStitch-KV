import React from "react";
import TailorList from "./TailorList";

const List = (props) => {
  return (
    <div class="list">
      {/* <div class="box head">
        <p class="id">Tailor Id</p>
        <p class="tname">Name</p>
        <p class="no">Number</p>
        <p class="spec">Specalization</p>
        <p class="add">Address</p>
        <p class="timg">Tailor Image</p>
      </div> */}
      <TailorList tailor={props.tailor} />
    </div>
  );
};

export default List;
