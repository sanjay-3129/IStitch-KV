import React, { useState, useEffect } from "react";

const OrdersContext = React.createContext({
  order: null,
  setOrder: (order) => {}
});

export const OrdersContextProvider = (props) => {
  const [order, setOrder] = useState(null);

  const setMyOrder = (order) => {
    setOrder(order);
  };

  return (
    <OrdersContext.Provider
      value={{
        order: order,
        setOrder: setMyOrder
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;
