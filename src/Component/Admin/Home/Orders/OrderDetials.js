import React, { useState, useEffect, useContext } from "react";
import styles from "./OrderDetails.module.css";
import ImageCarousel from "./ImageCarousel";
// import StatusBar from "../../../UI/StatusBar/StatusBar";
import qs from "qs";
import firebase from "../../../../Services/firebase/firebase";
import OrdersContext from "../Contexts/OrderContext";
import context from "react-bootstrap/esm/AccordionContext";

const db = firebase.firestore();
const OrderDetials = (props) => {
  const [orderDetials, setOrderDetials] = useState(null);
  const ctx = useContext(OrdersContext);

  console.log(".......>>>>", ctx.order);

  const goBackHandler = () => {
    let status = ctx.order.orderStatus;
    if (
      status === "Booked" ||
      status === "Verified" ||
      status === "Accepted" ||
      status === "Assigned"
    ) {
      props.history.push(`${props.match.url}/orders/preorders`);
    } else if (
      status === "Received" ||
      status === "Repicked" ||
      status === "Progressing" ||
      status === "Finished"
    ) {
      props.history.push(`${props.match.url}/orders/processingorders`);
    } else if (status === "Completed" || status === "Delivered") {
      props.history.push(`${props.match.url}/orders/completedorders`);
    } else {
      props.history.push(`${props.match.url}/orders/alteration`);
    }
    // props.history.goBack();
  };

  let orderDetails = null;

  let images = (
    <>
      <div className={styles.col6}>
        {/* Measurement Details */}
        {ctx.order.measurementProvided === true ? (
          <div className={styles.mesd}>
            <details>
              <summary className={styles.summary}>
                <h4 className={styles.title1}>Measurement Details</h4>
              </summary>
              <div className={styles.innerdiv}>
                {Object.entries(ctx.order.measurementDetails).map((meas) => {
                  return (
                    <p className={styles.mesp}>
                      {meas[0]} - {meas[1]}
                    </p>
                  );
                })}

                {/* {ctx.order.measurementDetails} */}
              </div>
            </details>
          </div>
        ) : (
          <div className={styles.mescloth}>
            {/* pri d */}
            <details>
              <summary className={styles.summary}>
                <h4 className={styles.title1}>Sample Measurement Cloth</h4>
              </summary>
              <p className={styles.para}>
                <div className="thumb1">
                  <img
                    src={ctx.order.uploadMeasurementCloth}
                    style={{ width: "100%" }}
                    // class="hover-shadow cursor"
                    alt="l"
                  />
                </div>
              </p>
            </details>
          </div>
        )}

        {/* Sample Measurement Cloth */}

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
                  src={ctx.order.uploadStitchCloth}
                  style={{ width: "100%" }}
                  // class="hover-shadow cursor"
                  alt="l"
                />
              </div>
            </p>
            <p className={styles.para}>
              Cloth Type: Cotton
              <span style={{ float: "right" }}>Cloth Color: Blue</span>
            </p>
          </details>
        </div>
        <div className={styles.mesd}>
          {/* pri d */}
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>Others</h4>
            </summary>
            <div className={styles.innerdiv}>
              {/* console.log("=====",Object.entries(others)); */}
              {Object.entries(ctx.order.others).map((other) => {
                return (
                  <p className={styles.mesp}>
                    {other[0]} - {other[1]}
                  </p>
                );
              })}
            </div>
          </details>
        </div>
        {/* Main Pattern Images */}
        {ctx.order.mainPatternProvider === true ? (
          <div className={styles.mpi}>
            <details>
              <summary className={styles.summary}>
                <h4 className={styles.title1}>
                  Main-Pattern Images&nbsp;-&nbsp;{ctx.order.mainPatternCount}
                </h4>
              </summary>
              {ctx.order.mainPatterns !== undefined && (
                <ImageCarousel images={ctx.order.mainPatterns} />
              )}
            </details>
          </div>
        ) : (
          <div className={styles.umi}>
            <details>
              <summary className={styles.summary}>
                <h4 className={styles.title1}>
                  User Upload MainPattern Images
                </h4>
              </summary>
              {ctx.order.uploadmainPatterns !== undefined && (
                <ImageCarousel images={ctx.order.uploadmainPatterns} />
              )}
            </details>
          </div>
        )}

        {/* Addon Pattern Images */}
        {ctx.order.addonPatterns !== undefined &&
        ctx.order.uploadaddonPatterns !== undefined ? (
          <>
            {ctx.order.addonPatternProvider === true ? (
              <div className={styles.api}>
                <details>
                  <summary className={styles.summary}>
                    <h4 className={styles.title1}>
                      Add-On Images&nbsp;-&nbsp;{ctx.order.mainPatternCount}
                    </h4>
                  </summary>
                  {ctx.order.addonPatterns !== undefined && (
                    <ImageCarousel images={ctx.order.addonPatterns} />
                  )}
                </details>
              </div>
            ) : (
              <div className={styles.uai}>
                <details>
                  <summary className={styles.summary}>
                    <h4 className={styles.title1}>User Upload Add-On </h4>
                  </summary>
                  {ctx.order.uploadaddonPatterns !== undefined && (
                    <ImageCarousel images={ctx.order.uploadaddonPatterns} />
                  )}
                </details>
              </div>
            )}
          </>
        ) : null}

        {/* User Upload Main Pattern Images */}
      </div>
    </>
  );

  let finishedimages = (
    <>
      <div className={styles.col6}>
        {/* Measurement Details */}
        {ctx.order.measurementProvided === true ? (
          <div className={styles.mesd}>
            <details>
              <summary className={styles.summary}>
                <h4 className={styles.title1}>Measurement Details</h4>
              </summary>
              <div className={styles.innerdiv}>
                {Object.entries(ctx.order.measurementDetails).map((meas) => {
                  return (
                    <p className={styles.mesp}>
                      {meas[0]} - {meas[1]}
                    </p>
                  );
                })}

                {/* {ctx.order.measurementDetails} */}
              </div>
            </details>
          </div>
        ) : (
          <div className={styles.mescloth}>
            {/* pri d */}
            <details>
              <summary className={styles.summary}>
                <h4 className={styles.title1}>Sample Measurement Cloth</h4>
              </summary>
              <p className={styles.para}>
                <div className="thumb1">
                  <img
                    src={ctx.order.uploadMeasurementCloth}
                    style={{ width: "100%" }}
                    // class="hover-shadow cursor"
                    alt="l"
                  />
                </div>
              </p>
            </details>
          </div>
        )}

        {/* Sample Measurement Cloth */}

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
                  src={ctx.order.uploadStitchCloth}
                  style={{ width: "100%" }}
                  // class="hover-shadow cursor"
                  alt="l"
                />
              </div>
            </p>
            <p className={styles.para}>
              Cloth Type: Cotton
              <span style={{ float: "right" }}>Cloth Color: Blue</span>
            </p>
          </details>
        </div>
        <div className={styles.mesd}>
          {/* pri d */}
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>Others</h4>
            </summary>
            <div className={styles.innerdiv}>
              {/* console.log("=====",Object.entries(others)); */}
              {Object.entries(ctx.order.others).map((other) => {
                return (
                  <p className={styles.mesp}>
                    {other[0]} - {other[1]}
                  </p>
                );
              })}
            </div>
          </details>
        </div>
        {/* Main Pattern Images */}
        {ctx.order.mainPatternProvider === true ? (
          <div className={styles.mpi}>
            <details>
              <summary className={styles.summary}>
                <h4 className={styles.title1}>
                  Main-Pattern Images&nbsp;-&nbsp;{ctx.order.mainPatternCount}
                </h4>
              </summary>
              {ctx.order.mainPatterns !== undefined && (
                <ImageCarousel images={ctx.order.mainPatterns} />
              )}
            </details>
          </div>
        ) : (
          <div className={styles.umi}>
            <details>
              <summary className={styles.summary}>
                <h4 className={styles.title1}>
                  User Upload MainPattern Images
                </h4>
              </summary>
              {ctx.order.uploadmainPatterns !== undefined && (
                <ImageCarousel images={ctx.order.uploadmainPatterns} />
              )}
            </details>
          </div>
        )}

        {/* Addon Pattern Images */}
        {ctx.order.addonPatterns !== undefined &&
        ctx.order.uploadaddonPatterns !== undefined ? (
          <>
            {ctx.order.addonPatternProvider === true ? (
              <div className={styles.api}>
                <details>
                  <summary className={styles.summary}>
                    <h4 className={styles.title1}>Add-On Images</h4>
                  </summary>
                  {ctx.order.addonPatterns !== undefined && (
                    <ImageCarousel images={ctx.order.addonPatterns} />
                  )}
                </details>
              </div>
            ) : (
              <div className={styles.uai}>
                <details>
                  <summary className={styles.summary}>
                    <h4 className={styles.title1}>User Upload Add-On </h4>
                  </summary>
                  {ctx.order.uploadaddonPatterns !== undefined && (
                    <ImageCarousel images={ctx.order.uploadaddonPatterns} />
                  )}
                </details>
              </div>
            )}
          </>
        ) : null}
        {/* User Upload Main Pattern Images */}

        {/* Finished Images */}
        <div className={styles.fi}>
          <details>
            <summary className={styles.summary}>
              <h4 className={styles.title1}>Finished Images </h4>
            </summary>
            <div className="row">
              {ctx.order.finishedImages !== undefined &&
                ctx.order.finishedImages.map((images) => {
                  return (
                    <div class={styles.columns}>
                      <div className="thumb">
                        <img
                          src={images}
                          style={{ width: "100%" }}
                          // onclick={openModal()}
                          class="hover-shadow cursor"
                          alt="Images"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </details>
        </div>
      </div>
    </>
  );

  let orderBooked = (
    <>
      <div className={styles.col61}>
        <div className={styles.userd}>
          <h4 className={styles.title}>User Details</h4>
          <p className={styles.para}>
            UserName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.userDetails !== null && ctx.order.userDetails.userName}
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
          <h4 className={styles.title}>Order Description</h4>
          <p className={styles.para}>
            Description:
            <span style={{ display: "flex", textAlign: "justify" }}>
              &emsp;&emsp; {ctx.order.description}
              {/* {ctx.order.alterationDetails.description} */}
            </span>
          </p>
        </div>
      </div>
      {images}
      {/* <div className={styles.footer}>
        <button
          type="submit"
          className={styles.acpt}
          onClick={() => props.addQuote(props.item)}
        >
          Accept <i class="fas fa-check"></i>
        </button>
        <button type="submit" className={styles.cncl}>
          Reject <i class="fas fa-times"></i>
        </button>
      </div> */}
    </>
  );

  let orderVerified = (
    <>
      <div className={styles.col61}>
        <div className={styles.userd}>
          <h4 className={styles.title}>User Details</h4>
          <p className={styles.para}>
            UserName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.userDetails !== null && ctx.order.userDetails.userName}
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
          <h4 className={styles.title}>Order Description</h4>
          <p className={styles.para}>
            Description:
            <span style={{ display: "flex", textAlign: "justify" }}>
              &emsp;&emsp; {ctx.order.description}
              {/* {ctx.order.alterationDetails.description} */}
            </span>
          </p>
        </div>

        <div className={styles.priced}>
          {/* pri d */}
          <h4 className={styles.title}>Order Price</h4>

          <p className={styles.para}>
            Due Date:
            <span style={{ marginLeft: "5px" }}>{ctx.order.dueDate}</span>
          </p>
          <p className={styles.para}>
            Price:
            <span style={{ marginLeft: "5px" }}>{ctx.order.orderPrice}</span>
          </p>
          <p className={styles.para}>
            TailorPrice:
            <span style={{ marginLeft: "5px" }}>{ctx.order.tailorCharge}</span>
          </p>
        </div>
      </div>
      {images}
    </>
  );
  // let orderAccepted=(
  //   <>
  //   {orderBooked}
  //     {orderVerified} paid or not
  //   </>
  // )
  let orderAssigned = (
    <>
      <div className={styles.col61}>
        <div className={styles.userd}>
          <h4 className={styles.title}>User Details</h4>
          <p className={styles.para}>
            UserName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.userDetails !== null && ctx.order.userDetails.userName}
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
          <h4 className={styles.title}>Order Description</h4>
          <p className={styles.para}>
            Description:
            <span style={{ display: "flex", textAlign: "justify" }}>
              &emsp;&emsp; {ctx.order.description}
              {/* {ctx.order.alterationDetails.description} */}
            </span>
          </p>
        </div>

        <div className={styles.priced}>
          {/* pri d */}
          <h4 className={styles.title}>Order Price</h4>

          <p className={styles.para}>
            Due Date:
            <span style={{ marginLeft: "5px" }}>{ctx.order.dueDate}</span>
          </p>
          <p className={styles.para}>
            Price:
            <span style={{ marginLeft: "5px" }}>{ctx.order.orderPrice}</span>
          </p>
          <p className={styles.para}>
            TailorPrice:
            <span style={{ marginLeft: "5px" }}>{ctx.order.tailorCharge}</span>
          </p>
        </div>

        <div className={styles.tailord}>
          <h4 className={styles.title}>Tailor Details</h4>
          {/* pri d */}
          <p className={styles.para}>
            TailorName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.tailorDetails.tailorName}
            </span>
          </p>
          <p className={styles.para}>
            TailorPhNo:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.tailorDetails.tailorPhno}
            </span>
          </p>
          <p className={styles.para} style={{ display: "flex" }}>
            TailorAddress:
            <span className={styles.span}>
              {ctx.order.tailorDetails.tailorAddress}
            </span>
          </p>
        </div>
      </div>
      {images}
      {/* delivery */}
    </>
  );

  let orderProcessing = <>{orderAssigned}</>;

  let OrderFooter = (
    <>
      {/* <div className={styles.footer}>
        <button type="submit" className={styles.acpt}>
          Accept <i class="fas fa-check"></i>
        </button>
        <button type="submit" className={styles.cncl}>
          Reject <i class="fas fa-times"></i>
        </button>
      </div> */}
    </>
  );

  let orderFinished = (
    <>
      <div className={styles.col61}>
        <div className={styles.userd}>
          <h4 className={styles.title}>User Details</h4>
          <p className={styles.para}>
            UserName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.userDetails !== null && ctx.order.userDetails.userName}
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
          <h4 className={styles.title}>Order Description</h4>
          <p className={styles.para}>
            Description:
            <span style={{ display: "flex", textAlign: "justify" }}>
              &emsp;&emsp; {ctx.order.description}
              {/* {ctx.order.alterationDetails.description} */}
            </span>
          </p>
        </div>

        <div className={styles.priced}>
          {/* pri d */}
          <h4 className={styles.title}>Order Price</h4>

          <p className={styles.para}>
            Due Date:
            <span style={{ marginLeft: "5px" }}>{ctx.order.dueDate}</span>
          </p>
          <p className={styles.para}>
            Price:
            <span style={{ marginLeft: "5px" }}>{ctx.order.orderPrice}</span>
          </p>
          <p className={styles.para}>
            TailorPrice:
            <span style={{ marginLeft: "5px" }}>{ctx.order.tailorCharge}</span>
          </p>
        </div>

        <div className={styles.tailord}>
          <h4 className={styles.title}>Tailor Details</h4>
          {/* pri d */}
          <p className={styles.para}>
            TailorName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.tailorDetails.tailorName}
            </span>
          </p>
          <p className={styles.para}>
            TailorPhNo:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.tailorDetails.tailorPhno}
            </span>
          </p>
          <p className={styles.para} style={{ display: "flex" }}>
            TailorAddress:
            <span className={styles.span}>
              {ctx.order.tailorDetails.tailorAddress}
            </span>
          </p>
        </div>
      </div>
      {finishedimages}
      {/* finished image should show in card view */}
    </>
  );

  // let orderCompleted = <></>;

  // let orderDelivered = (
  //   <>
  //     <div className={styles.deld}>
  //       <h4 className={styles.title}>Deliver Details</h4>
  //       {/* pri d */}
  //       <p className={styles.para}>
  //         Delivery Person Name:
  //         <span style={{ marginLeft: "5px" }}>Jonny</span>
  //       </p>
  //       <p className={styles.para}>
  //         Delivery Person No:
  //         <span style={{ marginLeft: "5px" }}>1234567890</span>
  //       </p>
  //     </div>
  //   </>
  // );
  let orderAlterartion = (
    <>
      <div className={styles.col61}>
        <div className={styles.userd}>
          <h4 className={styles.title}>User Details</h4>
          <p className={styles.para}>
            UserName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.userDetails !== null && ctx.order.userDetails.userName}
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
          <h4 className={styles.title}>Order Description</h4>
          <p className={styles.para}>
            Description:
            <span style={{ display: "flex", textAlign: "justify" }}>
              &emsp;&emsp; {ctx.order.description}
              {/* {ctx.order.alterationDetails.description} */}
            </span>
          </p>
        </div>

        <div className={styles.priced}>
          {/* pri d */}
          <h4 className={styles.title}>Order Price</h4>

          <p className={styles.para}>
            Due Date:
            <span style={{ marginLeft: "5px" }}>{ctx.order.dueDate}</span>
          </p>
          <p className={styles.para}>
            Price:
            <span style={{ marginLeft: "5px" }}>{ctx.order.orderPrice}</span>
          </p>
          <p className={styles.para}>
            TailorPrice:
            <span style={{ marginLeft: "5px" }}>{ctx.order.tailorCharge}</span>
          </p>
        </div>

        <div className={styles.tailord}>
          <h4 className={styles.title}>Tailor Details</h4>
          {/* pri d */}
          <p className={styles.para}>
            TailorName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.tailorDetails.tailorName}
            </span>
          </p>
          <p className={styles.para}>
            TailorPhNo:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.tailorDetails.tailorPhno}
            </span>
          </p>
          <p className={styles.para} style={{ display: "flex" }}>
            TailorAddress:
            <span className={styles.span}>
              {ctx.order.tailorDetails.tailorAddress}
            </span>
          </p>
        </div>

        <div className={styles.altd}>
          {/* pri d */}
          <h4 className={styles.title}>Alteration Details</h4>
          <p className={styles.para}>
            Description:
            <span style={{ display: "flex", textAlign: "justify" }}>
              &emsp;&emsp;
              {ctx.order.alterationDetails !== undefined &&
                ctx.order.alterationDetails.reasonDescription}
            </span>
          </p>
          <div className="thumb" style={{ padding: "10px" }}>
            <img
              src={
                ctx.order.alterationDetails !== undefined &&
                ctx.order.alterationDetails.defectivePartImage
              }
              style={{ width: "100%" }}
              // onclick={openModal()}
              class="hover-shadow cursor"
              alt="Images"
            />
          </div>
        </div>
      </div>
      {finishedimages}
      {/* Alteration */}
    </>
  );

  let orderAverified = (
    <>
      <div className={styles.col61}>
        <div className={styles.userd}>
          <h4 className={styles.title}>User Details</h4>
          <p className={styles.para}>
            UserName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.userDetails !== null && ctx.order.userDetails.userName}
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
          <h4 className={styles.title}>Order Description</h4>
          <p className={styles.para}>
            Description:
            <span style={{ display: "flex", textAlign: "justify" }}>
              &emsp;&emsp; {ctx.order.description}
              {/* {ctx.order.alterationDetails.description} */}
            </span>
          </p>
        </div>

        <div className={styles.priced}>
          {/* pri d */}
          <h4 className={styles.title}>Order Price</h4>

          <p className={styles.para}>
            Due Date:
            <span style={{ marginLeft: "5px" }}>{ctx.order.dueDate}</span>
          </p>
          <p className={styles.para}>
            Price:
            <span style={{ marginLeft: "5px" }}>{ctx.order.orderPrice}</span>
          </p>
          <p className={styles.para}>
            TailorPrice:
            <span style={{ marginLeft: "5px" }}>{ctx.order.tailorCharge}</span>
          </p>
        </div>

        <div className={styles.tailord}>
          <h4 className={styles.title}>Tailor Details</h4>
          {/* pri d */}
          <p className={styles.para}>
            TailorName:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.tailorDetails.tailorName}
            </span>
          </p>
          <p className={styles.para}>
            TailorPhNo:
            <span style={{ marginLeft: "5px" }}>
              {ctx.order.tailorDetails.tailorPhno}
            </span>
          </p>
          <p className={styles.para} style={{ display: "flex" }}>
            TailorAddress:
            <span className={styles.span}>
              {ctx.order.tailorDetails.tailorAddress}
            </span>
          </p>
        </div>

        <div className={styles.altd}>
          {/* pri d */}
          <h4 className={styles.title}>Alteration Details</h4>
          <p className={styles.para}>
            Description:
            <span style={{ display: "flex", textAlign: "justify" }}>
              &emsp;&emsp;
              {ctx.order.alterationDetails !== undefined &&
                ctx.order.alterationDetails.reasonDescription}
            </span>
          </p>
          <div className="thumb" style={{ padding: "10px" }}>
            <img
              src={
                ctx.order.alterationDetails !== undefined &&
                ctx.order.alterationDetails.defectivePartImage
              }
              style={{ width: "100%" }}
              // onclick={openModal()}
              class="hover-shadow cursor"
              alt="Images"
            />
          </div>
        </div>

        <div className={styles.priced}>
          {/* pri d */}
          <h4 className={styles.title}>Alteration Order</h4>

          <p className={styles.para}>
            Due Date:
            <span style={{ marginLeft: "5px" }}>{ctx.order.AdueDate}</span>
          </p>
          <p className={styles.para}>
            Price:
            <span style={{ marginLeft: "5px" }}>{ctx.order.AorderPrice}</span>
          </p>
          <p className={styles.para}>
            TailorPrice:
            <span style={{ marginLeft: "5px" }}>{ctx.order.AtailorCharge}</span>
          </p>
        </div>
      </div>
      {finishedimages}
    </>
  );

  // let orderAFinished = (
  //   <>
  //     <div className={styles.fi}>
  //       <details>
  //         <summary className={styles.summary}>
  //           <h4 className={styles.title1}>Alteration Finished Images </h4>
  //         </summary>
  //         <div className="row">
  //           {ctx.order.finishedImages !== undefined &&
  //             ctx.order.finishedImages.map((images) => {
  //               return (
  //                 <div class={styles.columns}>
  //                   <div className="thumb">
  //                     <img
  //                       src={images}
  //                       style={{ width: "100%" }}
  //                       // onclick={openModal()}
  //                       class="hover-shadow cursor"
  //                       alt="Images"
  //                     />
  //                   </div>
  //                 </div>
  //               );
  //             })}
  //         </div>
  //       </details>
  //     </div>
  //   </>
  // );

  if (ctx.order.orderStatus === "Booked") {
    orderDetails = [orderBooked];
  } else if (ctx.order.orderStatus === "Verified") {
    orderDetails = [orderVerified];
  } else if (ctx.order.orderStatus === "Accepted") {
    orderDetails = [orderVerified];
  } else if (ctx.order.orderStatus === "Assigned") {
    orderDetails = [orderAssigned];
  } else if (ctx.order.orderStatus === "Received") {
    orderDetails = [orderAssigned];
  } else if (ctx.order.orderStatus === "Repicked") {
    orderDetails = [orderAssigned];
  } else if (ctx.order.orderStatus === "Progressing") {
    orderDetails = [orderProcessing];
  } else if (ctx.order.orderStatus === "Finished") {
    orderDetails = [orderFinished, OrderFooter];
  } else if (ctx.order.orderStatus === "Completed") {
    orderDetails = [orderFinished];
  } else if (ctx.order.orderStatus === "Delivered") {
    orderDetails = [orderFinished];
  } else if (ctx.order.orderStatus === "Alteration") {
    orderDetails = [orderAlterartion];
  } else if (ctx.order.orderStatus === "AVerified") {
    orderDetails = [orderAverified];
  } else if (ctx.order.orderStatus === "AAssigned") {
    orderDetails = [orderAverified];
  } else if (ctx.order.orderStatus === "AProgressing") {
    orderDetails = [orderAverified];
  } else if (ctx.order.orderStatus === "AFinished") {
    orderDetails = [orderAverified];
  } else if (ctx.order.orderStatus === "ACompleted") {
    orderDetails = [orderAverified];
  } else if (ctx.order.orderStatus === "ADelivered") {
    orderDetails = [orderAverified];
  }

  return (
    <>
      <div className={styles.orderdetail}>
        <div className={styles.no}>{ctx.order.orderNumber}</div>
        <button className={styles.back} onClick={goBackHandler}>
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
        </button>
        <h3 className={styles.heading}>
          ORDER DETAILS<span>( {ctx.order.orderStatus})</span>
        </h3>
        <div className={styles.status}>{/* <StatusBar /> */}</div>
        <div className={styles.row}>
          {/* <div className={styles.col61}> */}
          {orderDetails}
        </div>
      </div>
    </>
  );
};

export default OrderDetials;
