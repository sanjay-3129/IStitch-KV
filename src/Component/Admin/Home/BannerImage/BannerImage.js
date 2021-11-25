import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import "./BannerImage.css";
import firebase from "../../../../Services/firebase/firebase";

const db = firebase.firestore();
const BannerImage = () => {
  const ref = useRef(null);
  const [image, setImage] = useState({
    first: {
      img: null,
      imgUrl: "",
      bannerId: "FirstImage"
    },
    second: {
      img: null,
      imgUrl: "",
      bannerId: "SecondImage"
    },
    third: {
      img: null,
      imgUrl: "",
      bannerId: "ThirdImage"
    },
    four: {
      img: null,
      imgUrl: "",
      bannerId: "FourthImage"
    }
  });

  useEffect(() => {
    // get banner Images
    let data = {
      first: {
        img: null,
        imgUrl: "",
        bannerId: "FirstImage"
      },
      second: {
        img: null,
        imgUrl: "",
        bannerId: "SecondImage"
      },
      third: {
        img: null,
        imgUrl: "",
        bannerId: "ThirdImage"
      },
      four: {
        img: null,
        imgUrl: "",
        bannerId: "FourthImage"
      }
    };
    db.collection("BannerImage")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          let banner = doc.data();

          if (banner.id.includes("First")) {
            data.first = {
              img: null,
              imgUrl: banner.imageuri,
              bannerId: banner.id
            };
          } else if (banner.id.includes("Second")) {
            data.second = {
              img: null,
              imgUrl: banner.imageuri,
              bannerId: banner.id
            };
          } else if (banner.id.includes("Third")) {
            data.third = {
              img: null,
              imgUrl: banner.imageuri,
              bannerId: banner.id
            };
          } else if (banner.id.includes("Fourth")) {
            data.four = {
              img: null,
              imgUrl: banner.imageuri,
              bannerId: banner.id
            };
          }
        });
        console.log("data", data);
        setImage(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const getFile1 = () => {
    $("#uploadButton1").on("click", function () {
      $("#img").click();
    });

    $("#img").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton1").css(
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
  const getFile2 = () => {
    $("#uploadButton2").on("click", function () {
      $("#img2").click();
    });

    $("#img2").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton2").css(
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
  const getFile3 = () => {
    $("#uploadButton3").on("click", function () {
      $("#img3").click();
    });

    $("#img3").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton3").css(
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
  const getFile4 = () => {
    $("#uploadButton4").on("click", function () {
      $("#img4").click();
    });

    $("#img4").change(function () {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#uploadButton4").css(
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

  const onChangeHandler = (event) => {
    let name = event.target.name;
    let value = null;
    if (name === "first") {
      value = event.target.files[0];
      setImage((prevState) => {
        return {
          ...prevState,
          first: {
            ...prevState.first,
            img: value
          }
        };
      });
    } else if (name === "second") {
      value = event.target.files[0];
      setImage((prevState) => {
        return {
          ...prevState,
          second: {
            ...prevState.second,
            img: value
          }
        };
      });
    } else if (name === "third") {
      value = event.target.files[0];
      setImage((prevState) => {
        return {
          ...prevState,
          third: {
            ...prevState.third,
            img: value
          }
        };
      });
    } else if (name === "four") {
      value = event.target.files[0];
      setImage((prevState) => {
        return {
          ...prevState,
          four: {
            ...prevState.four,
            img: value
          }
        };
      });
    }
  };

  const updateImageHandler = (bannerId) => {
    // ref.current.continuousStart();
    // console.log("img", image, bannerId);
    let img = null;
    let id = "";
    if (bannerId === "first") {
      id = image.first.bannerId;
      img = image.first.img;
    } else if (bannerId === "second") {
      id = image.second.bannerId;
      img = image.second.img;
    } else if (bannerId === "third") {
      id = image.third.bannerId;
      img = image.third.img;
    } else if (bannerId === "four") {
      id = image.four.bannerId;
      img = image.four.img;
    }
    if (img === null) {
      alert("Choose any image to upload!!!");
    } else {
      let bucketName = "Images";
      let storageRef = firebase.storage().ref();
      let genderTimestamp = +new Date().getTime() + "-" + img.name;
      let imgRef = storageRef.child(`${bucketName}/${genderTimestamp}`);
      imgRef
        .put(img)
        .then((snapshot) => {
          imgRef.getDownloadURL().then((imgUrl) => {
            db.collection("BannerImage")
              .doc(id)
              .update({
                imageuri: imgUrl
              })
              .then(() => {
                console.log("Image Updated");
                if (bannerId === "first") {
                  setImage((prevState) => {
                    return {
                      ...prevState,
                      first: {
                        ...prevState.first,
                        imgUrl: imgUrl
                      }
                    };
                  });
                } else if (bannerId === "second") {
                  setImage((prevState) => {
                    return {
                      ...prevState,
                      second: {
                        ...prevState.second,
                        imgUrl: imgUrl
                      }
                    };
                  });
                } else if (bannerId === "third") {
                  setImage((prevState) => {
                    return {
                      ...prevState,
                      third: {
                        ...prevState.third,
                        imgUrl: imgUrl
                      }
                    };
                  });
                } else if (bannerId === "four") {
                  setImage((prevState) => {
                    return {
                      ...prevState,
                      four: {
                        ...prevState.four,
                        imgUrl: imgUrl
                      }
                    };
                  });
                }
              });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div class="banner">
      <div class="row m-0">
        <div class="col-md-7 p-0">
          <div id="demo" class="carousel slide" data-ride="carousel">
            {/* <!-- Indicators --> */}
            <ul class="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" class="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
              <li data-target="#demo" data-slide-to="3"></li>
            </ul>

            {/* <!-- The slideshow --> */}
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  class="w-100"
                  src={image.first.imgUrl}
                  alt={image.first.bannerId}
                />
              </div>
              <div class="carousel-item">
                <img
                  class="w-100"
                  src={image.second.imgUrl}
                  alt={image.second.bannerId}
                />
              </div>
              <div class="carousel-item">
                <img
                  class="w-100"
                  src={image.third.imgUrl}
                  alt={image.third.bannerId}
                />
              </div>
              <div class="carousel-item">
                <img
                  class="w-100"
                  src={image.four.imgUrl}
                  alt={image.four.bannerId}
                />
              </div>
            </div>

            {/* <!-- Left and right controls --> */}
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
              <span class="carousel-control-next-icon"></span>
            </a>
          </div>
        </div>
        <div class="col-md-5 right-col p-0">
          <div class="upload-banner row">
            <div class="col-6">
              <div class="upload-img">
                <input
                  type="file"
                  id="img"
                  name="first"
                  accept=".gif, .jpg, .png"
                  onChange={onChangeHandler}
                />
                <label
                  onClick={() => {
                    getFile1();
                    // setImgView(true);
                  }}
                  htmlFor="img"
                  id="uploadButton1"
                  style={
                    {
                      // backgroundImage: `url('${props.img}')`
                    }
                  }
                >
                  <span>+</span>
                </label>
              </div>
              <button
                type="button"
                class="bt"
                onClick={() => updateImageHandler("first")}
              >
                Update
              </button>
            </div>
            <div class="col-6">
              <div class="upload-img">
                <input
                  type="file"
                  id="img2"
                  name="second"
                  accept=".gif, .jpg, .png"
                  onChange={onChangeHandler}
                />
                <label
                  onClick={() => {
                    getFile2();
                    // setImgView(true);
                  }}
                  htmlFor="img2"
                  id="uploadButton2"
                  style={
                    {
                      // backgroundImage: `url('${props.img}')`
                    }
                  }
                >
                  <span>+</span>
                </label>
              </div>
              <button
                type="button"
                class="bt"
                onClick={() => updateImageHandler("second")}
              >
                Update
              </button>
            </div>
            <div class="col-6">
              <div class="upload-img">
                <input
                  type="file"
                  id="img3"
                  name="third"
                  accept=".gif, .jpg, .png"
                  onChange={onChangeHandler}
                />
                <label
                  onClick={() => {
                    getFile3();
                    // setImgView(true);
                  }}
                  htmlFor="img3"
                  id="uploadButton3"
                  style={
                    {
                      // backgroundImage: `url('${props.img}')`
                    }
                  }
                >
                  <span>+</span>
                </label>
              </div>
              <button
                type="button"
                class="bt"
                onClick={() => updateImageHandler("third")}
              >
                Update
              </button>
            </div>
            <div class="col-6">
              <div class="upload-img">
                <input
                  type="file"
                  id="img4"
                  name="four"
                  accept=".gif, .jpg, .png"
                  onChange={onChangeHandler}
                />
                <label
                  onClick={() => {
                    getFile4();
                    // setImgView(true);
                  }}
                  htmlFor="img4"
                  id="uploadButton4"
                  style={
                    {
                      // backgroundImage: `url('${props.img}')`
                    }
                  }
                >
                  <span>+</span>
                </label>
              </div>
              <button
                type="button"
                class="bt"
                onClick={() => updateImageHandler("four")}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerImage;
