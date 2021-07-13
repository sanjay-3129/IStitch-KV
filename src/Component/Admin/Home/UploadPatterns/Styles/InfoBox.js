import "./InfoBox.css";

const InfoBox = (props) => {
  return (
    <div className="info_box">
      <h1 className="heading">{props.stylesDetails.styleName}</h1>
      <article className="content">
        <div className="wrap">
          <img
            className="img-fluid"
            src={props.stylesDetails.styleImage}
            alt={props.stylesDetails.styleName}
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
            <button
              type="button"
              className="delete-gender"
              onClick={props.addNew}
            >
              New
            </button>
            <button
              type="button"
              className="delete-gender"
              onClick={props.deleteHandler}
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
            Category
            <span className="category-count">{props.categoryName}</span>{" "}
          </p>
          <p style={{ textAlign: "center" }}>
            SubCategory
            <span className="category-count">{props.subcategoryName}</span>
          </p>
        </div>
        <div class="view-all">
          <button
            className="category-link"
            onClick={props.view(
              props.stylesDetails.styleId,
              props.stylesDetails.styleName
            )}
          >
            View All Patterns
          </button>
          <button className="category-new">Publish</button>
          <button onClick={props.goBack}>GO BACK</button>
        </div>
      </article>
    </div>
  );
};

export default InfoBox;
