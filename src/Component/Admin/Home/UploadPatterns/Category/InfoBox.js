import "./InfoBox.css";
// import Tooltip from "@material-ui/core/Tooltip";
// import Button from "@material-ui/core/Button";

const InfoBox = (props) => {
  return (
    <div className="info_box">
      {/* <Tooltip title="Add" placement="top">
        <Button>top</Button>
      </Tooltip> */}
      <h1 className="heading">{props.categoryDetails.categoryName}</h1>
      <article className="content">
        <div className="wrap">
          <img
            className="img-fluid"
            src={props.categoryDetails.categoryImage}
            alt={props.categoryDetails.categoryName}
          />
          <div className="btn-set">
            <button
              type="button"
              className="change-name"
              onClick={() => props.changeName(props.categoryDetails)}
              // onClick={() => console.log("Change Name")}
            >
              Change Name
            </button>
            <button
              type="button"
              className="change-btn"
              onClick={props.changeImage}
            >
              Change Image
            </button>
            <button
              type="button"
              className="delete-gender"
              onClick={() => props.addNew("category")}
            >
              New
            </button>
            <button
              type="button"
              className="delete-gender"
              onClick={() =>
                props.deleteHandler(props.categoryDetails.categoryId)
              }
            >
              Delete
            </button>
          </div>
        </div>
        <div className="count">
          <p>
            Gender
            <span className="category-count">{props.genderName}</span>{" "}
          </p>
          <p>
            No of Sub-Categories
            <span className="category-count">
              {props.categoryDetails.noOfSubcategories}
            </span>{" "}
          </p>
          <p>
            No of Styles
            <span className="category-count">
              {props.categoryDetails.noOfStyles}
            </span>{" "}
          </p>
        </div>
        <div className="view-all">
          <button
            className="category-link"
            onClick={() =>
              props.view(
                props.categoryDetails.categoryId,
                props.categoryDetails.categoryName,
                props.categoryDetails.categoryImage
              )
            }
          >
            View All Sub-Category
          </button>
          <button
            className="category-new"
            onClick={() => props.addNew("subcategory")}
          >
            Add New Sub-Category
          </button>
          <button onClick={props.goBack}>GO BACK</button>
        </div>
      </article>
    </div>
  );
};

export default InfoBox;
