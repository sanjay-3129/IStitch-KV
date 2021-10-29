import React, { useContext } from "react";
import "./completedorder.css";
import { NavLink, Switch, Route } from "react-router-dom";
import OrdersContext from "../../Contexts/OrderContext";
const OrderView = (props) => {
  const ctx = useContext(OrdersContext);

  const orderUpdate = (order) => {
    console.log("order", order);
    ctx.setOrder(order);
    props.history.push(
      `${props.match.url}/orders/completedorders/${order.orderId}`
    );
  };
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
        <p className="accept" onClick={() => props.accepthandler(props.item)}>
          <i class="fas fa-check"></i>
        </p>

        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );

  let orderDelivered = (
    <>
      <div className="summary completed">
        {/* {props.item.orderNo} */}
        <p className="ono">{props.item.orderNumber}</p>
        <p className="cat">{props.item.categoryName}</p>

        <p className="cname">{props.item.userDetails.userName}</p>
        <p className="cno">{props.item.userDetails.userPhno}</p>
        <p className="tname">{props.item.tailorDetails.tailorName}</p>
        <p className="tno">{props.item.tailorDetails.tailorPhno}</p>
        {/* <p className="accept" onClick={() => props.accepthandler(props.item)}>
          <i class="fas fa-check"></i>
        </p> */}

        <div onClick={() => orderUpdate(props.item)} className="anchor">
          <i class="far fa-list-alt"></i>
        </div>
      </div>
    </>
  );

  let orderView;
  if (props.item.orderStatus === "Completed") {
    orderView = [orderCompleted];
  } else if (props.item.orderStatus === "Delivered") {
    orderView = [orderDelivered];
  }

  return <>{orderView}</>;
};

export default OrderView;
