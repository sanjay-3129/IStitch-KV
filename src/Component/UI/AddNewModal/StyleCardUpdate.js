import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import CheckBox from "../AddNewModal/CheckBox";
import Firebase from "../../../Services/firebase/firebase";

const StyleCardUpdate = (props) => {
  const db = Firebase.firestore();
  const [stylesList, setStylesList] = useState(null);
  // const [currentRelations, setCurrentRelations] = useState(null);

  useEffect(() => {
    // console.log("stylerelations-", props.style.relations);
    // console.log("relations-", props.relations);
    // setCurrentRelations(props.style.relations);
    // let relationsList = [];
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
          // console.log(doc.data().relations);
          let style = doc.data();
          list.push(style);

          // let index = props.relations.findIndex(
          //   (r) => r.styleId === style.styleId
          //   // (r) => {
          //   //   console.log(r.style, style.styleId);
          //   //   return r.styleId === style.styleId;
          //   // }
          // );
          // if (index !== -1) {
          //   relationsList.push(true);
          // } else {
          //   relationsList.push(false);
          // }

          // relationsList.push(
          //   props.relations.includes((r) => {
          //     console.log("styleIDA", r.styleId, style.styleId);
          //     return r.styleId === style.styleId;
          //   })
          // );
        });
        if (list.length > 0) {
          setStylesList(list);
          // setCurrentRelations(relationsList);
          // console.log("styleUpdate", relationsList);
        } else {
          setStylesList("empty");
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const onSelectHandler = (style, index) => {
    // let list = [...currentRelations];
    // let item = list[index]; // true or false
    // list[index] = !item;
    // setCurrentRelations(list);
    // console.log(style);
    props.onSelect(style);
    // console.log("select");
  };

  // const checkedHandler = (style) => {
  //   // console.log(
  //   //   currentRelations.includes((r) => r.styleId === style.styleId)
  //   // );
  //   return props.relations.includes((r) => r.styleId === style.styleId);
  //   // console.log("chekced");
  // };

  let styles = null;
  if (stylesList === null) {
    styles = <Spinner />;
  } else if (stylesList === "empty") {
    styles = (
      <h3>No style is available yet. Please add it to view the styles.</h3>
    );
  } else {
    styles = stylesList.map((style, i) => {
      // let checked = props.relations.includes(
      //   (r) => r.styleId === style.styleId
      // );
      // console.log(props.relations[2]);
      return (
        <div class="styles" key={i}>
          <img class="img-fluid" src={style.styleImage} alt={style.styleName} />
          <p class="sname">{style.styleName}</p>
          <CheckBox
            relations={props.relations}
            onSelectHandler={onSelectHandler}
            style={style}
            index={i}
          />
          {/* <input
            type="checkbox"
            id={style.styleId}
            onChange={() => onSelectHandler(style, i)}
            checked={currentRelations[i]}
            // checked={props.relations.includes(
            //   (r) => r.styleId === style.styleId
            // )}
            // checked={props.relations.findIndex((r) => {
            //   let index = r.styleId === style.styleId;
            //   if (index === -1) {
            //     return false;
            //   } else {
            //     return true;
            //   }
            // })}
            // checked={checkedHandler(style)}
            // checked={props.relations[i].checked !== undefined ? true : false}
          /> */}
          <label class="stretched" for={style.styleId}></label>
        </div>
      );
    });
  }
  return <div class="scrollview">{styles}</div>;
};

export default StyleCardUpdate;
