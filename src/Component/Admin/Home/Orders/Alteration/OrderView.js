import React, { useContext, useState, useEffect } from "react";
import "./Alteration.css";
// import { NavLink, Switch, Route } from "react-router-dom";
import OrdersContext from "../../Contexts/OrderContext";
const OrderView = (props) => {
  const ctx = useContext(OrdersContext);
  const [orderView, setOrderView] = useState(null);

  useEffect(() => {
    if (props.items !== null) {
      let orderStatus = props.items[0].orderStatus;
      if (orderStatus === "Alteration") {
        setOrderView("Alteration");
      } else if (orderStatus === "AVerified") {
        setOrderView("AVerified");
      } else if (orderStatus === "AAccepted") {
        setOrderView("AAccepted");
      } else if (orderStatus === "AAssigned") {
        setOrderView("AAssigned");
      } else if (orderStatus === "AReceived") {
        setOrderView("AReceived");
      } else if (orderStatus === "ARepicked") {
        setOrderView("ARepicked");
      } else if (orderStatus === "AProgressing") {
        setOrderView("AProcessing");
      } else if (orderStatus === "AFinished") {
        setOrderView("AFinished");
      } else if (orderStatus === "ACompleted") {
        setOrderView("ACompleted");
      } else if (orderStatus === "ADelivered") {
        setOrderView("ADelivered");
      }
    }
  }, [props.items]);

  const orderUpdate = (order) => {
    console.log("order", order);
    ctx.setOrder(order);
    props.history.push(`${props.match.url}/orders/alteration/${order.orderId}`);
  };

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
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="cname">{item.userDetails.userName}</p>
              <p className="cno">{item.userDetails.userPhno}</p>
              <p className="date">{item.orderBookedDate}</p>
              <p className="accept" onClick={() => props.addQuote(item)}>
                <i class="fas fa-check"></i>
              </p>
              <p className="reject">
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
              <p className="ddate">{item.AdueDate}</p>
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
              <p className="ddate">{item.Aduedate}</p>
              <p className="price">Rs.{item.orderPrice}</p>
              {/* tailorassign */}
              <p className="assign" onClick={() => props.addQuote(item)}>
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
          <p class="tno">Tailor Phno</p>
          <p class="ddate">Due Date</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary assigned">
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="tname">{item.tailorDetails.tailorName}</p>
              <p className="tno">{item.tailorDetails.tailorPhno}</p>
              <p className="ddate">{item.AdueDate}</p>
              <div onClick={() => orderUpdate(item)} className="anchor">
                <i class="far fa-list-alt"></i>
              </div>
            </div>
          );
        })}
      </>
    );
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
              {/* {props.item.orderNo} */}
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="tname">{item.tailorDetails.tailorName}</p>
              <p className="tno">{item.tailorDetails.tailorPhno}</p>
              <p className="ddate">{item.AdueDate}</p>
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
              <div onClick={() => orderUpdate(item)} className="anchor">
                <i class="far fa-list-alt"></i>
              </div>
            </div>
          );
        })}
      </>
    );

    let orderFinished = (
      <>
        <div class="summary finished head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="tname">Tailor Name</p>
          <p class="tno">Tailor Phno</p>
          <p class="ddate">Due Date</p>
          <p class="accept">Acpt</p>
          <p class="reject">Rejct</p>
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
              <p className="ddate">{item.AdueDate}</p>
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

    let orderCompleted = (
      <>
        <div class="summary completed head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="cname">Customer Name</p>
          <p class="cno">Customer Phno</p>
          <p class="tname">Tailor Name</p>
          <p class="tno">Tailor Phno</p>
          <p class="accept">Acpt</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary completed">
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="cname">{item.userDetails.userName}</p>
              <p className="cno">{item.userDetails.userPhno}</p>
              <p className="tname">{item.tailorDetails.tailorName}</p>
              <p className="tno">{item.tailorDetails.tailorPhno}</p>
              <p
                className="accept"
                onClick={() => props.acceptComphandler(item)}
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

    let orderDelivered = (
      <>
        <div class="summary delivered head">
          <p class="ono">Order Id</p>
          <p class="cat">Category</p>
          <p class="cname">Customer Name</p>
          <p class="cno">Customer Phno</p>
          <p class="tname">Tailor Name</p>
          <p class="tno">Tailor Phno</p>
          <p class="anchor">View</p>
        </div>
        {props.items.map((item) => {
          return (
            <div className="summary delivered">
              {/* {props.item.orderNo} */}
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>

              <p className="cname">{item.userDetails.userName}</p>
              <p className="cno">{item.userDetails.userPhno}</p>
              <p className="tname">{item.tailorDetails.tailorName}</p>
              <p className="tno">{item.tailorDetails.tailorPhno}</p>

              <div onClick={() => orderUpdate(item)} className="anchor">
                <i class="far fa-list-alt"></i>
              </div>
            </div>
          );
        })}
      </>
    );
    if (orderView === "Alteration") {
      ui = orderBooked;
    } else if (orderView === "AVerified") {
      ui = orderVerified;
    } else if (orderView === "AAccepted") {
      ui = orderAccepted;
    } else if (orderView === "AAssigned") {
      ui = orderAssigned;
    } else if (orderView === "AReceived") {
      ui = orderReceived;
    } else if (orderView === "ARepicked") {
      ui = orderRepick;
    } else if (orderView === "AProcessing") {
      ui = orderReceived;
    } else if (orderView === "AFinished") {
      ui = orderFinished;
    } else if (orderView === "ACompleted") {
      ui = orderCompleted;
    } else if (orderView === "ADelivered") {
      ui = orderDelivered;
    }
  }

  return <>{ui}</>;
};

export default OrderView;
