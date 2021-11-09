import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
import Card from "../Card/Card";

import classes from "./VerifyModal.module.css";
import "./AddNew.css";

import $ from "jquery";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  const [verify, setVerify] = useState(true);
  // $("#img").hide();
  const onChengeHandler = (event) => {
    if (event.target.value === "verify") {
      setVerify(true);
    } else {
      setVerify(false);
    }
    props.clearData();
  };
  let ui = null;
  if (verify === true) {
    ui = (
      <>
        <form method="post" name="form" className={classes.form}>
          <label htmlFor="orderPrice">Order Price</label>
          <input
            type="number"
            id="orderPrice"
            name="orderPrice"
            value={props.newData.orderPrice}
            onChange={props.onChange}
          />
          <label htmlFor="styleName">Tailor Charge</label>
          <input
            type="number"
            id="tailorCharge"
            name="tailorCharge"
            value={props.newData.tailorCharge}
            onChange={props.onChange}
          />

          <label htmlFor="dueDate">DueDate</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={props.newData.dueDate}
            onChange={props.onChange}
          />

          <button
            type="button"
            class="draft"
            onClick={() => props.saveAsDraft(props.newData)}
          >
            Send
          </button>
        </form>
      </>
    );
  } else if (verify === false) {
    ui = (
      <>
        <form method="post" name="form" className={classes.form}>
          <label htmlFor="dueDate">DueDate</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={props.newData.dueDate}
            onChange={props.onChange}
          />

          <button
            type="button"
            class="draft"
            onClick={() => props.directAssign(props.newData)}
          >
            Send
          </button>
        </form>
      </>
    );
  }

  return (
    <Card className={classes.modal}>
      <div className="addnew">
        <h2>Order Quotation</h2>
        <div className="choices">
          <input
            type="radio"
            id="verify"
            name="alter"
            value="verify"
            onChange={onChengeHandler}
          />
          <label htmlFor="verify">&nbsp; Verify</label>
          &ensp;
          <input
            type="radio"
            id="directassign"
            name="alter"
            value="directassign"
            onChange={onChengeHandler}
          />
          <label htmlFor="directassign">&nbsp;Direct Assign</label>
        </div>
        {ui}
      </div>
    </Card>
  );
};

const AlterVerifiedModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          // onClose={props.closeModal}
          title={props.title}
          saveAsDraft={props.saveAsDraft}
          onChange={props.onChange}
          newData={props.newData}
          directAssign={props.directAssign}
          clearData={props.clearData}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default AlterVerifiedModal;
