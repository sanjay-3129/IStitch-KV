import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Home from "./Component/Admin/Home/Home";
// import OrderDetials from "./Component/Admin/Home/Orders/OrderDetials";
import Login from "./Component/Admin/Login/Login";
import Signup from "./Component/Admin/Signup/Signup";
import { getToken } from "./Services/firebase/firebase";
// import Preloader from "./Component/UI/Preloader/Preloader";
// import "./App.css";

const App = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);
  console.log("Token found", isTokenFound);

  // console.log("navigator", navigator.onLine);
  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("Token is", data);
      }
      return data;
    }
    tokenFunc();
  }, [setTokenFound]);

  return (
    <div className="App">
      {/* <OrderDetials/> */}
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
};

export default App;

// Note:
//
// "@babel/runtime": "7.13.8",

// "devDependencies": {
// "@babel/runtime": "7.13.8", - if it is inside the devDep, then it shows warning
//   "typescript": "4.1.3"
// },
