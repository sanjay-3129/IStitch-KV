import React, { useEffect, useState } from "react";
import firebase from "../../../../Services/firebase/firebase";
// import Spinner from "react-loader-spinner";
// import Spinner from "../../../UI/Spinner/Spinner";
import Skeleton from "react-loading-skeleton";
import DeleteCard from "../../../UI/Card/DeleteCard";

const MyBin = (props) => {
  const db = firebase.firestore();
  const [deletedItemsList, setDeletedItemsList] = useState(null);
  const [mainItem, setMainItem] = useState({
    item: "",
    itemImg: ""
  });

  useEffect(() => {
    getAllDeletedItems();
  }, []);

  const getAllDeletedItems = () => {
    db.collection("deleteItems")
      .get()
      .then((docs) => {
        // console.log("docs.length", docs.size);
        if (docs.size > 0) {
          // docs exists
          let list = [];
          docs.forEach((doc) => {
            let item = doc.data();
            list.push(item);
            if (item.genderImage !== "") {
              // gender
              setMainItem({
                item: "gender",
                itemImg: item.genderImage
              });
            } else if (item.categoryImage !== "") {
              // category
              setMainItem({
                item: "category",
                itemImg: item.categoryImage
              });
            } else if (item.subcategoryImage !== "") {
              // subcategory
              setMainItem({
                item: "subcategory",
                itemImg: item.subcategoryImage
              });
            } else if (item.styleImage !== "") {
              // style
              setMainItem({
                item: "style",
                itemImg: item.styleImage
              });
            } else {
              // pattern
              setMainItem({
                item: "pattern",
                itemImg: item.patternImage
              });
            }
          });
          setDeletedItemsList(list);
        } else {
          // console.log("Im in else");
          // docs not exists
          // docs not deleted yet
          setDeletedItemsList("empty");
        }
      })
      .catch((e) => console.log(e));
  };

  const restoreDeletedItem = (deleteItemDetail) => {
    // gender
    if (mainItem.item === "gender") {
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .update({
          delete: false
        })
        .then(() => {
          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => {
              console.log("document deleted successfully");
              getAllDeletedItems();
            });
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "category") {
      // category
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .update({
          delete: false
        })
        .then(() => {
          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => getAllDeletedItems());
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "subcategory") {
      // subcategory
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .collection("subcategory")
        .doc(deleteItemDetail.subcategoryId)
        .update({
          delete: false
        })
        .then(() => {
          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => getAllDeletedItems());
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "style") {
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
        .update({
          delete: false
        })
        .then(() => {
          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => getAllDeletedItems());
        })
        .catch((e) => console.log(e));
    } else {
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
        .update({
          delete: false
        })
        .then(() => {
          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => getAllDeletedItems());
        })
        .catch((e) => console.log(e));
    }
  };

  const permanentlyDeleteItem = (deleteItemDetail) => {
    // gender
    
    if (mainItem.item === "gender") {
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .delete()
        .then(() => {
          // delete that from the deleteItems
          console.log("Your subcollections also deleted!!!");
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => getAllDeletedItems());
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "category") {
      // category
      db.collection("gender")
        .doc(deleteItemDetail.genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(deleteItemDetail.categoryId)
        .delete()
        .then(() => {
          // delete that from the deleteItems
          console.log("Your subcollections also deleted!!!");
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => getAllDeletedItems());
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "subcategory") {
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
          // delete that from the deleteItems
          console.log("Your subcollections also deleted!!!");
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => getAllDeletedItems());
        })
        .catch((e) => console.log(e));
    } else if (mainItem.item === "style") {
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
          console.log("Your subcollections also deleted!!!");
          // delete that from the deleteItems
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => getAllDeletedItems());
        })
        .catch((e) => console.log(e));
    } else {
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
          // delete that from the deleteItems
          console.log("Your subcollections also deleted!!!");
          db.collection("deleteItems")
            .doc(deleteItemDetail.id)
            .delete()
            .then(() => getAllDeletedItems());
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
      <DeleteCard
        mainImg={mainItem.itemImg}
        items={deletedItemsList}
        restore={restoreDeletedItem}
        delete={permanentlyDeleteItem}
      />
    );
  }

  return (
    <div className="row m-0 p-2">
      {/* <h1>Hi MyBin</h1> */}
      {Bin}
    </div>
  );
};

export default MyBin;
