import React from "react";
import "./StatusBar.css";
const StatusBar = (props) => {
  return (
    <>
      <div class="progress-bar">
        <div class="progress-step">
          <div class="step-count"></div>
          <div class="step-description">Booked</div>
        </div>
        <div class="progress-step is-active">
          <div class="step-count"></div>
          <div class="step-description">Accepted</div>
        </div>
        <div class="progress-step">
          <div class="step-count"></div>
          <div class="step-description">Allocated</div>
        </div>
        <div class="progress-step">
          <div class="step-count"></div>
          <div class="step-description">Processing</div>
        </div>
        <div class="progress-step">
          <div class="step-count"></div>
          <div class="step-description">Completed</div>
        </div>
      </div>
    </>
  );
};

export default StatusBar;
