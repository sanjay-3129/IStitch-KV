import React, { useRef, useState, useEffect } from "react";
import OrderView from "../Preorders/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import VerifiedModal from "../../../../UI/AddNewModal/VerifyModal";
import $ from "jquery";

import "./preorder.css";

const db = firebase.firestore();
let list = null;
const Preorders = (props) => {
  const [preorderList, setPreorderList] = useState(null);
  const [newModal, setNewModal] = useState(false);
  const [addNewItem, setAddNewItem] = useState(null);
  const [newData, setNewData] = useState({
    orderPrice: 0,
    tailorCharge: 0,
    dueDate: ""
  });

  $("button").on("click", function () {
    $("button").removeClass("selected");
    $(this).addClass("selected");
  });

  const closeModalHandler = () => {
    setAddNewItem(null);
  };

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

  // let bookedList;
  const newOrderHandler = () => {
    // bookedList = preorderList.filter((l) => {
    //   return l.orderStatus === "Booked";
    // });
    console.log("newdhwjbwj");
    let list = [];
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
  };

  const verifiedOrderHandler = () => {
    console.log("verifiedorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Verified")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setPreorderList(list);
        console.log("list", list);
      });
  };

  const acceptedOrderHandler = () => {
    console.log("acceptedorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Accpeted")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setPreorderList(list);
        console.log("list", list);
      });
  };

  const pickedOrderHandler = () => {
    console.log("pickednvf");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Picked")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setPreorderList(list);
        console.log("list", list);
      });
    // .finally(() => {});
  };

  const onChangeHandler = (event) => {
    let value = null;
    value = event.target.value;
    setNewData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value
      };
    });
  };

  const draftQuotationHandler = (newData) => {
    console.log(newModal);

    // setNewModal(null);
    db.collection("orders")
      .doc(newModal.orderId.trim())
      .update({
        orderPrice: newData.orderPrice,
        tailorCharge: newData.tailorCharge,
        dueDate: newData.dueDate,
        orderStatus: "Verified"
      })
      .then(() => {
        setNewModal(null);
      });
  };

  let preorders = null;
  if (preorderList === null) {
    preorders = <Spinner />;
  } else if (preorderList === "empty") {
    preorders = <h1>No Processing Orders</h1>;
  } else {
    preorders = preorderList.map((preorder) => {
      return (
        <OrderView
          item={preorder}
          {...props}
          addQuote={(item) => setNewModal(item)}
          // processorderList={processorderList}
        />
      );
    });
  }

  return (
    <div className="ordercontent">
      <div className="rflex">
        <button type="button" onClick={() => newOrderHandler()}>
          New-orders
        </button>
        {/* booked */}
        <button type="button" onClick={() => verifiedOrderHandler()}>
          Verified orders
        </button>
        {/* verifed,paid,assigned */}
        <button type="button" onClick={() => acceptedOrderHandler()}>
          Accepted
        </button>
        {/* Accepted by Client */}
        <button type="button" onClick={() => pickedOrderHandler()}>
          Picked Orders
        </button>
        {/* intializing pick,oder picked,delivered to tail */}
      </div>
      <div id="content" className="content">
        {preorders}
      </div>
      {newModal && (
        <VerifiedModal
          title={newModal}
          newData={newData}
          closeModal={() => setNewModal(false)}
          onChange={onChangeHandler}
          saveAsDraft={draftQuotationHandler}
        />
      )}
    </div>
  );
};

export default Preorders;
