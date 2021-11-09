import React, { useState, useEffect, useRef } from "react";
import OrderView from "../ProcessingOrder/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import $ from "jquery";

const db = firebase.firestore();
let list = null;
const ProcessingOrder = (props) => {
  // const ref = useRef(null);

  const [processorderList, setProcessorderList] = useState(null);
  const [finishedCount, setFinishedcount] = useState({
    orderStatus: "",
    count: 0
  });
  // const [newModal, setNewModal] = useState(false);
  $("button").on("click", function () {
    $("button").removeClass("selected");
    $(this).addClass("selected");
  });
  useEffect(() => {
    // console.log("useeffect");
    list = [];

    db.collection("orders")
      .where("orderStatus", "==", "Received")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        if (list.length > 0) {
          // descending
          list.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          setProcessorderList(list);
        } else {
          setProcessorderList("empty");
        }
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
        if (list.length > 0) {
          // descending
          list.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          setProcessorderList(list);
        } else {
          setProcessorderList("empty");
        }
        console.log("list", list);
      });
  };

  const RepickHandler = () => {
    console.log("Repicked");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Repicked")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        if (list.length > 0) {
          // descending
          list.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          setProcessorderList(list);
        } else {
          setProcessorderList("empty");
        }
        console.log("list", list);
      });
  };
  const ProcessingHandler = () => {
    console.log("Processing");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Progressing")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        if (list.length > 0) {
          // descending
          list.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          setProcessorderList(list);
        } else {
          setProcessorderList("empty");
        }
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
        if (list.length > 0) {
          // descending
          list.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          setProcessorderList(list);
        } else {
          setProcessorderList("empty");
        }
        console.log("list", list);
      });
  };

  const draftAcceptHandler = (newData) => {
    console.log("====", newData);
    let value = window.confirm("Do you want move Completed");
    if (value) {
      db.collection("orders")
        .doc(newData.orderId)
        .update({
          orderStatus: "Completed"
        })
        .then(() => {
          db.collection("TailorsDetails")
            .doc(newData.tailorDetails.tailorId)
            .update({
              amountPending: firebase.firestore.FieldValue.increment(
                newData.tailorCharge
              )
            });

          let data = [...processorderList];

          let filterdata = data.filter((d) => d.orderId !== newData.orderId);
          if (filterdata.length > 0) {
            // descending
            filterdata.sort((a, b) =>
              a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
            );
            setProcessorderList(filterdata);
          } else {
            setProcessorderList("empty");
          }
          // ref.current.complete();
        });
    } else {
      console.log("nott");
    }
  };

  const draftRejectHandler = (newData) => {
    console.log("====", newData);
    let value = window.confirm("Do you want reject");
    if (value) {
      db.collection("orders")
        .doc(newData.orderId)
        .update({
          orderStatus: "Processing"
        })
        .then(() => {
          let data = [...processorderList];

          let filterdata = data.filter((d) => d.orderId !== newData.orderId);
          if (filterdata.length > 0) {
            // descending
            filterdata.sort((a, b) =>
              a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
            );
            setProcessorderList(filterdata);
          } else {
            setProcessorderList("empty");
          }
          // ref.current.complete();
        });
    } else {
      console.log("Not rejected");
    }
  };
  const acceptReassginhandler = (newData) => {
    console.log("====", newData);
    let value = window.confirm("Do you want move Reassigned");
    if (value) {
      db.collection("orders")
        .doc(newData.orderId)
        .update({
          orderStatus: "Assigned"
        })
        .then(() => {
          db.collection("TailorsDetails")
            .doc(newData.tailorDetails.tailorId)
            .update({
              amountPending: firebase.firestore.FieldValue.increment(
                newData.tailorCharge
              )
            });

          let data = [...processorderList];

          let filterdata = data.filter((d) => d.orderId !== newData.orderId);
          if (filterdata.length > 0) {
            // descending
            filterdata.sort((a, b) =>
              a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
            );
            setProcessorderList(filterdata);
          } else {
            setProcessorderList("empty");
          }
          // ref.current.complete();
        });
    } else {
      console.log("nott");
    }
  };

  let processorders = null;
  if (processorderList === null) {
    processorders = <Spinner />;
  } else if (processorderList === "empty") {
    processorders = <h1>No Processing Orders</h1>;
  } else {
    processorders = (
      <OrderView
        items={processorderList}
        {...props}
        accepthandler={draftAcceptHandler}
        rejecthandler={draftRejectHandler}
        acceptReassginhandler={acceptReassginhandler}
        // processorderList={processorderList}
      />
    );
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
          Progressing
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
