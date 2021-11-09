import React, { useState, useEffect } from "react";
import OrderView from "../Alteration/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import AlterVerifiedModal from "../../../../UI/AddNewModal/alterationVerifyModal";
import TailorAssign from "../../../../UI/AddNewModal/TailorAssign";
import $ from "jquery";

const db = firebase.firestore();
let list = null;
const Alteration = (props) => {
  const [alterationList, setAlterationList] = useState(null);
  const [newModal, setNewModal] = useState(false);
  const [requestedCount, setRequestedcount] = useState({
    orderStatus: "",
    count: 0
  });
  // const [addNewItem, setAddNewItem] = useState(null);
  const [newData, setNewData] = useState({
    orderPrice: 0,
    tailorCharge: 0,
    dueDate: ""
  });

  $("button").on("click", function () {
    $("button").removeClass("selected");
    $(this).addClass("selected");
  });
  useEffect(() => {
    console.log("useeffect");
    list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Alteration")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        setRequestedcount({
          orderStatus: "Booked",
          count: 0
        });
        console.log("list", list);
      });
  }, []);

  useEffect(() => {
    if (alterationList !== null) {
      // console.log("status", bookedCount.orderStatus, preorderList);
      if (
        requestedCount.orderStatus === "Alteration" &&
        alterationList[0].orderStatus === "Alteration"
      ) {
        setRequestedcount({
          orderStatus: "Booked",
          count: alterationList.length
        });
      }
    }
  }, [alterationList, requestedCount.orderStatus]);

  const requestOrderHandler = () => {
    console.log("newdhwjbwj");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Alteration")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        console.log("list", list);
      });
  };

  const verifiedOrderHandler = () => {
    console.log("verifiedorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "AVerified")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        console.log("list", list);
      });
  };

  const pickedOrderHandler = () => {
    console.log("pickednvf");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "AAssigned")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        console.log("list", list);
      });
    // .finally(() => {});
  };

  const onChangeHandler = (event) => {
    let value = null;
    value = event.target.value;
    let name = event.target.name;
    if (name === "tailorCharge" || name === "orderPrice") {
      value = parseInt(value);
    }
    setNewData((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const draftQuotationHandler = (newData) => {
    console.log("qqqqqqqqqq", newData);

    if (
      newData.orderPrice !== 0 &&
      newData.tailorCharge !== 0 &&
      !Number.isNaN(newData.orderPrice) &&
      !Number.isNaN(newData.tailorCharge) &&
      newData.dueDate !== ""
    ) {
      // setNewModal(null);
      db.collection("orders")
        .doc(newModal.orderId.trim())
        .update({
          AorderPrice: newData.orderPrice,
          AtailorCharge: newData.tailorCharge,
          AdueDate: newData.dueDate,
          orderStatus: "AVerified"
        })
        .then(() => {
          let data = [...alterationList];
          let filterdata = data.filter((d) => d.orderId !== newModal.orderId);
          // descending
          if (filterdata.length > 0) {
            // descending
            filterdata.sort((a, b) =>
              a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
            );
            setAlterationList(filterdata);
          } else {
            setAlterationList("empty");
          }
          setNewModal(null);
          setNewData({
            orderPrice: 0,
            tailorCharge: 0,
            dueDate: ""
          });
        });
    } else {
      alert("Enter Price,tailor charge and due date ");
    }
  };

  const directAssign = (newData) => {
    console.log("-=-=-=>", newData);

    if (
      newData.dueDate !== "" &&
      newData.orderPrice === 0 &&
      newData.tailorCharge === 0
    ) {
      db.collection("orders")
        .doc(newModal.orderId.trim())
        .update({
          AdueDate: newData.dueDate,
          orderStatus: "AAssigned"
        })
        .then(() => {
          setNewModal(null);
          let data = [...alterationList];

          let filterdata = data.filter((d) => d.orderId !== newModal.orderId);
          // descending
          if (filterdata.length > 0) {
            // descending
            filterdata.sort((a, b) =>
              a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
            );
            setAlterationList(filterdata);
          } else {
            setAlterationList("empty");
          }
          setNewModal(null);
          setNewData({
            orderPrice: 0,
            tailorCharge: 0,
            dueDate: ""
          });
        });
    } else {
      alert("Enter the due date ");
    }
  };

  const ReceivedHandler = () => {
    console.log("Received");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "AReceived")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        console.log("list", list);
      });
  };

  const RepickHandler = () => {
    console.log("Repick");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "ARepicked")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        console.log("list", list);
      });
  };
  const ProcessingHandler = () => {
    console.log("Processing");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "AProgressing")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        console.log("list", list);
      });
  };
  const FinishedHandler = () => {
    console.log("Finished");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "AFinished")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        console.log("list", list);
      });
  };

  const draftAcceptHandler = (newData) => {
    console.log("====", newData);

    db.collection("orders")
      .doc(newData.orderId)
      .update({
        orderStatus: "ACompleted"
      })
      .then(() => {
        let data = [...alterationList];

        let filterdata = data.filter((d) => d.orderId !== newData.orderId);
        if (filterdata.length > 0) {
          // descending
          filterdata.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          setAlterationList(filterdata);
        } else {
          setAlterationList("empty");
        }
        // ref.current.complete();
      });
  };

  const draftRejectHandler = (newData) => {
    console.log("====", newData);

    db.collection("orders")
      .doc(newData.orderId)
      .update({
        orderStatus: "AProgressing"
      })
      .then(() => {
        let data = [...alterationList];

        let filterdata = data.filter((d) => d.orderId !== newData.orderId);
        if (filterdata.length > 0) {
          // descending
          filterdata.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          setAlterationList(filterdata);
        } else {
          setAlterationList("empty");
        }
        // ref.current.complete();
      });
  };

  const completedOrderHandler = () => {
    console.log("completedorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "ACompleted")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        console.log("list", list);
      });
  };

  const deliveredOrderHandler = () => {
    console.log("deliveredorder");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "ADelivered")
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
          setAlterationList(list);
        } else {
          setAlterationList("empty");
        }
        console.log("list", list);
      });
  };

  const acceptComphandler = (newData) => {
    console.log("====", newData);
    let value = window.confirm("are you sure,order is Delivered");
    if (value) {
      db.collection("orders")
        .doc(newData.orderId)
        .update({
          orderStatus: "ADelivered"
        })
        .then(() => {
          let data = [...alterationList];

          let filterdata = data.filter((d) => d.orderId !== newData.orderId);
          if (filterdata.length > 0) {
            // descending
            filterdata.sort((a, b) =>
              a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
            );
            setAlterationList(filterdata);
          } else {
            setAlterationList("empty");
          }
          // ref.current.complete();
        });
    } else {
      console.log("not");
    }
  };

  let alteration = null;
  if (alterationList === null) {
    alteration = <Spinner />;
  } else if (alterationList === "empty") {
    alteration = <h1>No Alteration Orders</h1>;
  } else {
    alteration = (
      <>
        <div id="content" className="content">
          <OrderView
            items={alterationList}
            {...props}
            addQuote={(item) => setNewModal(item)}
            directAssign={(item) => setNewModal(item)}
            accepthandler={draftAcceptHandler}
            rejecthandler={draftRejectHandler}
            acceptComphandler={acceptComphandler}
            // processorderList={processorderList}
          />
        </div>
      </>
    );
  }
  // const tailorAssign = (newTailor) => {
  //   console.log("qqqqqqqqqq", newTailor);
  //   console.log("wwwwwwwwwww", newModal);

  //   // setNewModal(null);
  //   db.collection("orders").doc(newModal.orderId.trim()).update({
  //     tailorId: newTailor.tailorId,
  //     tailorName: newTailor.tailorId,
  //     tailorPhno: newTailor.tailorId,
  //     tailorAddress: newTailor.tailorId,

  //     orderStatus: "Assigned"
  //   });
  //   // .then(() => {

  //   // });
  // };
  return (
    <div className="ordercontent">
      <div className="rflex">
        <button className="selected" onClick={() => requestOrderHandler()}>
          Alteration
          {/* <span className="new-count">2</span> */}
        </button>
        {/* booked */}
        <button onClick={() => verifiedOrderHandler()}>Verified</button>
        {/* verifed,paid,assigned */}

        <button onClick={() => pickedOrderHandler()}>Assigned</button>
        {/* picked order */}
        <button type="button" onClick={() => ReceivedHandler()}>
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
        <button onClick={() => completedOrderHandler()}>Completed</button>
        {/* completed orders */}
        <button onClick={() => deliveredOrderHandler()}>Delivered</button>
        {/* delivered */}
      </div>
      {alteration}
      {newModal && (
        <AlterVerifiedModal
          title={newModal}
          newData={newData}
          closeModal={() => setNewModal(false)}
          onChange={onChangeHandler}
          saveAsDraft={draftQuotationHandler}
          directAssign={directAssign}
          clearData={() => {
            setNewData({
              orderPrice: 0,
              tailorCharge: 0,
              dueDate: ""
            });
          }}
        />
      )}
      {/* {newModal && (
        <TailorAssign
          title={newModal}
          newData={newData}
          closeModal={() => setNewModal(false)}
          onChange={onChangeHandler}
          tailorAssign={tailorAssign}
        />
      )} */}
    </div>
  );
};

export default Alteration;
