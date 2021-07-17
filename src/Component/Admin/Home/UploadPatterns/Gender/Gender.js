import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Swippers from "../../../../UI/Swipers/Swipers";
import SwipperSub from "../../../../UI/Swipers/SwiperSub";
import style from "./Gender.module.css";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";
import LoadingBar from "react-top-loading-bar";
import AddNewModal from "../../../../UI/AddNewModal/AddNewModal";
import AddNewStyle from "../../../../UI/AddNewModal/AddNewStyle";
import generateId from "../../../../../Helpers/generateId";
import DeleteConfirmModal from "../../../../UI/DeleteConfirmModal/DeleteConfirmModal";
// this will enable the book like styling - added in swiper.js
// import Swiper from "swiper/bundle";
// import Swiper styles
// import "swiper/swiper-bundle.css";
//
const db = firebase.firestore();
let list = null;

const Gender = (props) => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChange, setIsChange] = useState(null); // for modal
  const [isDelete, setIsDelete] = useState(null); // this will contain the
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });
  const [genderList, setGenderList] = useState(null);
  const [gender, setGender] = useState({
    genderId: "",
    genderName: "",
    genderImg: "",
    noOfCategories: 0,
    noOfSubcategories: 0,
    noOfStyles: 0,
    hide: false,
    delete: false
  });
  const [addNewItem, setAddNewItem] = useState("");
  const [newModal, setNewModal] = useState("");

  const closeModalHandler = () => {
    setAddNewItem(null);
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  useEffect(() => {
    console.log("useeffect");
    list = [];
    db.collection("gender")
      .where("delete", "==", false)
      .orderBy("genderName", "asc")
      // .limit(2)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setGenderList(list);
        setGender(list[0]);
      });
  }, []);

  // update name in db
  const changeNameHandler = (genderId, newName) => {
    ref.current.continuousStart();
    console.log("gender name updated", genderId);
    db.collection("gender")
      .doc(genderId)
      .update({
        genderName: newName
      })
      .then(() => {
        console.log(newName + " successfully updated!!!");
        list = [];
        db.collection("gender")
          .where("delete", "==", false)
          .orderBy("genderName", "asc")
          .get()
          .then((data) => {
            data.forEach((doc) => {
              list.push(doc.data());
            });
            ref.current.complete(); // linear loader to complete
            setGenderList(list);
          });
      })
      .catch((e) => console.log(e));
  };

  // update image in db
  const changeImageHandler = (genderId, newImage) => {
    ref.current.continuousStart();
    // girl image in storage replace this later, try to remove from storage and add the new image
    // https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/gender%2Fgirl.png?alt=media&token=4bfdb3ef-7894-4df1-9272-34b73c9768db
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
            .update({
              genderImage: imgUrl // post this url first to storage
            })
            .then(() => {
              console.log("Image Updated");
              // then set the state again to reload and render it again
              list = [];
              db.collection("gender")
                .where("delete", "==", false)
                .orderBy("genderName", "asc")
                .get()
                .then((data) => {
                  data.forEach((doc) => {
                    list.push(doc.data());
                  });
                  ref.current.complete(); // linear loader to complete
                  setGenderList(list);
                });
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteGenderHandler = (genderId) => {
    // - can hide and store it in bin
    // - if he clear the bin, then it will
    // be deleted from the db
    // - if he press restore, then the
    // hide status should be changed to
    // false, and it should be viewed to
    // the admin again.
    let genderDet = genderList.find((g) => {
      return g.genderId === genderId;
    });
    ref.current.continuousStart();
    db.collection("gender")
      .doc(genderId)
      .update({
        delete: true
      })
      .then(() => {
        // console.log(genderDet);
        // add data to deleteItems collections
        let id = generateId("deleted");
        db.collection("deleteItems")
          .doc(id)
          .set({
            id: id,
            genderId: genderDet.genderId,
            genderName: genderDet.genderName,
            genderImg: genderDet.genderImage,
            categoryId: "",
            categoryName: "",
            categoryImg: "",
            subcategoryId: "",
            subcategoryName: "",
            subcategoryImg: "",
            styleId: "",
            styleName: "",
            styleImg: "",
            patternId: "",
            patternName: "",
            patternImg: ""
          })
          .then(() => {
            // get data which is not deleted
            list = [];
            db.collection("gender")
              .where("delete", "==", false)
              .orderBy("genderName", "asc")
              .get()
              .then((data) => {
                data.forEach((doc) => {
                  list.push(doc.data());
                });
                ref.current.complete(); // linear loader to complete
                setGenderList(list);
                setIsDelete(false);
              });
          })
          .catch((e) => console.log(e));
      });
  };
  const viewAllCategoryHandler = (genderId, genderName, genderImg) => {
    // push to category with searchParam with gender.
    // https://32iio.csb.app/home/createNewPattern/category?gender='Men'
    props.history.push(
      `${props.match.url}/createNewPattern/category?genderId=${genderId}&genderName=${genderName}&genderImg=${genderImg}`
    );
    // console.log(params.getAll());
  };
  const addNewCategoryHandler = () => {
    // when adding new category from gender, then add that to
    // db and return back to gender itself.
    // viewAllCategory -> it show based on gender
    // setAddNewItem("category");
  };

  const addGender = () => {
    setAddNewItem("gender");
  };

  const activeIndexHandler = (index) => {
    setActiveIndex(index);
    setGender(genderList[index]);
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

  // updating image or name
  const changeSubmitHandler = () => {
    // console.log(newName, newImage);
    // update the changes in firebase
    // db.collection("gender").doc(category.genderName).collection("category");
    if (newData.img !== null && newData.name === "") {
      // console.log(gender.genderId, newData.img);
      changeImageHandler(gender.genderId, newData.img);
    } else {
      // console.log(gender.genderId, newData.name);
      changeNameHandler(gender.genderId, newData.name);
    }
    setNewData({
      name: "",
      img: null
    });
    setIsChange(false);
  };

  const draftCategoryHandler = (newData) => {
    // console.log(newData);
    ref.current.continuousStart();
    let categoryId = generateId("category");
    let bucketName = "images";
    let storageRef = firebase.storage().ref();
    let genderRef = db.collection("gender").doc(gender.genderId);
    let categoryRef = db
      .collection("gender")
      .doc(gender.genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId);
    let categoryImgRef = storageRef.child(`${bucketName}/${newData.img.name}`);
    categoryImgRef.put(newData.img).then(() => {
      categoryImgRef.getDownloadURL().then((categoryImg) => {
        categoryRef
          .set({
            genderId: gender.genderId,
            categoryId: categoryId, // genderate new category id
            categoryName: newData.name,
            categoryImage: categoryImg,
            noOfSubcategories: 0,
            noOfStyles: 0,
            delete: false,
            hide: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            // gender - no_of_categories increment
            ref.current.complete();
            genderRef.update({
              noOfCategories: firebase.firestore.FieldValue.increment(1)
            });
            props.history.push(
              `${props.match.url}/createNewPattern/category?genderId=${gender.genderId}&genderName=${gender.genderName}&genderImg=${gender.genderImg}`
            );
          });
      });
    });
  };

  const draftHandler = (newData) => {
    // hide = true;
    let genderId = generateId("gender");
    let categoryId = generateId("category");
    let subcategoryId = generateId("subcategory");
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
      .doc(subcategoryId);
    let bucketName = "images";
    let storageRef = firebase.storage().ref();
    console.log("draft handler in gender", newData);
    let genderTimestamp = null;
    let categoryTimestamp = null;
    let subcategoryTimestamp = null;
    // gender - category - subcategory;
    if (
      newData.genderName !== "" &&
      newData.genderImg !== null &&
      newData.categoryName !== "" &&
      newData.categoryImg !== null &&
      newData.subcategoryName !== "" &&
      newData.subcategoryImg !== null
    ) {
      genderTimestamp = firebase.firestore.FieldValue.serverTimestamp();
      ref.current.continuousStart();
      let genderImgRef = storageRef.child(
        `${bucketName}/${newData.genderImg.name}`
      );
      categoryTimestamp = firebase.firestore.FieldValue.serverTimestamp();
      let categoryImgRef = storageRef.child(
        `${bucketName}/${categoryTimestamp}`
      );
      subcategoryTimestamp = firebase.firestore.FieldValue.serverTimestamp();
      let subcategoryImgRef = storageRef.child(
        `${bucketName}/${subcategoryTimestamp}`
      );

      genderImgRef.put(newData.genderImg).then((snapshot) => {
        genderImgRef.getDownloadURL().then((genderImg) => {
          genderRef
            .set({
              genderId: genderId, // generate new id
              genderName: newData.genderName,
              genderImage: genderImg, // store in storage
              noOfCategories: 0,
              noOfSubcategories: 0,
              noOfStyles: 0,
              delete: false,
              hide: true,
              timestamp: genderTimestamp
            })
            .then(() => {
              // creating category
              categoryImgRef.put(newData.categoryImg).then((snapshot) => {
                categoryImgRef.getDownloadURL().then((categoryImg) => {
                  categoryRef
                    .set({
                      genderId: genderId,
                      categoryId: categoryId, // genderate new category id
                      categoryName: newData.categoryName,
                      categoryImage: categoryImg,
                      noOfSubcategories: 0,
                      noOfStyles: 0,
                      delete: false,
                      hide: true,
                      timestamp: categoryTimestamp
                    })
                    .then(() => {
                      // gender - no_of_categories increment
                      genderRef.update({
                        noOfCategories: firebase.firestore.FieldValue.increment(
                          1
                        )
                      });

                      // creating subcategory
                      subcategoryImgRef
                        .put(newData.subcategoryImg)
                        .then((snapshot) => {
                          subcategoryImgRef
                            .getDownloadURL()
                            .then((subcategoryImg) => {
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
                                  timestamp: subcategoryTimestamp
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

                                  list = [];
                                  db.collection("gender")
                                    .where("delete", "==", false)
                                    .orderBy("genderName", "asc")
                                    .get()
                                    .then((data) => {
                                      data.forEach((doc) => {
                                        list.push(doc.data());
                                      });
                                      ref.current.complete(); // linear loader to complete
                                      setGenderList(list);
                                    });
                                })
                                .catch((e) => console.log(e));
                            });
                        });
                    })
                    .catch((e) => console.log(e));
                });
              });
            })
            .catch((e) => console.log(e));
        });
      });
    }
    // gender - category - !subcategory
    else if (
      newData.genderName !== "" &&
      newData.genderImg !== null &&
      newData.categoryName !== "" &&
      newData.categoryImg !== null &&
      newData.subcategoryName === "" &&
      newData.subcategoryImg === null
    ) {
      ref.current.continuousStart();
      let genderImgRef = storageRef.child(
        `${bucketName}/${newData.genderImg.name}`
      );
      let categoryImgRef = storageRef.child(
        `${bucketName}/${newData.categoryImg.name}`
      );

      genderImgRef.put(newData.genderImg).then((snapshot) => {
        genderImgRef.getDownloadURL().then((genderImg) => {
          // genderId = generateId("gender");
          genderRef
            .set({
              genderId: genderId, // generate new id
              genderName: newData.genderName,
              genderImage: genderImg, // store in storage
              noOfCategories: 0,
              noOfSubcategories: 0,
              noOfStyles: 0,
              delete: false,
              hide: true,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
              // id - update
              // category
              // categoryId = generateId("category");
              categoryImgRef.put(newData.categoryImg).then((snapshot) => {
                categoryImgRef.getDownloadURL().then((categoryImg) => {
                  categoryRef
                    .set({
                      genderId: genderId,
                      categoryId: categoryId, // genderate new category id
                      categoryName: newData.categoryName,
                      categoryImage: categoryImg,
                      noOfSubcategories: 0,
                      noOfStyles: 0,
                      delete: false,
                      hide: true,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then((categoryRef) => {
                      // gender - no_of_categories increment &&
                      genderRef.update({
                        noOfCategories: firebase.firestore.FieldValue.increment(
                          1
                        )
                      });
                      // re-render
                      list = [];
                      db.collection("gender")
                        .where("delete", "==", false)
                        .orderBy("genderName", "asc")
                        .get()
                        .then((data) => {
                          data.forEach((doc) => {
                            list.push(doc.data());
                          });
                          ref.current.complete(); // linear loader to complete
                          setGenderList(list);
                        });
                    });
                });
              });
            });
        });
      });
    }
    // gender - !category - !subcategory
    else if (
      newData.genderName !== "" &&
      newData.genderImg !== null &&
      newData.categoryName === "" &&
      newData.categoryImg === null &&
      newData.subcategoryName === "" &&
      newData.subcategoryImg === null
    ) {
      ref.current.continuousStart();
      let genderImgRef = storageRef.child(
        `${bucketName}/${newData.genderImg.name}`
      );

      genderImgRef.put(newData.genderImg).then((snapshot) => {
        genderImgRef.getDownloadURL().then((url) => {
          genderRef
            .set({
              genderId: genderId, // generate new id
              genderName: newData.genderName,
              genderImage: url, // store in storage
              noOfCategories: 0,
              noOfSubcategories: 0,
              noOfStyles: 0,
              delete: false,
              hide: true,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
              list = [];
              db.collection("gender")
                .where("delete", "==", false)
                .orderBy("genderName", "asc")
                .get()
                .then((data) => {
                  data.forEach((doc) => {
                    list.push(doc.data());
                  });
                  ref.current.complete(); // linear loader to complete
                  setGenderList(list);
                });
            });
        });
      });
    }

    setAddNewItem(null);
  };

  const hideHandler = (e) => {
    console.log(e.target.checked);
    // console.log(document.getElementById("toggle").checked);
    let genderRef = db.collection("gender").doc(gender.genderId);
    if (e.target.checked) {
      // true - show or hide(false)
      genderRef
        .update({
          hide: true
        })
        .then(() => {
          console.log("hide-false");
          list = [];
          db.collection("gender")
            .where("delete", "==", false)
            .orderBy("genderName", "asc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                list.push(doc.data());
              });
              ref.current.complete(); // linear loader to complete
              setGenderList(list);
            });
        })
        .catch((e) => console.log(e));
      // console.log();
    } else {
      // false - hide(true)
      genderRef
        .update({
          hide: false
        })
        .then(() => {
          console.log("hide-true");
          list = [];
          db.collection("gender")
            .where("delete", "==", false)
            .orderBy("genderName", "asc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                list.push(doc.data());
              });
              ref.current.complete(); // linear loader to complete
              setGenderList(list);
            });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className={style.flex_box_wrap}>
      {ReactDOM.createPortal(
        <LoadingBar color="#FF0000" ref={ref} />,
        document.getElementById("linear-loader")
      )}
      {genderList === null ? (
        <Spinner />
      ) : (
        <>
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
          {addNewItem && (
            <AddNewModal
              title={addNewItem}
              closeModal={closeModalHandler}
              // publish={publishHandler}
              draft={draftHandler}
            />
          )}
          {newModal && (
            <AddNewStyle
              title={newModal}
              newData={newData}
              closeModal={() => setNewModal(false)}
              onChange={onChangeHandler}
              saveAsDraft={draftCategoryHandler}
            />
          )}
          {isDelete && (
            <DeleteConfirmModal
              showModal={() => setIsDelete(true)}
              handleClose={() => setIsDelete(false)}
              deleteId={isDelete}
              confirmDelete={deleteGenderHandler}
            />
          )}
          <Swippers genderList={genderList} setIndex={activeIndexHandler} />
          <SwipperSub
            index={activeIndex}
            genderList={genderList}
            addGender={addGender}
            deleteGender={(id) => setIsDelete(id)}
            viewAllCategory={viewAllCategoryHandler}
            addNewCategory={() => setNewModal("Category")}
            changeNameModal={() => setIsChange("name")}
            changeImageModal={() => setIsChange("image")}
            hide={hideHandler}
            goBack={goBackHandler}
          />
        </>
      )}
    </div>
  );
};

export default Gender;
