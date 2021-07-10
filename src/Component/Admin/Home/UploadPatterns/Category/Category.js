import React, { useEffect, useState } from "react";
import qs from "qs";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import Info from "./Info";
import InfoBox from "./InfoBox";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";

let genderId = undefined;
let genderName = undefined;
const db = firebase.firestore();

const Category = (props) => {
  // if category is clicked directly show all categories from all genders
  // if category is clicked from gender, show only categories based on that gender
  const [categoryList, setCategoryList] = useState(null); // category list from db
  const [isChange, setIsChange] = useState(null); // for modal
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });
  // let list = [];
  const [category, setCategory] = useState({
    categoryId: "",
    categoryName: "",
    categoryImage: "",
    hide: false,
    delete: false,
    genderId: ""
  });

  useEffect(() => {
    // getting query parameters through Links
    genderId = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).genderId;
    genderName = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).genderName;

    if (genderId !== undefined) {
      // get only categories specific to gender
      db.collection("gender")
        .doc(genderId)
        .collection("mainProduct")
        .doc("categories")
        .collection("category")
        .get()
        .then((sub) => {
          if (sub.docs.length > 0) {
            // subcollection exists
            let list = [];
            sub.forEach((subDoc) => {
              list.push(subDoc.data());
            });
            setCategoryList(list);
            setCategory(list[0]);
          } else {
            // subcollection not exists
            setCategoryList("subcollection_empty");
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log("cliked directly");
      // get gender from UI - direct click
      setCategoryList("empty");
    }
  }, []);

  const viewHandler = (categoryId, categoryName) => {
    console.log("viewing subcategory");
    props.history.push(
      `${props.match.url}/createNewPattern/subCategory?genderId=${genderId}&genderName=${genderName}&categoryId=${categoryId}&categoryName=${categoryName}`
    );
  };

  const addNewHandler = () => {
    props.addNewSubCategory();
  };

  const selectedCategoryHandler = (category) => {
    setCategory(category);
  };

  // for newName updating, two-way binding
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
  //to change category name
  const changeNameHandler = (categoryId, newName) => {
    console.log("category name updated", genderId);
    db.collection("gender")
      .doc(genderId)
      .collection("mainProduct")
      .doc("categories")
      .collection("category")
      .doc(categoryId)
      .update({
        categoryName: newName
      })
      .then(() => console.log(newName + " successfully updated!!!"))
      .catch((e) => console.log(e));
  };

  // updating image or name
  const changeSubmitHandler = () => {
    // console.log(newName, newImage);
    // update the changes in firebase
    // db.collection("gender").doc(category.genderName).collection("category");
    if (newData.img !== null && newData.name === "") {
      console.log(category.genderId, category.categoryName, newData.img);
    } else {
      console.log(category.genderId, category.categoryName, newData.name);
    }
    setNewData({
      name: "",
      img: null
    });
    setIsChange(false);
  };

  let categories = null;
  if (categoryList === null) {
    categories = <Spinner />;
  } else if (categoryList === "empty") {
    // no categor availble
    categories = <h1>No categories available</h1>;
  } else if (categoryList === "subcollection_empty") {
    categories = <h1>No subcollection available</h1>;
  } else {
    categories = (
      <>
        <Info
          categoryList={categoryList}
          selectedCategory={selectedCategoryHandler}
        />
        <InfoBox
          title="Category"
          genderName={genderName}
          categoryDetails={category}
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
      {/* {categories} */}
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
      {categories}
    </div>
  );
};

export default Category;

// let list = [
//   {
//     categoryId: 1,
//     categoryName: "Casuals",
//     categoryImage:
//       "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/gender%2Fmen.png?alt=media&token=c9cfa4ab-6ca3-482c-8bb8-7bdb415a9417",
//     hide: false,
//     delete: false,
//     genderName: "Boy"
//   },
//   {
//     categoryId: 2,
//     categoryName: "Tops",
//     categoryImage:
//       "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624093452349.jpg?alt=media&token=cb9a34e9-a82c-4311-9b38-0e150fdb5768",
//     hide: false,
//     delete: false,
//     genderName: "Girl"
//   },
//   {
//     categoryId: 3,
//     categoryName: "Saree",
//     categoryImage:
//       "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/gender%2Fmen.png?alt=media&token=c9cfa4ab-6ca3-482c-8bb8-7bdb415a9417",
//     hide: false,
//     delete: false,
//     genderName: "Women"
//   },
//   {
//     categoryId: 4,
//     categoryName: "Shirt",
//     categoryImage:
//       "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624544801719.jpg?alt=media&token=ffd6c624-2fb0-4514-a8e9-500a6c004e48",
//     hide: false,
//     delete: false,
//     genderName: "Men"
//   }
// ];
