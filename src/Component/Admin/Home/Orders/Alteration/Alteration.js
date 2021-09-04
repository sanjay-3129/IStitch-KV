import React, { useState, useEffect } from "react";
import OrderView from "../Alteration/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import $ from "jquery";

const db = firebase.firestore();
let list = null;
const Alteration = (props) => {
  const [alterationList, setAlterationList] = useState(null);

  $("button").on("click", function () {
    $("button").removeClass("selected");
    $(this).addClass("selected");
  });

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

  const newOrderHandler = () => {
    console.log("newalterationorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Booked")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setAlterationList(list);
        console.log("list", list);
      });
  };

  const verifiedOrderHandler = () => {
    console.log("verifiedalterationorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Verified")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setAlterationList(list);
        console.log("list", list);
      });
  };

  const acceptedOrderHandler = () => {
    console.log("acceptedalterationorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Accepted")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setAlterationList(list);
        console.log("list", list);
      });
  };

  const pickedOrderHandler = () => {
    console.log("pickedalterationorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Picked")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setAlterationList(list);
        console.log("list", list);
      });
  };

  const processingOrderHandler = () => {
    console.log("processingalterationorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Processing")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setAlterationList(list);
        console.log("list", list);
      });
  };

  const completedOrderHandler = () => {
    console.log("completedalterationorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Completed")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setAlterationList(list);
        console.log("list", list);
      });
  };

  const deliveredOrderHandler = () => {
    console.log("deliveredalterationorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Delivered")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setAlterationList(list);
        console.log("list", list);
      });
  };

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
        <button onClick={() => newOrderHandler()}>Requests</button>
        {/* booked */}
        <button onClick={() => verifiedOrderHandler()}>Verified</button>
        {/* verifed,paid,assigned */}
        <button onClick={() => acceptedOrderHandler()}>Accepted</button>
        {/* accepted by tailor */}
        <button onClick={() => pickedOrderHandler()}>Picked</button>
        {/* picked order */}
        <button onClick={() => processingOrderHandler()}>Processing</button>
        {/* process by tailor */}
        <button onClick={() => completedOrderHandler()}>Completed</button>
        {/* completed orders */}
        <button onClick={() => deliveredOrderHandler()}>Delivered</button>
        {/* delivered */}
      </div>
      {alteration}
    </div>
  );
};

export default Alteration;
