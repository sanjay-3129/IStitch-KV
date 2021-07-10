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
        {props.stylesList.map((style) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default Info;
