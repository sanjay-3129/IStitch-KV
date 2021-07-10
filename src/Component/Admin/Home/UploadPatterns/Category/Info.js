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

export default Info;
