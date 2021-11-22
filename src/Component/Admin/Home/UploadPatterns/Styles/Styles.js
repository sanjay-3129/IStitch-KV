import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Info from "./Info";
import InfoBox from "./InfoBox";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import qs from "qs";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";
// import NewStyleModal from "../../../../UI/AddNewModal/NewStyleModal.js";
import LoadingBar from "react-top-loading-bar";
import AddNewStyle from "../../../../UI/AddNewModal/AddNewStyle";
import Suggestion from "../../../../UI/AddNewModal/Suggestions";
import SuggestionsUpdate from "../../../../UI/AddNewModal/SuggestionsUpdate";
// import NewStyleModal from "../../../../UI/AddNewModal/NewStyleModal";
import DeleteConfirmModal from "../../../../UI/DeleteConfirmModal/DeleteConfirmModal";
import generateId from "../../../../../Helpers/generateId";
import AddNewPattern from "../../../../UI/AddNewModal/AddNewPattern";
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
  const [newModal, setNewModal] = useState(false);
  const [type, setType] = useState("mainProduct"); // mainProduct or addOns
  const [newData, setNewData] = useState({
    name: "",
    img: null,
    price: 0
  });
  const [styles, setStyles] = useState({
    styleId: "",
    styleName: "",
    styleImage: "",
    hide: false,
    delete: false,
    genderId: "",
    categoryId: "",
    subCategoryId: "",
    noOfPatterns: 0,
    relations: []
  }); // change to id
  const [addNewItem, setAddNewItem] = useState(null);
  const [length, setLength] = useState(0);
  const [lastDoc, setLastDoc] = useState(null);

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
        .collection(type)
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("subcategory")
        .doc(subcategoryId)
        .collection("styles")
        .where("delete", "==", false)
        // .orderBy("timestamp", "desc")
        .limit(16)
        .get()
        .then((sub) => {
          if (sub.docs.length > 0) {
            let lastVisible = sub.docs[sub.docs.length - 1];
            setLastDoc(lastVisible);
            // subcollection exists
            let list = [];
            sub.forEach((subDoc) => {
              list.push(subDoc.data());
            });
            list = list.sort(function (a, b) {
              return a.styleName.localeCompare(b.styleName, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });
            setStylesList(list);
            setStyles(list[0]);
            setLength(sub.size);
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
    // console.log("line 121", style);
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
    let styleRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles")
      .doc(styleId);
    ref.current.continuousStart();
    console.log("subcategory name updated", genderId);
    styleRef
      .update({
        styleName: newName
      })
      .then(() => {
        console.log(newName + " successfully updated!!!");
        styleRef.get().then((data) => {
          let doc = data.data();
          let list = [...stylesList];
          let index = list.findIndex((l) => l.styleId === styleId);
          list[index] = doc;
          list = list.sort(function (a, b) {
            return a.styleName.localeCompare(b.styleName, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
          setStylesList(list);
          setStyles(doc);
          ref.current.complete(); // linear loader to complete
        });
      })
      .catch((e) => console.log(e));
  };
  const changeImageHandler = (styleId, newImage) => {
    ref.current.continuousStart();
    let styleRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles")
      .doc(styleId);
    // casual shirt
    // https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1623937713452.jpg?alt=media&token=14291831-385d-4bdb-ab44-297aa0883fa9
    let bucketName = "styles";
    let img = newImage;
    let storageRef = firebase.storage().ref();
    let styleTimestamp = +new Date().getTime() + "-" + newData.img.name;
    let imgRef = storageRef.child(`${bucketName}/${styleTimestamp}`);
    imgRef
      .put(img)
      .then((snapshot) => {
        // console.log(snapshot);
        imgRef.getDownloadURL().then((imgUrl) => {
          // now adding the data to firestore
          styleRef
            .update({
              styleImage: imgUrl // post this url first to storage
            })
            .then(() => {
              console.log("Image Updated");
              firebase
                .storage()
                .refFromURL(styles.styleImage)
                .delete()
                .then(() =>
                  console.log("image deleted successfullty, Styles.js[252]")
                );
              // then set the state again to reload and render it again
              styleRef.get().then((data) => {
                let doc = data.data();
                let list = [...stylesList];
                let index = list.findIndex((l) => l.styleId === styleId);
                list[index] = doc;
                list = list.sort(function (a, b) {
                  return a.styleName.localeCompare(b.styleName, undefined, {
                    numeric: true,
                    sensitivity: "base"
                  });
                });
                setStylesList(list);
                setStyles(doc);
                ref.current.complete(); // linear loader to complete
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
    let genderRef = db.collection("gender").doc(genderId);
    let categoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId);
    let subcategoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId);
    let styleRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles")
      .doc(styleId);

    // add data to deleteItems collections
    let id = generateId("deleted");
    let item = {
      id: id,
      type: type,
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
    };
    db.collection("deleteItems")
      .doc("deletedItems")
      .update({
        items: firebase.firestore.FieldValue.arrayUnion(item)
      })
      .then(() => {
        styleRef
          .update({
            delete: true
          })
          .then(() => {
            // check logic
            // if (styles.noOfPatterns > 0) {
            genderRef.update({
              noOfStyles: firebase.firestore.FieldValue.increment(-1),
              noOfPatterns: firebase.firestore.FieldValue.increment(
                -styles.noOfPatterns
              )
            });
            // category - no_of_subcategories - increment
            categoryRef.update({
              noOfStyles: firebase.firestore.FieldValue.increment(-1),
              noOfPatterns: firebase.firestore.FieldValue.increment(
                -styles.noOfPatterns
              )
            });
            subcategoryRef.update({
              noOfStyles: firebase.firestore.FieldValue.increment(-1),
              noOfPatterns: firebase.firestore.FieldValue.increment(
                -styles.noOfPatterns
              )
            });
            // styleRef.update({}); - it is deleted, its not gonna show noOfPatterns and its fine
            // } else {
            //   genderRef.update({
            //     noOfStyles: firebase.firestore.FieldValue.increment(-1)
            //   });
            //   // category - no_of_subcategories - increment
            //   categoryRef.update({
            //     noOfStyles: firebase.firestore.FieldValue.increment(-1)
            //   });
            //   subcategoryRef.update({
            //     noOfStyles: firebase.firestore.FieldValue.increment(-1)
            //   });
            // }

            // decrement code
            console.log(" successfully deleted!!!");
            db.collection("gender")
              .doc(genderId)
              .collection(type)
              .doc("categories")
              .collection("category")
              .doc(categoryId)
              .collection("subcategory")
              .doc(subcategoryId)
              .collection("styles")
              .where("delete", "==", false)
              // .orderBy("timestamp", "desc")
              .get()
              .then((data) => {
                let list = [];
                data.forEach((doc) => {
                  list.push(doc.data());
                });
                let lastVisible = data.docs[data.docs.length - 1];
                setLastDoc(lastVisible);
                ref.current.complete(); // linear loader to complete
                if (list.length > 0) {
                  list = list.sort(function (a, b) {
                    return a.styleName.localeCompare(b.styleName, undefined, {
                      numeric: true,
                      sensitivity: "base"
                    });
                  });
                  setStylesList(list);
                  setStyles(list[0]);
                  setLength(data.size);
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
    } else if (value === "stylesUpdate") {
      setAddNewItem("stylesUpdate");
    } else {
      // styles
      setAddNewItem("patterns");
    }
  };

  const updateHandler = (oldRelations, newRelations, deleteRelations) => {
    // console.log(
    //   "old",
    //   oldRelations,
    //   "new",
    //   newRelations,
    //   "delete",
    //   deleteRelations
    // );
    // try with arrayRemove, it worked well for objects in MyBin.js
    // deleting current style from the other relations
    deleteRelations.forEach((rel) => {
      let relList = [];
      rel.ref.get().then((doc) => {
        relList = doc.data().relations;
        // console.log("relList", relList);
        let filteredList = relList.filter((s) => s.styleId !== styles.styleId); // current style will be removed
        // console.log("filteredList", filteredList);
        rel.ref
          .update({
            relations: filteredList
          })
          .then(() => console.log("successfullty update"))
          .catch((e) => console.log("delteRelations", e));
      });
    });

    let styleRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles")
      .doc(styles.styleId);

    let sty = {
      genderId: genderId,
      categoryId: categoryId,
      subcategoryId: subcategoryId,
      styleId: styles.styleId,
      type: "mainProduct",
      ref: styleRef
      // delete: false
    };
    // current style add updated relations
    styleRef
      .update({
        relations: [...oldRelations, ...newRelations]
      })
      .then(() => {
        console.log("successfully updated!!!");
        newRelations.forEach((rel) => {
          // adding current style to the relation style's as a relation
          rel.ref.update({
            relations: firebase.firestore.FieldValue.arrayUnion(sty)
          });
          // .then(() => console.log("success in styles..."));
        });
      });
    closeModalHandler();
    styleRef.get().then((doc) => {
      setStyles(doc.data());
    });
  };

  const draftHandler = (relations) => {
    console.log("style adding...", relations);
    let styleId = generateId("styles");
    let genderRef = db.collection("gender").doc(genderId);
    let categoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId);
    let subcategoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId);
    let styleRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles")
      .doc(styleId);
    let bucketName = "styles";
    let storageRef = firebase.storage().ref();
    // console.log("draft handler in styles", newData);
    // console.log("draft handler in styles", relations);
    let relList = [...relations];

    let styleTimestamp = null;
    if (newData.name !== "" && newData.img !== null) {
      ref.current.continuousStart();
      styleTimestamp = +new Date().getTime() + "-" + newData.name;
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
              noOfPatterns: 0,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              relations: [...relList] // copy totally and put into type
            })
            .then(() => {
              closeModalHandler();
              // relations
              let sty = {
                genderId: genderId,
                categoryId: categoryId,
                subcategoryId: subcategoryId,
                styleId: styleId,
                type: "mainProduct",
                ref: styleRef
                // delete: false
              };

              // gender - no_of_subcategories increment
              genderRef.update({
                noOfStyles: firebase.firestore.FieldValue.increment(1)
              });
              // category - no_of_subcategories - increment
              categoryRef.update({
                noOfStyles: firebase.firestore.FieldValue.increment(1)
              });
              subcategoryRef
                .update({
                  noOfStyles: firebase.firestore.FieldValue.increment(1)
                })
                .then(() => {
                  relList.forEach((rel) => {
                    rel.ref.update({
                      relations: firebase.firestore.FieldValue.arrayUnion(sty)
                    });
                    // .then(() => console.log("success in styles..."));
                  });
                });
              let list = [];
              subcategoryRef
                .collection("styles")
                .where("delete", "==", false)
                // .orderBy("timestamp", "desc")
                .get()
                .then((data) => {
                  data.forEach((doc) => {
                    list.push(doc.data());
                  });
                  let lastVisible = data.docs[data.docs.length - 1];
                  setLastDoc(lastVisible);
                  ref.current.complete(); // linear loader to complete
                  list = list.sort(function (a, b) {
                    return a.styleName.localeCompare(b.styleName, undefined, {
                      numeric: true,
                      sensitivity: "base"
                    });
                  });
                  setStylesList(list);
                  setStyles(list[0]);
                  setLength(data.size);
                });
            });
        });
      });
    }
  };

  const draftPatternHandler = (newData) => {
    console.log(newData);
    // console.log(categoryId, subcategoryId, styles.styleId);
    if (newData.name !== "" && newData.img !== null && newData.price !== 0) {
      ref.current.continuousStart();
      let patternId = generateId("patterns");
      let bucketName = "patterns";
      let storageRef = firebase.storage().ref();
      let genderRef = db.collection("gender").doc(genderId);
      let categoryRef = db
        .collection("gender")
        .doc(genderId)
        .collection(type)
        .doc("categories")
        .collection("category")
        .doc(categoryId);
      let subcategoryRef = db
        .collection("gender")
        .doc(genderId)
        .collection(type)
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("subcategory")
        .doc(subcategoryId);
      let styleRef = db
        .collection("gender")
        .doc(genderId)
        .collection(type)
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("subcategory")
        .doc(subcategoryId)
        .collection("styles")
        .doc(styles.styleId);
      let patternRef = db
        .collection("gender")
        .doc(genderId)
        .collection(type)
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("subcategory")
        .doc(subcategoryId)
        .collection("styles")
        .doc(styles.styleId)
        .collection("patterns")
        .doc(patternId);
      let patternTimestamp = +new Date().getTime() + "-" + newData.img.name;
      let patternImgRef = storageRef.child(`${bucketName}/${patternTimestamp}`);
      patternImgRef.put(newData.img).then(() => {
        patternImgRef.getDownloadURL().then((patternImg) => {
          patternRef
            .set({
              genderId: genderId,
              categoryId: categoryId,
              subcategoryId: subcategoryId,
              styleId: styles.styleId, // genderate new category id
              patternId: patternId, // genderate new category id
              patternName: newData.name,
              patternImage: patternImg,
              delete: false,
              hide: true,
              price: parseInt(newData.price),
              noOfPatterns: 0,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
              db.collection("patterns")
                .doc(patternId)
                .set({
                  type: type,
                  genderId: genderId,
                  categoryId: categoryId,
                  subcategoryId: subcategoryId,
                  styleId: styles.styleId,
                  genderName: genderName,
                  categoryName: categoryName,
                  subcategoryName: subcategoryName,
                  styleName: styles.styleName,
                  patternId: patternId, // genderate new pattern id
                  patternName: newData.name,
                  patternImage: patternImg,
                  delete: false,
                  hide: true,
                  price: parseInt(newData.price), // get input and make it as dynamic
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
              // gender - no_of_categories increment
              genderRef.update({
                noOfPatterns: firebase.firestore.FieldValue.increment(1)
              });
              // category - no_of_subcategories - increment
              categoryRef.update({
                noOfPatterns: firebase.firestore.FieldValue.increment(1)
              });
              subcategoryRef.update({
                noOfPatterns: firebase.firestore.FieldValue.increment(1)
              });
              styleRef.update({
                noOfPatterns: firebase.firestore.FieldValue.increment(1)
              });
              ref.current.complete();
              setNewModal(false);
              props.history.push(
                `${props.match.url}/createNewPattern/patterns?genderId=${genderId}&genderName=${genderName}&categoryId=${categoryId}&categoryName=${categoryName}&subcategoryId=${subcategoryId}&subcategoryName=${subcategoryName}&styleId=${styles.styleId}&styleName=${styles.styleName}`
              );
            });
        });
      });
    } else {
      console.log("if");
      alert(
        "Enter pattern name,Enter pattern price and select the pattern image"
      );
    }
  };

  const hideHandler = (e) => {
    console.log(e.target.checked);
    ref.current.continuousStart();
    // console.log(document.getElementById("toggle").checked);
    let styleRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
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
        .doc(styles.styleId)
        .update({
          hide: true
        })
        .then(() => {
          // console.log("hide-false");
          list = [];
          styleRef
            .doc(styles.styleId)
            .get()
            .then((data) => {
              let doc = data.data();
              let list = [...stylesList];
              let index = list.findIndex((l) => l.styleId === styles.styleId);
              list[index] = doc;
              list = list.sort(function (a, b) {
                return a.styleName.localeCompare(b.styleName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });
              setStylesList(list);
              setStyles(doc);
              ref.current.complete(); // linear loader to complete
            });
        })
        .catch((e) => console.log(e));
      // console.log();
    } else {
      // false - hide(true)
      styleRef
        .doc(styles.styleId)
        .update({
          hide: false
        })
        .then(() => {
          // console.log("hide-true");
          list = [];
          styleRef
            .where("delete", "==", false)
            // .orderBy("timestamp", "desc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                list.push(doc.data());
              });
              ref.current.complete(); // linear loader to complete
              list = list.sort(function (a, b) {
                return a.styleName.localeCompare(b.styleName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });
              setStylesList(list);
              setStyles(list[0]);
            });
        })
        .catch((e) => console.log(e));
    }
  };

  const selectedType = (type) => {
    console.log("styles.js", type);
    let list = [];
    db.collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .collection("styles")
      .where("delete", "==", false)
      // .orderBy("timestamp", "desc")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        ref.current.complete(); // linear loader to complete
        setType(type);
        if (list.length === 0) {
          setStylesList("subcollection_empty");
        } else {
          list = list.sort(function (a, b) {
            return a.styleName.localeCompare(b.styleName, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
          setStylesList(list);
          setStyles(list[0]);
        }
      });
  };

  const onScrollHandler = () => {
    console.log("onScrollHandler", length);
    if (length > 0) {
      ref.current.continuousStart();
      db.collection("gender")
        .doc(genderId)
        .collection(type)
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("subcategory")
        .doc(subcategoryId)
        .collection("styles")
        .where("delete", "==", false)
        // .orderBy("timestamp", "desc")
        .startAfter(lastDoc) // cursor for pagination
        .limit(8)
        .get()
        .then((sub) => {
          let lastVisible = sub.docs[sub.docs.length - 1];
          setLastDoc(lastVisible);

          let list = [...stylesList];
          sub.forEach((doc) => {
            list.push(doc.data());
          });
          ref.current.complete(); // linear loader to complete

          // append data to bottom page
          // $("#content").append(`<p>hi</p>`);
          // $("#content").animate({ scrollTop: $("#content").height() }, 1000);
          list = list.sort(function (a, b) {
            return a.styleName.localeCompare(b.styleName, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
          setStylesList(list);
          setStyles(list[0]);
          setLength(sub.size);
        });
      // $("#content").append(`<p>hi</p>`);
      // $("#content").animate({ scrollTop: $("#content").height() }, 1000);
    } else {
      console.log("no data to append");
    }
  };

  let style = null;
  if (stylesList === null) {
    style = <Spinner />;
  } else if (stylesList === "empty") {
    style = <h1>No styles available</h1>;
  } else if (stylesList === "subcollection_empty") {
    style = (
      <>
        <h1>No subcollection available</h1>
        <button
          className="btn btn-primary"
          type="button"
          onClick={goBackHandler}
        >
          Go Back
        </button>
      </>
    );
  } else {
    if (addNewItem === "styles") {
      style = (
        // <NewStyleModal
        //   closeModal={closeModalHandler}
        //   title={addNewItem}
        //   saveAsDraft={draftHandler}
        //   newData={newData}
        //   onChange={onChangeHandler}
        //   style={styles}
        //   type={type}
        //   goBack={goBackHandler}
        // />
        <Suggestion
          closeModal={closeModalHandler}
          title={addNewItem}
          saveAsDraft={draftHandler}
          newData={newData}
          onChange={onChangeHandler}
          style={styles}
          type={type}
          goBack={goBackHandler}
        />
      );
    } else if (addNewItem === "stylesUpdate") {
      style = (
        <SuggestionsUpdate
          closeModal={closeModalHandler}
          title={addNewItem}
          saveAsDraft={updateHandler}
          newData={newData}
          onChange={onChangeHandler}
          style={styles}
          type={type}
          goBack={goBackHandler}
        />
      );
    } else {
      style = (
        <>
          <Info
            stylesList={stylesList}
            selectedStyles={selectedStylesHandler}
            selectedType={selectedType}
            type={type}
            onScroll={onScrollHandler}
            length={length}
          />
          <InfoBox
            title="Styles"
            genderName={genderName}
            categoryName={categoryName}
            subcategoryName={subcategoryName}
            stylesDetails={styles}
            view={viewHandler}
            addNew={addNewHandler}
            // addNew={() => setAddNewItem("styles")}
            addNewPatterns={() => setNewModal("Patterns")}
            changeName={() => setIsChange("name")}
            changeImage={() => setIsChange("image")}
            goBack={goBackHandler}
            deleteHandler={(id) => setIsDelete(id)}
            hide={hideHandler}
          />
        </>
      );
    }
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {ReactDOM.createPortal(
        <LoadingBar color="#FF0000" ref={ref} />,
        document.getElementById("linear-loader")
      )}
      {/* {addNewItem && (
        <AddNewStyle
          closeModal={closeModalHandler}
          title={addNewItem}
          saveAsDraft={draftHandler}
          newData={newData}
          onChange={onChangeHandler}
        />
      )} */}
      {/* newStyle with sugesqstions */}
      {/* {addNewItem && (
        <NewStyleModal
          closeModal={closeModalHandler}
          title={addNewItem}
          saveAsDraft={draftHandler}
          newData={newData}
          onChange={onChangeHandler}
        />
      )} */}
      {/* new pattern */}
      {newModal && (
        <AddNewPattern
          title={newModal}
          newData={newData}
          closeModal={() => setNewModal(false)}
          onChange={onChangeHandler}
          saveAsDraft={draftPatternHandler}
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
