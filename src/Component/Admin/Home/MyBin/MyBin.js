import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import firebase from "../../../../Services/firebase/firebase";
// import Spinner from "react-loader-spinner";
// import Spinner from "../../../UI/Spinner/Spinner";
import LoadingBar from "react-top-loading-bar";
import Skeleton from "react-loading-skeleton";
import DeleteCard from "../../../UI/Card/DeleteCard";
// import qs from "qs";

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
      let subcategoryRef = db
        .collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .collection("subcategory")
        .doc(deleteItemDetail.subcategoryId);

      // get all the styles below this subcategory, s1,s2,s3
      // loop:
      // from that s1, get the deleteRelations
      // loop in deleteRelations:
      // get that relations[r1] as a style and relations from this style and filter s1
      // set that filteredItems to the deleteRelations[r1]
      // should get the style and relation details before the subcategory is deleted, else there will be no data, bcs it is deleted from the subcategory

      subcategoryRef
        .collection("styles")
        .get()
        .then((docs) => {
          // getting all styles
          let style = null;
          // styles loop
          docs.forEach((doc) => {
            style = doc.data();
            console.log("styleId", style.styleId);
            let deleteRelations = style.relations;
            // myAsyncLoopFunction(deleteRelations, style);

            let relPromises = [];
            deleteRelations.forEach((rel) => {
              // let relList = [];

              relPromises.push(rel.ref.get());
              // rel.ref.get().then((doc) => {
              //   relList = doc.data().relations;
              //   console.log("relList", relList);
              //   let filteredList = relList.filter(
              //     (s) => s.styleId !== style.styleId
              //   ); // current style will be removed
              //   console.log("filteredList", style.styleId, filteredList);
              // });
              // rel.ref
              //     .update({
              //       relations: filteredList
              //     })
              //     .then(() => console.log("successfullty update"))
              //     .catch((e) => console.log("deleteRelations", e));
            });
            Promise.all(relPromises).then((promiseValues) => {
              promiseValues.forEach((doc) => {
                let relList = doc.data().relations;
                console.log("relList", relList);
                let filteredList = relList.filter(
                  (s) => s.styleId !== style.styleId
                ); // current style will be removed
                console.log("filteredList", style.styleId, filteredList);
                // });
                // rel.ref
                //   .update({
                //     relations: filteredList
                //   })
                //   .then(() => console.log("successfullty update"))
                //   .catch((e) => console.log("deleteRelations", e));
              });
            });
          }); // end of deleteRelations loop
        }); // end of docs.forEach
      // console.log("endOfForeach-styles");
      // });
      // console.log("outOfThen-deleteSubcategory");

      // delete subcategory
      // subcategoryRef
      //   .delete()
      //   .then(() => {
      //     ref.current.complete();
      //     // delete that from the deleteItems
      //     console.log("Your subcollections also deleted!!!");
      //     db.collection("deleteItems")
      //       .doc("deletedItems")
      //       .update({
      //         items: filtered
      //       })
      //       .then(() => {
      //         getAllDeletedItems();
      //         storageRef
      //           .refFromURL(deleteItemDetail.subcategoryImg)
      //           .delete()
      //           .then(() =>
      //             console.log("image deleted successfullty, MyBin.js[313]")
      //           );
      //       });
      //   })
      //   .catch((e) => console.log(e));
    } else if (mainItem.item === "style") {
      let filtered = deletedItemsList.filter((delId) => {
        return deleteItemDetail.styleId !== delId.styleId;
      });

      // style
      let styleRef = db
        .collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .collection("subcategory")
        .doc(deleteItemDetail.subcategoryId)
        .collection("styles")
        .doc(deleteItemDetail.styleId);

      // get the relations and delete this particular style from that relations
      let deleteRelations = [];
      // 1 read
      styleRef
        .get()
        .then((doc) => {
          deleteRelations = doc.data().relations;
          // console.log("538", deleteRelations, doc.data());
          // atlast
          // now go into each relation and delete that particular data
          // n(deleteRelations) -> nReads + nWrites  [eg: 5 -> 5reads + 5writes = 10]
          deleteRelations.forEach((rel) => {
            let relList = [];
            rel.ref.get().then((doc) => {
              relList = doc.data().relations;
              console.log("relList", relList);
              let filteredList = relList.filter(
                (s) => s.styleId !== deleteItemDetail.styleId
              ); // current style will be removed
              console.log("filteredList", filteredList);

              rel.ref
                .update({
                  relations: filteredList
                })
                .then(() => console.log("successfullty update"))
                .catch((e) => console.log("deleteRelations", e));
            });
          }); // end
          // after clearing the style from those relations delete this particular style
          styleRef
            .delete() // 1 write - delete
            .then(() => {
              ref.current.complete();
              console.log("Your subcollections also deleted!!!");
              // delete that from the deleteItems
              db.collection("deleteItems")
                .doc("deletedItems")
                .update({
                  // 1 write - update
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

  // const subcategoryDeleteHelper = async (rel, relList, style, func) => {
  //   await rel.ref.get().then((doc) => {
  //     relList = doc.data().relations;
  //     console.log("relList", relList);
  //     let filteredList = relList.filter((s) => s.styleId !== style.styleId); // current style will be removed
  //     console.log("filteredList", style.styleId, filteredList);
  //     // return filteredList;
  //     func(filteredList);
  //   });
  // };
  // const subcategoryDeleteHelper = async (rel, style) => {
  //   return new Promise((resolve, reject) => {
  //     rel.ref.get().then((doc) => {
  //       let relList = doc.data().relations;
  //       console.log("relList", relList);
  //       let filteredList = relList.filter((s) => s.styleId !== style.styleId); // current style will be removed
  //       console.log("filteredList", style.styleId, filteredList);
  //       // return filteredList;
  //       // rel.ref
  //       //   .update({
  //       //     relations: filteredList
  //       //   })
  //       //   .then(() => console.log("successfullty update"))
  //       //   .catch((e) => console.log("deleteRelations", e));
  //     });
  //   });
  // };
  // const myAsyncLoopFunction = async (deleteRelations, style) => {
  //   const promises = deleteRelations.map((rel) =>
  //     subcategoryDeleteHelper(rel, style)
  //   );
  //   await Promise.all(promises);
  //   console.log(`All async tasks complete!`);
  // };

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
