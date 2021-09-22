import React from "react";
import "./Tailor.css";
import Approval from "./Approval.js";
import List from "./List.js";
import Rejected from "./Rejected.js";

const Tailor = (props) => {
  return (
    <>
      <div class="tailor">
        <Approval />
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#list">
              Tailor List
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#rejected">
              Rejected
            </a>
          </li>
        </ul>
        {/* <!-- Tab panes --> */}
        <div class="tab-content">
          <div class="tab-pane container nullify active" id="list">
            <List />
          </div>
          <div class="tab-pane container nullify" id="rejected">
            <Rejected />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tailor;
