import React, { useState, useEffect } from "react";
import OrderView from "../Completedorder/OrderView";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
const db = firebase.firestore();
let list = null;
const MyProfile = (props) => {
  const [completedorderList, setCompletedorderList] = useState(null);

  useEffect(() => {
    console.log("useeffect");
    list = [];

    db.collection("orders")
      .where("orderStatus", "==", "Completed")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setCompletedorderList(list);
        console.log("list", list);
      });
  }, []);

  let completedorders = null;
  if (completedorderList === null) {
    completedorders = <Spinner />;
  } else if (completedorderList === "empty") {
    completedorders = <h1>No Completed Orders</h1>;
  } else {
    completedorders = (
      <>
        <div id="content" className="content">
          {completedorderList.map((completeorder) => {
            return (
              <OrderView
                item={completeorder}
                {...props}
                // processorderList={processorderList}
              />
            );
          })}
        </div>
      </>
    );
  }

  return <div className="ordercontent">{completedorders}</div>;
};

export default MyProfile;
