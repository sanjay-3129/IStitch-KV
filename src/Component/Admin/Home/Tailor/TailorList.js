import { useEffect, useState } from "react";

const TailorList = (props) => {
  const [amountToBePaid, setAmountToBePaid] = useState(0);
  const [tailorAmount, setTailorAmount] = useState({
    amountPaid: 0,
    amountPending: 0
  });

  useEffect(() => {
    let paid = props.tailor.amountPaid;
    let pending = props.tailor.amountPending;
    setTailorAmount({
      amountPaid: paid,
      amountPending: pending
    });
  }, [props.tailor.amountPaid, props.tailor.amountPending]);

  const onChangeHandler = (e) => {
    setAmountToBePaid(e.target.value);
  };

  const onPayHandler = () => {
    let amount = parseFloat(amountToBePaid);
    let value = window.confirm("Are you sure you want to pay: ₹" + amount);
    if (value) {
      console.log("yes");
      setTailorAmount((prevState) => {
        let paid = parseFloat(prevState.amountPaid);
        let pending = parseFloat(prevState.amountPending);
        return {
          amountPaid: (paid + amount).toFixed(2),
          amountPending: (pending - amount).toFixed(2)
        };
      });
    } else {
      console.log("no");
    }
  };

  return (
    <details class="tailor-details">
      <summary class="inner-box1">
        <p class="tid">{props.tailor.tailorId}</p>
        <p class="tname">{props.tailor.name}</p>
        <p class="tno">{props.tailor.phone}</p>
        <p class="tspec">{props.tailor.specialization}</p>
        <p class="tadd">{props.tailor.address}</p>
      </summary>
      <div class="box">
        <div class="col-left">
          <div class="inner-box2">
            <div class="col-sm-4">
              <p class="oo">
                Ongoing Orders:&ensp;<b>{props.tailor.progressingCount}</b>
              </p>
              <p class="co">
                Completed Orders:&ensp;<b>{props.tailor.completedCount}</b>
              </p>
              <p class="amount">
                Amount Paid:&ensp;<b>{tailorAmount.amountPaid}</b>
              </p>
              <p class="pend">
                Amount Pending:&ensp;<b>{tailorAmount.amountPending}</b>
              </p>
            </div>
            <div class="col-sm-8">
              <div class="flex">
                <p class="bank-details">Account Details:</p>
                <br />
                <br />
                <div>
                  <p class="details">
                    <span style={{ fontWeight: "initial" }}>Holder Name:</span>
                    <span style={{ textTransform: "uppercase" }}>
                      &ensp;{props.tailor.bankDetails.holderName}
                    </span>
                  </p>
                  <p class="details">
                    <span style={{ fontWeight: "initial" }}>
                      Account Number:
                    </span>
                    &ensp;{props.tailor.bankDetails.accountNo}
                  </p>
                  <p class="details">
                    <span style={{ fontWeight: "initial" }}>Bank Name:</span>
                    &ensp;{props.tailor.bankDetails.bankName}
                  </p>
                  <p class="details">
                    <span style={{ fontWeight: "initial" }}>IFSC Code:</span>
                    &ensp;{props.tailor.bankDetails.IFSC}
                  </p>
                  <p class="details">
                    <span style={{ fontWeight: "initial" }}>Branch Name:</span>
                    &ensp;{props.tailor.bankDetails.branch}
                  </p>
                </div>
              </div>
              <div class="flex">
                <input
                  class="pay-field"
                  type="number"
                  id="amountToBePaid"
                  name="amountToBePaid"
                  placeholder="Enter the amount to be paid"
                  onChange={onChangeHandler}
                  value={amountToBePaid}
                />
                <button type="button" class="pay-btn" onClick={onPayHandler}>
                  <i class="fas fa-rupee-sign"></i>&ensp;Pay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-right">
          <div class="tailorimg">
            <img
              class="img-fluid"
              src={props.tailor.profileImage}
              alt="tailor pic"
            />
          </div>
        </div>
      </div>
    </details>
  );
};

export default TailorList;
