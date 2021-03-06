import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Patterns.css";
import $ from "jquery";
import Info from "./Info";
import InfoBox from "./InfoBox";
import Spinner from "../../../../UI/Spinner/Spinner";
import DeleteConfirmModal from "../../../../UI/DeleteConfirmModal/DeleteConfirmModal";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";
import AddNewPattern from "../../../../UI/AddNewModal/AddNewPattern";
import LoadingBar from "react-top-loading-bar";
import generateId from "../../../../../Helpers/generateId";
import firebase from "../../../../../Services/firebase/firebase";
import qs from "qs";
// import Category from "../Category/Category";

let genderId = undefined;
let genderName = undefined;
let categoryId = undefined;
let categoryName = undefined;
let subcategoryId = undefined;
let subcategoryName = undefined;
let styleId = undefined;
let styleName = undefined;
const db = firebase.firestore();

const Patterns = (props) => {
  const ref = useRef(null);
  const [patternsList, setPatternsList] = useState([]);
  const [isChange, setIsChange] = useState(null); // for modal
  const [isDelete, setIsDelete] = useState(null);
  const [newModal, setNewModal] = useState("");
  const [type, setType] = useState("mainProduct"); // mainProduct or addOns
  const [patterns, setPatterns] = useState({
    patternsId: "",
    patternsName: "",
    patternsImage: "",
    price: 0,
    hide: false,
    delete: false,
    genderId: "",
    categoryId: "",
    subCategoryId: "",
    styleId: ""
  });
  const [showPattern, setShowPattern] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    img: null,
    price: 0
  });
  const [length, setLength] = useState(0);
  const [lastDoc, setLastDoc] = useState(null);

  const goBackHandler = () => {
    props.history.goBack();
  };

  const getFile = () => {
    $("#uploadButton").on("click", function () {
      $("#img").click();
    });

    $("#img").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton").css(
          "background-image",
          'url("' + reader.result + '")'
        );
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
      }
    });
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
    // console.log("searchLoacation", props.location.search);
    categoryName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).categoryName;
    subcategoryId = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).subcategoryId;
    subcategoryName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).subcategoryName;
    styleId = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).styleId;
    styleName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).styleName;
    let types = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).type;

    if (genderId !== undefined) {
      // if(genderId -> styleId)
      if (
        genderId !== undefined &&
        categoryId !== undefined &&
        subcategoryId !== undefined &&
        styleId !== undefined &&
        types === undefined
      ) {
        // get only categories specific to gender
        // console.log("inside if");
        // console.log("---patterns.js useEffect", types);
        // console.log(genderId, categoryId); // for mainProduct, categoryId is normal
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
          .collection("patterns")
          .where("delete", "==", false)
          .limit(16)
          .get()
          .then((sub) => {
            if (sub.docs.length > 0) {
              // console.log("---------", sub.docs.length);
              // subcollection exists
              let list = [];
              sub.forEach((subDoc) => {
                list.push(subDoc.data());
              });
              // console.log("list", list);
              let lastVisible = sub.docs[sub.docs.length - 1];
              setLastDoc(lastVisible);

              list = list.sort(function (a, b) {
                return a.patternName.localeCompare(b.patternName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              setPatternsList(list);
              setPatterns(list[0]);
              setLength(sub.size);
              console.log("size", sub.size);
            } else {
              // subcollection not exists
              // new pattern form
              setPatternsList("form");
            }
          })
          .catch((e) => console.log(e));
      } else if (
        genderId !== undefined &&
        categoryId !== undefined &&
        types !== undefined
      ) {
        setType("addOns");
        console.log("pattypes", categoryId, subcategoryId, type, types);
        // if(genderId, categoryId)
        db.collection("gender")
          .doc(genderId)
          .collection("addOns")
          .doc("categories")
          .collection("category")
          .doc(categoryId)
          .collection("subcategory")
          .doc(subcategoryId)
          .collection("patterns")
          .where("delete", "==", false)
          .get()
          .then((sub) => {
            if (sub.docs.length > 0) {
              console.log("---------", sub.docs.length);
              // subcollection exists
              let list = [];
              let lastVisible = sub.docs[sub.docs.length - 1];
              setLastDoc(lastVisible);
              sub.forEach((subDoc) => {
                list.push(subDoc.data());
              });
              list = list.sort(function (a, b) {
                return a.patternName.localeCompare(b.patternName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });
              setPatternsList(list);
              setPatterns(list[0]);
              setLength(sub.size);
            } else {
              // subcollection not exists
              // new pattern form
              setPatternsList("form");
            }
          })
          .catch((e) => console.log(e));
      }
    } else {
      setShowPattern(true);
      console.log("cliked directly");
      db.collection("patterns")
        .where("delete", "==", false)
        .get()
        .then((data) => {
          let list = [];
          data.forEach((doc) => {
            list.push(doc.data());
          });
          let lastVisible = data.docs[data.docs.length - 1];
          setLastDoc(lastVisible);
          ref.current.complete(); // linear loader to complete
          // console.log("lengthhh", data.size);
          if (data.size > 0) {
            list = list.sort(function (a, b) {
              return a.patternName.localeCompare(b.patternName, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });
            setPatternsList(list);
            setPatterns(list[0]);
            setLength(data.size);
          } else {
            setPatternsList("empty_patterns");
          }
        })
        .catch((e) => console.log(e));

      // setPatternsList("empty");
    }
  }, []);

  const onChangeHandler = (event) => {
    console.log(event.target.name);
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

  const changeNameHandler = (patternId, newName) => {
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
      .doc(styleId)
      .collection("patterns")
      .doc(patternId);

    ref.current.continuousStart();
    if (type === "mainProduct") {
      console.log("subcategory name updated", genderId);
      patternRef
        .update({
          patternName: newName
        })
        .then(() => {
          console.log(newName + " successfully updated!!!");
          patternRef.get().then((data) => {
            // changing the name in patterns collection
            db.collection("patterns").doc(patterns.patternId).update({
              patternName: newName
            });
            let doc = data.data();
            let list = [...patternsList];
            let index = list.findIndex((l) => l.patternId === patternId);
            list[index] = doc;
            list = list.sort(function (a, b) {
              return a.patternName.localeCompare(b.patternName, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });
            setPatternsList(list);
            setPatterns(doc);
            ref.current.complete(); // linear loader to complete
          });
        })
        .catch((e) => console.log(e));
    } else {
      db.collection("gender")
        .doc(genderId)
        .collection("addOns")
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("patterns")
        .doc(patternId)
        .update({
          patternName: newName
        })
        .then(() => {
          console.log(newName + " successfully updated!!!");
          db.collection("gender")
            .doc(genderId)
            .collection("addOns")
            .doc("categories")
            .collection("category")
            .doc(categoryId)
            .collection("patterns")
            .doc(patternId)
            .get()
            .then((data) => {
              let doc = data.data();
              let list = [...patternsList];
              let index = list.findIndex((l) => l.patternId === patternId);
              list[index] = doc;
              list = list.sort(function (a, b) {
                return a.patternName.localeCompare(b.patternName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });
              setPatternsList(list);
              setPatterns(doc);
              ref.current.complete(); // linear loader to complete
            });
        })
        .catch((e) => console.log(e));
    }
  };

  const changePriceHandler = (patternId, newPrice) => {
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
      .doc(styleId)
      .collection("patterns")
      .doc(patternId);

    ref.current.continuousStart();
    if (type === "mainProduct") {
      console.log("subcategory name updated", genderId);
      patternRef
        .update({
          price: newPrice
        })
        .then(() => {
          console.log(newPrice + " successfully updated!!!");
          patternRef.get().then((data) => {
            // changing the name in patterns collection
            db.collection("patterns").doc(patterns.patternId).update({
              price: newPrice
            });
            let doc = data.data();
            console.log("doc.........", doc);

            let list = [...patternsList];
            let index = list.findIndex((l) => l.patternId === patternId);
            list[index] = doc;
            list = list.sort(function (a, b) {
              return a.patternName.localeCompare(b.patternName, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });
            setPatternsList(list);
            setPatterns(doc);
            ref.current.complete(); // linear loader to complete
          });
        })
        .catch((e) => console.log(e));
    } else {
      db.collection("gender")
        .doc(genderId)
        .collection("addOns")
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("patterns")
        .doc(patternId)
        .update({
          price: newPrice
        })
        .then(() => {
          console.log(newPrice + " successfully updated!!!");
          db.collection("gender")
            .doc(genderId)
            .collection("addOns")
            .doc("categories")
            .collection("category")
            .doc(categoryId)
            .collection("patterns")
            .doc(patternId)
            .get()
            .then((data) => {
              let doc = data.data();
              let list = [...patternsList];
              let index = list.findIndex((l) => l.patternId === patternId);
              list[index] = doc;
              list = list.sort(function (a, b) {
                return a.patternName.localeCompare(b.patternName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });
              setPatternsList(list);
              setPatterns(doc);
              ref.current.complete(); // linear loader to complete
            });
        })
        .catch((e) => console.log(e));
    }
  };

  const changeImageHandler = (patternId, newImage) => {
    ref.current.continuousStart();
    if (type === "mainProduct") {
      // casual shirt
      // https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1623937713452.jpg?alt=media&token=14291831-385d-4bdb-ab44-297aa0883fa9
      let bucketName = "patterns";
      let img = newImage;
      let storageRef = firebase.storage().ref();
      let patternTimstamp = +new Date().getTime() + "-" + newData.img.name;
      let imgRef = storageRef.child(`${bucketName}/${patternTimstamp}`);
      imgRef
        .put(img)
        .then((snapshot) => {
          // console.log(snapshot);
          imgRef.getDownloadURL().then((imgUrl) => {
            // now adding the data to firestore
            db.collection("gender")
              .doc(genderId)
              .collection(type)
              .doc("categories")
              .collection("category")
              .doc(categoryId)
              .collection("subcategory")
              .doc(subcategoryId)
              .collection("styles")
              .doc(styleId)
              .collection("patterns")
              .doc(patternId)
              .update({
                patternImage: imgUrl // post this url first to storage
              })
              .then(() => {
                console.log(patterns.patternImage);
                firebase
                  .storage()
                  .refFromURL(patterns.patternImage)
                  .delete()
                  .then(() =>
                    console.log("image deleted successfullty, Patterns.js[252]")
                  )
                  .catch((e) => console.log(e));
                console.log("Image Updated");
                // then set the state again to reload and render it again
                db.collection("gender")
                  .doc(genderId)
                  .collection(type)
                  .doc("categories")
                  .collection("category")
                  .doc(categoryId)
                  .collection("subcategory")
                  .doc(subcategoryId)
                  .collection("styles")
                  .doc(styleId)
                  .collection("patterns")
                  .doc(patternId)
                  .get()
                  .then((data) => {
                    db.collection("patterns").doc(patterns.patternId).update({
                      patternImage: imgUrl
                    });

                    let doc = data.data();
                    let list = [...patternsList];
                    let index = list.findIndex(
                      (l) => l.patternId === patternId
                    );
                    list[index] = doc;
                    list = list.sort(function (a, b) {
                      return a.patternName.localeCompare(
                        b.patternName,
                        undefined,
                        {
                          numeric: true,
                          sensitivity: "base"
                        }
                      );
                    });
                    setPatternsList(list);
                    setPatterns(doc);
                    ref.current.complete(); // linear loader to complete
                  });
              });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      let bucketName = "patterns";
      let img = newImage;
      let storageRef = firebase.storage().ref();
      let patternTimstamp = +new Date().getTime() + "-" + newData.img.name;
      let imgRef = storageRef.child(`${bucketName}/${patternTimstamp}`);
      imgRef
        .put(img)
        .then((snapshot) => {
          // console.log(snapshot);
          imgRef.getDownloadURL().then((imgUrl) => {
            // now adding the data to firestore
            db.collection("gender")
              .doc(genderId)
              .collection("addOns")
              .doc("categories")
              .collection("category")
              .doc(categoryId)
              .collection("patterns")
              .doc(patternId)
              .update({
                patternImage: imgUrl // post this url first to storage
              })
              .then(() => {
                console.log("Image Updated");
                firebase
                  .storage()
                  .refFromURL(patterns.patternImage)
                  .delete()
                  .then(() =>
                    console.log("image deleted successfullty, Patterns.js[252]")
                  )
                  .catch((e) => console.log(e));
                // then set the state again to reload and render it again
                db.collection("gender")
                  .doc(genderId)
                  .collection("addOns")
                  .doc("categories")
                  .collection("category")
                  .doc(categoryId)
                  .collection("patterns")
                  .doc(patternId)
                  .get()
                  .then((data) => {
                    let doc = data.data();
                    let list = [...patternsList];
                    let index = list.findIndex(
                      (l) => l.patternId === patternId
                    );
                    list[index] = doc;
                    list = list.sort(function (a, b) {
                      return a.patternName.localeCompare(
                        b.patternName,
                        undefined,
                        {
                          numeric: true,
                          sensitivity: "base"
                        }
                      );
                    });
                    setPatternsList(list);
                    setPatterns(doc);
                    ref.current.complete(); // linear loader to complete
                  });
              });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const changeSubmitHandler = () => {
    setIsChange(false);
    // console.log(newName, newImage);
    // update the changes in firebase
    // db.collection("gender").doc(category.genderName).collection("category");
    console.log("newData", newData);
    if (newData.img !== null && newData.name === "" && newData.price === 0) {
      changeImageHandler(patterns.patternId, newData.img);
    } else if (
      newData.img === null &&
      newData.name !== "" &&
      newData.price === 0
    ) {
      changeNameHandler(patterns.patternId, newData.name);
    } else {
      // console.log("price", newData.price, parseInt(newData.price));
      changePriceHandler(patterns.patternId, parseInt(newData.price));
    }
    setNewData({
      name: "",
      img: null,
      price: 0
    });
  };

  const deletePatternHandler = (patternId) => {
    if (type === "mainProduct") {
      ref.current.continuousStart();
      let patternDet = patternsList.find((g) => {
        return g.patternId === patternId;
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

      // console.log("subcategory name updated", genderId);
      styleRef
        .collection("patterns")
        .doc(patternId)
        .update({
          delete: true
        })
        .then(() => {
          // adding
          db.collection("patterns").doc(patternId).update({
            delete: true
          });
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
            styleId: styleId,
            styleName: styleName,
            styleImg: "",
            patternId: patternDet.patternId,
            patternName: patternDet.patternName,
            patternImg: patternDet.patternImage
          };
          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: firebase.firestore.FieldValue.arrayUnion(item)
            })
            .then(() => {
              genderRef.update({
                noOfPatterns: firebase.firestore.FieldValue.increment(-1)
              });
              // category - no_of_subcategories - increment
              categoryRef.update({
                noOfPatterns: firebase.firestore.FieldValue.increment(-1)
              });
              subcategoryRef.update({
                noOfPatterns: firebase.firestore.FieldValue.increment(-1)
              });
              styleRef.update({
                noOfPatterns: firebase.firestore.FieldValue.increment(-1)
              });
              // console.log(" successfully deleted!!!");
              db.collection("gender")
                .doc(genderId)
                .collection(type)
                .doc("categories")
                .collection("category")
                .doc(categoryId)
                .collection("subcategory")
                .doc(subcategoryId)
                .collection("styles")
                .doc(styleId)
                .collection("patterns")
                .where("delete", "==", false)
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
                      return a.patternName.localeCompare(
                        b.patternName,
                        undefined,
                        {
                          numeric: true,
                          sensitivity: "base"
                        }
                      );
                    });
                    setPatternsList(list);
                    setPatterns(list[0]);
                    setLength(data.size);
                  } else {
                    setPatternsList("subcollection_empty");
                    goBackHandler(); // if no pattern is available
                  }
                  setIsDelete(null);
                  // console.log(list.find((l) => l.categoryId === categoryId));
                });
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    } else {
      let patternDet = patternsList.find((g) => {
        return g.patternId === patternId;
      });

      db.collection("gender")
        .doc(genderId)
        .collection("addOns")
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("patterns")
        .doc(patternId)
        .update({
          delete: true
        })
        .then(() => {
          // adding
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
            patternId: patternDet.patternId,
            patternName: patternDet.patternName,
            patternImg: patternDet.patternImage
          };
          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: firebase.firestore.FieldValue.arrayUnion(item)
            })
            .then(() => {
              // categoryRef.update({
              //   noOfPatterns: firebase.firestore.FieldValue.increment(-1)
              // });

              // console.log(" successfully deleted!!!");
              db.collection("gender")
                .doc(genderId)
                .collection("addOns")
                .doc("categories")
                .collection("category")
                .doc(categoryId)
                .collection("patterns")
                .where("delete", "==", false)
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
                      return a.patternName.localeCompare(
                        b.patternName,
                        undefined,
                        {
                          numeric: true,
                          sensitivity: "base"
                        }
                      );
                    });
                    setPatternsList(list);
                    setPatterns(list[0]);
                    setLength(data.size);
                  } else {
                    setPatternsList("subcollection_empty");
                    goBackHandler(); // if no pattern is available
                  }
                  setIsDelete(null);
                  // console.log(list.find((l) => l.categoryId === categoryId));
                });
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }
  };

  const selectedPatternsHandler = (patterns) => {
    setPatterns(patterns);
  };

  const draftPatternHandler = (newData) => {
    console.log(newData);
    // console.log("drftpathdler", categoryId);
    let patternId = generateId("patterns");
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
      .doc(styleId)
      .collection("patterns")
      .doc(patternId);
    let bucketName = "patterns";
    let storageRef = firebase.storage().ref();
    // console.log("draft handler in patterns", newData);
    if (newData.name !== "" && newData.img !== null && newData.price !== 0) {
      console.log("else");
      if (
        newData.name !== "" &&
        newData.img !== null &&
        type === "mainProduct"
      ) {
        ref.current.continuousStart();
        let patternTimstamp = +new Date().getTime() + "-" + newData.img.name;
        let patternImgRef = storageRef.child(
          `${bucketName}/${patternTimstamp}`
        );
        patternImgRef.put(newData.img).then((snapshot) => {
          patternImgRef.getDownloadURL().then((patternImg) => {
            patternRef
              .set({
                genderId: genderId,
                categoryId: categoryId,
                subcategoryId: subcategoryId,
                styleId: styleId,
                patternId: patternId, // genderate new pattern id
                patternName: newData.name,
                patternImage: patternImg,
                delete: false,
                hide: true,
                price: parseInt(newData.price), // get input and make it as dynamic
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
                    styleId: styleId,
                    genderName: genderName,
                    categoryName: categoryName,
                    subcategoryName: subcategoryName,
                    styleName: styleName,
                    patternId: patternId, // genderate new pattern id
                    patternName: newData.name,
                    patternImage: patternImg,
                    delete: false,
                    hide: true,
                    price: parseInt(newData.price), // get input and make it as dynamic
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  });
                db.collection("gender")
                  .doc(genderId)
                  .update({
                    noOfPatterns: firebase.firestore.FieldValue.increment(1)
                  });
                // category - no_of_subcategories - increment
                db.collection("gender")
                  .doc(genderId)
                  .collection(type)
                  .doc("categories")
                  .collection("category")
                  .doc(categoryId)
                  .update({
                    noOfPatterns: firebase.firestore.FieldValue.increment(1)
                  });
                db.collection("gender")
                  .doc(genderId)
                  .collection(type)
                  .doc("categories")
                  .collection("category")
                  .doc(categoryId)
                  .collection("subcategory")
                  .doc(subcategoryId)
                  .update({
                    noOfPatterns: firebase.firestore.FieldValue.increment(1)
                  });
                db.collection("gender")
                  .doc(genderId)
                  .collection(type)
                  .doc("categories")
                  .collection("category")
                  .doc(categoryId)
                  .collection("subcategory")
                  .doc(subcategoryId)
                  .collection("styles")
                  .doc(styleId)
                  .update({
                    noOfPatterns: firebase.firestore.FieldValue.increment(1)
                  });
                // add the above patterns to the seperate patterns collection
                db.collection("patterns")
                  .doc(patternId)
                  .set({
                    type: type,
                    genderId: genderId,
                    categoryId: categoryId,
                    subcategoryId: subcategoryId,
                    styleId: styleId,
                    genderName: genderName,
                    categoryName: categoryName,
                    subcategoryName: subcategoryName,
                    styleName: styleName,
                    patternId: patternId, // genderate new pattern id
                    patternName: newData.name,
                    patternImage: patternImg,
                    delete: false,
                    hide: true,
                    price: parseInt(newData.price), // get input and make it as dynamic
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  })
                  .then((data) => {
                    // to render client side

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
                      .doc(styleId)
                      .collection("patterns")
                      .where("delete", "==", false)
                      .get()
                      .then((data) => {
                        data.forEach((doc) => {
                          list.push(doc.data());
                          // console.log("Patterns-464", doc.data());
                        });
                        let lastVisible = data.docs[data.docs.length - 1];
                        setLastDoc(lastVisible);
                        ref.current.complete(); // linear loader to complete
                        setNewModal(false);
                        setNewData({
                          name: "",
                          img: null
                        });
                        list = list.sort(function (a, b) {
                          return a.patternName.localeCompare(
                            b.patternName,
                            undefined,
                            {
                              numeric: true,
                              sensitivity: "base"
                            }
                          );
                        });
                        setPatternsList(list);
                        setPatterns(list[0]);
                        setLength(data.size);
                      });
                  });
              });
          });
        });
      } else if (
        newData.name !== "" &&
        newData.img !== null &&
        type === "addOns"
      ) {
        ref.current.continuousStart();
        let patternId = generateId("patterns");
        let bucketName = "patterns";
        let storageRef = firebase.storage().ref();
        // let genderRef = db.collection("gender").doc(genderId);
        let patternRef = db
          .collection("gender")
          .doc(genderId)
          .collection("addOns")
          .doc("categories")
          .collection("category")
          .doc(categoryId[0])
          .collection("subcategory")
          .doc(subcategoryId)
          .collection("patterns");
        let patternTimestamp = +new Date().getTime() + "-" + newData.img.name;
        let patternImgRef = storageRef.child(
          `${bucketName}/${patternTimestamp}`
        );
        patternImgRef.put(newData.img).then(() => {
          patternImgRef.getDownloadURL().then((patternImg) => {
            patternRef
              .doc(patternId)
              .set({
                genderId: genderId,
                categoryId: categoryId[0],
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
                // gender - no_of_categories increment
                // genderRef.update({
                //   noOfPatterns: firebase.firestore.FieldValue.increment(1)
                // });
                // // category - no_of_subcategories - increment
                // categoryRef.update({
                //   noOfPatterns: firebase.firestore.FieldValue.increment(1)
                // });
                ref.current.complete();
                setNewModal(false);
                setNewData({
                  name: "",
                  img: null
                });
                // refresh or re-renders
                patternRef
                  .where("delete", "==", false)
                  .get()
                  .then((data) => {
                    let list = [];
                    data.forEach((doc) => {
                      list.push(doc.data());
                    });
                    let lastVisible = data.docs[data.docs.length - 1];
                    setLastDoc(lastVisible);
                    ref.current.complete(); // linear loader to complete
                    list = list.sort(function (a, b) {
                      return a.patternName.localeCompare(
                        b.patternName,
                        undefined,
                        {
                          numeric: true,
                          sensitivity: "base"
                        }
                      );
                    });
                    setPatternsList(list);
                    setPatterns(list[0]);
                    setLength(data.size);
                  });
              });
          });
        });
      }
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
    if (type === "mainProduct") {
      // console.log(document.getElementById("toggle").checked);
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
        .doc(styleId)
        .collection("patterns");
      let list = [];
      if (e.target.checked) {
        // true - show or hide(false)

        patternRef
          .doc(patterns.patternId)
          .update({
            hide: true
          })
          .then(() => {
            db.collection("patterns").doc(patterns.patternId).update({
              hide: true
            });
            // console.log("hide-false");
            patternRef
              .doc(patterns.patternId)
              .get()
              .then((data) => {
                let doc = data.data();
                let list = [...patternsList];
                let index = list.findIndex(
                  (l) => l.patternId === patterns.patternId
                );
                list[index] = doc;
                setPatternsList(list);
                setPatterns(doc);
                ref.current.complete(); // linear loader to complete
              });
          })
          .catch((e) => console.log(e));
        // console.log();
      } else {
        // false - hide(true)

        patternRef
          .doc(patterns.patternId)
          .update({
            hide: false
          })
          .then(() => {
            // console.log("hide-true");
            db.collection("patterns").doc(patterns.patternId).update({
              hide: false
            });
            patternRef
              .doc(patterns.patternId)
              .get()
              .then((data) => {
                let doc = data.data();
                let list = [...patternsList];
                let index = list.findIndex(
                  (l) => l.patternId === patterns.patternId
                );
                list[index] = doc;
                list = list.sort(function (a, b) {
                  return a.patternName.localeCompare(b.patternName, undefined, {
                    numeric: true,
                    sensitivity: "base"
                  });
                });
                setPatternsList(list);
                setPatterns(doc);
                ref.current.complete(); // linear loader to comple
              });
          })
          .catch((e) => console.log(e));
      }
    } else {
      let patternRef = db
        .collection("gender")
        .doc(genderId)
        .collection("addOns")
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("patterns");
      if (e.target.checked) {
        // true - show or hide(false)
        patternRef
          .doc(patterns.patternId)
          .update({
            hide: true
          })
          .then(() => {
            patternRef
              .doc(patterns.patternId)
              .get()
              .then((data) => {
                let doc = data.data();
                let list = [...patternsList];
                let index = list.findIndex(
                  (l) => l.patternId === patterns.patternId
                );
                list[index] = doc;
                list = list.sort(function (a, b) {
                  return a.patternName.localeCompare(b.patternName, undefined, {
                    numeric: true,
                    sensitivity: "base"
                  });
                });
                setPatternsList(list);
                setPatterns(doc);
                ref.current.complete(); // linear loader to comple
              });
          })
          .catch((e) => console.log(e));
        // console.log();
      } else {
        // false - hide(true)

        patternRef
          .doc(patterns.patternId)
          .update({
            hide: false
          })
          .then(() => {
            // console.log("hide-true");
            patternRef
              .doc(patterns.patternId)
              .get()
              .then((data) => {
                let doc = data.data();
                let list = [...patternsList];
                let index = list.findIndex(
                  (l) => l.patternId === patterns.patternId
                );
                list[index] = doc;
                list = list.sort(function (a, b) {
                  return a.patternName.localeCompare(b.patternName, undefined, {
                    numeric: true,
                    sensitivity: "base"
                  });
                });
                setPatternsList(list);
                setPatterns(doc);
                ref.current.complete(); // linear loader to comple
              });
          })
          .catch((e) => console.log(e));
      }
    }
  };

  const selectedType = (type) => {
    console.log("category.js", type);
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
      .doc(styleId)
      .collection("patterns")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        ref.current.complete(); // linear loader to complete
        setType(type);
        let lastVisible = data.docs[data.docs.length - 1];
        setLastDoc(lastVisible);
        if (list.length === 0) {
          setPatternsList("subcollection_empty");
        } else {
          list = list.sort(function (a, b) {
            return a.patternName.localeCompare(b.patternName, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
          setPatternsList(list);
          setPatterns(list[0]);
          setLength(data.size);
        }
      });
  };
  const onScrollHandler = () => {
    console.log("onScrollHandler", length, lastDoc);
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
        .doc(styleId)
        .collection("patterns")
        .where("delete", "==", false)
        // .orderBy("timestamp", "desc")
        .startAfter(lastDoc) // cursor for pagination
        .limit(8)
        .get()
        .then((sub) => {
          let lastVisible = sub.docs[sub.docs.length - 1];
          setLastDoc(lastVisible);

          let list = [...patternsList];
          sub.forEach((doc) => {
            list.push(doc.data());
            // console.log("data", doc.data());
          });
          ref.current.complete(); // linear loader to complete

          // append data to bottom page
          // $("#content").append(`<p>hi</p>`);
          // $("#content").animate({ scrollTop: $("#content").height() }, 1000);
          list = list.sort(function (a, b) {
            return a.patternName.localeCompare(b.patternName, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
          setPatternsList(list);
          setPatterns(list[0]);
          setLength(sub.size);
        })
        .catch((e) => console.log("error", e));
      // $("#content").append(`<p>hi</p>`);
      // $("#content").animate({ scrollTop: $("#content").height() }, 1000);
    } else {
      console.log("no data to append");
    }
  };

  let pattern = null;
  if (patternsList === null) {
    pattern = <Spinner />;
  } else if (patternsList === "form") {
    pattern = (
      <div className="pattern">
      <div className="flex">
        <div className="img">
          <input
            type="file"
            name="img"
            id="img"
            accept=".gif, .jpg, .png"
            onChange={onChangeHandler}
          />
          <label onClick={getFile} for="img" id="uploadButton">
            <span>+</span>
          </label>
        </div>{" "}
        <div className="innerwrap">
          <label htmlFor="patternName">Enter Pattern Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={newData.name}
            onChange={onChangeHandler}
            required
          />
          <label htmlFor="patternName">Enter Pattern Price</label>
          <br />
          <input
            type="text"
            id="price"
            name="price"
            min="0"
            value={newData.price}
            onChange={onChangeHandler}
            required
          />
          <br />
          <br />
          <button
            type="button"
            className="draft"
            onClick={() => draftPatternHandler(newData)}
          >
            Save as draft
          </button>
          <br />
          <br />
          <button type="button" className="publish" onClick={goBackHandler}>
            Go Back
          </button>
        </div>
        <div className="selected">
          <div className="selected_value">
            <p className="name">{genderName}</p>
          </div>
          <div className="selected_value">
            <p className="name">{categoryName}</p>
          </div>
          <div className="selected_value">
            <p className="name">{subcategoryName}</p>
          </div>
          <div className="selected_value">
            <p className="name">{styleName}</p>
          </div>
        </div>
      </div>
      </div>
    );
  } else if (patternsList === "subcollection_empty") {
    pattern = <h1>No subcollection available</h1>;
  } else if (patternsList === "empty_patterns") {
    pattern = <h1>No pattern available</h1>;
  } else {
    pattern = (
      <>
        <Info
          patternsList={patternsList}
          selectedPatterns={selectedPatternsHandler}
          selectedType={selectedType}
          type={type}
          onScroll={onScrollHandler}
          length={length}
        />
        <InfoBox
          title="Patterns"
          genderName={genderName}
          categoryName={categoryName}
          subcategoryName={subcategoryName}
          styleName={styleName}
          patternsDetails={patterns}
          changeName={() => setIsChange("name")}
          changeImage={() => setIsChange("image")}
          changePrice={() => setIsChange("price")}
          goBack={goBackHandler}
          deleteHandler={(id) => setIsDelete(id)}
          saveAsDraft={draftPatternHandler}
          addNewPatterns={() => setNewModal("Patterns")}
          hide={hideHandler}
          type={type}
          showPattern={showPattern}
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
      {/* new pattern */}
      {newModal && (
        <AddNewPattern
          title={newModal}
          newData={newData}
          closeModal={() => {
            setNewModal(false);
            setNewData({
              name: "",
              img: null,
              price: 0
            });
          }}
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
          // newPrice={newData.price}
          closeModal={() => {
            setIsChange(null);
            setNewData({
              name: "",
              img: null,
              price: 0
            });
          }}
        />
      )}
      {isDelete && (
        <DeleteConfirmModal
          showModal={() => setIsDelete(true)}
          handleClose={() => setIsDelete(false)}
          deleteId={isDelete}
          confirmDelete={deletePatternHandler}
        />
      )}
      {pattern}
    </div>
  );
};

export default Patterns;
