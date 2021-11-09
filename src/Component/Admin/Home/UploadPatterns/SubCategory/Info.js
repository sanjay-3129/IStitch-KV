import "./Info.css";

const Info = (props) => {
  const onScrollHandler = (e) => {
    const bottom =
      e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
      e.target.clientHeight;
    // bottom && data empty dont call db again
    // if there is no data from, then length will be 0, so no need to call db again
    console.log("bottom", bottom);
    if (bottom) {
      props.onScroll();
    }
  };
  return (
    <div className="info">
      <div className="flex">
        <div className="left">
          <button
            type="button"
            className={`link active`}
            // onClick={props.selectMain}
            // onClick={() => props.selectedType("mainProduct")}
          >
            {props.type === "mainProduct" ? "Main" : "Add-ons"}
          </button>
          {/* <button
            type="button"
            className={`link ${props.type === "addOns" ? "active" : ""}`}
            // onClick={props.selectAddOn}
            onClick={() => props.selectedType("addOns")}
          >
            Add-ons
          </button> */}
        </div>
        {/* <div className="right">
          <input type="search" placeholder="search using this" />
        </div> */}
      </div>
      <div id="content" className="content" onScroll={onScrollHandler}>
        {props.subCategoryList.map((subcategory) => {
          return (
            <div class="col-3">
              <div
                className="content_box"
                key={subcategory.subcategoryId}
                onClick={() => props.selectedSubCategory(subcategory)}
              >
                <img
                  className="img_fluid"
                  src={subcategory.subcategoryImage}
                  alt={subcategory.subcategoryName}
                />
                <p className="name">{subcategory.subcategoryName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
