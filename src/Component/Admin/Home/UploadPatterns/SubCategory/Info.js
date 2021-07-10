import "./Info.css";

const Info = (props) => {
  return (
    <div className="info">
      <div className="flex">
        <div className="left">
          <a href="#l" className="link active">
            Main
          </a>
          <a href="#l" className="link">
            Add-ons
          </a>
        </div>
        <div className="right">
          <input type="search" placeholder="search using this" />
        </div>
      </div>
      <div className="content">
        {props.subCategoryList.map((subcategory) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default Info;
