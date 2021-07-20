import "./Info.css";

const InfoPage = (props) => {
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
        {props.categoryList.map((category) => {
          return (
            <div
              className="content_box"
              key={category.categoryId}
              onClick={() => props.selectedCategory(category)}
            >
              <img
                className="img_fluid"
                src={category.categoryImage}
                alt={category.categoryName}
              />
              <p className="name">{category.categoryName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoPage;
