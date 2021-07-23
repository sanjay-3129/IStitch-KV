import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import firebase from "../../../../Services/firebase/firebase";
// import Spinner from "react-loader-spinner";
// import Spinner from "../../../UI/Spinner/Spinner";
import LoadingBar from "react-top-loading-bar";
import Skeleton from "react-loading-skeleton";
import DeleteCard from "../../../UI/Card/DeleteCard";
import qs from "qs";

const MyBin = (props) => {
  const ref = useRef(null); // top-loader
  const db = firebase.firestore();
  const [deletedItemsList, setDeletedItemsList] = useState([]);

  useEffect(() => {
    getAllDeletedItems();
  }, []);

  const getAllDeletedItems = () => {
    db.collection("deleteItems")
      .doc("deletedItems")
      .get()
      .then((doc) => {
        // console.log("docs.length", docs.size);
        if (doc.exists) {
          // docs exists
          let list = doc.data().items;
          console.log("deltedItems", list);
          setDeletedItemsList(list);
          if (list.length === 0) {
            setDeletedItemsList("empty");
          }
        } else {
          // console.log("Im in else");
          // docs not exists
          // docs not deleted yet
          setDeletedItemsList("empty");
        }
      })
      .catch((e) => console.log(e));
  };

  const restoreDeletedItem = (deleteItemDetail, mainItem) => {
    // console.log(deleteItemDetail, mainItem);
    ref.current.continuousStart();
    if (mainItem.item === "gender") {
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .update({
          delete: false
        })
        .then(() => {
          // delete that from the deleteItems
          // db.collection("deleteItems")
          //   .doc(deleteItemDetail.id)
          //   .delete()
          //   .then(() => {
          //     console.log("document deleted successfully");
          //     getAllDeletedItems();
          //     ref.current.complete();
          //   });
          // let filteredList = deletedItemsList.filter(
          //   (delItem) => deleteItemDetail.id !== delItem.id
          // );
          // console.log("filter", filteredList);
          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: firebase.firestore.FieldValue.arrayRemove(deleteItemDetail)
              // items: filteredList
            })
            .then(() => {
              console.log("document deleted successfully");
              getAllDeletedItems();
              ref.current.complete();
            });
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "category") {
      let noOfSubcategories = 0;
      let noOfStyles = 0;
      let noOfPatterns = 0;
      let categoryRef = db
        .collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection(deleteItemDetail.type)
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId);

      // category
      categoryRef
        .update({
          delete: false
        })
        .then(() => {
          categoryRef.get().then((doc) => {
            if (doc.exists) {
              noOfSubcategories = doc.data().noOfSubcategories;
              noOfStyles = doc.data().noOfStyles;
              noOfPatterns = doc.data().noOfPatterns;
              // console.log(
              //   "Numbers",
              //   noOfSubcategories,
              //   noOfStyles,
              //   noOfPatterns
              // );
              // incrementing noOfCategories
              db.collection("gender")
                .doc(deleteItemDetail.genderId)
                .update({
                  noOfCategories: firebase.firestore.FieldValue.increment(1),
                  noOfSubcategories: firebase.firestore.FieldValue.increment(
                    noOfSubcategories
                  ),
                  noOfStyles: firebase.firestore.FieldValue.increment(
                    noOfStyles
                  ),
                  noOfPatterns: firebase.firestore.FieldValue.increment(
                    noOfPatterns
                  )
                });
            } else {
              console.log("No doc exists");
            }
          });

          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: firebase.firestore.FieldValue.arrayRemove(deleteItemDetail)
            })
            .then(() => {
              getAllDeletedItems();
              ref.current.complete();
            });
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "subcategory") {
      let noOfStyles = 0;
      let noOfPatterns = 0;
      let subcategoryRef = db
        .collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection(deleteItemDetail.type)
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .collection("subcategory")
        .doc(deleteItemDetail.subcategoryId);

      // subcategory
      subcategoryRef
        .update({
          delete: false
        })
        .then(() => {
          subcategoryRef.get().then((doc) => {
            if (doc.exists) {
              noOfStyles = doc.data().noOfStyles;
              noOfPatterns = doc.data().noOfPatterns;

              // incrementing noOfSubcategories
              db.collection("gender")
                .doc(deleteItemDetail.genderId)
                .update({
                  noOfSubcategories: firebase.firestore.FieldValue.increment(1),
                  noOfStyles: firebase.firestore.FieldValue.increment(
                    noOfStyles
                  ),
                  noOfPatterns: firebase.firestore.FieldValue.increment(
                    noOfPatterns
                  )
                });
              // incrementing noOfSubcategories
              db.collection("gender")
                .doc(deleteItemDetail.genderId)
                .collection(deleteItemDetail.type)
                .doc("categories")
                .collection("category")
                .doc(deleteItemDetail.categoryId)
                .update({
                  noOfSubcategories: firebase.firestore.FieldValue.increment(1),
                  noOfStyles: firebase.firestore.FieldValue.increment(
                    noOfStyles
                  ),
                  noOfPatterns: firebase.firestore.FieldValue.increment(
                    noOfPatterns
                  )
                });
              // delete that from the deleteItems
              db.collection("deleteItems")
                .doc("deletedItems")
                .update({
                  items: firebase.firestore.FieldValue.arrayRemove(
                    deleteItemDetail
                  )
                })
                .then(() => {
                  getAllDeletedItems();
                  ref.current.complete();
                });
            } else {
              console.log("No doc exists");
            }
          });
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "style") {
      let noOfPatterns = 0;
      let styleRef = db
        .collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection(deleteItemDetail.type)
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .collection("subcategory")
        .doc(deleteItemDetail.subcategoryId)
        .collection("styles")
        .doc(deleteItemDetail.styleId);

      // style
      styleRef
        .update({
          delete: false
        })
        .then(() => {
          styleRef.get().then((doc) => {
            if (doc.exists) {
              noOfPatterns = doc.data().noOfPatterns;
              // incrementing noOfStyles
              db.collection("gender")
                .doc(deleteItemDetail.genderId)
                .update({
                  noOfStyles: firebase.firestore.FieldValue.increment(1),
                  noOfPatterns: firebase.firestore.FieldValue.increment(
                    noOfPatterns
                  )
                });
              // incrementing noOfStyles
              db.collection("gender")
                .doc(deleteItemDetail.genderId)
                .collection(deleteItemDetail.type)
                .doc("categories")
                .collection("category")
                .doc(deleteItemDetail.categoryId)
                .update({
                  noOfStyles: firebase.firestore.FieldValue.increment(1),
                  noOfPatterns: firebase.firestore.FieldValue.increment(
                    noOfPatterns
                  )
                });
              // incrementing noOfStyles
              db.collection("gender")
                .doc(deleteItemDetail.genderId)
                .collection(deleteItemDetail.type)
                .doc("categories")
                .collection("category")
                .doc(deleteItemDetail.categoryId)
                .collection("subcategory")
                .doc(deleteItemDetail.subcategoryId)
                .update({
                  noOfStyles: firebase.firestore.FieldValue.increment(1),
                  noOfPatterns: firebase.firestore.FieldValue.increment(
                    noOfPatterns
                  )
                });

              // delete that from the deleteItems
              db.collection("deleteItems")
                .doc("deletedItems")
                .update({
                  items: firebase.firestore.FieldValue.arrayRemove(
                    deleteItemDetail
                  )
                })
                .then(() => {
                  getAllDeletedItems();
                  ref.current.complete();
                });
            } else {
              console.log("No doc exists");
            }
          });
        })
        .catch((e) => console.log(e));
    } else {
      // pattern
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection(deleteItemDetail.type)
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .collection("subcategory")
        .doc(deleteItemDetail.subcategoryId)
        .collection("styles")
        .doc(deleteItemDetail.styleId)
        .collection("patterns")
        .doc(deleteItemDetail.patternId)
        .update({
          delete: false
        })
        .then(() => {
          db.collection("patterns").doc(deleteItemDetail.patternId).update({
            delete: false
          });
          // incrementing noOfPatterns
          db.collection("gender")
            .doc(deleteItemDetail.genderId)
            .update({
              noOfPatterns: firebase.firestore.FieldValue.increment(1)
            });
          // incrementing noOfPatterns
          db.collection("gender")
            .doc(deleteItemDetail.genderId)
            .collection(deleteItemDetail.type)
            .doc("categories")
            .collection("category")
            .doc(deleteItemDetail.categoryId)
            .update({
              noOfPatterns: firebase.firestore.FieldValue.increment(1)
            });
          // incrementing noOfPatterns
          db.collection("gender")
            .doc(deleteItemDetail.genderId)
            .collection(deleteItemDetail.type)
            .doc("categories")
            .collection("category")
            .doc(deleteItemDetail.categoryId)
            .collection("subcategory")
            .doc(deleteItemDetail.subcategoryId)
            .update({
              noOfPatterns: firebase.firestore.FieldValue.increment(1)
            });
          // incrementing noOfPatterns
          db.collection("gender")
            .doc(deleteItemDetail.genderId)
            .collection(deleteItemDetail.type)
            .doc("categories")
            .collection("category")
            .doc(deleteItemDetail.categoryId)
            .collection("subcategory")
            .doc(deleteItemDetail.subcategoryId)
            .collection("styles")
            .doc(deleteItemDetail.styleId)
            .update({
              noOfPatterns: firebase.firestore.FieldValue.increment(1)
            });
          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: firebase.firestore.FieldValue.arrayRemove(deleteItemDetail)
            })
            .then(() => {
              getAllDeletedItems();
              ref.current.complete();
            });
        })
        .catch((e) => console.log(e));
    }
  };

  const permanentlyDeleteItem = (deleteItemDetail, mainItem) => {
    let storageRef = firebase.storage();
    // if (mainItem.item === "gender") {
    //   let filtered = deletedItemsList.filter(
    //     (delId) => deleteItemDetail.genderId !== delId.genderId
    //   );
    //   console.log("filterePerm", filtered);
    // } else if (mainItem.item === "category") {
    //   let filtered = deletedItemsList.filter((delId) => {
    //     return (
    //       deleteItemDetail.genderId !== delId.genderId &&
    //       deleteItemDetail.categoryId !== delId.categoryId
    //     );
    //   });
    //   console.log("filterePerm", filtered);
    // } else if (mainItem.item === "subcategory") {
    //   let filtered = deletedItemsList.filter((delId) => {
    //     return (
    //       deleteItemDetail.genderId !== delId.genderId &&
    //       deleteItemDetail.categoryId !== delId.categoryId &&
    //       deleteItemDetail.subcategoryId !== delId.subcategoryId
    //     );
    //   });
    //   console.log("filterePerm", filtered);
    // } else if (mainItem.item === "style") {
    //   let filtered = deletedItemsList.filter((delId) => {
    //     return (
    //       deleteItemDetail.genderId !== delId.genderId &&
    //       deleteItemDetail.categoryId !== delId.categoryId &&
    //       deleteItemDetail.subcategoryId !== delId.subcategoryId &&
    //       deleteItemDetail.styleId !== delId.styleId
    //     );
    //   });
    //   console.log("filterePerm", filtered);
    // } else if (mainItem.item === "patternId") {
    //   // check patternId
    //   let filtered = deletedItemsList.filter((delId) => {
    //     return (
    //       deleteItemDetail.styleId !== delId.styleId &&
    //       deleteItemDetail.patternId !== delId.patternId
    //     );
    //   });
    //   console.log("filterePerm", filtered);
    // }

    // gender
    // ref.current.continuousStart();
    if (mainItem.item === "gender") {
      let filtered = deletedItemsList.filter(
        (delId) => deleteItemDetail.genderId !== delId.genderId
      );

      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .delete()
        .then(() => {
          // delete that from the deleteItems
          ref.current.complete();
          console.log("Your subcollections also deleted!!!");

          // calculation

          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: filtered
            })
            .then(() => {
              getAllDeletedItems();
              storageRef
                .refFromURL(deleteItemDetail.genderImg)
                .delete()
                .then(() =>
                  console.log("image deleted successfullty, MyBin.js[252]")
                );
            });
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "category") {
      let filtered = deletedItemsList.filter((delId) => {
        return deleteItemDetail.categoryId !== delId.categoryId;
      });

      // category
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .delete()
        .then(() => {
          ref.current.complete();
          // delete that from the deleteItems
          console.log("Your subcollections also deleted!!!");

          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: filtered
            })
            .then(() => {
              getAllDeletedItems();
              storageRef
                .refFromURL(deleteItemDetail.categoryImg)
                .delete()
                .then(() =>
                  console.log("image deleted successfullty, MyBin.js[284]")
                );
            });
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "subcategory") {
      let filtered = deletedItemsList.filter((delId) => {
        return deleteItemDetail.subcategoryId !== delId.subcategoryId;
      });
      // subcategory
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .collection("subcategory")
        .doc(deleteItemDetail.subcategoryId)
        .delete()
        .then(() => {
          ref.current.complete();
          // delete that from the deleteItems
          console.log("Your subcollections also deleted!!!");
          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: filtered
            })
            .then(() => {
              getAllDeletedItems();
              storageRef
                .refFromURL(deleteItemDetail.subcategoryImg)
                .delete()
                .then(() =>
                  console.log("image deleted successfullty, MyBin.js[313]")
                );
            });
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "style") {
      let filtered = deletedItemsList.filter((delId) => {
        return deleteItemDetail.styleId !== delId.styleId;
      });
      // style
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .collection("subcategory")
        .doc(deleteItemDetail.subcategoryId)
        .collection("styles")
        .doc(deleteItemDetail.styleId)
        .delete()
        .then(() => {
          ref.current.complete();
          console.log("Your subcollections also deleted!!!");
          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: filtered
            })
            .then(() => {
              getAllDeletedItems();
              storageRef
                .refFromURL(deleteItemDetail.styleImg)
                .delete()
                .then(() =>
                  console.log("image deleted successfullty, MyBin.js[344]")
                );
            });
        })
        .catch((e) => console.log(e));
    } else {
      let filtered = deletedItemsList.filter((delId) => {
        return deleteItemDetail.patternId !== delId.patternId;
      });
      // pattern
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .collection("subcategory")
        .doc(deleteItemDetail.subcategoryId)
        .collection("styles")
        .doc(deleteItemDetail.styleId)
        .collection("patterns")
        .doc(deleteItemDetail.patternId)
        .delete()
        .then(() => {
          ref.current.complete();
          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc("deletedItems")
            .update({
              items: filtered
            })
            // .doc(deleteItemDetail.patternId)
            // .delete()
            .then(() => {
              db.collection("deleteItems")
                .doc(deleteItemDetail.id)
                .delete()
                .then(() => {
                  getAllDeletedItems();
                  storageRef
                    .refFromURL(deleteItemDetail.patternImg)
                    .delete()
                    .then(() =>
                      console.log("image deleted successfullty, MyBin.js[252]")
                    );
                });
            });
          // console.log("Your subcollections also deleted!!!");
        })
        .catch((e) => console.log(e));
    }
  };

  let Bin = null;
  if (deletedItemsList === null) {
    Bin = (
      <>
        <Skeleton delay={3} duration={5} />
        <Skeleton count={5} delay={3} duration={5} />
      </>
    );
  } else if (deletedItemsList === "empty") {
    Bin = <h1>No Items is deleted yet!!!</h1>;
  } else {
    Bin = (
      <>
        {deletedItemsList.map((item) => {
          return (
            <DeleteCard
              key={item.id}
              // mainImg={mainItem.itemImg}
              item={item}
              restore={restoreDeletedItem}
              delete={permanentlyDeleteItem}
            />
          );
        })}
      </>
    );
  }

  return (
    <div className="row m-0 p-2">
      {/* <h1>Hi MyBin</h1> */}
      {ReactDOM.createPortal(
        <LoadingBar color="#FF0000" ref={ref} />,
        document.getElementById("linear-loader")
      )}
      {Bin}
    </div>
  );
};

export default MyBin;
