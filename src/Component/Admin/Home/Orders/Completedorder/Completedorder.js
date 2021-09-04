import React, { useState, useEffect } from "react";
import OrderView from "../Completedorder/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import $ from "jquery";

const db = firebase.firestore();
let list = null;
const MyProfile = (props) => {
  const [completedorderList, setCompletedorderList] = useState(null);

  $("button").on("click", function () {
    $("button").removeClass("selected");
    $(this).addClass("selected");
  });

  useEffect(() => {
    console.log("useeffect");
    list = [];

    db.collection("orders")
      .where("orderStatus", "==", "Completed")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setCompletedorderList(list);
        console.log("list", list);
      });
  }, []);

  const completedOrderHandler = () => {
    console.log("completedorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Completed")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setCompletedorderList(list);
        console.log("list", list);
      });
  };

  const deliveredOrderHandler = () => {
    console.log("deliveredorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Delivered")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setCompletedorderList(list);
        console.log("list", list);
      });
  };

  let completedorders = null;
  if (completedorderList === null) {
    completedorders = <Spinner />;
  } else if (completedorderList === "empty") {
    completedorders = <h1>No Completed Orders</h1>;
  } else {
    completedorders = (
      <>
        <div id="content" className="content">
          {completedorderList.map((completeorder) => {
            return (
              <OrderView
                item={completeorder}
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
        <button type="button" onClick={() => completedOrderHandler()}>
          Completed
        </button>
        {/* Completed Orders */}
        <button type="button" onClick={() => deliveredOrderHandler()}>
          Delivered
        </button>
        {/* Delivered Orders */}
      </div>
      {completedorders}
    </div>
  );
};

export default MyProfile;
