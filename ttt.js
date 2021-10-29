import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import TailorView from "./TailorView";
import firebase from "../../../../Services/firebase/firebase";
import Spinner from "../../../UI/Spinner/Spinner";

import $ from "jquery";
import LoadingBar from "react-top-loading-bar";
import "./Tailor.css";

const db = firebase.firestore();
let list = null;
const Tailor = (props) => {
  const ref = useRef(null);
  // const [newTailorList, setNewTailorList] = useState(null);
  const [tailorList, setTailorList] = useState(null);

  $("button").on("click", function () {
    $("button").removeClass("selected");
    $(this).addClass("selected");
  });

  useEffect(() => {
    console.log("perorderuseeffect");
    list = [];
    db.collection("TailorsDetails")
      .where("tailorStatus", "==", "Verified")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });

        setTailorList(list);
        console.log("list", list);
      });
  }, []);

  const newTailorHandler = () => {
    console.log("verifiedorder");
    let list = [];
    db.collection("TailorsDetails")
      .where("tailorStatus", "==", "Registered")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setTailorList(list);
        console.log("list", list);
      });
  };

  const verifiedTailorHandler = () => {
    console.log("verifiedorder");
    let list = [];
    db.collection("TailorsDetails")
      .where("tailorStatus", "==", "Verified")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setTailorList(list);
        console.log("list", list);
      });
  };

  const rejectedTailorHandler = () => {
    console.log("verifiedorder");
    let list = [];
    db.collection("TailorsDetails")
      .where("tailorStatus", "==", "Rejected")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setTailorList(list);
        console.log("list", list);
      });
  };

  let tailors = null;
  if (tailorList === null) {
    tailors = <Spinner />;
  } else if (tailorList === "empty") {
    tailors = <h1>No Processing Orders</h1>;
  } else {
    tailors = tailorList.map((tailor) => {
      return <TailorView tailor={tailor} {...props} />;
    });
    // tailors = <TailorView {...props} />;
  }

  return (
    <div className="tailor">
      <div className="rflex">
        <button
          type="button"
          className="selected"
          onClick={() => verifiedTailorHandler()}
        >
          Tailor List
        </button>
        <button type="button" onClick={() => newTailorHandler()}>
          New Tailor
          <span className="new-count">
            {tailorList !== null && tailorList.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            rejectedTailorHandler();
          }}
        >
          Rejected
        </button>
      </div>
      <div className="ordercontent">
        {ReactDOM.createPortal(
          <LoadingBar color="#FF0000" ref={ref} />,
          document.getElementById("linear-loader")
        )}
        <div id="content" className="content">
          {tailors}
        </div>
      </div>
    </div>
  );
};

export default Tailor;
