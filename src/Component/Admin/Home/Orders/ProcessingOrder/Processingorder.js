import React, { useState, useEffect } from "react";
import OrderView from "../ProcessingOrder/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import $ from "jquery";

const db = firebase.firestore();
let list = null;
const ProcessingOrder = (props) => {
  const [processorderList, setProcessorderList] = useState(null);

  useEffect(() => {
    console.log("useeffect");
    list = [];

    db.collection("orders")
      .where("orderStatus", "==", "Processing")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setProcessorderList(list);
        console.log("list", list);
      });
  }, []);

  let processorders = null;
  if (processorderList === null) {
    processorders = <Spinner />;
  } else if (processorderList === "empty") {
    processorders = <h1>No Processing Orders</h1>;
  } else {
    processorders = (
      <>
        <div id="content" className="content">
          {processorderList.map((processorder) => {
            return (
              <OrderView
                item={processorder}
                {...props}
                // processorderList={processorderList}
              />
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div className="ordercontent">
      <div className="rflex">
        <button>Received</button>
        {/* Received */}
        <button>Re-Pick</button>
        {/* Re-Pick */}
        <button>Confirmed</button>
        {/* Confirmed */}
      </div>
      {processorders}
    </div>
  );
};

export default ProcessingOrder;
