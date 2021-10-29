import React, { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import firebase from "../../../../Services/firebase/firebase";
const db = firebase.firestore();

const Approval = (props) => {
  return (
    <>
      <div class="approval">
        <div class="card">
          <div class="image">
            <img class="img-fluid" src="" alt="profile" />
          </div>
          <div class="hovereffect">
            <img class="img-fluid" src="" alt="profile" />
          </div>
          <div class="row">
            <p class="para">
              <b>Name:</b>
            </p>
            <p class="para">{props.tailor.name}</p>
          </div>
          <div class="row">
            <p class="para">
              <b>Mobile No:</b>
            </p>
            <p class="para">{props.tailor.phone}</p>
          </div>
          <div class="row">
            <p class="para">
              <b>Specalization:</b>
            </p>
            <p class="para">{props.tailor.specialization}</p>
          </div>
          <div class="row">
            <p class="para">
              <b>Address:</b>
            </p>
            <p class="para add">{props.tailor.address}</p>
          </div>
          <div class="row">
            <button
              type="submit"
              class="approval-btn"
              onClick={() => props.acceptTailor(props.tailor)}
            >
              Accept&ensp;<i class="fas fa-check"></i>
            </button>
            <button
              type="submit"
              class="reject-btn"
              onClick={() => props.rejectTailor(props.tailor)}
            >
              Reject&ensp;<i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Approval;
