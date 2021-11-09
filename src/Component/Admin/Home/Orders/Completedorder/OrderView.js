import React, { useContext, useState, useEffect } from "react";
import "./completedorder.css";
// import { NavLink, Switch, Route } from "react-router-dom";
import OrdersContext from "../../Contexts/OrderContext";
const OrderView = (props) => {
  const ctx = useContext(OrdersContext);
  const [orderView, setOrderView] = useState(null);

  useEffect(() => {
    if (props.items !== null) {
      let orderStatus = props.items[0].orderStatus;
      if (orderStatus === "Completed") {
        setOrderView("Completed");
      } else if (orderStatus === "Delivered") {
        setOrderView("Delivered");
      }
    }
  }, [props.items]);

  const orderUpdate = (order) => {
    console.log("order", order);
    ctx.setOrder(order);
    props.history.push(
      `${props.match.url}/orders/completedorders/${order.orderId}`
    );
  };

  let ui = null;
  if (orderView !== null) {
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
              {/* {props.item.orderNo} */}
              <p className="ono">{item.orderNumber}</p>
              <p className="cat">{item.categoryName}</p>
              <p className="cname">{item.userDetails.userName}</p>
              <p className="cno">{item.userDetails.userPhno}</p>
              <p className="tname">{item.tailorDetails.tailorName}</p>
              <p className="tno">{item.tailorDetails.tailorPhno}</p>
              <p className="accept" onClick={() => props.accepthandler(item)}>
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
          {/* <p class="accept">Acpt</p> */}
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
              {/* <p className="accept" onClick={() => props.accepthandler(props.item)}>
            <i class="fas fa-check"></i>
          </p> */}
              <div onClick={() => orderUpdate(item)} className="anchor">
                <i class="far fa-list-alt"></i>
              </div>
            </div>
          );
        })}
      </>
    );
    if (orderView === "Completed") {
      ui = orderCompleted;
    } else if (orderView === "Delivered") {
      ui = orderDelivered;
    }
  }

  return <>{ui}</>;
};

export default OrderView;
