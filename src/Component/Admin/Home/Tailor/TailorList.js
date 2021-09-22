const TailorList = () => {
  return (
    <details class="tailor-details">
      <summary class="inner-box1">
        <p class="tid">001</p>
        <p class="tname">Akhil</p>
        <p class="tno">1111111111</p>
        <p class="tspec">Gents</p>
        <p class="tadd">xxx yyy zzz</p>
      </summary>
      <div class="box">
        <div class="col-left">
          <div class="inner-box2">
            <div class="col-sm-4">
              <p class="oo">
                Ongoing Orders:&ensp;<b>02</b>
              </p>
              <p class="co">
                Completed Orders:&ensp;<b>24</b>
              </p>
              <p class="amount">
                Amount Paid:&ensp;<b>12,000</b>
              </p>
              <p class="pend">
                Amount Pending:&ensp;<b>1,000</b>
              </p>
            </div>
            <div class="col-sm-8">
              <div class="flex">
                <p class="bank-details">Account Details:</p>
                <div>
                  <p class="details">Name</p>
                  <p class="details">Account No</p>
                  <p class="details">Bank Name</p>
                  <p class="details">IFSC code</p>
                  <p class="details">Branch Name</p>
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
