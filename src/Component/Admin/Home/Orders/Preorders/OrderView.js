import React from "react";
import "./Preorders.css";

const OrderView = (props) => {
  return (
    <>
      <details>
        <summary>
          <p className="cname">Client Name</p>
          <p className="cno">No: 1234567890</p>
          <p className="cat">Category Name</p>
          <p className="date">26/06/99</p>
          <p className="select">
            <select>
              <option>No Action</option>
              <option>Rejected</option>
              <option>No Response</option>
            </select>
          </p>
          <p className="accept">
            <i class="fas fa-check"></i>
          </p>
          <p className="reject">
            <i class="fas fa-times"></i>
          </p>
        </summary>

        <div className="odetails row">
          <div className="col-3">
            <p className="iname">ImagesName</p>
            <img src="/images/boy.png" className="img-fluid" alt="ImagesName" />
          </div>
          <div className="col-5">
            <address className="addrs">Client Address</address>
            <p className="descp">Description</p>
          </div>
          <div className="col-4">
            <div className="mdetails">
              <p>measurement</p>
            </div>
          </div>
        </div>
      </details>

      <details>
        <summary>
          <p className="cname">Client Name</p>
          <p className="cno">No: 1234567890</p>
          <p className="cat">Category Name</p>
          <p className="date">26/06/99</p>
          <p className="select">
            <select>
              <option>No Action</option>
              <option>Rejected</option>
              <option>No Response</option>
            </select>
          </p>
          <p className="accept">
            <i class="fas fa-check"></i>
          </p>
          <p className="reject">
            <i class="fas fa-times"></i>
          </p>
        </summary>

        <div className="odetails row">
          <div className="col-3">
            <p className="iname">ImagesName</p>
            <img src="/images/boy.png" className="img-fluid" alt="ImagesName" />
          </div>
          <div className="col-5">
            <address className="addrs">Client Address</address>
            <p className="descp">Description</p>
          </div>
          <div className="col-4">
            <div className="mdetails">
              <p>measurement</p>
            </div>
          </div>
        </div>
      </details>
    </>
  );
};

export default OrderView;
