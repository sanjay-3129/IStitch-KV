import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Info from "./Info";
import InfoBox from "./InfoBox";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import qs from "qs";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";
import LoadingBar from "react-top-loading-bar";

let genderId = undefined;
let genderName = undefined;
let categoryId = undefined;
let categoryName = undefined;

const db = firebase.firestore();

const SubCategory = (props) => {
  const ref = useRef(null);
  const [subCategoryList, setSubCategoryList] = useState(null);
  const [isChange, setIsChange] = useState(null); // for modal
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
    categoryId: ""
  });

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

    if (genderId !== undefined) {
      // get only categories specific to gender
      db.collection("gender")
        .doc(genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .doc(categoryId)
        .collection("subcategory")
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

  const addNewHandler = () => {
    props.addNewStyles();
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

  let subCategories = null;

  if (subCategoryList === null) {
    subCategories = <Spinner />;
  } else if (subCategoryList === "empty") {
    subCategories = <h1>No subcategories available</h1>;
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
          changeName={() => setIsChange("name")}
          changeImage={() => setIsChange("image")}
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
      {subCategories}
    </div>
  );
};

export default SubCategory;

// let list = [
//   {
//     subcategoryId: 1,
//     subcategoryName: "Coler neck",
//     subcategoryImage:
//       "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624125218423.jpg?alt=media&token=a32bb233-9659-4e63-b652-d7ef87bc6702",
//     hide: false,
//     delete: false,
//     genderName: "Boy",
//     categoryName: "Casuals"
//   },
//   {
//     subcategoryId: 2,
//     subcategoryName: "Front neck",
//     subcategoryImage:
//       "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624125218423.jpg?alt=media&token=a32bb233-9659-4e63-b652-d7ef87bc6702",
//     hide: false,
//     delete: false,
//     genderName: "Boy",
//     categoryName: "Casuals"
//   },
//   {
//     subcategoryId: 3,
//     subcategoryName: "Front neck",
//     subcategoryImage:
//       "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624176232536.jpg?alt=media&token=edcbbdf5-980a-4683-831f-e6172319f8c7",
//     hide: false,
//     delete: false,
//     genderName: "Girls",
//     categoryName: "Tops"
//   },
//   {
//     subcategoryId: 1,
//     subcategoryName: "bottom",
//     subcategoryImage:
//       "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624093452349.jpg?alt=media&token=cb9a34e9-a82c-4311-9b38-0e150fdb5768",
//     hide: false,
//     delete: false,
//     genderName: "Girls",
//     categoryName: "Tops"
//   }
// ];
