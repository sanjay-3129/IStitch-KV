import "./Info.css";

const Info = (props) => {
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
        <div className="right">
          <input type="search" placeholder="search using this" />
        </div>
      </div>
      <div className="content">
        {props.stylesList.map((style) => {
          return (
            <div class="col-3">
              <div
                className="content_box"
                key={style.styleId}
                onClick={() => props.selectedStyles(style)}
              >
                <img
                  className="img_fluid"
                  src={style.styleImage}
                  alt={style.styleName}
                />
                <p className="name">{style.styleName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
