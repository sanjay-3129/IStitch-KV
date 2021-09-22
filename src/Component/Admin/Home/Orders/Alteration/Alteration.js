import React, { useState, useEffect } from "react";
import OrderView from "../Alteration/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import VerifiedModal from "../../../../UI/AddNewModal/VerifyModal";
import TailorAssign from "../../../../UI/AddNewModal/TailorAssign";
import $ from "jquery";

const db = firebase.firestore();
let list = null;
const Alteration = (props) => {
  const [alterationList, setAlterationList] = useState(null);
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

  const requestOrderHandler = () => {
    console.log("newdhwjbwj");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "Requested")
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
    console.log("verifiedorder");
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
    console.log("acceptedorder");
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
    console.log("pickednvf");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Assigned")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setAlterationList(list);
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
    console.log("wwwwwwwwwww", newModal);

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
        let data = [...alterationList];

        let filterdata = data.filter((d) => d.orderId !== newModal.orderId);
        setAlterationList(filterdata);
      });
  };

  const ReceivedHandler = () => {
    console.log("Received");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Received")
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

  const RepickHandler = () => {
    console.log("Repick");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Repick")
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
  const ProcessingHandler = () => {
    console.log("Processing");
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
  const FinishedHandler = () => {
    console.log("Finished");
    let list = [];
    db.collection("orders")
      .where("orderStatus", "==", "A-Finished")
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

  const draftAcceptHandler = (newData) => {
    console.log("====", newData);

    db.collection("orders")
      .doc(newData.orderId)
      .update({
        orderStatus: "Completed"
      })
      .then(() => {
        let data = [...alterationList];

        let filterdata = data.filter((d) => d.orderId !== newData.orderId);
        setAlterationList(filterdata);
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
        let data = [...alterationList];

        let filterdata = data.filter((d) => d.orderId !== newData.orderId);
        setAlterationList(filterdata);
        // ref.current.complete();
      });
  };

  const completedOrderHandler = () => {
    console.log("completedorder");
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
    console.log("deliveredorder");
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
                addQuote={(item) => setNewModal(item)}
                accepthandler={draftAcceptHandler}
                rejecthandler={draftRejectHandler}

                // processorderList={processorderList}
              />
            );
          })}
        </div>
      </>
    );
  }
  const tailorAssign = (newTailor) => {
    console.log("qqqqqqqqqq", newTailor);
    console.log("wwwwwwwwwww", newModal);

    // setNewModal(null);
    db.collection("orders").doc(newModal.orderId.trim()).update({
      tailorId: newTailor.tailorId,
      tailorName: newTailor.tailorId,
      tailorPhno: newTailor.tailorId,
      tailorAddress: newTailor.tailorId,

      orderStatus: "Assigned"
    });
    // .then(() => {

    // });
  };
  return (
    <div className="ordercontent">
      <div className="rflex">
        <button className="selected" onClick={() => requestOrderHandler()}>
          Requested<span className="new-count">2</span>
        </button>
        {/* booked */}
        <button onClick={() => verifiedOrderHandler()}>Verified</button>
        {/* verifed,paid,assigned */}
        <button onClick={() => acceptedOrderHandler()}>Accepted</button>
        {/* accepted by tailor */}
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
          Processing
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
        <VerifiedModal
          title={newModal}
          newData={newData}
          closeModal={() => setNewModal(false)}
          onChange={onChangeHandler}
          saveAsDraft={draftQuotationHandler}
        />
      )}
      {newModal && (
        <TailorAssign
          title={newModal}
          newData={newData}
          closeModal={() => setNewModal(false)}
          onChange={onChangeHandler}
          tailorAssign={tailorAssign}
        />
      )}
    </div>
  );
};

export default Alteration;
