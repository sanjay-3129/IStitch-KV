import React, { useContext } from "react";
import "./orderView.css";
import { Link, Switch, Route } from "react-router-dom";
import OrdersContext from "../../Contexts/OrderContext";
const OrderView = (props) => {
  const ctx = useContext(OrdersContext);

  const orderUpdate = (order) => {
    console.log("order", order);
    ctx.setOrder(order);
    props.history.push(`${props.match.url}/orders/preorders/${order.orderId}`);
  };
  return (
    <>
      <div className="summary">
        <p className="ono">{props.item.orderNo}</p>
        <p className="cname">{props.item.userDetails.userName}</p>
        <p className="cno">{props.item.userDetails.userPhno}</p>
        <p className="cat">{props.item.categoryName}</p>
        <p className="date">BookedDate</p>
        <p className="select">
          <select>
            <option>No Action</option>
            <option>Verified</option>
            <option>No Response</option>
          </select>
        </p>
        <p className="accept">
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
};

export default OrderView;
