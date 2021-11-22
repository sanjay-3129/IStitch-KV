import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import qs from "qs";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
// import Info from "./Info";
import InfoPage from "./InfoPage";
import InfoBox from "./InfoBox";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";
import LoadingBar from "react-top-loading-bar";
import AddNewModal from "../../../../UI/AddNewModal/AddNewModal";
import AddNewStyle from "../../../../UI/AddNewModal/AddNewStyle";
import generateId from "../../../../../Helpers/generateId";
import DeleteConfirmModal from "../../../../UI/DeleteConfirmModal/DeleteConfirmModal";
// import $ from "jquery";

let genderId = undefined;
let genderName = undefined;
let genderImg = undefined;
const db = firebase.firestore();

const Category = (props) => {
  const ref = useRef(null); // top-loader
  // if category is clicked directly show all categories from all genders
  // if category is clicked from gender, show only categories based on that gender
  const [categoryList, setCategoryList] = useState(null); // category list from db
  const [mcategoryList, setmCategoryList] = useState([]);
  // const [mcategory, setmcategory] = useState([]);
  const [isChange, setIsChange] = useState(null); // for modal
  const [isDelete, setIsDelete] = useState(null);
  const [type, setType] = useState("mainProduct"); // mainProduct or addOns
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });
  // let list = [];
  const [genderList, setgenderList] = useState([]);
  const [category, setCategory] = useState({
    categoryId: "",
    categoryName: "",
    categoryImage: "",
    hide: false,
    delete: false,
    genderId: "",
    noOfSubcategories: 0,
    noOfStyles: 0,
    noOfPatterns: 0,
    timestamp: ""
  });

  const [addNewItem, setAddNewItem] = useState("");
  const [newModal, setNewModal] = useState("");
  // const [newPatternModal, setNewPatternModal] = useState("");
  const [length, setLength] = useState(0);
  const [lastDoc, setLastDoc] = useState(null);
  // const [mcategory, setmcategory] = useState([]);
  const closeModalHandler = () => {
    setAddNewItem(null);
    setNewData({
      name: "",
      img: null
    });
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  // const selectGenderList = () => {};
  // let myParam;
  useEffect(() => {
    // getting query parameters through Links
    let types = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).type;
    if (types !== undefined) {
      // if new category created from gender
      setType(type);
    }
    genderId = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).genderId;
    genderName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).genderName;
    // genderImg = qs.parse(props.location.search, {
    //   ignoreQueryPrefix: true
    // }).genderImg;
    // let imgLink = qs.parse(props.location.search, {
    //   ignoreQueryPrefix: true
    // }).genderImg;
    // let token = qs.parse(props.location.search, {
    //   ignoreQueryPrefix: true
    // }).token;
    // genderImg = imgLink + "&token=" + token;

    // const urlParams = new URLSearchParams(window.location.search);
    // console.log(
    //   "genderImg",
    //   urlParams.get("genderImg"),
    //   urlParams.get("token")
    // );
    // when we give this, in adding gender, cat, sub, we can see the images
    let img = props.location.search;
    let index = img.indexOf("https");
    genderImg = img.substring(index);

    if (genderId !== undefined) {
      // main - initally
      // get only categories specific to gender
      db.collection("gender")
        .doc(genderId)
        .collection(type)
        .doc("categories")
        .collection("category")
        .where("delete", "==", false)
        // .orderBy("timestamp", "desc")
        .limit(16)
        .get()
        .then((sub) => {
          // console.log("size of category", sub.size, sub.docs.length);
          let lastVisible = sub.docs[sub.docs.length - 1];
          setLastDoc(lastVisible);
          if (sub.docs.length > 0) {
            // subcollection exists
            let list = [];
            sub.forEach((subDoc) => {
              list.push(subDoc.data());
            });
            list = list.sort(function (a, b) {
              return a.categoryName.localeCompare(b.categoryName, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });
            setCategoryList(list);
            setCategory(list[0]);
            setLength(sub.size);
          } else {
            // subcollection not exists
            setCategoryList("subcollection_empty");
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log("cliked directly");
      // get gender from UI - direct click
      db.collection("gender")
        .where("delete", "==", false)
        .get()
        .then((sub) => {
          setLength(sub.size);
          if (sub.docs.length > 0) {
            // subcollection exists
            let list = [];
            sub.forEach((subDoc) => {
              list.push(subDoc.data());
            });
            console.log("genderList", list);
            setgenderList(list);
          }
        });
      setCategoryList("empty");
    }
  }, []);

  const viewHandler = (categoryId, categoryName, categoryImg) => {
    console.log("viewHandler", categoryId, categoryName, categoryImg);
    if (type === "mainProduct") {
      console.log("viewing subcategory Main products", props.location.search);
      props.history.push(
        `${props.match.url}/createNewPattern/subCategory?type=${type}&genderId=${genderId}&genderName=${genderName}&genderImg=${genderImg}&categoryId=${categoryId}&categoryName=${categoryName}&categoryImg=${categoryImg}`
      );
    } else {
      console.log("addddddddd", categoryName);
      console.log("viewing subcategory addons", props.location.search);
      props.history.push(
        `${props.match.url}/createNewPattern/subCategory?type=addOns&genderId=${genderId}&genderName=${genderName}&genderImg=${genderImg}&categoryId=${category.categoryId}&categoryName=${category.categoryName}&categoryImg=${category.categoryImg}`
        //`${props.match.url}/createNewPattern/subCategory?type=${type}&genderId=${genderId}&genderName=${genderName}&genderImg=${genderImg}&categoryId=${category.categoryId}&categoryName=${category.categoryName}&categoryImg=${category.categoryImg}`

        // `${props.match.url}/createNewPattern/subCategory?type=${type}&genderId=${genderId}&genderName=${genderName}&genderImg=${genderImg}&categoryId=${categoryId}&categoryName=${categoryName}&categoryImg=${categoryImg}`
      );
    }
  };

  const addNewHandler = (value) => {
    if (value === "category") {
      setAddNewItem("category");
    } else {
      // subcategory
      setAddNewItem("subcategory");
    }
  };

  const selectedCategoryHandler = (category) => {
    setCategory(category);
  };

  // for newName updating, two-way binding
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

  //to change category name
  const changeNameHandler = (categoryId, newName) => {
    ref.current.continuousStart();
    console.log("category name updated", genderId);
    let categoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId);

    categoryRef
      .update({
        categoryName: newName
      })
      .then(() => {
        console.log(newName + " successfully updated!!!");
        categoryRef.get().then((data) => {
          // setLength(data.size);
          // let list = [];
          // data.forEach((doc) => {
          //   list.push(doc.data());
          //   // console.log(doc.data());
          // });
          let doc = data.data();
          let list = [...categoryList];
          let index = list.findIndex((l) => l.categoryId === categoryId);
          list[index] = doc;
          list = list.sort(function (a, b) {
            return a.categoryName.localeCompare(b.categoryName, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
          setCategoryList(list);
          setCategory(doc);
          ref.current.complete(); // linear loader to complete
          // console.log(list.find((l) => l.categoryId === categoryId));
        });
      })
      .catch((e) => console.log(e));
  };
  const changeImageHandler = (categoryId, newImage) => {
    ref.current.continuousStart();
    let categoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(categoryId);
    // casual shirt
    // https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1623937713452.jpg?alt=media&token=14291831-385d-4bdb-ab44-297aa0883fa9
    let bucketName = "category";
    let img = newImage;
    let storageRef = firebase.storage().ref();
    let categoryTimestamp = +new Date().getTime() + "-" + newData.img.name;
    let imgRef = storageRef.child(`${bucketName}/${categoryTimestamp}`);
    imgRef
      .put(img)
      .then((snapshot) => {
        // console.log(snapshot);
        imgRef.getDownloadURL().then((imgUrl) => {
          // now adding the data to firestore
          categoryRef
            .update({
              categoryImage: imgUrl // post this url first to storage
            })
            .then(() => {
              firebase
                .storage()
                .refFromURL(category.categoryImage)
                .delete()
                .then(() =>
                  console.log("image deleted successfullty, Category.js[252]")
                );
              console.log("Image Updated");
              // then set the state again to reload and render it again
              // here only the changed category is got from the db and set - optimized
              categoryRef.get().then((data) => {
                let doc = data.data();
                let list = [...categoryList];
                let index = list.findIndex((l) => l.categoryId === categoryId);
                list[index] = doc;
                list = list.sort(function (a, b) {
                  return a.categoryName.localeCompare(
                    b.categoryName,
                    undefined,
                    {
                      numeric: true,
                      sensitivity: "base"
                    }
                  );
                });
                setCategoryList(list);
                setCategory(doc);
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
    if (newData.img !== null) {
      // console.log(category.genderId, category.categoryId, newData.name, "name");
      changeImageHandler(category.categoryId, newData.img);
      setIsChange(false);
    } else if (newData.name !== "") {
      // console.log(category.genderId, category.categoryId, newData.img, "img");
      changeNameHandler(category.categoryId, newData.name);
      setIsChange(false);
    } else {
      alert("Enter Valid Data!!!");
    }
    setNewData({
      name: "",
      img: null
    });
  };

  const draftHandler = (newData) => {
    setAddNewItem(false);
    console.log("qqqqqq", newData);
    // let category = mcategoryList.find((cat) => {
    //   console.log("cattt", cat);
    //   console.log("mcategory.categoryName", category.categoryName);

    //   return newData.mcategory === cat.categoryName;
    // });
    // hide = true;
    console.log("category", category);

    let type = document.getElementById("categorytype").value;
    // let subcategoryType = document.getElementById("subcategorytype").value;
    // console.log("types: ", categoryType, subcategoryType);
    let genderId = newData.genderId; // error
    let categoryId = generateId("category");
    let subcategoryId = generateId("subcategory");
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
    let bucketName = "category";
    let storageRef = firebase.storage().ref();
    // console.log("draft handler");
    let categoryTimestamp = null; // prevgender - category - subcategory;
    let subCategoryTimestamp = null;
    // prevgender - category - subcategory;
    // console.log("newData-cateory", newData);
    if (newData.categoryName === "" && newData.categoryImg === null) {
      alert("Enter Category name and select the Category image");
    } else {
      if (
        newData.genderName !== "" &&
        newData.genderImg !== null &&
        newData.categoryName !== "" &&
        newData.categoryImg !== null &&
        newData.subcategoryName !== "" &&
        newData.subcategoryImg !== null
      ) {
        categoryTimestamp =
          +new Date().getTime() + "-" + newData.categoryImg.name;
        ref.current.continuousStart();
        let categoryImgRef = storageRef.child(
          `${bucketName}/${categoryTimestamp}`
        );
        subCategoryTimestamp =
          +new Date().getTime() + "-" + newData.subcategoryImg.name;
        let subcategoryImgRef = storageRef.child(
          `${bucketName}/${subCategoryTimestamp}`
        );
        categoryImgRef.put(newData.categoryImg).then((snapshot) => {
          categoryImgRef.getDownloadURL().then((categoryImg) => {
            let data = {
              genderId: genderId,
              categoryId: categoryId, // genderate new category id
              categoryName: newData.categoryName,
              categoryImage: categoryImg,
              noOfSubcategories: 0,
              noOfStyles: 0,
              noOfPatterns: 0,
              delete: false,
              hide: true,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            if (type === "addOns") {
              data = {
                genderId: genderId,
                categoryId: categoryId, // genderate new category id
                categoryName: newData.categoryName,
                categoryImage: categoryImg,
                noOfSubcategories: 0,
                noOfStyles: 0,
                noOfPatterns: 0,
                delete: false,
                hide: true,
                mainCategoryId: category.categoryId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              };
            }
            categoryRef.set(data).then(() => {
              // gender - no_of_categories increment
              genderRef.update({
                noOfCategories: firebase.firestore.FieldValue.increment(1)
              });

              // creating subcategory
              subcategoryImgRef.put(newData.subcategoryImg).then((snapshot) => {
                subcategoryImgRef.getDownloadURL().then((subcategoryImg) => {
                  subcategoryRef
                    .set({
                      genderId: genderId,
                      categoryId: categoryId,
                      subcategoryId: subcategoryId, // genderate new category id
                      subcategoryName: newData.subcategoryName,
                      subcategoryImage: subcategoryImg,
                      noOfStyles: 0,
                      noOfPatterns: 0,
                      delete: false,
                      hide: true,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                      // gender - no_of_subcategories - increment
                      genderRef.update({
                        noOfSubcategories: firebase.firestore.FieldValue.increment(
                          1
                        )
                      });
                      // category - no_of_subcategories - increment
                      categoryRef.update({
                        noOfSubcategories: firebase.firestore.FieldValue.increment(
                          1
                        )
                      });

                      genderRef
                        .collection(type)
                        .doc("categories")
                        .collection("category")
                        .where("delete", "==", false)
                        // .orderBy("timestamp", "desc")
                        .limit(16)
                        .get()
                        .then((data) => {
                          let list = [];
                          setLength(data.size);
                          data.forEach((doc) => {
                            list.push(doc.data());
                          });
                          list = list.sort(function (a, b) {
                            return a.categoryName.localeCompare(
                              b.categoryName,
                              undefined,
                              {
                                numeric: true,
                                sensitivity: "base"
                              }
                            );
                          });
                          setCategoryList(list);
                          setCategory(list[0]);
                          setType(type);
                          ref.current.complete(); // linear loader to complete
                          // setAddNewItem(null);
                        });
                    })
                    .catch((e) => console.log(e));
                });
              });
            });
          });
        });
      } // if
      // prevgender - category - !subcategory;
      else if (
        newData.genderName !== "" &&
        newData.genderImg !== null &&
        newData.categoryName !== "" &&
        newData.categoryImg !== null &&
        newData.subcategoryName === "" &&
        newData.subcategoryImg === null
      ) {
        ref.current.continuousStart();

        categoryTimestamp =
          +new Date().getTime() + "-" + newData.categoryImg.name;
        let categoryImgRef = storageRef.child(
          `${bucketName}/${categoryTimestamp}`
        );
        categoryImgRef.put(newData.categoryImg).then((snapshot) => {
          categoryImgRef.getDownloadURL().then((categoryImg) => {
            let data = {
              genderId: genderId,
              categoryId: categoryId, // genderate new category id
              categoryName: newData.categoryName,
              categoryImage: categoryImg,
              noOfSubcategories: 0,
              noOfStyles: 0,
              noOfPatterns: 0,
              delete: false,
              hide: true,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            if (type === "addOns") {
              data = {
                genderId: genderId,
                categoryId: categoryId, // genderate new category id
                categoryName: newData.categoryName,
                categoryImage: categoryImg,
                noOfSubcategories: 0,
                noOfStyles: 0,
                noOfPatterns: 0,
                delete: false,
                hide: true,
                mainCategoryId: category.categoryId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              };
            }
            categoryRef.set(data).then(() => {
              // gender - no_of_categories increment &&
              genderRef.update({
                noOfCategories: firebase.firestore.FieldValue.increment(1)
              });
              // re-render
              let list = [];
              genderRef
                .collection(type)
                .doc("categories")
                .collection("category")
                .where("delete", "==", false)
                // .orderBy("timestamp", "desc")
                .limit(16)
                .get()
                .then((data) => {
                  data.forEach((doc) => {
                    list.push(doc.data());
                  });
                  ref.current.complete(); // linear loader to complete
                  list = list.sort(function (a, b) {
                    return a.categoryName.localeCompare(
                      b.categoryName,
                      undefined,
                      {
                        numeric: true,
                        sensitivity: "base"
                      }
                    );
                  });
                  setCategoryList(list);
                  setCategory(list[0]);
                  // setAddNewItem(null);
                });
            });
          });
        });
      }
    }
  };

  const draftSubcategoryHandler = (newData) => {
    console.log(
      "test---",
      type,
      genderId,
      genderName,
      genderImg,
      // myParam,
      category.categoryId,
      category.categoryName,
      category.categoryImage
    );

    let subcategoryId = generateId("subcategory");
    let bucketName = "subcategory";
    let storageRef = firebase.storage().ref();
    let genderRef = db.collection("gender").doc(genderId);
    let categoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(category.categoryId);
    let subcategoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .doc(category.categoryId)
      .collection("subcategory")
      .doc(subcategoryId);
    if (newData.name === "" && newData.img === null) {
      alert("Enter SubCategory name and select the SubCategory image");
    } else {
      if (newData.name !== "" && newData.img !== null) {
        ref.current.continuousStart();
        let subCategoryTimestamp =
          +new Date().getTime() + "-" + newData.img.name;
        let subcategoryImgRef = storageRef.child(
          `${bucketName}/${subCategoryTimestamp}`
        );
        subcategoryImgRef.put(newData.img).then(() => {
          subcategoryImgRef.getDownloadURL().then((subcategoryImg) => {
            subcategoryRef
              .set({
                genderId: genderId,
                categoryId: category.categoryId,
                subcategoryId: subcategoryId, // genderate new category id
                subcategoryName: newData.name,
                subcategoryImage: subcategoryImg,
                noOfStyles: 0,
                noOfPatterns: 0,
                delete: false,
                hide: true,

                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              })
              .then(() => {
                ref.current.complete();
                // gender - no_of_categories increment
                genderRef.update({
                  noOfSubcategories: firebase.firestore.FieldValue.increment(1)
                });
                categoryRef.update({
                  noOfSubcategories: firebase.firestore.FieldValue.increment(1)
                });
                // console.log("Category-sub", newData, category);
                props.history.push(
                  `${props.match.url}/createNewPattern/subCategory?type=${type}&genderId=${genderId}&genderName=${genderName}&genderImg=${genderImg}&categoryId=${category.categoryId}&categoryName=${category.categoryName}&categoryImg=${category.categoryImg}`
                );
              });
          });
        });
      }
    }
  };

  const getCategoryList = (genderNam) => {
    let gender = genderList.find((gen) => {
      return genderNam === gen.genderName;
    });
    db.collection("gender")
      .doc(gender.genderId)
      .collection(type)
      .doc("categories")
      .collection("category")
      .where("delete", "==", false)
      // .orderBy("timestamp", "desc")
      .limit(8)
      .get()
      .then((sub) => {
        if (sub.docs.length > 0) {
          // subcollection exists
          let list = [];
          sub.forEach((subDoc) => {
            list.push(subDoc.data());
          });
          // this will make the independant flow work
          genderName = gender.genderName;
          genderId = gender.genderId;
          genderImg = gender.genderImg;
          list = list.sort(function (a, b) {
            return a.categoryName.localeCompare(b.categoryName, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
          setCategoryList(list);
          setCategory(list[0]);
        } else {
          // subcollection not exists
          setCategoryList("subcollection_empty");
        }
      })
      .catch((e) => console.log(e));
  };
  const getMainCategoryList = () => {
    console.log("///>>>");

    db.collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .where("delete", "==", false)
      // .orderBy("timestamp", "desc")
      .limit(8)
      .get()
      .then((sub) => {
        console.log("......", sub);

        if (sub.docs.length > 0) {
          // subcollection exists
          let list = [];
          sub.forEach((subDoc) => {
            list.push(subDoc.data());
          });
          // genderName = genderNam;
          setmCategoryList(list);
          console.log("mcatlist", list);
        } else {
          // subcollection not exists
          setmCategoryList([
            {
              categoryId: 1,
              categoryName: "Empty, pls select another gender"
            }
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
  const deleteCategoryHandler = (categoryId) => {
    // include decrement in all other
    // console.log(categoryId, "deleteCategoryHandler");
    setIsDelete(null);
    ref.current.continuousStart();
    let categoryDet = categoryList.find((g) => {
      return g.categoryId === categoryId;
    });
    let genderRef = db.collection("gender").doc(genderId);
    let categoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category");

    categoryRef
      .doc(categoryId)
      .update({
        delete: true
      })
      .then(() => {
        // add data to deleteItems collections
        let id = generateId("deleted");
        let item = {
          id: id,
          type: type,
          genderId: genderId,
          genderName: genderName,
          genderImg: "",
          categoryId: categoryDet.categoryId,
          categoryName: categoryDet.categoryName,
          categoryImg: categoryDet.categoryImage,
          subcategoryId: "",
          subcategoryName: "",
          subcategoryImg: "",
          styleId: "",
          styleName: "",
          styleImg: "",
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
            genderRef.update({
              noOfCategories: firebase.firestore.FieldValue.increment(-1),
              noOfSubcategories: firebase.firestore.FieldValue.increment(
                -category.noOfSubcategories
              ),
              noOfStyles: firebase.firestore.FieldValue.increment(
                -category.noOfStyles
              ),
              noOfPatterns: firebase.firestore.FieldValue.increment(
                -category.noOfPatterns
              )
            });
            // get data which is not deleted
            // console.log(" successfully updated!!!");
            categoryRef
              .where("delete", "==", false)
              // .orderBy("timestamp", "desc")
              .limit(16)
              .get()
              .then((data) => {
                let list = [];
                data.forEach((doc) => {
                  list.push(doc.data());
                });
                ref.current.complete(); // linear loader to complete
                if (list.length > 0) {
                  list = list.sort(function (a, b) {
                    return a.categoryName.localeCompare(
                      b.categoryName,
                      undefined,
                      {
                        numeric: true,
                        sensitivity: "base"
                      }
                    );
                  });
                  setCategoryList(list);
                  setCategory(list[0]);
                } else {
                  setCategoryList("subcollection_empty");
                  // UI - back button or form
                }
              });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const hideHandler = (e) => {
    // console.log(e.target.checked);
    // console.log(document.getElementById("toggle").checked);
    let categoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection(type)
      .doc("categories")
      .collection("category");
    if (e.target.checked) {
      // true - show or hide(false)
      categoryRef
        .doc(category.categoryId)
        .update({
          hide: true
        })
        .then(() => {
          // console.log("hide-false");
          categoryRef
            .doc(category.categoryId)
            // .limit(8)
            .get()
            .then((data) => {
              let doc = data.data();
              let list = [...categoryList];
              let index = list.findIndex(
                (l) => l.categoryId === category.categoryId
              );
              list[index] = doc;
              list = list.sort(function (a, b) {
                return a.categoryName.localeCompare(b.categoryName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });
              setCategoryList(list);
              setCategory(doc);
              ref.current.complete(); // linear loader to complete
            });
        })
        .catch((e) => console.log(e));
      // console.log();
    } else {
      // false - hide(true)
      categoryRef
        .doc(category.categoryId)
        .update({
          hide: false
        })
        .then(() => {
          // console.log("hide-true");

          categoryRef
            .doc(category.categoryId)
            .get()
            .then((data) => {
              let doc = data.data();
              let list = [...categoryList];
              let index = list.findIndex(
                (l) => l.categoryId === category.categoryId
              );
              list[index] = doc;
              list = list.sort(function (a, b) {
                return a.categoryName.localeCompare(b.categoryName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });
              setCategoryList(list);
              setCategory(doc);
              ref.current.complete(); // linear loader to complete
            });
        })
        .catch((e) => console.log(e));
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
      .where("delete", "==", false)
      // .orderBy("timestamp", "desc")
      .limit(16)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        ref.current.complete(); // linear loader to complete
        setType(type); // mainProduct or addOns
        if (list.length === 0) {
          setCategoryList("subcollection_empty");
        } else {
          list = list.sort(function (a, b) {
            return a.categoryName.localeCompare(b.categoryName, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
          setCategoryList(list);
          setCategory(list[0]);
        }
      });
  };

  // const addOnsNewSubcategoryHandler = (newData) => {
  //   console.log("00000000", newData);
  //   ref.current.continuousStart();
  //   let subcategoryId = generateId("subcategory");
  //   let bucketName = "Images";
  //   let storageRef = firebase.storage().ref();
  //   // let genderRef = db.collection("gender").doc(genderId);
  //   let subcategoryRef = db
  //     .collection("gender")
  //     .doc(genderId)
  //     .collection("addOns")
  //     .doc("categories")
  //     .collection("category")
  //     .doc(category.categoryId)
  //     .collection("subcategory")
  //     .doc(subcategoryId);
  //   let subcategoryTimestamp = +new Date().getTime() + "-" + newData.img.name;
  //   let subcategoryImgRef = storageRef.child(
  //     `${bucketName}/${subcategoryTimestamp}`
  //   );
  //   subcategoryImgRef.put(newData.img).then(() => {
  //     subcategoryImgRef.getDownloadURL().then((subcategoryImg) => {
  //       subcategoryRef
  //         .set({
  //           genderId: genderId,
  //           categoryId: category.categoryId,
  //           subcategoryId: subcategoryId, // genderate new category id
  //           subcategoryName: newData.name,
  //           subcategoryImage: subcategoryImg,
  //           delete: false,
  //           hide: true,
  //           noOfPatterns: 0,
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //         })
  //         .then(() => {
  //           // gender - no_of_categories increment
  //           // genderRef.update({
  //           //   noOfPatterns: firebase.firestore.FieldValue.increment(1)
  //           // });
  //           // // category - no_of_subcategories - increment
  //           // categoryRef.update({
  //           //   noOfPatterns: firebase.firestore.FieldValue.increment(1)
  //           // });
  //           ref.current.complete();
  //           setNewModal(false);
  //           props.history.push(
  //             //`${props.match.url}/createNewPattern/subCategory?type=${type}&genderId=${genderId}&genderName=${genderName}&genderImg=${genderImg}&categoryId=${category.categoryId}&categoryName=${category.categoryName}&categoryImg=${category.categoryImg}`
  //             `${props.match.url}/createNewPattern/patterns?type="addOns"&genderId=${genderId}&genderName=${genderName}&categoryId=${category.categoryId}&categoryName=${category.categoryName}`
  //           );
  //         });
  //     });
  //   });
  // };

  const onScrollHandler = () => {
    console.log("onScrollHandler", length);
    if (length > 0) {
      ref.current.continuousStart();
      db.collection("gender")
        .doc(genderId)
        .collection(type)
        .doc("categories")
        .collection("category")
        .where("delete", "==", false)
        // .orderBy("timestamp", "desc")
        .startAfter(lastDoc) // cursor for pagination
        .limit(8)
        .get()
        .then((sub) => {
          let lastVisible = sub.docs[sub.docs.length - 1];
          setLastDoc(lastVisible);

          let list = [...categoryList];
          sub.forEach((doc) => {
            list.push(doc.data());
          });
          ref.current.complete(); // linear loader to complete

          // append data to bottom page
          // $("#content").append(`<p>hi</p>`);
          // $("#content").animate({ scrollTop: $("#content").height() }, 1000);
          list = list.sort(function (a, b) {
            return a.categoryName.localeCompare(b.categoryName, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
          setCategoryList(list);
          setCategory(list[0]);
          setLength(sub.size);
        });
      // $("#content").append(`<p>hi</p>`);
      // $("#content").animate({ scrollTop: $("#content").height() }, 1000);
    } else {
      console.log("no data to append");
    }
  };

  let categories = null;
  if (categoryList === null) {
    categories = <Spinner />;
  } else if (categoryList === "empty") {
    // no categor availble
    // categories = <h1>No categories available</h1>;
    categories = (
      <form>
        <label for="exampleDataList" class="form-label">
          Select Gender
        </label>
        <input
          class="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Type to search..."
          autocomplete="off"
        />
        <datalist id="datalistOptions">
          {genderList.map((gen) => (
            <option key={gen.genderId} value={gen.genderName} />
          ))}
        </datalist>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            getCategoryList(document.getElementById("exampleDataList").value);
          }}
        >
          Submit
        </button>
      </form>
    );
    // all gender
  } else if (categoryList === "subcollection_empty") {
    // add a form
    categories = (
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
    categories = (
      <>
        <InfoPage
          categoryList={categoryList}
          selectedCategory={selectedCategoryHandler}
          // selectAddon={selectedAddonHandler}
          // selectMain={selectedMainHandler}
          onScroll={onScrollHandler}
          selectedType={selectedType}
          type={type}
          length={length}
        />
        <InfoBox
          title="Category"
          genderName={genderName}
          categoryDetails={category}
          view={viewHandler}
          addNew={addNewHandler}
          // addNewPattern={addOnsNewSubcategoryHandler}
          // addNewPattern={() => setNewPatternModal("Patterns")}
          addNewSub={() => setNewModal("Subcategory")}
          changeName={() => setIsChange("name")}
          changeImage={() => setIsChange("image")}
          goBack={goBackHandler}
          deleteHandler={(id) => setIsDelete(id)}
          hide={hideHandler}
          type={type}
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
        <AddNewModal
          title={addNewItem}
          genderId={genderId}
          genderName={genderName}
          genderImg={genderImg}
          closeModal={closeModalHandler}
          // publish={publishHandler}
          onChange={onChangeHandler}
          draft={draftHandler}
          newData={newData}
          getCategoryList={getMainCategoryList}
          mcategoryList={mcategoryList}
        />
      )}
      {newModal && (
        <AddNewStyle
          title={newModal}
          newData={newData}
          closeModal={() => {
            setNewModal(null);
            setNewData({
              name: "",
              img: null,
              categorytype: null,
              mainCategoryId: ""
            });
          }}
          onChange={onChangeHandler}
          saveAsDraft={draftSubcategoryHandler}
        />
      )}

      {isChange && (
        <ChangeModal
          title={isChange}
          submit={changeSubmitHandler}
          onChange={onChangeHandler}
          newName={newData.name}
          getCategoryList={getCategoryList}
          mcategoryList={mcategoryList}
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
          confirmDelete={deleteCategoryHandler}
        />
      )}
      {categories}
    </div>
  );
};

export default Category;
