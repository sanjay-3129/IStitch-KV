import React, { useContext } from "react";
import "./processingorder.css";
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
  let orderView;
  let orderReceived = (
    <>
      <div className="summary received">
        {/* {props.item.orderNo} */}
        <p className="ono">0001</p>
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
        <p className="ono">0001</p>
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
  let orderProcessing = <></>;
  let orderFinished = (
    <>
      <div className="summary finished">
        {/* {props.item.orderNo} */}
        <p className="ono">0001</p>
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

  if (props.item.orderStatus === "Received") {
    orderView = [orderReceived];
  } else if (props.item.orderStatus === "Repick") {
    orderView = [orderRepick];
  } else if (props.item.orderStatus === "Processing") {
    orderView = [orderReceived];
  } else if (props.item.orderStatus === "Finished") {
    orderView = [orderFinished];
  }

  return <>{orderView}</>;
};

export default OrderView;
