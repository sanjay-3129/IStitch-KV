import React, { useContext, useState, useEffect } from "react";
import "./processingorder.css";
// import { Link, Switch, Route } from "react-router-dom";

import OrdersContext from "../../Contexts/OrderContext";
const OrderView = (props) => {
  const ctx = useContext(OrdersContext);
  const [orderView, setOrderView] = useState(null);

  useEffect(() => {
    if (props.items !== null) {
      let orderStatus = props.items[0].orderStatus;
      if (orderStatus === "Received") {
        setOrderView("Received");
      } else if (orderStatus === "Repicked") {
        setOrderView("Repicked");
      } else if (orderStatus === "Progressing") {
        setOrderView("Progressing");
      } else if (orderStatus === "Finished") {
        setOrderView("Finished");
      }
    }
  }, [props.items]);

  const orderUpdate = (order) => {
    console.log("order", order);
    ctx.setOrder(order);
    props.history.push(
      `${props.match.url}/orders/processingorders/${order.orderId}`
    );
  };

  let ui = null;
  if (orderView !== null) {
    let orderReceived = (
      <>
        <div class="summary received head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="tname">Tailor Name</p>
          <p class="tno">Tailor Phno</p>
          <p class="ddate">Due Date</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary received">
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="tname">{item.tailorDetails.tailorName}</p>
              <p className="tno">{item.tailorDetails.tailorPhno}</p>
              <p className="ddate">{item.dueDate}</p>
              <div onClick={() => orderUpdate(item)} className="anchor">
                <i class="far fa-list-alt"></i>
              </div>
            </div>
          );
        })}
      </>
    );

    let orderRepick = (
      <>
        <div class="summary repick head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="tname">Tailor Name</p>
          <p class="tno">Tailor Phno</p>
          <p class="cname">Customer Name</p>
          <p class="cno">Customer Phno</p>
          <p class="accept">Assign</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary repick">
              {/* {props.item.orderNo} */}
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="tname">{item.tailorDetails.tailorName}</p>
              <p className="tno">{item.tailorDetails.tailorPhno}</p>
              <p className="cname">{item.userDetails.userName}</p>
              <p className="cno">{item.userDetails.userPhno}</p>
              <p
                className="accept"
                onClick={() => props.acceptReassginhandler(item)}
              >
                <i class="fas fa-check"></i>
              </p>
              <div onClick={() => orderUpdate(item)} className="anchor">
                <i class="far fa-list-alt"></i>
              </div>
            </div>
          );
        })}
      </>
    );
    // let orderProcessing = <></>;
    let orderFinished = (
      <>
        <div class="summary finished head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="tname">Tailor Name</p>
          <p class="tno">Tailor Phno</p>
          <p class="ddate">Due Date</p>
          <p class="accept">Accept</p>
          <p class="reject">Reject</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary finished">
              {/* {props.item.orderNo} */}
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="tname">{item.tailorDetails.tailorName}</p>
              <p className="tno">{item.tailorDetails.tailorPhno}</p>

              <p className="ddate">{item.dueDate}</p>

              <p className="accept" onClick={() => props.accepthandler(item)}>
                <i class="fas fa-check"></i>
              </p>
              <p className="reject" onClick={() => props.rejecthandler(item)}>
                <i class="fas fa-times"></i>
              </p>

              <div onClick={() => orderUpdate(item)} className="anchor">
                <i class="far fa-list-alt"></i>
              </div>
            </div>
          );
        })}
      </>
    );
    if (orderView === "Received") {
      ui = orderReceived;
    } else if (orderView === "Repicked") {
      ui = orderRepick;
    } else if (orderView === "Progressing") {
      ui = orderReceived;
    } else if (orderView === "Finished") {
      ui = orderFinished;
    }
  }

  return <>{ui}</>;
};

export default OrderView;
