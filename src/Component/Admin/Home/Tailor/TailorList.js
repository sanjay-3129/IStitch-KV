import { propTypes } from "react-bootstrap/esm/Image";

const TailorList = (props) => {
  return (
    <details class="tailor-details">
      <summary class="inner-box1">
        <p class="tid">001</p>
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
                Amount Paid:&ensp;<b>{props.tailor.address}</b>
              </p>
              <p class="pend">
                Amount Pending:&ensp;<b>{props.tailor.address}</b>
              </p>
            </div>
            <div class="col-sm-8">
              <div class="flex">
                <p class="bank-details">Account Details:</p>
                <br />
                <br />
                <div>
                  <p class="details">
                    {/* Holder Name:{props.tailor.bankDetails.holderName} */}
                  </p>
                  <p class="details">
                    {/* Account Number:{props.tailor.bankDetails.accountNo} */}
                  </p>
                  <p class="details">
                    {/* Bank Name:{props.tailor.bankDetails.bankName} */}
                  </p>
                  <p class="details">
                    {/* IFSC Code:{props.tailor.bankDetails.IFSC} */}
                  </p>
                  <p class="details">
                    {/* Branch Name:{props.tailor.bankDetails.branch} */}
                  </p>
                </div>
              </div>
              <div class="flex">
                <input
                  class="pay-field"
                  type="number"
                  placeholder="Enter the amount to be paid"
                />
                <button type="submit" class="pay-btn">
                  <i class="fas fa-rupee-sign"></i>&ensp;Pay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-right">
          <div class="tailorimg">
            <img class="img-fluid" src="/images/team5.jpg" alt="tailor pic" />
          </div>
        </div>
      </div>
    </details>
  );
};

export default TailorList;
