import React from "react";

const Rejected = () => {
  return (
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
          <p class="para">Ishwarya</p>
        </div>
        <div class="row">
          <p class="para">
            <b>Mobile No:</b>
          </p>
          <p class="para">90000 80000</p>
        </div>
        <div class="row">
          <p class="para">
            <b>Specalization:</b>
          </p>
          <p class="para">All</p>
        </div>
        <div class="row">
          <p class="para">
            <b>Address:</b>
          </p>
          <p class="para add">xxx yyy zzz</p>
        </div>
        <div class="row">
          <button type="submit" class="approval-btn">
            Accept&ensp;<i class="fas fa-check"></i>
          </button>
          <button type="submit" class="reject-btn">
            Reject&ensp;<i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rejected;
