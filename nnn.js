import React, { useState, useEffect } from "react";
import "./Tailor.css";
import Approval from "./Approval.js";
import List from "./List.js";
import Rejected from "./Rejected.js";

import firebase from "../../../../Services/firebase/firebase";

const db = firebase.firestore();

const Tailor = (props) => {
  const [verifiedtailors, setverifiedtailors] = useState();

  let list;
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

        setverifiedtailors(list);
        console.log("list", list);
      });
  }, []);

  const verifiedTailorHandler = () => {
    console.log("verifiedorder");
    let list = [];
    db.collection("orders")
      .where("tailorStatus", "==", "Verified")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setverifiedtailors(list);
        console.log("list", list);
      });
  };

  const rejectedTailorHandler = () => {
    console.log("verifiedorder");
    let list = [];
    db.collection("orders")
      .where("tailorStatus", "==", "Rejected")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setverifiedtailors(list);
        console.log("list", list);
      });
  };
  let tailor;

  return (
    <>
      <div class="tailor">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button type="button" onClick={() => verifiedTailorHandler()}>
              Tailor List
            </button>
          </li>
          <li class="nav-item">
            <button type="button" onClick={() => rejectedTailorHandler()}>
              Rejected
            </button>
          </li>
        </ul>
        <List />
      </div>
    </>
  );
};

export default Tailor;

{
  /* <div class="tailor">
        
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button class="nav-link active" data-toggle="tab" href="#list">
              Tailor List
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" data-toggle="tab" href="#rejected">
              Rejected
            </button>
          </li>
        </ul>
        
        <div class="tab-content">
          <div class="tab-pane container nullify active" id="list">
            <List />
          </div>
          <div class="tab-pane container nullify" id="rejected">
            <Rejected />
          </div>
        </div>
      </div> */
}
