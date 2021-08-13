import React, { useState, useEffect } from "react";
import OrderView from "../Alteration/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";

const db = firebase.firestore();
let list = null;
const Alteration = (props) => {
  const [alterationList, setAlterationList] = useState(null);

  useEffect(() => {
    console.log("useeffect");
    list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Requested")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setAlterationList(list);
        console.log("list", list);
      });
  }, []);

  // const newOrderHandler = () => {};

  // const verifiedOrderHandler = () => {};

  // const pickedOrderHandler = () => {};

  let alteration = null;
  if (alterationList === null) {
    alteration = <Spinner />;
  } else if (alterationList === "empty") {
    alteration = <h1>No Processing Orders</h1>;
  } else {
    alteration = (
      <>
        <div id="content" className="content">
          {alterationList.map((preorder) => {
            return (
              <OrderView
                item={preorder}
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
        <button>Request</button>
        {/* booked */}
        <button className="active">Verified </button>
        {/* verifed,paid,assigned */}
        <button>Completed</button>
        {/* intializing pick,oder picked,delivered to tail */}
      </div>
      {alteration}
    </div>
  );
};

export default Alteration;
