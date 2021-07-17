import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Info from "./Info";
import InfoBox from "./InfoBox";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import qs from "qs";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";
import LoadingBar from "react-top-loading-bar";
import AddNewStyle from "../../../../UI/AddNewModal/AddNewStyle";
import AddNewModal from "../../../../UI/AddNewModal/AddNewModal";
import generateId from "../../../../../Helpers/generateId";
import DeleteConfirmModal from "../../../../UI/DeleteConfirmModal/DeleteConfirmModal";

let genderId = undefined;
let genderName = undefined;
let genderImg = undefined;
let categoryId = undefined;
let categoryName = undefined;
let categoryImg = undefined;

const db = firebase.firestore();
let list = null;

const SubCategory = (props) => {
  const ref = useRef(null);
  const [subCategoryList, setSubCategoryList] = useState(null);
  const [isChange, setIsChange] = useState(null); // for modal
  const [isDelete, setIsDelete] = useState(null);
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });
  const [subcategory, setSubcategory] = useState({
    subcategoryId: "",
    subcategoryName: "",
    subcategoryImage: "",
    hide: false,
    delete: false,
    genderId: "",
    categoryId: "",
    noOfStyles: 0
  });
  const [addNewItem, setAddNewItem] = useState("");
  const [newModal, setNewModal] = useState("");
  const [genderList, setGenderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

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
    genderImg = props.location.search;
    let index = genderImg.indexOf("https");
    genderImg = genderImg.substring(index);

    categoryId = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).categoryId;
    categoryName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).categoryName;
    categoryImg = props.location.search;
    index = categoryImg.lastIndexOf("https");
    categoryImg = categoryImg.substring(index);
    console.log(categoryImg);

    if (genderId !== undefined) {
      // get only categories specific to gender
      db.collection("gender")
        .doc(genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("subcategory")
        // .limit(10)
        .get()
        .then((sub) => {
          if (sub.docs.length > 0) {
            // subcollection exists
            let list = [];
            sub.forEach((subDoc) => {
              list.push(subDoc.data());
            });
            setSubCategoryList(list);
            setSubcategory(list[0]);
          } else {
            // subcollection not exists
            setSubCategoryList("subcollection_empty");
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log("cliked directly");
      db.collection("gender")
        .where("delete", "==", false)
        .get()
        .then((sub) => {
          if (sub.docs.length > 0) {
            // subcollection exists

            let list = [];
            sub.forEach((subDoc) => {
              let gender = subDoc.data();
              // if (gender.noOfCategories > 0) {
              list.push(gender);
              // } else {
              // every gender has no category
              // }
            });
            setGenderList(list);
          }
        });
      // get gender, category from UI
      setSubCategoryList("empty");
    }
  }, []);

  const viewHandler = (subcategoryId, subcategoryName) => {
    console.log("viewing subcategory");
    props.history.push(
      `${props.match.url}/createNewPattern/styles?genderId=${genderId}&genderName=${genderName}&categoryId=${categoryId}&categoryName=${categoryName}&subcategoryId=${subcategoryId}&subcategoryName=${subcategoryName}`
    );
  };

  const addNewHandler = (value) => {
    // props.addNewStyles();
    if (value === "subcategory") {
      setAddNewItem("subcategory");
    } else {
      // styles
      setAddNewItem("styles");
    }
  };

  const selectedSubCategory = (subcategory) => {
    setSubcategory(subcategory);
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

  // to change subcategory name
  const changeNameHandler = (subcategoryId, newName) => {
    ref.current.continuousStart();
    // console.log("subcategory name updated", genderId);
    db.collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .update({
        subcategoryName: newName
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
          .where("delete", "==", false)
          .get()
          .then((data) => {
            let list = [];
            data.forEach((doc) => {
              list.push(doc.data());
            });
            ref.current.complete(); // linear loader to complete
            setSubCategoryList(list);
            setSubcategory(list.find((l) => l.categoryId === categoryId));
            // console.log(list.find((l) => l.categoryId === categoryId));
          });
      })
      .catch((e) => console.log(e));
  };

  const changeImageHandler = (subcategoryId, newImage) => {
    ref.current.continuousStart();
    let subCategoryTimestamp = firebase.firestore.FieldValue.serverTimestamp();
    // casual shirt
    // https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1623937713452.jpg?alt=media&token=14291831-385d-4bdb-ab44-297aa0883fa9
    let bucketName = "images";
    let img = newImage;
    let storageRef = firebase.storage().ref();
    let imgRef = storageRef.child(`${bucketName}/${subCategoryTimestamp}`);
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
            .update({
              subcategoryImage: imgUrl // post this url first to storage
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
                .where("delete", "==", false)
                .get()
                .then((data) => {
                  let list = [];
                  data.forEach((doc) => {
                    list.push(doc.data());
                  });
                  ref.current.complete(); // linear loader to complete
                  setSubCategoryList(list);
                  setSubcategory(list.find((l) => l.categoryId === categoryId));
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
      // console.log(
      //   subcategory.genderId,
      //   subcategory.subcategoryName,
      //   newData.img
      // );
      changeImageHandler(subcategory.subcategoryId, newData.img);
    } else {
      // console.log(subcategory.genderId, subcategory.categoryId, newData.name);
      changeNameHandler(subcategory.subcategoryId, newData.name);
    }
    setNewData({
      name: "",
      img: null
    });
    setIsChange(false);
  };
  let genderRef;
  let categoryRef;
  let subcategoryRef;
  const draftHandler = (newData) => {
    // hide = true;
    // let genderId = generateId("gender");
    // let categoryId = generateId("category");
    let subcategoryId = generateId("subcategory");
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
    let bucketName = "images";
    let storageRef = firebase.storage().ref();
    console.log("draft handler in gender", newData);
    // let categoryTimestamp = null; // prevgender - category - subcategory;
    let subCategoryTimestamp = null;

    //prevgender-prevcategory-subcategory
    if (
      newData.genderName !== "" &&
      newData.genderImg !== null &&
      newData.categoryName !== "" &&
      newData.categoryImg !== null &&
      newData.subcategoryName !== "" &&
      newData.subcategoryImg !== null
    ) {
      ref.current.continuousStart();
      // let genderImgRef = storageRef.child(
      //   `${bucketName}/${newData.genderImg.name}`
      // );
      // let categoryImgRef = storageRef.child(
      //   `${bucketName}/${newData.categoryImg.name}`
      // );
      subCategoryTimestamp = firebase.firestore.FieldValue.serverTimestamp();
      let subcategoryImgRef = storageRef.child(
        `${bucketName}/${subCategoryTimestamp}`
      );
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
              delete: false,
              hide: true,
              timestamp: subCategoryTimestamp
            })
            .then(() => {
              // gender - no_of_subcategories increment
              genderRef.update({
                noOfSubcategories: firebase.firestore.FieldValue.increment(1)
              });
              // category - no_of_subcategories - increment
              categoryRef.update({
                noOfSubcategories: firebase.firestore.FieldValue.increment(1)
              });

              list = [];
              categoryRef
                .collection("subcategory")
                .where("delete", "==", false)
                .orderBy("timestamp", "desc")
                .get()
                .then((data) => {
                  data.forEach((doc) => {
                    list.push(doc.data());
                  });
                  ref.current.complete(); // linear loader to complete
                  closeModalHandler();
                  setSubCategoryList(list);
                  setSubcategory(list[0]);
                });
            });
        });
      });
    }
  };

  const getSubcategoryList = (genderName, categoryName) => {
    let gender = genderList.find((gen) => {
      return genderName === gen.genderName;
    });
    let category = categoryList.find((cat) => {
      return categoryName === cat.categoryName;
    });
    db.collection("gender")
      .doc(gender.genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(category.categoryId)
      .collection("subcategory")
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
          setSubCategoryList(list);
          setSubcategory(list[0]);
        } else {
          // subcollection not exists
          setSubCategoryList("subcollection_empty");
        }
      })
      .catch((e) => console.log(e));
  };

  const getCategoryList = () => {
    let genName = document.getElementById("exampleDataList").value;
    // console.log("asdasdasd", genName);
    let gender = genderList.find((gen) => {
      return gen.genderName === genName;
    });
    if (gender !== undefined) {
      db.collection("gender")
        .doc(gender.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
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
            // genderName = genderNam;
            setCategoryList(list);
          } else {
            // subcollection not exists
            setCategoryList([
              {
                categoryId: 1,
                categoryName: "Empty, pls select another gender"
              }
            ]);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const deleteSubcategoryHandler = (subcategoryId) => {
    // include decrement in all other
    ref.current.continuousStart();
    let subcategoryDet = subCategoryList.find((g) => {
      return g.subcategoryId === subcategoryId;
    });
    db.collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategoryId)
      .update({
        delete: true
      })
      .then(() => {
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
            subcategoryId: subcategoryDet.subcategoryId,
            subcategoryName: subcategoryDet.subcategoryName,
            subcategoryImg: subcategoryDet.subcategoryImage,
            styleId: "",
            styleName: "",
            styleImg: "",
            patternId: "",
            patternName: "",
            patternImg: ""
          })
          .then(() => {
            console.log(" successfully deleted!!!");
            db.collection("gender")
              .doc(genderId)
              .collection("mainProduct")
              .doc("categories")
              .collection("category")
              .doc(categoryId)
              .collection("subcategory")
              .where("delete", "==", false)
              .orderBy("timestamp", "desc")
              .get()
              .then((data) => {
                // db.collection("gender")
                //   .doc(genderId)
                //   .update({
                //     noOfSubcategories: firebase.firestore.FieldValue.decrement(
                //       1
                //     )
                //   });
                // // category - no_of_subcategories - increment
                // categoryRef.update({
                //   noOfSubcategories: firebase.firestore.FieldValue.decrement(1)
                // });
                let list = [];
                data.forEach((doc) => {
                  list.push(doc.data());
                });
                ref.current.complete(); // linear loader to complete
                if (list.length > 0) {
                  setSubCategoryList(list);
                  setSubcategory(list[0]);
                } else {
                  setSubCategoryList("subcollection_empty");
                }
                setIsDelete(null);
                // console.log(list.find((l) => l.categoryId === categoryId));
              });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const draftStyleHandler = (newData) => {
    // console.log(newData);
    ref.current.continuousStart();
    let styleId = generateId("styles");
    let bucketName = "images";
    let storageRef = firebase.storage().ref();
    let genderRef = db.collection("gender").doc(genderId);
    let categoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId);
    let subcategoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategory.subcategoryId);
    let styleRef = db
      .collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory")
      .doc(subcategory.subcategoryId)
      .collection("styles")
      .doc(styleId);
    let styleImgRef = storageRef.child(`${bucketName}/${newData.img.name}`);
    styleImgRef.put(newData.img).then(() => {
      styleImgRef.getDownloadURL().then((styleImg) => {
        styleRef
          .set({
            genderId: genderId,
            categoryId: categoryId,
            subcategoryId: subcategory.subcategoryId,
            styleId: styleId, // genderate new category id
            styleName: newData.name,
            styleImage: styleImg,
            delete: false,
            hide: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            ref.current.complete();
            // gender - no_of_categories increment
            genderRef.update({
              noOfSubategories: firebase.firestore.FieldValue.increment(1)
            });
            // category - no_of_subcategories - increment
            categoryRef.update({
              noOfSubcategories: firebase.firestore.FieldValue.increment(1)
            });
            subcategoryRef.update({
              noOfStyle: firebase.firestore.FieldValue.increment(1)
            });
            props.history.push(
              `${props.match.url}/createNewPattern/styles?genderId=${genderId}&genderName=${genderName}&categoryId=${categoryId}&categoryName=${categoryName}&subcategoryId=${subcategory.subcategoryId}&subcategoryName=${subcategory.subcategoryName}`
            );
          });
      });
    });
  };

  const hideHandler = (e) => {
    // console.log(e.target.checked);
    // console.log(document.getElementById("toggle").checked);
    let subCategoryRef = db
      .collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .collection("subcategory");
    let list = [];
    if (e.target.checked) {
      // true - show or hide(false)
      subCategoryRef
        .doc(subcategory.subcategoryId)
        .update({
          hide: true
        })
        .then(() => {
          // console.log("hide-false");
          list = [];
          subCategoryRef
            .where("delete", "==", false)
            .orderBy("timestamp", "desc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                list.push(doc.data());
              });
              ref.current.complete(); // linear loader to complete
              setSubCategoryList(list);
              setSubcategory(list[0]);
            });
        })
        .catch((e) => console.log(e));
      // console.log();
    } else {
      // false - hide(true)
      subCategoryRef
        .doc(subcategory.subcategoryId)
        .update({
          hide: false
        })
        .then(() => {
          // console.log("hide-true");
          list = [];
          subCategoryRef
            .where("delete", "==", false)
            .orderBy("timestamp", "desc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                list.push(doc.data());
              });
              ref.current.complete(); // linear loader to complete
              setSubCategoryList(list);
              setSubcategory(list[0]);
            });
        })
        .catch((e) => console.log(e));
    }
  };

  let subCategories = null;

  if (subCategoryList === null) {
    subCategories = <Spinner />;
  } else if (subCategoryList === "empty") {
    subCategories = (
      <form>
        <label for="exampleDataList" class="form-label">
          Select Gender
        </label>
        <input
          class="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Type to search..."
          onChange={getCategoryList}
        />
        <datalist id="datalistOptions">
          {genderList.map((gen) => (
            <option key={gen.genderId} value={gen.genderName} />
          ))}
        </datalist>
        <br />
        <label for="exampleDataList1" class="form-label">
          Select category
        </label>
        <input
          class="form-control"
          list="datalistOptions1"
          id="exampleDataList1"
          placeholder="Type to search..."
        />
        <datalist id="datalistOptions1">
          {categoryList.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryName} />
          ))}
        </datalist>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            getSubcategoryList(
              document.getElementById("exampleDataList").value,
              document.getElementById("exampleDataList1").value
            );
          }}
        >
          Submit
        </button>
      </form>
    );
  } else if (subCategoryList === "subcollection_empty") {
    subCategories = <h1>No subcollection available</h1>;
  } else {
    subCategories = (
      <>
        <Info
          subCategoryList={subCategoryList}
          selectedSubCategory={selectedSubCategory}
        />
        <InfoBox
          title="SubCategory"
          genderName={genderName}
          categoryName={categoryName}
          subCategoryDetails={subcategory}
          view={viewHandler}
          addNew={addNewHandler}
          addNewStyles={() => setNewModal("Styles")}
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
        <AddNewModal
          title={addNewItem}
          closeModal={closeModalHandler}
          // publish={publishHandler}
          genderId={genderId}
          genderName={genderName}
          genderImg={genderImg}
          categoryId={categoryId}
          categoryName={categoryName}
          categoryImg={categoryImg}
          draft={draftHandler}
        />
      )}
      {newModal && (
        <AddNewStyle
          title={newModal}
          newData={newData}
          closeModal={() => setNewModal(false)}
          onChange={onChangeHandler}
          saveAsDraft={draftStyleHandler}
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
          confirmDelete={deleteSubcategoryHandler}
        />
      )}
      {subCategories}
    </div>
  );
};

export default SubCategory;
