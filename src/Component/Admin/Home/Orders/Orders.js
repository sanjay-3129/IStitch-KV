import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Preorders from "./Preorders/Preorders";
import ProcessingOrders from "./ProcessingOrder/Processingorder";
import Alteration from "./Alteration/Alteration";
import CompletedOrders from "./Completedorder/Completedorder";
import style from "./Order.module.css";

import "./Orders.css";

const Orders = (props) => {
  return (
    <>
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
          to={`${props.match.url}/orders/alteration`}
        >
          Alteration
        </NavLink>
        <NavLink
          activeClassName={style.activeLink}
          to={`${props.match.url}/orders/completedorders`}
        >
          Completed Orders
        </NavLink>
      </div>
      <div className="ordercontent">
        <Switch>
          <Route path={`${props.match.url}/orders/preorders`}>
            <Preorders />
          </Route>
          <Route path={`${props.match.url}/orders/processingorders`}>
            <ProcessingOrders />
          </Route>
          <Route path={`${props.match.url}/orders/alteration`}>
            <Alteration />
          </Route>
          <Route path={`${props.match.url}/orders/completedorders`}>
            <CompletedOrders />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Orders;
