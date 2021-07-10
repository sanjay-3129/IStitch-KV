import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import firebase from "../../../Services/firebase/firebase";
import Input from "../../UI/Input/Input";
import Wrapper from "../../../Helpers/Wrapper";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";

import style from "./Signup.module.css";

const Signup = (props) => {
  let db = firebase.firestore();
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState();
  const [userDetails, setUserDetails] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const changeHandler = (event) => {
    let val = event.target.value;
    setUserDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val
      };
    });
  };

  // new user signup
  const signUpAuth = (event) => {
    event.preventDefault();
    // console.log(event.target);
    // console.log(userDetails.password.length);
    if (userDetails.password !== userDetails.confirmPassword) {
      setError("Passwords do not match");
    } else if (
      userDetails.password === "" ||
      userDetails.confirmPassword === ""
    ) {
      setError("Enter valid passwords");
    } else if (
      userDetails.password.length < 8 ||
      userDetails.confirmPassword.length < 8
    ) {
      setError("Password length should be atleast 8.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          userDetails.email.trim(),
          userDetails.password.trim()
        )
        .then((userCred) => {
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: userDetails.name,
            photoURL: "https://www.w3schools.com/howto/img_avatar.png"
          });

          // signed-in
          const docId = userCred.user.uid;
          // store other data's in firestore
          const empId = getEmpId();
          const adminPin = empId.substring(3).toString();
          db.collection("admin_users")
            .doc(docId)
            .set({
              id: docId,
              empID: empId,
              name: userDetails.name,
              email: userDetails.email,
              phone: userDetails.phone,
              adminPIN: adminPin,
              password: userDetails.password,
              profile_image: "https://www.w3schools.com/howto/img_avatar.png"
            })
            .then((docRef) => console.log("successfully updated to firestore."))
            .catch((e) => console.log(e, "firestore"));
        })
        .catch((e) => console.log(e, "create_authentication"));
      // other things
      setError("");
      setErrorModal({
        title: "Successful Registered!!!",
        message: `Hi ${userDetails.name}, click okay button to continue to login page.`
      });
      setUserDetails({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  const getEmpId = (event) => {
    let rand = Math.random() * 10000;
    let round = Math.ceil(rand);
    // console.log(rand, round);
    return "EMP" + round;
  };

  const errorHandler = () => {
    setErrorModal(null);
    props.history.replace("/");
  };

  // to check spinner
  // const signupSpinner = () => {};

  return (
    <Wrapper>
      {errorModal && (
        <ErrorModal
          title={errorModal.title}
          message={errorModal.message}
          onConfirm={errorHandler}
        />
      )}
      <div className={style.Signup}>
        <h1>Signup</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={signUpAuth} method="post">
          <Input
            type="text"
            label="Name"
            id="name"
            name="name"
            onChange={changeHandler}
            placeholder="Enter name"
            Value={userDetails.name}
          />
          <Input
            type="email"
            label="Email address"
            id="email"
            name="email"
            placeholder="Enter email"
            text="We'll never share your email with anyone else."
            isText="true"
            onChange={changeHandler}
            Value={userDetails.email}
          />
          <Input
            type="tel"
            label="Phone Number"
            id="phone"
            name="phone"
            placeholder="Enter Phone no."
            onChange={changeHandler}
            Value={userDetails.phone}
          />
          <Input
            type="password"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            Value={userDetails.password}
          />
          <Input
            style={{ display: "inline" }}
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            Value={userDetails.confirmPassword}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br />
          <br />
          <p style={{ display: "inline" }}>Already Logged in? </p>
          <a className={style.Link} href="/">
            Login
          </a>
        </form>
      </div>
    </Wrapper>
  );
};

export default Signup;
