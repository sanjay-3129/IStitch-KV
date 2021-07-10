import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// import qs from "qs";
import IdleTimerContainer from "./IdleTimerContainer.js";

import SideBar from "./Sidebar/Sidebar.js";
import NavBar from "./Navbar/Navbar";
import MyProfile from "./MyProfile/MyProfile";
import MyUploads from "./MyUploads/MyUploads";
import Saved from "./Saved/Saved";
import UploadPatterns from "./UploadPatterns/UploadPatterns";
import Settings from "./Settings/Settings";
import IdleTimeoutModal from "../../UI/IdleTimeoutModal/IdleTimeoutModal";
import Lottie from "react-lottie";
import * as sewing from "../../../../public/lotties/62905-sewing.json";

import firebase from "../../../Services/firebase/firebase";
import style from "./Home.module.css";

const Home = (props) => {
  // const userId = qs.parse(props.location.search, { ignoreQueryPrefix: true })
  //   .userId;
  // console.log(userId, "ujserId");
  const [loading, setloading] = useState(undefined);
  const [userDetail, setUserDetail] = useState(null);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [isTimedout, setIsTimedout] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        // const email = user.email;
        // const uid = user.uid;
        // console.log(email, uid, user.displayName);
        let userDet = {
          email: user.email,
          uid: user.uid,
          name: user.displayName,
          profile_image: user.photoURL
        };
        localStorage.setItem("userDetail", JSON.stringify(userDet)); // for safety purpose
        setUserDetail(userDet);
      } else {
        console.log("no user logged in");
        props.history.replace("/");
      }
    });
    setTimeout(() => {
      setloading(true);
    }, 2000);
  }, []);

  const logoutHandler = () => {
    setShowTimeoutModal(false);
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signed out successfully...");
        // alert("signed out");
        props.history.replace("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: sewing.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleClose = () => {
    setShowTimeoutModal(false);
    setIsTimedout(false);
  };

  const timeoutModalHandler = () => {
    setShowTimeoutModal(true);
  };

  return (
    <>
      <IdleTimeoutModal
        showModal={showTimeoutModal}
        handleClose={handleClose}
        handleLogout={logoutHandler}
      />
      <IdleTimerContainer
        handleLogout={logoutHandler}
        timeout={isTimedout}
        timeoutModal={timeoutModalHandler}
        timedoutHandler={(bool) => {
          setIsTimedout(bool);
        }}
      />
      {!loading ? (
        <div className={style.Preloader}>
          <Lottie options={defaultOptions1} height={300} width={300} />
        </div>
      ) : (
        <div className={`container-fluid p-0 ${style.cp}`}>
          <div className="row m-0">
            <SideBar logout={logoutHandler} {...props} />

            <div className="col-md-10 col-lg-10 col-xl-10 p-0">
              <NavBar
                logout={logoutHandler}
                // userId={userId}
                // setUser={setUserHanlder}
                userDetail={userDetail}
                {...props}
              />
              {/* <MainContent {...props} /> */}
              {/* instead of mainContent - put routes here and 
      route to
      each component like myprofile, uploadCOntent etc */}
              <Switch>
                <Route path={`${props.match.url}/myProfile`}>
                  <MyProfile {...props} />
                </Route>
                <Route path={`${props.match.url}/myUploads`}>
                  <MyUploads {...props} />
                </Route>
                <Route path={`${props.match.url}/saved`}>
                  <Saved {...props} />
                </Route>
                <Route path={`${props.match.url}/createNewPattern`}>
                  <UploadPatterns {...props} />
                </Route>
                <Route path={`${props.match.url}/settings`}>
                  <Settings {...props} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
