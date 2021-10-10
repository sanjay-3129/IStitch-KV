import React, { useContext } from "react";
import "./Alteration.css";
import { NavLink, Switch, Route } from "react-router-dom";
import OrdersContext from "../../Contexts/OrderContext";
const OrderView = (props) => {
  const ctx = useContext(OrdersContext);

  const orderUpdate = (order) => {
    console.log("order", order);
    ctx.setOrder(order);
    props.history.push(`${props.match.url}/orders/preorders/${order.orderId}`);
  };

  let orderView;
  let orderBooked = (
    <>
      <div className="summary booked">
        {/* {props.item.orderNo} */}
        <p className="ono">{props.item.orderNumber}</p>
        <p className="cat">{props.item.categoryName}</p>
        <p className="cname">{props.item.userDetails.userName}</p>
        <p className="cno">{props.item.userDetails.userPhno}</p>
        <p className="date">{props.item.orderBookedDate}</p>
        <p className="accept" onClick={() => props.addQuote(props.item)}>
          <i class="fas fa-check"></i>
        </p>
        <p className="reject">
          <i class="fas fa-times"></i>
        </p>
        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );
  let orderVerified = (
    <>
      <div className="summary verified">
        {/* {props.item.orderNo} */}
        <p className="ono">{props.item.orderNumber}</p>
        <p className="cat">{props.item.categoryName}</p>
        <p className="date">{props.item.orderBookedDate}</p>
        <p className="ddate">{props.item.dueDate}</p>

        <p className="price">Rs.{props.item.orderPrice}</p>

        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );

  let orderAccepted = (
    <>
      <div className="summary accepted">
        {/* {props.item.orderNo} */}
        <p className="ono">{props.item.orderNumber}</p>
        <p className="cat">{props.item.categoryName}</p>
        <p className="date">{props.item.orderBookedDate}</p>
        <p className="ddate">{props.item.duedate}</p>

        <p className="price">Rs.{props.item.orderPrice}</p>
        {/* tailorassign */}
        <p className="assign" onClick={() => props.addQuote(props.item)}>
          <i class="fas fa-user-plus"></i>
        </p>

        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );
  let orderAssigned = (
    <>
      <div className="summary assigned">
        {/* {props.item.orderNo} */}
        <p className="ono">{props.item.orderNumber}</p>
        <p className="cat">{props.item.categoryName}</p>
        <p className="tname">{props.item.tailorDetails.tailorName}</p>
        <p className="tno">{props.item.tailorDetails.tailorPhno}</p>
        <p className="ddate">{props.item.duedate}</p>
        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );
  let orderReceived = (
    <>
      <div className="summary received">
        {/* {props.item.orderNo} */}
        <p className="ono">{props.item.orderNumber}</p>
        <p className="cat">{props.item.categoryName}</p>
        <p className="tname">{props.item.tailorDetails.tailorName}</p>
        <p className="tno">{props.item.tailorDetails.tailorPhno}</p>

        <p className="ddate">{props.item.dueDate}</p>

        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );

  let orderRepick = (
    <>
      <div className="summary repick">
        {/* {props.item.orderNo} */}
        <p className="ono">{props.item.orderNumber}</p>
        <p className="cat">{props.item.categoryName}</p>
        <p className="tname">{props.item.tailorDetails.tailorName}</p>
        <p className="tno">{props.item.tailorDetails.tailorPhno}</p>
        <p className="cname">{props.item.userDetails.userName}</p>
        <p className="cno">{props.item.userDetails.userPhno}</p>
        <select className="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
        </select>

        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );
  let orderFinished = (
    <>
      <div className="summary finished">
        {/* {props.item.orderNo} */}
        <p className="ono">{props.item.orderNumber}</p>
        <p className="cat">{props.item.categoryName}</p>
        <p className="tname">{props.item.tailorDetails.tailorName}</p>
        <p className="tno">{props.item.tailorDetails.tailorPhno}</p>

        <p className="ddate">{props.item.dueDate}</p>

        <p className="accept" onClick={() => props.accepthandler(props.item)}>
          <i class="fas fa-check"></i>
        </p>
        <p className="reject" onClick={() => props.rejecthandler(props.item)}>
          <i class="fas fa-times"></i>
        </p>

        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );

  let orderCompleted = (
    <>
      <div className="summary completed">
        {/* {props.item.orderNo} */}
        <p className="ono">{props.item.orderNumber}</p>
        <p className="cat">{props.item.categoryName}</p>

        <p className="cname">{props.item.userDetails.userName}</p>
        <p className="cno">{props.item.userDetails.userPhno}</p>
        <p className="tname">{props.item.tailorDetails.tailorName}</p>
        <p className="tno">{props.item.tailorDetails.tailorPhno}</p>

        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );

  if (props.item.orderStatus === "Requested") {
    orderView = [orderBooked];
  } else if (props.item.orderStatus === "A-Verified") {
    orderView = [orderVerified];
  } else if (props.item.orderStatus === "A-Accepted") {
    orderView = [orderAccepted];
  } else if (props.item.orderStatus === "A-Assigned") {
    orderView = [orderAssigned];
  } else if (props.item.orderStatus === "A-Received") {
    orderView = [orderReceived];
  } else if (props.item.orderStatus === "A-Repick") {
    orderView = [orderRepick];
  } else if (props.item.orderStatus === "A-Processing") {
    orderView = [orderReceived];
  } else if (props.item.orderStatus === "A-Finished") {
    orderView = [orderFinished];
  } else if (props.item.orderStatus === "A-Completed") {
    orderView = [orderCompleted];
  } else if (props.item.orderStatus === "A-Delivered") {
    orderView = [orderCompleted];
  }
  return <>{orderView}</>;
};

export default OrderView;
