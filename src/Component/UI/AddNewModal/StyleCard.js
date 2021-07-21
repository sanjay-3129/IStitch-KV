import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import Firebase from "../../../Services/firebase/firebase";

const StyleCard = (props) => {
  const db = Firebase.firestore();
  const [stylesList, setStylesList] = useState(null);

  useEffect(() => {
    let sub = props.data;
    db.collection("gender")
      .doc(sub.genderId)
      .collection(props.type)
      .doc("categories")
      .collection("category")
      .doc(sub.categoryId)
      .collection("subcategory")
      .doc(sub.subcategoryId)
      .collection("styles")
      .where("delete", "==", false)
      .orderBy("styleName", "asc")
      .limit(5)
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push(doc.data());
        });
        if (list.length > 0) {
          setStylesList(list);
        } else {
          setStylesList("empty");
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const onSelectHandler = (style) => {
    props.onSelect(style);
    // console.log("select");
  };

  let styles = null;
  if (stylesList === null) {
    styles = <Spinner />;
  } else if (stylesList === "empty") {
    styles = (
      <h3>No style is available yet. Please add it to view the styles.</h3>
    );
  } else {
    styles = stylesList.map((style, i) => {
      // console.log(i);
      return (
        <div class="styles" key={i}>
          <img class="img-fluid" src={style.styleImage} alt={style.styleName} />
          <p class="sname">{style.styleName}</p>
          <input
            type="checkbox"
            id={style.styleId}
            onClick={() => onSelectHandler(style)}
          />
          <label class="stretched" for={style.styleId}></label>
        </div>
      );
    });
  }
  return <div class="scrollview">{styles}</div>;
};

export default StyleCard;
