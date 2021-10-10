import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import OrderView from "../Preorders/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import VerifiedModal from "../../../../UI/AddNewModal/VerifyModal";
import TailorAssign from "../../../../UI/AddNewModal/TailorAssign";
import $ from "jquery";
import LoadingBar from "react-top-loading-bar";
import "./preorder.css";

const db = firebase.firestore();
let list = null;
const Preorders = (props) => {
  const ref = useRef(null);
  const [preorderList, setPreorderList] = useState(null);
  const [newModal, setNewModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [addNewItem, setAddNewItem] = useState(null);
  const [newData, setNewData] = useState({
    orderPrice: 0,
    tailorCharge: 0,
    dueDate: ""
  });

  const [tailorDetails, setTailorDetails] = useState(null);

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
        console.log("sdasfsdf", data.size);

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
      .where("orderStatus", "==", "Accepted")
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
      .where("orderStatus", "==", "Assigned")
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
  // const onChangeTailorHandler = (event) => {
  //   let value = null;
  //   value = event.target.value;
  //   let name = event.target.name;
  //   setNewTailor((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value
  //     };
  //   });
  // };

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

        let data = [...preorderList];

        let filterdata = data.filter((d) => d.orderId !== newModal.orderId);
        setPreorderList(filterdata);
      });
  };

  const tailorAssign = () => {
    console.log("tailorassign", assignModal);

    let list = [];
    db.collection("TailorsDetails")
      .where("tailorStatus", "==", "Verified")
      .get()
      .then((data) => {
        console.log("data", data);
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setTailorDetails(list);
        console.log("tailorlist", list);
      })
      .catch((e) => console.log("sdasd", e));
  };

  const singletailorAssign = (newTailor) => {
    console.log("qqqqqqqqqq", assignModal);
    console.log("wwwwwwwwwww", newTailor);
    db.collection("orders")
      .doc(assignModal.orderId.trim())
      .update({
        tailorDetails: {
          tailorId: newTailor.userId,
          tailorName: newTailor.name,
          tailorPhno: newTailor.phno,
          tailorAddress: newTailor.address
        },
        orderStatus: "Assigned"
      })
      .then(() => {
        setAssignModal(false);
        console.log("single tailor assigned success");

        //filter
      })
      .catch((e) => console.log(e));
  };
  // setAssignModal();
  // setAssignModal(null);
  // db.collection("orders").doc(assignModal.orderId.trim()).update({
  //   tailorId: newTailor.tailorId,
  //   tailorName: newTailor.tailorName,
  //   tailorPhno: newTailor.tailorPhno,
  //   tailorAddress: newTailor.tailorAddress,

  //   orderStatus: "Assigned"
  // });

  // if (preorderList.orderStatus == "Booked") {
  //   BookedCount = BookedCount + 1;
  // }

  let preorders = null;
  if (preorderList === null) {
    preorders = <Spinner />;
  } else if (preorderList === "empty") {
    preorders = <h1>No Processing Orders</h1>;
  } else {
    // if(orderStatus==="Booked"){

    // }
    preorders = preorderList.map((preorder) => {
      return (
        <OrderView
          item={preorder}
          {...props}
          addQuote={(item) => setNewModal(item)}
          tailorAssign={(item) => {
            console.log("ttttt");
            setAssignModal(item);
          }}
          singletailor={singletailorAssign}
          // processorderList={processorderList}
        />
      );
    });
  }

  return (
    <div className="ordercontent">
      {ReactDOM.createPortal(
        <LoadingBar color="#FF0000" ref={ref} />,
        document.getElementById("linear-loader")
      )}
      <div className="rflex">
        <button
          className="selected"
          type="button"
          onClick={() => newOrderHandler()}
        >
          Booked
          <span className="new-count">
            {preorderList !== null && preorderList.length}
          </span>
        </button>
        {/* booked */}
        <button type="button" onClick={() => verifiedOrderHandler()}>
          Verified
        </button>
        {/* verifed,paid,assigned */}
        <button
          type="button"
          onClick={() => {
            acceptedOrderHandler();
            tailorAssign();
          }}
        >
          Accepted
        </button>
        {/* Accepted by Client */}
        <button type="button" onClick={() => pickedOrderHandler()}>
          Assigned
        </button>
        {/* intializing pick,oder picked,delivered to tail */}
      </div>
      <div id="content" className="content">
        {/* columns name */}
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
      {assignModal && (
        <TailorAssign
          title={assignModal}
          // newData={newTailor}
          closeModal={() => setAssignModal(false)}
          // onChange={onChangeTailorHandler}
          tailorAssign={tailorAssign}
          singletailor={singletailorAssign}
          tailors={tailorDetails}
        />
      )}
    </div>
  );
};

export default Preorders;
