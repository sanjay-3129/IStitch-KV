import "./Info.css";
// import Patterns from "./Patterns";

const Info = (props) => {
  return (
    <div className="info">
      <div className="flex">
        <div className="left">
          <button
            type="button"
            className={`link ${props.type === "mainProduct" ? "active" : ""}`}
            // onClick={props.selectMain}
            onClick={() => props.selectedType("mainProduct")}
          >
            Main
          </button>
          <button
            type="button"
            className={`link ${props.type === "addOns" ? "active" : ""}`}
            // onClick={props.selectAddOn}
            onClick={() => props.selectedType("addOns")}
          >
            Add-ons
          </button>
        </div>
        <div className="right">
          <input type="search" placeholder="search using this" />
        </div>
      </div>
      <div className="content">
        {props.patternsList.map((pattern) => {
          return (
            <div
              className="content_box"
              key={pattern.patternId}
              onClick={() => props.selectedPatterns(pattern)}
            >
              <img
                className="img_fluid"
                src={pattern.patternImage}
                alt={pattern.patternName}
              />
              <p className="name">{pattern.patternName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
