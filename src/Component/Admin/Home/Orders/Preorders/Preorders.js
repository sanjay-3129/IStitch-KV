import React, { useRef, useState, useEffect } from "react";
import OrderView from "../Preorders/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
const db = firebase.firestore();
let list = null;
const Preorders = (props) => {
  const [preorderList, setPreorderList] = useState(null);
  // useEffect(() => {
  //   getCourses((courses, fromCache) => {
  //     setCourses(courses);
  //   });
  // }, []);

  useEffect(() => {
    console.log("perorderuseeffect");
    list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Booked")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setPreorderList(list);
        console.log("list", list);
      });
  }, []);

  const newOrderHandler = () => {};

  const verifiedOrderHandler = () => {};

  const pickedOrderHandler = () => {};

  let preorders = null;
  if (preorderList === null) {
    preorders = <Spinner />;
  } else if (preorderList === "empty") {
    preorders = <h1>No Processing Orders</h1>;
  } else {
    preorders = (
      <>
        <div id="content" className="content">
          {preorderList.map((preorder) => {
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
        <button onClick={newOrderHandler}>New-orders</button>
        {/* booked */}
        <button onClick={verifiedOrderHandler} className="active">
          Verified orders
        </button>
        {/* verifed,paid,assigned */}
        <button onClick={pickedOrderHandler}>Picked Orders</button>
        {/* intializing pick,oder picked,delivered to tail */}
      </div>
      {preorders}
    </div>
  );
};

export default Preorders;
