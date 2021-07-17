import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Patterns.css";
import $ from "jquery";
import Info from "./Info";
import InfoBox from "./InfoBox";
import Spinner from "../../../../UI/Spinner/Spinner";
import DeleteConfirmModal from "../../../../UI/DeleteConfirmModal/DeleteConfirmModal";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";
import LoadingBar from "react-top-loading-bar";
import generateId from "../../../../../Helpers/generateId";
import firebase from "../../../../../Services/firebase/firebase";
import qs from "qs";

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
  const [patterns, setPatterns] = useState({
    patternsId: "",
    patternsName: "",
    patternsImage: "",
    hide: false,
    delete: false,
    genderId: "",
    categoryId: "",
    subCategoryId: "",
    styleId: ""
  });
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });

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
    // get category & subcateogry from query param
    console.log(
      "--------------",
      genderName,
      categoryName,
      subcategoryName,
      styleName
    );
    if (genderId !== undefined) {
      // get only categories specific to gender
      console.log("inside if");
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
        .get()
        .then((sub) => {
          if (sub.docs.length > 0) {
            console.log("---------", sub.docs.length);
            // subcollection exists
            let list = [];
            sub.forEach((subDoc) => {
              list.push(subDoc.data());
            });
            setPatternsList(list);
            setPatterns(list[0]);
          } else {
            // subcollection not exists
            // new pattern form
            setPatternsList("form");
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log("cliked directly");
      db.collection("patterns")
        .where("delete", "==", false)
        .get()
        .then((data) => {
          let list = [];
          data.forEach((doc) => {
            list.push(doc.data());
          });
          ref.current.complete(); // linear loader to complete

          setPatternsList(list);
          setPatterns(list[0]);
        });

      // setPatternsList("empty");
    }
  }, []);

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

  const changeNameHandler = (patternId, newName) => {
    ref.current.continuousStart();
    console.log("subcategory name updated", genderId);
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
      .doc(patternId)
      .update({
        patternName: newName
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
            ref.current.complete(); // linear loader to complete
            setPatternsList(list);
            setPatterns(list.find((l) => l.patternId === patternId));
            // console.log(list.find((l) => l.categoryId === categoryId));
          });
      })
      .catch((e) => console.log(e));
  };

  const changeImageHandler = (patternId, newImage) => {
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
            .collection("styles")
            .doc(styleId)
            .collection("patterns")
            .doc(patternId)
            .update({
              patternImage: imgUrl // post this url first to storage
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
                  ref.current.complete(); // linear loader to complete
                  setPatternsList(list);
                  setPatterns(list.find((l) => l.patternId === patternId));
                });
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const changeSubmitHandler = () => {
    // console.log(newName, newImage);
    // update the changes in firebase
    // db.collection("gender").doc(category.genderName).collection("category");
    if (newData.img !== null && newData.name === "") {
      changeImageHandler(patterns.patternId, newData.img);
    } else {
      changeNameHandler(patterns.patternId, newData.name);
    }
    setNewData({
      name: "",
      img: null
    });
    setIsChange(false);
  };

  const deletePatternHandler = (patternId) => {
    ref.current.continuousStart();
    let patternDet = patternsList.find((g) => {
      return g.patternId === patternId;
    });
    console.log("subcategory name updated", genderId);
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
      .doc(patternId)
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
            subcategoryId: subcategoryId,
            subcategoryName: subcategoryName,
            subcategoryImg: "",
            styleId: styleId,
            styleName: styleName,
            styleImg: "",
            patternId: patternDet.patternId,
            patternName: patternDet.patternName,
            patternImg: patternDet.patternImage
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
                ref.current.complete(); // linear loader to complete
                if (list.length > 0) {
                  setPatternsList(list);
                  setPatterns(list[0]);
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
  };

  const selectedPatternsHandler = (patterns) => {
    setPatterns(patterns);
  };

  const draftHandler = (newData) => {
    console.log(newData);
    let patternId = generateId("patterns");
    // let genderRef = db.collection("gender").doc(genderId);
    // let categoryRef = db
    //   .collection("gender")
    //   .doc(genderId)
    //   .collection("mainProduct")
    //   .doc("categories")
    //   .collection("category")
    //   .doc(categoryId);
    // let subcategoryRef = db
    //   .collection("gender")
    //   .doc(genderId)
    //   .collection("mainProduct")
    //   .doc("categories")
    //   .collection("category")
    //   .doc(categoryId)
    //   .collection("subcategory")
    //   .doc(subcategoryId);
    // let styleRef = db
    //   .collection("gender")
    //   .doc(genderId)
    //   .collection("mainProduct")
    //   .doc("categories")
    //   .collection("category")
    //   .doc(categoryId)
    //   .collection("subcategory")
    //   .doc(subcategoryId)
    //   .collection("styles")
    //   .doc(styleId);
    let patternRef = db
      .collection("gender")
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
      .doc(patternId);
    let bucketName = "images";
    let storageRef = firebase.storage().ref();
    console.log("draft handler in patterns", newData);
    if (newData.name !== "" && newData.img !== null) {
      ref.current.continuousStart();
      let patternImgRef = storageRef.child(`${bucketName}/${newData.img.name}`);
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
              price: 450, // get input and make it as dynamic
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
              // add the above patterns to the seperate patterns collection
              db.collection("patterns")
                .doc(patternId)
                .set({
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
                  price: 450, // get input and make it as dynamic
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((data) => {
                  // to render client side

                  let list = [];
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
                    .get()
                    .then((data) => {
                      data.forEach((doc) => {
                        list.push(doc.data());
                        // console.log("Patterns-464", doc.data());
                      });
                      ref.current.complete(); // linear loader to complete

                      setPatternsList(list);
                      setPatterns(list[0]);
                    });
                });
            });
        });
      });
    }
  };

  let pattern = null;
  if (patternsList === null) {
    pattern = <Spinner />;
  }
  // else if (patternsList === "empty") {
  //   // pattern = <h1>No patterns available</h1>;
  //   let list = [];
  //   db.collection("patterns")
  //     .where("delete", "==", false)
  //     .get()
  //     .then((data) => {
  //       console.log("qqqqqqqq", data);

  //       data.forEach((doc) => {
  //         list.push(doc.data());
  //       });
  //       ref.current.complete(); // linear loader to complete

  //       setPatternsList(list);
  //       setPatterns(list[0]);
  //     });
  // }
  else if (patternsList === "form") {
    pattern = (
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
          />
          <br />
          <br />
          <button
            type="submit"
            className="draft"
            onClick={() => draftHandler(newData)}
          >
            Save as draft
          </button>
          <br />
          <br />
          <button
            type="submit"
            className="publish"
            onClick={() => alert("need to add func")}
          >
            Publish
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
    );
  } else if (patternsList === "subcollection_empty") {
    pattern = <h1>No subcollection available</h1>;
  } else {
    pattern = (
      <>
        <Info
          patternsList={patternsList}
          selectedPatterns={selectedPatternsHandler}
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
          goBack={goBackHandler}
          deleteHandler={(id) => setIsDelete(id)}
          saveAsDraft={draftHandler}
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

// db.collection("patterns")
//               .doc(patternId)
//               .set()
//               .then((data) => {
//                 let list = [];
//                 data.forEach((doc) => {
//                   list.push(doc.data());
//                 });
//                 ref.current.complete(); // linear loader to complete
//                 if (list.length > 0) {
//                   setPatternsList(list);
//                   setPatterns(list[0]);
//                 } else {
//                   setPatternsList("subcollection_empty");
//                   goBackHandler(); // if no pattern is available
//                 }
//                 setIsDelete(null);
//                 // console.log(list.find((l) => l.categoryId === categoryId));
//               });
//           })
//           .catch((e) => console.log(e));
//       })
//       .catch((e) => console.log(e));

// const directpattern = (patternId, patternImg) => {
//   db.collection("gender")
//     .doc(genderId)
//     .collection("mainProduct")
//     .doc("categories")
//     .collection("category")
//     .doc(categoryId)
//     .collection("subcategory")
//     .doc(subcategoryId)
//     .collection("styles")
//     .doc(styleId)
//     .collection("patterns")
//     .doc(patternId)
//     .set({
//       genderId: genderId,
//       categoryId: categoryId,
//       subcategoryId: subcategoryId,
//       styleId: styleId,
//       patternId: patternId, // genderate new pattern id
//       patternName: newData.name,
//       patternImage: patternImg,
//       delete: false,
//       hide: true,
//       price: 450 // get input and make it as dynamic
//     })
//     .then(() => {
//       db.collection("patterns").doc(patternId).set({
//         genderId: genderId,
//         categoryId: categoryId,
//         subcategoryId: subcategoryId,
//         styleId: styleId,
//         patternId: patternId, // genderate new pattern id
//         patternName: newData.name,
//         patternImage: patternImg,
//         delete: false,
//         hide: true,
//         price: 450 // get input and make it as dynamic
//       });
//     });
// };
