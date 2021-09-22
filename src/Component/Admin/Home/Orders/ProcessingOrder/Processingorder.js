import React, { useState, useEffect, useRef } from "react";
import OrderView from "../ProcessingOrder/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import $ from "jquery";

const db = firebase.firestore();
let list = null;
const ProcessingOrder = (props) => {
  const ref = useRef(null);

  const [processorderList, setProcessorderList] = useState(null);
  const [newModal, setNewModal] = useState(false);
  $("button").on("click", function () {
    $("button").removeClass("selected");
    $(this).addClass("selected");
  });
  useEffect(() => {
    console.log("useeffect");
    list = [];

    db.collection("orders")
      .where("orderStatus", "==", "Received")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setProcessorderList(list);
        console.log("list", list);
      });
  }, []);

  const ReceivedHandler = () => {
    console.log("Received");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Received")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setProcessorderList(list);
        console.log("list", list);
      });
  };

  const RepickHandler = () => {
    console.log("Repick");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Repick")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setProcessorderList(list);
        console.log("list", list);
      });
  };
  const ProcessingHandler = () => {
    console.log("Processing");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Processing")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setProcessorderList(list);
        console.log("list", list);
      });
  };
  const FinishedHandler = () => {
    console.log("Finished");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Finished")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setProcessorderList(list);
        console.log("list", list);
      });
  };

  const draftAcceptHandler = (newData) => {
    console.log("====", newData);

    db.collection("orders")
      .doc(newData.orderId)
      .update({
        orderStatus: "Completed"
      })
      .then(() => {
        let data = [...processorderList];

        let filterdata = data.filter((d) => d.orderId !== newData.orderId);
        setProcessorderList(filterdata);
        // ref.current.complete();
      });
  };

  const draftRejectHandler = (newData) => {
    console.log("====", newData);

    db.collection("orders")
      .doc(newData.orderId)
      .update({
        orderStatus: "Processing"
      })
      .then(() => {
        let data = [...processorderList];

        let filterdata = data.filter((d) => d.orderId !== newData.orderId);
        setProcessorderList(filterdata);
        // ref.current.complete();
      });
  };

  let processorders = null;
  if (processorderList === null) {
    processorders = <Spinner />;
  } else if (processorderList === "empty") {
    processorders = <h1>No Processing Orders</h1>;
  } else {
    processorders = processorderList.map((processorder) => {
      return (
        <OrderView
          item={processorder}
          {...props}
          accepthandler={draftAcceptHandler}
          rejecthandler={draftRejectHandler}
          // processorderList={processorderList}
        />
      );
    });
  }

  return (
    <div className="ordercontent">
      <div className="rflex">
        <button
          className="selected"
          type="button"
          onClick={() => ReceivedHandler()}
        >
          Received
        </button>
        {/* Received */}
        <button type="button" onClick={() => RepickHandler()}>
          Re-Pick
        </button>
        {/* Re-Pick */}
        <button type="button" onClick={() => ProcessingHandler()}>
          Processing
        </button>

        <button type="button" onClick={() => FinishedHandler()}>
          Finished
        </button>
        {/* Confirmed */}
      </div>
      <div id="content" className="content">
        {processorders}
      </div>
    </div>
  );
};

export default ProcessingOrder;
