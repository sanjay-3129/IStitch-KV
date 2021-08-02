import React from "react";
import OrderView from "./OrderView";
import "./Preorders.css";

const Preorders = (props) => {
  return (
    <div>
      <div className="rflex">
        <div>
          <input type="checkbox" id="all" />
          <label for="all" id="id0">
            All
          </label>
        </div>
        <div>
          <input type="checkbox" id="rejected" />
          <label for="rejected" id="id1">
            Rejected
          </label>
        </div>
        <div>
          <input type="checkbox" id="waiting" />
          <label for="waiting" id="id2">
            Waiting
          </label>
        </div>
      </div>
      <OrderView />
    </div>
  );
};

export default Preorders;
