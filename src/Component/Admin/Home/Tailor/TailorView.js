import React, { useContext } from "react";
import Approval from "./Approval";
import List from "./List";
import Rejected from "./Rejected";
import "./Tailor.css";

const TailorView = (props) => {
  let tailorView;

  let tailorBooked = (
    <>
      <Approval
        tailor={props.tailor}
        acceptTailor={(data) => props.acceptTailor(data)}
        rejectTailor={(data) => props.rejectTailor(data)}
      />
    </>
  );
  let tailorVerified = (
    <>
      <div class="tab-pane container nullify active" id="list">
        <List tailor={props.tailor} />
      </div>
    </>
  );

  let tailorRejected = (
    <>
      <Rejected
        tailor={props.tailor}
        acceptTailor={(data) => props.acceptTailor(data)}
        deleteTailor={(data) => props.deleteTailor(data)}
      />
    </>
  );

  if (props.tailor.tailorStatus === "Registered") {
    tailorView = [tailorBooked];
  } else if (props.tailor.tailorStatus === "Verified") {
    tailorView = [tailorVerified];
  } else if (props.tailor.tailorStatus === "Rejected") {
    tailorView = [tailorRejected];
  }
  return <> {tailorView}</>;
};

export default TailorView;
