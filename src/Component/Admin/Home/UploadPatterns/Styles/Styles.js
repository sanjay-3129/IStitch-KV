import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Info from "./Info";
import InfoBox from "./InfoBox";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import qs from "qs";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";
import LoadingBar from "react-top-loading-bar";
import AddNewStyle from "../../../../UI/AddNewModal/AddNewStyle";
// import NewStyleModal from "../../../../UI/AddNewModal/NewStyleModal";
import DeleteConfirmModal from "../../../../UI/DeleteConfirmModal/DeleteConfirmModal";
import generateId from "../../../../../Helpers/generateId";
let genderId = undefined;
let genderName = undefined;
let categoryId = undefined;
let categoryName = undefined;
let subcategoryId = undefined;
let subcategoryName = undefined;
const db = firebase.firestore();

const Styles = (props) => {
  const ref = useRef(null);
  const [stylesList, setStylesList] = useState(null);
  const [isChange, setIsChange] = useState(null); // for modal
  const [isDelete, setIsDelete] = useState(null);
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });
  const [styles, setStyles] = useState({
    stylesId: "",
    stylesName: "",
    stylesImage: "",
    hide: false,
    delete: false,
    genderName: "",
    categoryName: "",
    subCategoryName: ""
  }); // change to id
  const [addNewItem, setAddNewItem] = useState(null);

  const closeModalHandler = () => {
    setAddNewItem(null);
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  useEffect(() => {
    genderId = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).genderId;
    genderName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).genderName;
    categoryId = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).categoryId;
    categoryName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).categoryName;
    subcategoryId = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).subcategoryId;
    subcategoryName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).subcategoryName;
    // get category & subcateogry from query param
    if (genderId !== undefined) {
      // get only categories specific to gender
      db.collection("gender")
        .doc(genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("subcategory")
        .doc(subcategoryId)
        .collection("styles")
        .where("delete", "==", false)
        .orderBy("timestamp", "desc")
        .get()
        .then((sub) => {
          if (sub.docs.length > 0) {
            // subcollection exists
            let list = [];
            sub.forEach((subDoc) => {
              list.push(subDoc.data());
            });
            setStylesList(list);
            setStyles(list[0]);
          } else {
            // subcollection not exists
            setStylesList("empty");
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log("cliked directly");
      // get gender, category from UI
      props.history.push(`${props.match.url}/createNewPattern/subcategory`);
      setStylesList("empty");
    }
  }, []);

  const viewHandler = (styleId, styleName) => {
    console.log("viewing patterns");
    props.history.push(
      `${props.match.url}/createNewPattern/patterns?genderId=${genderId}&genderName=${genderName}&categoryId=${categoryId}&categoryName=${categoryName}&subcategoryId=${subcategoryId}&subcategoryName=${subcategoryName}&styleId=${styleId}&styleName=${styleName}`
    );
  };

  const selectedStylesHandler = (style) => {
    setStyles(style);
  };

  const onChangeHandler = (event) => {
    // console.log(event.target.name);
    let value = null;
    if (event.target.name === "img") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    setNewData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value
      };
    });
  };

  const changeNameHandler = (styleId, newName) => {
    ref.current.continuousStart();
    console.log("subcategory name updated", genderId);
    db.collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles")
      .doc(styleId)
      .update({
        styleName: newName
      })
      .then(() => {
        console.log(newName + " successfully updated!!!");
        db.collection("gender")
          .doc(genderId)
          .collection("mainProduct")
          .doc("categories")
          .collection("category")
          .doc(categoryId)
          .collection("subcategory")
          .doc(subcategoryId)
          .collection("styles")
          .where("delete", "==", false)
          .orderBy("timestamp", "desc")
          .get()
          .then((data) => {
            let list = [];
            data.forEach((doc) => {
              list.push(doc.data());
            });
            ref.current.complete(); // linear loader to complete
            setStylesList(list);
            setStyles(list.find((l) => l.styleId === styleId));
            // console.log(list.find((l) => l.categoryId === categoryId));
          });
      })
      .catch((e) => console.log(e));
  };
  const changeImageHandler = (styleId, newImage) => {
    ref.current.continuousStart();
    // casual shirt
    // https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1623937713452.jpg?alt=media&token=14291831-385d-4bdb-ab44-297aa0883fa9
    let bucketName = "images";
    let img = newImage;
    let storageRef = firebase.storage().ref();
    let imgRef = storageRef.child(`${bucketName}/${img.name}`);
    imgRef
      .put(img)
      .then((snapshot) => {
        // console.log(snapshot);
        imgRef.getDownloadURL().then((imgUrl) => {
          // now adding the data to firestore
          db.collection("gender")
            .doc(genderId)
            .collection("mainProduct")
            .doc("categories")
            .collection("category")
            .doc(categoryId)
            .collection("subcategory")
            .doc(subcategoryId)
            .collection("styles")
            .doc(styleId)
            .update({
              styleImage: imgUrl // post this url first to storage
            })
            .then(() => {
              console.log("Image Updated");
              // then set the state again to reload and render it again
              db.collection("gender")
                .doc(genderId)
                .collection("mainProduct")
                .doc("categories")
                .collection("category")
                .doc(categoryId)
                .collection("subcategory")
                .doc(subcategoryId)
                .collection("styles")
                .where("delete", "==", false)
                .orderBy("timestamp", "desc")
                .get()
                .then((data) => {
                  let list = [];
                  data.forEach((doc) => {
                    list.push(doc.data());
                  });
                  ref.current.complete(); // linear loader to complete
                  setStylesList(list);
                  setStyles(list.find((l) => l.styleId === styleId));
                });
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // updating image or name
  const changeSubmitHandler = () => {
    // console.log(newName, newImage);
    // update the changes in firebase
    // db.collection("gender").doc(category.genderName).collection("category");
    if (newData.img !== null && newData.name === "") {
      changeImageHandler(styles.styleId, newData.img);
    } else {
      changeNameHandler(styles.styleId, newData.name);
    }
    setNewData({
      name: "",
      img: null
    });
    setIsChange(false);
  };

  const deleteStyleHandler = (styleId) => {
    ref.current.continuousStart();
    let styleDet = stylesList.find((g) => {
      return g.styleId === styleId;
    });
    console.log("subcategory name updated", genderId);
    db.collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles")
      .doc(styleId)
      .update({
        delete: true
      })
      .then(() => {
        // genderRef.update({
        //   noOfStyle: firebase.firestore.FieldValue.decrement(1)
        // });
        // // category - no_of_subcategories - increment
        // categoryRef.update({
        //   noOfStyle: firebase.firestore.FieldValue.decrement(1)
        // });
        // subcategoryRef.update({
        //   noOfStyle: firebase.firestore.FieldValue.increment(1)
        // });
        // add data to deleteItems collections
        let id = generateId("deleted");
        db.collection("deleteItems")
          .doc(id)
          .set({
            id: id,
            genderId: genderId,
            genderName: genderName,
            genderImg: "",
            categoryId: categoryId,
            categoryName: categoryName,
            categoryImg: "",
            subcategoryId: subcategoryId,
            subcategoryName: subcategoryName,
            subcategoryImg: "",
            styleId: styleDet.styleId,
            styleName: styleDet.styleName,
            styleImg: styleDet.styleImage,
            patternId: "",
            patternName: "",
            patternImg: ""
          })
          .then(() => {
            // decrement code
            console.log(" successfully deleted!!!");
            db.collection("gender")
              .doc(genderId)
              .collection("mainProduct")
              .doc("categories")
              .collection("category")
              .doc(categoryId)
              .collection("subcategory")
              .doc(subcategoryId)
              .collection("styles")
              .where("delete", "==", false)
              .orderBy("timestamp", "desc")
              .get()
              .then((data) => {
                let list = [];
                data.forEach((doc) => {
                  list.push(doc.data());
                });
                ref.current.complete(); // linear loader to complete
                if (list.length > 0) {
                  setStylesList(list);
                  setStyles(list[0]);
                } else {
                  setStyles("subcollection_empty");
                }
                setIsDelete(null);
                // console.log(list.find((l) => l.categoryId === categoryId));
              });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const addNewHandler = (value) => {
    // props.addNewStyles();
    if (value === "styles") {
      setAddNewItem("styles");
    } else {
      // styles
      setAddNewItem("patterns");
    }
  };
  let genderRef;
  let categoryRef;
  let subcategoryRef;
  let styleRef;
  const draftHandler = (newData) => {
    console.log("style adding...");
    let styleId = generateId("styles");
     genderRef = db.collection("gender").doc(genderId);
     categoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId);
    subcategoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId);
    styleRef = db
      .collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles")
      .doc(styleId);
    let bucketName = "images";
    let storageRef = firebase.storage().ref();
    console.log("draft handler in styles", newData);
    let styleTimestamp = null;
    if (newData.name !== "" && newData.img !== null) {
      ref.current.continuousStart();
      styleTimestamp = firebase.firestore.FieldValue.serverTimestamp();
      let styleImgRef = storageRef.child(`${bucketName}/${styleTimestamp}`);
      styleImgRef.put(newData.img).then((snapshot) => {
        styleImgRef.getDownloadURL().then((styleImg) => {
          styleRef
            .set({
              genderId: genderId,
              categoryId: categoryId,
              subcategoryId: subcategoryId,
              styleId: styleId, // genderate new category id
              styleName: newData.name,
              styleImage: styleImg,
              delete: false,
              hide: true,
              timestamp: styleTimestamp
            })
            .then(() => {
              // gender - no_of_subcategories increment
              genderRef.update({
                noOfStyle: firebase.firestore.FieldValue.increment(1)
              });
              // category - no_of_subcategories - increment
              categoryRef.update({
                noOfStyle: firebase.firestore.FieldValue.increment(1)
              });
              subcategoryRef.update({
                noOfStyle: firebase.firestore.FieldValue.increment(1)
              });
              let list = [];
              subcategoryRef
                .collection("styles")
                .where("delete", "==", false)
                .orderBy("timestamp", "desc")
                .get()
                .then((data) => {
                  data.forEach((doc) => {
                    list.push(doc.data());
                  });
                  ref.current.complete(); // linear loader to complete
                  closeModalHandler();
                  setStylesList(list);
                  setStyles(list[0]);
                });
            });
        });
      });
    }
  };

  const hideHandler = (e) => {
    console.log(e.target.checked);
    ref.current.continuousStart();
    // console.log(document.getElementById("toggle").checked);
    let styleRef = db
      .collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles");
    let list = [];
    if (e.target.checked) {
      // true - show or hide(false)
      styleRef
        .doc(styles.stylesId)
        .update({
          hide: true
        })
        .then(() => {
          // console.log("hide-false");
          list = [];
          styleRef
            .where("delete", "==", false)
            .orderBy("timestamp", "desc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                list.push(doc.data());
              });
              ref.current.complete(); // linear loader to complete
              setStylesList(list);
              setStyles(list[0]);
            });
        })
        .catch((e) => console.log(e));
      // console.log();
    } else {
      // false - hide(true)
      styleRef
        .doc(styles.stylesId)
        .update({
          hide: false
        })
        .then(() => {
          // console.log("hide-true");
          list = [];
          styleRef
            .where("delete", "==", false)
            .orderBy("timestamp", "desc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                list.push(doc.data());
              });
              ref.current.complete(); // linear loader to complete
              setStylesList(list);
              setStyles(list[0]);
            });
        })
        .catch((e) => console.log(e));
    }
  };

  let style = null;
  if (stylesList === null) {
    style = <Spinner />;
  } else if (stylesList === "empty") {
    style = <h1>No styles available</h1>;
  } else if (stylesList === "subcollection_empty") {
    style = <h1>No subcollection available</h1>;
  } else {
    style = (
      <>
        <Info stylesList={stylesList} selectedStyles={selectedStylesHandler} />
        <InfoBox
          title="Styles"
          genderName={genderName}
          categoryName={categoryName}
          subcategoryName={subcategoryName}
          stylesDetails={styles}
          view={viewHandler}
          addNew={addNewHandler}
          // addNew={() => setAddNewItem("styles")}
          changeName={() => setIsChange("name")}
          changeImage={() => setIsChange("image")}
          goBack={goBackHandler}
          deleteHandler={(id) => setIsDelete(id)}
          hide={hideHandler}
        />
      </>
    );
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {ReactDOM.createPortal(
        <LoadingBar color="#FF0000" ref={ref} />,
        document.getElementById("linear-loader")
      )}
      {addNewItem && (
        <AddNewStyle
          closeModal={closeModalHandler}
          title={addNewItem}
          saveAsDraft={draftHandler}
          newData={newData}
          onChange={onChangeHandler}
        />
      )}
      {isChange && (
        <ChangeModal
          title={isChange}
          submit={changeSubmitHandler}
          onChange={onChangeHandler}
          newName={newData.name}
          closeModal={() => {
            setIsChange(null);
            setNewData({
              name: "",
              img: null
            });
          }}
        />
      )}
      {isDelete && (
        <DeleteConfirmModal
          showModal={() => setIsDelete(true)}
          handleClose={() => setIsDelete(false)}
          deleteId={isDelete}
          confirmDelete={deleteStyleHandler}
        />
      )}
      {style}
    </div>
  );
};

export default Styles;
