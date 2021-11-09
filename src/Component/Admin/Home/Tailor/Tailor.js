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
  const [tailorCount, setTailorCount] = useState({
    orderStatus: "",
    count: 0
  });

  $("button").on("click", function () {
    $("button").removeClass("selected");
    $(this).addClass("selected");
  });

  useEffect(() => {
    // console.log("perorderuseeffect");
    list = [];
    db.collection("TailorsDetails")
      .where("tailorStatus", "==", "Verified")
      .get()
      .then((data) => {
        // console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        db.collection("TailorsDetails")
          .where("tailorStatus", "==", "Registered")
          .get()
          .then((data) => {
            setTailorCount({
              orderStatus: "Registered",
              count: data.size
            });
          });
        setTailorList(list);
        console.log("list", list);
      });
  }, []);

  useEffect(() => {
    if (tailorList !== null) {
      // console.log("status", bookedCount.orderStatus, preorderList);
      if (
        tailorCount.tailorStatus === "Registered" &&
        tailorList[0].tailorStatus === "Registered"
      ) {
        setTailorCount({
          orderStatus: "Registered",
          count: tailorList.length
        });
      }
    }
  }, [tailorList, tailorCount.tailorStatus]);

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

  const acceptTailor = (tailor) => {
    console.log("Accepted");
    console.log(">>>>>>", tailor);
    let value = window.confirm("Do you want Accept");
    if (value) {
      db.collection("TailorsDetails")
        .doc(tailor.userId)
        .update({
          tailorStatus: "Verified"
        })
        .then(() => {
          let data = [...tailorList];

          let filterdata = data.filter((d) => d.tailorId !== tailor.tailorId);
          setTailorList(filterdata);
        });
    } else {
      console.log("Not Accepted");
    }
  };
  const rejectTailor = (tailor) => {
    console.log("Rejected");
    let value = window.confirm("Do you want Reject");
    if (value) {
      db.collection("TailorsDetails")
        .doc(tailor.userId)
        .update({
          tailorStatus: "Rejected"
        })
        .then(() => {
          let data = [...tailorList];

          let filterdata = data.filter((d) => d.tailorId !== tailor.tailorId);
          setTailorList(filterdata);
        });
    } else {
      console.log("nott rejected");
    }
  };

  const deleteTailor = (tailor) => {
    let value = window.confirm("Do you want to Delete the tailor");
    if (value) {
      db.collection("TailorsDetails").doc(tailor.userId).delete();
    } else {
      console.log("Not Deleted");
    }
  };

  let tailors = null;
  if (tailorList === null) {
    tailors = <Spinner />;
  } else if (tailorList === "empty") {
    tailors = <h1>No Processing Orders</h1>;
  } else {
    console.log("...>>>>>....", tailorList);

    tailors = (
      <>
        {tailorList.tailorStatus === "Verified" ? (
          <div class="box head">
            <p class="id">Tailor Id</p>
            <p class="tname">Name</p>
            <p class="no">Number</p>
            <p class="spec">Specalization</p>
            <p class="add">Address</p>
          </div>
        ) : null}

        {tailorList.map((tailor) => {
          return (
            <TailorView
              tailor={tailor}
              {...props}
              acceptTailor={acceptTailor}
              rejectTailor={rejectTailor}
              deleteTailor={deleteTailor}
            />
          );
        })}
      </>
    );
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
          <span className="new-count">{tailorCount.count}</span>
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
        <div id="content" className="content m-0">
          {tailors}
        </div>
      </div>
    </div>
  );
};

export default Tailor;
