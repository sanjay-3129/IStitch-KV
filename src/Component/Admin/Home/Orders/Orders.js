import React, { useEffect } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Preorders from "./Preorders/Preorders";
import ProcessingOrders from "./ProcessingOrder/Processingorder";
import Alteration from "./Alteration/Alteration";
import CompletedOrders from "./Completedorder/Completedorder";
import style from "./Order.module.css";

// import OrderDetials from "./OrderDetials";

import "./Orders.css";
import OrderDetials from "./OrderDetials";

const Orders = (props) => {
  useEffect(() => {
    props.history.push(`${props.match.url}/orders/preorders`);
  }, []);
  return (
    <>
      {/* <OrderDetials /> */}
      <div className="ordernav">
        <NavLink
          activeClassName={style.activeLink}
          to={`${props.match.url}/orders/preorders`}
        >
          Pre-Orders
        </NavLink>
        <NavLink
          activeClassName={style.activeLink}
          to={`${props.match.url}/orders/processingorders`}
        >
          Processing orders
        </NavLink>

        <NavLink
          activeClassName={style.activeLink}
          to={`${props.match.url}/orders/completedorders`}
        >
          Completed Orders
        </NavLink>
        <NavLink
          activeClassName={style.activeLink}
          to={`${props.match.url}/orders/alteration`}
        >
          Alteration
        </NavLink>
      </div>
      <div>
        <Switch>
          <Route path={`${props.match.url}/orders/orderDetials`}>
            <OrderDetials {...props} />
          </Route>
          <Route path={`${props.match.url}/orders/preorders`}>
            <Preorders {...props} />
          </Route>
          <Route path={`${props.match.url}/orders/processingorders`}>
            <ProcessingOrders {...props} />
          </Route>
          <Route path={`${props.match.url}/orders/alteration`}>
            <Alteration {...props} />
          </Route>
          <Route path={`${props.match.url}/orders/completedorders`}>
            <CompletedOrders {...props} />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Orders;
