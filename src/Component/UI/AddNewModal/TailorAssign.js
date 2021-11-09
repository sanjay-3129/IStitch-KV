import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
import Card from "../Card/Card";
import classes from "./TailorAssign.module.css";

import $ from "jquery";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  // $("#img").hide();

  return (
    <Card className={classes.modal}>
      <h1 className={classes.title}>Assign a Tailor</h1>
      <div className={classes.scroll}>
        {props.tailors !== null &&
          props.tailors.map((tailor) => {
            return (
              <div className={classes.box}>
                <p className={classes.tid}>{tailor.tailorId}</p>
                <p className={classes.tname}>{tailor.name}</p>
                <p className={classes.tno}>{tailor.phone}</p>
                <p className={classes.tadd}>{tailor.address}</p>
                <p className={classes.oo}>02</p>
                <p className={classes.assign}>
                  <button
                    type="submit"
                    className={classes.btn}
                    onClick={() => props.singletailor(tailor)}
                  >
                    Assign&ensp;<i class="fas fa-check"></i>
                  </button>
                </p>
              </div>
            );
          })}
      </div>
    </Card>
  );
};

const TailorAssign = (props) => {
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
          saveAsDraft={props.tailorAssign}
          // onChange={props.onChange}
          // newData={props.newtailor}
          singletailor={props.singletailor}
          tailors={props.tailors}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default TailorAssign;
