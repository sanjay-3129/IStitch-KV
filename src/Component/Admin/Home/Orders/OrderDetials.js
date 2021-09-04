import React, { useState, useEffect, useContext } from "react";
import styles from "./OrderDetails.module.css";
import ImageCarousel from "./ImageCarousel";
// import StatusBar from "../../../UI/StatusBar/StatusBar";
import qs from "qs";
import firebase from "../../../../Services/firebase/firebase";
import OrdersContext from "../Contexts/OrderContext";

const db = firebase.firestore();
const OrderDetials = (props) => {
  const [orderDetials, setOrderDetials] = useState(null);
  const ctx = useContext(OrdersContext);
  // console.log("....////", ctx.order.userDetails.userName);
  // useEffect(() => {
  //   let orderId = qs.parse(props.location.search, {
  //     ignoreQueryPrefix: true
  //   }).orderId;
  //   console.log("useeffect");
  //   let list = [];
  //   if (orderId !== undefined) {
  //     console.log("orderId", orderId);
  //     db.collection("orders")
  //       .doc(orderId)
  //       .get()
  //       .then((data) => {
  //         data.forEach((doc) => {
  //           list.push(doc.data());
  //         });
  //         setOrderDetials(list);
  //         console.log("list", list);
  //       });
  //   } else {
  //   }
  // }, []);

  const goBackHandler = () => {
    props.history.goBack();
  };

  let orderDetails;
  let orderBooked = (
    <>
      <div className={styles.userd}>
        <h4 className={styles.title}>User Details</h4>
        <p className={styles.para}>
          UserName:
          <span style={{ marginLeft: "5px" }}>
            {ctx.order.userDetails.userName}
          </span>
        </p>
        <p className={styles.para}>
          Mobile No:
          <span style={{ marginLeft: "5px" }}>
            {ctx.order.userDetails.userPhno}
          </span>
        </p>
        <p className={styles.para} style={{ display: "flex" }}>
          Address:
          <span className={styles.span}>
            {ctx.order.userDetails.userAddress}
          </span>
        </p>
      </div>

      <div className={styles.descrb}>
        {/* pri d */}
        <h4 className={styles.title}>User Description</h4>
        <p className={styles.para}>
          Description:
          <span style={{ display: "flex", textAlign: "justify" }}>
            &emsp;&emsp; Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever
            {/* {ctx.order.alterationDetails.description} */}
          </span>
        </p>
      </div>

      <div className={styles.col6}>
        {/* Measurement Details */}
        <div className={styles.mesd}>
          {/* pri d */}
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>Measurement Details</h4>
            </summary>
            <p className={styles.para}>
              back neck:5 <br />
              arm round:4
              {/* {ctx.order.measurementDetails} */}
            </p>
          </details>
        </div>
        {/* Sample Measurement Cloth */}
        <div className={styles.mescloth}>
          {/* pri d */}
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>Sample Measurement Cloth</h4>
            </summary>
            <p className={styles.para}>
              <div className="thumb1">
                <img
                  src="/images/frnsto.png"
                  style={{ width: "100%" }}
                  // class="hover-shadow cursor"
                  alt="l"
                />
                {/* <p
                className={styles.para}
                style={{ textAlign: "center", textTransform: "uppercase" }}
              >
                patternName
              </p> */}
              </div>
            </p>
          </details>
        </div>
        {/* Stitching Cloth */}
        <div className={styles.scloth}>
          {/* pri d */}
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>Stitching Cloth</h4>
            </summary>
            <p className={styles.para}>
              <div className="thumb1">
                <img
                  src="/images/frnsto.png"
                  style={{ width: "100%" }}
                  // class="hover-shadow cursor"
                  alt="l"
                />
              </div>
            </p>
            <p className={styles.para}>
              Cloth Type: Cotton <br />
              Cloth Color: Blue
            </p>
          </details>
        </div>
        <div className={styles.mesd}>
          {/* pri d */}
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>Others</h4>
            </summary>
            <p className={styles.para}>&emsp;&emsp;half inch extra</p>
          </details>
        </div>
        {/* Main Pattern Images */}
        <div className={styles.mpi}>
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>Main-Pattern Images</h4>
            </summary>
            <ImageCarousel />
          </details>
        </div>
        {/* Addon Pattern Images */}
        <div className={styles.api}>
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>Add-On Images</h4>
            </summary>
            <ImageCarousel />
          </details>
        </div>
        {/* User Upload Main Pattern Images */}
        <div className={styles.umi}>
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>User Upload MainPattern Images</h4>
            </summary>
            <ImageCarousel />
          </details>
        </div>
        <div className={styles.uai}>
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>User Upload Add-On </h4>
            </summary>
            <ImageCarousel />
          </details>
        </div>
      </div>
    </>
  );
  let orderVerified = (
    <>
      <div className={styles.priced}>
        {/* pri d */}
        <h4 className={styles.title}>Order Price</h4>
        <p className={styles.para}>
          Estimated:
          <span style={{ marginLeft: "5px" }}>{ctx.order.esteemDate}</span>
        </p>
        <p className={styles.para}>
          Due Date:
          <span style={{ marginLeft: "5px" }}>{ctx.order.dueDate}</span>
        </p>
        <p className={styles.para}>
          Price:
          <span style={{ marginLeft: "5px" }}>{ctx.order.orderPrice}</span>
        </p>
      </div>
    </>
  );
  let orderPicked = (
    <>
      <div className={styles.tailord}>
        <h4 className={styles.title}>Tailor Details</h4>
        {/* pri d */}
        <p className={styles.para}>
          TailorName:
          <span style={{ marginLeft: "5px" }}>Jonny</span>
        </p>
        <p className={styles.para}>
          TailorPhNo:
          <span style={{ marginLeft: "5px" }}>1234567890</span>
        </p>
        <p className={styles.para} style={{ display: "flex" }}>
          TailorAddress:
          <span className={styles.span}>
            No: x/y, zth street, English Nagar, Alphabet, Pincode- 111 222
          </span>
        </p>
      </div>
      {/* delivery */}
      <div className={styles.deld}>
        <h4 className={styles.title}>Deliver Details</h4>
        {/* pri d */}
        <p className={styles.para}>
          Delivery Person Name:
          <span style={{ marginLeft: "5px" }}>Jonny</span>
        </p>
        <p className={styles.para}>
          Delivery Person No:
          <span style={{ marginLeft: "5px" }}>1234567890</span>
        </p>
      </div>
    </>
  );
  let orderProcessing = <></>;
  let orderCompleted = <></>;
  let orderDelivered;
  let orderAlterartion = (
    <>
      {/* Alteration */}
      <div className={styles.altd}>
        {/* pri d */}
        <h4 className={styles.title}>Alteration Details</h4>
        <p className={styles.para}>
          Description:
          <span style={{ display: "flex", textAlign: "justify" }}>
            &emsp;&emsp;This website belongs to Department of Posts, Ministry of
            Communications, GoI. Created and Managed by Tata Consultancy
            Services Ltd.
          </span>
        </p>
      </div>
    </>
  );
  if (ctx.order.orderStatus === "Booked") {
    orderDetails = [orderBooked];
  } else if (ctx.order.orderStatus === "Verified") {
    orderDetails = [orderBooked, orderVerified];
  } else if (ctx.order.orderStatus === "Picked") {
    orderDetails = [orderBooked, orderVerified, orderPicked];
  } else if (ctx.order.orderStatus === "Processing") {
    orderDetails = [orderBooked, orderVerified, orderPicked, orderProcessing];
  } else if (ctx.order.orderStatus === "Completed") {
    orderDetails = [
      orderBooked,
      orderVerified,
      orderPicked,
      orderProcessing,
      orderCompleted
    ];
  } else if (ctx.order.orderStatus === "Delivered") {
    orderDetails = [
      orderBooked,
      orderVerified,
      orderPicked,
      orderProcessing,
      orderCompleted,
      orderDelivered
    ];
  } else if (ctx.order.orderStatus === "Alterartion") {
    orderDetails = [
      orderBooked,
      orderVerified,
      orderPicked,
      orderProcessing,
      orderCompleted,
      orderDelivered,
      orderAlterartion
    ];
  }

  return (
    <>
      <div className={styles.orderdetail}>
        <div className={styles.no}>1</div>
        <button className={styles.back} onClick={goBackHandler}>
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
        </button>
        <h3 className={styles.heading}>ORDER DETAILS</h3>
        <div className={styles.status}>{/* <StatusBar /> */}</div>
        <div className={styles.row}>
          {/* <div className={styles.col61}> */}
          {orderDetails}
          {/* userd-booked */}
          {/* priced-verified */}
          {/* descrb-booked */}

          {/* Measurement */}
          {/* Custom Measurement */}

          {/* mescloth-booked */}
          {/* scloth-booked */}
          {/* Stitching cloth  */}

          {/* tailord-Processing */}
          {/* taildet */}
          {/* deld-delivered */}
          {/* altd-Alterartion */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default OrderDetials;
