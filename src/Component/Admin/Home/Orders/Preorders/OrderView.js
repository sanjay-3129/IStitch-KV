import React, { useContext } from "react";
import "./preorder.css";
import { Link, Switch, Route } from "react-router-dom";
import OrdersContext from "../../Contexts/OrderContext";
const OrderView = (props) => {
  const ctx = useContext(OrdersContext);
  console.log("////////////??????????", ctx.order);

  const orderUpdate = (order) => {
    console.log("order", order);
    ctx.setOrder(order);
    props.history.push(`${props.match.url}/orders/preorders/${order.orderId}`);
  };
  console.log("////////////??????????", props.item);
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
        <p className="assign" onClick={() => props.tailorAssign(props.item)}>
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

  if (props.item.orderStatus === "Booked") {
    orderView = [orderBooked];
  } else if (props.item.orderStatus === "Verified") {
    orderView = [orderVerified];
  } else if (props.item.orderStatus === "Accepted") {
    orderView = [orderAccepted];
  } else if (props.item.orderStatus === "Assigned") {
    orderView = [orderAssigned];
  }

  return <> {orderView}</>;
};

export default OrderView;

// {props.item.orderNumber}
