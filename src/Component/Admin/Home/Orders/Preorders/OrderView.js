import React, { useContext, useEffect, useState } from "react";
import "./preorder.css";
// import { Link, Switch, Route } from "react-router-dom";
import OrdersContext from "../../Contexts/OrderContext";
const OrderView = (props) => {
  const ctx = useContext(OrdersContext);
  // console.log("////////////??????????", ctx.order);
  const [orderView, setOrderView] = useState(null);

  useEffect(() => {
    if (props.items !== null) {
      if (props.items.length > 0) {
        let orderStatus = props.items[0].orderStatus;
        if (orderStatus === "Booked") {
          setOrderView("Booked");
        } else if (orderStatus === "Verified") {
          setOrderView("Verified");
        } else if (orderStatus === "Accepted") {
          setOrderView("Accepted");
        } else if (orderStatus === "Assigned") {
          setOrderView("Assigned");
        }
      }
      console.log("items", props.items);
    }
  }, [props.items]);

  const orderUpdate = (order) => {
    console.log("order", order);
    ctx.setOrder(order);
    props.history.push(`${props.match.url}/orders/preorders/${order.orderId}`);
  };

  // if (props.item.orderStatus === "Booked") {
  //   orderView = [orderBooked];
  // } else if (props.item.orderStatus === "Verified") {
  //   orderView = [orderVerified];
  // } else if (props.item.orderStatus === "Accepted") {
  //   orderView = [orderAccepted];
  // } else if (props.item.orderStatus === "Assigned") {
  //   orderView = [orderAssigned];
  // }
  let ui = null;
  if (orderView !== null) {
    let orderBooked = (
      <>
        <div class="summary booked head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="cname">Customer Name</p>
          <p class="cno">Customer Phno</p>
          <p class="date">Order Booked</p>
          <p class="accept">Accept</p>
          <p class="reject">Reject</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary booked">
              {/* {props.item.orderNo} */}
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="cname">{item.userDetails.userName}</p>
              <p className="cno">{item.userDetails.userPhno}</p>

              <p className="date">{item.orderBookedDate}</p>
              <p className="accept" onClick={() => props.addQuote(item)}>
                <i class="fas fa-check"></i>
              </p>
              <p
                className="reject"
                onClick={() => props.draftDeleteHandler(item)}
              >
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
    let orderVerified = (
      <>
        <div class="summary verified head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="date">Order Booked</p>
          <p class="ddate">Due Date</p>
          <p class="price">Order Price</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary verified">
              {/* {props.item.orderNo} */}
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="date">{item.orderBookedDate}</p>
              <p className="ddate">{item.dueDate}</p>
              <p className="price">Rs.{item.orderPrice}</p>
              <div onClick={() => orderUpdate(item)} className="anchor">
                <i class="far fa-list-alt"></i>
              </div>
            </div>
          );
        })}
      </>
    );

    let orderAccepted = (
      <>
        <div class="summary accepted head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="date">Order Booked</p>
          <p class="ddate">Due Date</p>
          <p class="price">Order Price</p>
          <p class="assign">Assign</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary accepted">
              {/* {props.item.orderNo} */}
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="date">{item.orderBookedDate}</p>
              <p className="ddate">{item.dueDate}</p>
              <p className="price">Rs.{item.orderPrice}</p>
              {/* tailorassign */}
              <p className="assign" onClick={() => props.tailorAssign(item)}>
                <i class="fas fa-user-plus"></i>
              </p>

              <div onClick={() => orderUpdate(item)} className="anchor">
                <i class="far fa-list-alt"></i>
              </div>
            </div>
          );
        })}
      </>
    );
    let orderAssigned = (
      <>
        <div class="summary assigned head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="tname">Tailor Name</p>
          <p class="tno">Tailor Phone</p>
          <p class="ddate">Due Date</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary assigned">
              {/* {props.item.orderNo} */}
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
    if (orderView === "Booked") {
      ui = orderBooked;
    } else if (orderView === "Verified") {
      ui = orderVerified;
    } else if (orderView === "Accepted") {
      ui = orderAccepted;
    } else if (orderView === "Assigned") {
      ui = orderAssigned;
    }
  }

  return <> {ui}</>;
};

export default OrderView;

// {props.item.orderNumber}
