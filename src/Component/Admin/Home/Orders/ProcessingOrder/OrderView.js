import React, { useContext } from "react";
import "./orderView.css";
import { Link, Switch, Route } from "react-router-dom";

import OrdersContext from "../../Contexts/OrderContext";
const OrderView = (props) => {
  const ctx = useContext(OrdersContext);

  const orderUpdate = (order) => {
    console.log("order", order);
    ctx.setOrder(order);
    props.history.push(
      `${props.match.url}/orders/processingorders/${order.orderId}`
    );
  };
  return (
    <>
      <div className="summary">
        <p className="ono">{props.item.orderNo}</p>
        <p className="cname">{props.item.userDetails.userName}</p>
        <p className="tname">{props.item.tailorDetails.tailorName}</p>
        <p className="cat">{props.item.tailorDetails.tailorPhno}</p>
        <p className="date">BookedDate</p>
        <p className="select">{props.item.orderStatus}</p>

        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );
};

export default OrderView;
