import "./InfoBox.css";

const InfoBox = (props) => {
  return (
    <div className="info_box">
      <h1 className="heading">{props.subCategoryDetails.subcategoryName}</h1>
      <article className="content">
        <div className="wrap">
          <img
            className="img-fluid"
            src={props.subCategoryDetails.subcategoryImage}
            alt={props.subCategoryDetails.subcategoryName}
          />
          <div className="btn-set">
            <button
              type="button"
              className="change-name"
              onClick={props.changeName}
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
            {/* <button
              type="button"
              className="delete-gender"
              onClick={() => props.addNew("subcategory")}
            >
              New
            </button> */}
            <button
              type="button"
              className="delete-gender"
              onClick={() =>
                props.deleteHandler(props.subCategoryDetails.subcategoryId)
              }
            >
              Delete
            </button>
            <div class="can-toggle">
              <input
                id="toggle"
                name="toggle"
                type="checkbox"
                checked={props.subCategoryDetails.hide}
                data-toggle="toggle"
                onChange={props.hide}
              />
              <label for="toggle">
                <div
                  class="can-toggle__switch"
                  data-checked="Hide"
                  data-unchecked="Show"
                ></div>
              </label>
            </div>
            {/* <div class="can-toggle">
              <input
              id="toggle"
              name="toggle"
              type="checkbox"
              checked={props.subCategoryDetails.hide}
              data-toggle="toggle"
              onChange={props.hide}
            />
              <label for="a">
                <div
                  class="can-toggle__switch"
                  data-checked="Show"
                  data-unchecked="Hide"
                ></div>
              </label>
            </div> */}
          </div>
        </div>
        <div className="count">
          <p>
            Gender
            <span className="category-count">{props.genderName}</span>{" "}
          </p>
          <p>
            Category
            <span className="category-count">{props.categoryName}</span>{" "}
          </p>
          <p>
            No of Styles
            <span className="category-count">
              {props.subCategoryDetails.noOfStyles}
            </span>{" "}
          </p>
        </div>
        <div class="view-all">
          <button
            type="button"
            className="delete-gender"
            onClick={() => props.addNew("subcategory")}
          >
            Add New Sub-Category
          </button>
          <button className="category-new" onClick={props.addNewStyles}>
            Add New Styles
          </button>
          <button
            className="category-link"
            onClick={() =>
              props.view(
                props.subCategoryDetails.subcategoryId,
                props.subCategoryDetails.subcategoryName
              )
            }
          >
            View All Styles
          </button>
          {/* <button onClick={props.goBack}>GO BACK</button> */}
        </div>
      </article>
      <button class="goback" onClick={props.goBack}>
        <i class="fas fa-arrow-left" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default InfoBox;
