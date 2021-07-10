import React, { useEffect, useState } from "react";
import Swippers from "../../../../UI/Swipers/Swipers";
// import SwippersJS from "../../../../UI/Swipers/SwipersJS";
import SwipperSub from "../../../../UI/Swipers/SwiperSub";
import style from "./Gender.module.css";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";

// this will enable the book like styling - added in swiper.js
// import Swiper from "swiper/bundle";
// import Swiper styles
// import "swiper/swiper-bundle.css";
//
const db = firebase.firestore();
let list = null;

const Gender = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [isChange, setIsChange] = useState(null); // for modal
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });

  const [genderList, setGenderList] = useState(null);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    console.log("useeffect");
    list = [];
    db.collection("gender")
      .orderBy("genderName", "asc")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          list.push(doc.data());
        });
        setGenderList(list);
      });
  }, []);

  // update name in db
  const changeNameHandler = (genderId, newName) => {
    console.log("gender name updated", genderId);
    db.collection("gender")
      .doc(genderId)
      .update({
        genderName: newName
      })
      .then(() => {
        console.log(newName + " successfully updated!!!");
      })
      .catch((e) => console.log(e));
  };

  // update image in db
  const changeImageHandler = (genderId, newImage) => {
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
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteGenderHandler = (genderName) => {
    // - can hide and store it in bin
    // - if he clear the bin, then it will
    // be deleted from the db
    // - if he press restore, then the
    // hide status should be changed to
    // false, and it should be viewed to
    // the admin again.
  };
  const viewAllCategoryHandler = (genderId, genderName) => {
    // push to category with searchParam with gender.
    // https://32iio.csb.app/home/createNewPattern/category?gender='Men'
    props.history.push(
      `${props.match.url}/createNewPattern/category?genderId=${genderId}&genderName=${genderName}`
    );
  };
  const addNewCategoryHandler = (genderName) => {
    props.addNewCategoryInGender();
    // when adding new category from gender, then add that to
    // db and return back to gender itself.
    // viewAllCategory -> it show based on gender
  };

  const addGender = () => {
    props.addNewGender();
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
      console.log(gender.genderId, newData.img);
      changeImageHandler(gender.genderId, newData.img);
    } else {
      console.log(gender.genderId, newData.name);
      changeNameHandler(gender.genderId, newData.name);
    }
    // setNewData({
    //   name: "",
    //   img: null
    // });
    setIsChange(false);
  };

  return (
    <div className={style.flex_box_wrap}>
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
          <Swippers genderList={genderList} setIndex={activeIndexHandler} />
          <SwipperSub
            index={activeIndex}
            genderList={genderList}
            addGender={addGender}
            deleteGender={deleteGenderHandler}
            viewAllCategory={viewAllCategoryHandler}
            addNewCategory={addNewCategoryHandler}
            changeNameModal={() => setIsChange("name")}
            changeImageModal={() => setIsChange("image")}
          />
        </>
      )}
    </div>
  );
};

export default Gender;
