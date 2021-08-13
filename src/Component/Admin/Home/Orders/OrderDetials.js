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
          <div className={styles.col61}>
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

            <div className={styles.priced}>
              {/* pri d */}
              <h4 className={styles.title}>Order Price</h4>
              <p className={styles.para}>
                Estimated:
                <span style={{ marginLeft: "5px" }}>
                  {ctx.order.esteemDate}
                </span>
              </p>
              <p className={styles.para}>
                Due Date:
                <span style={{ marginLeft: "5px" }}>{ctx.order.dueDate}</span>
              </p>
              <p className={styles.para}>
                Price:
                <span style={{ marginLeft: "5px" }}>
                  {ctx.order.orderPrice}
                </span>
              </p>
            </div>
            <div className={styles.descrb}>
              {/* pri d */}
              <h4 className={styles.title}>User Description</h4>
              <p className={styles.para}>
                Description:
                <span style={{ display: "flex", textAlign: "justify" }}>
                  &emsp;&emsp;This website belongs to Department of Posts,
                  Ministry of Communications, GoI. Created and Managed by Tata
                  Consultancy Services Ltd.
                </span>
              </p>
            </div>
            {/* Measurement */}
            <div className={styles.mesd}>
              {/* pri d */}
              <h4 className={styles.title}>Measurement Details</h4>
              <p className={styles.para}>
                &emsp;&emsp;This website belongs to Department of Posts,
                Ministry of Communications, GoI. Created and Managed by Tata
                Consultancy Services Ltd.
              </p>
            </div>
            {/* Custom Measurement */}
            <div className={styles.mescloth}>
              {/* pri d */}
              <h4 className={styles.title}>Sample Measurement Cloth</h4>
              <p className={styles.para}>
                <div className="thumb1">
                  <img
                    src="/images/frnsto.png"
                    style={{ width: "100%" }}
                    // class="hover-shadow cursor"
                    alt="l"
                  />
                  <p
                    className={styles.para}
                    style={{ textAlign: "center", textTransform: "uppercase" }}
                  >
                    patternName
                  </p>
                </div>
              </p>
            </div>
            {/* Stitching cloth  */}
            <div className={styles.scloth}>
              {/* pri d */}
              <h4 className={styles.title}>Stitching Cloth</h4>
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
            </div>
            {/* taildet */}
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

            {/* Alteration */}
            <div className={styles.altd}>
              {/* pri d */}
              <h4 className={styles.title}>Alteration Details</h4>
              <p className={styles.para}>
                Description:
                <span style={{ display: "flex", textAlign: "justify" }}>
                  &emsp;&emsp;This website belongs to Department of Posts,
                  Ministry of Communications, GoI. Created and Managed by Tata
                  Consultancy Services Ltd.
                </span>
              </p>
            </div>
          </div>

          <div className={styles.col6}>
            <div className={styles.mpi} style={{ marginBottom: "5px" }}>
              <details>
                <summary className={styles.summary}>
                  <h4 className={styles.title}>Pattern Images</h4>
                </summary>
                <ImageCarousel />
              </details>
            </div>
            <div className={styles.api} style={{ marginBottom: "5px" }}>
              <details>
                <summary className={styles.summary}>
                  <h4 className={styles.title}>Add-On Images</h4>
                </summary>
                <ImageCarousel />
              </details>
            </div>
            <div className={styles.umi} style={{ marginBottom: "5px" }}>
              <details>
                <summary className={styles.summary}>
                  <h4 className={styles.title}>
                    User Upload MainPattern Images
                  </h4>
                </summary>
                <ImageCarousel />
              </details>
            </div>
            <div className={styles.uai} style={{ marginBottom: "5px" }}>
              <details>
                <summary className={styles.summary}>
                  <h4 className={styles.title}>User Upload Add-On </h4>
                </summary>
                <ImageCarousel />
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetials;
