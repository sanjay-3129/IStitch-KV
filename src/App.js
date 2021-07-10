import { Route, Switch } from "react-router";
import Home from "./Component/Admin/Home/Home";
import Login from "./Component/Admin/Login/Login";
import Signup from "./Component/Admin/Signup/Signup";
// import Preloader from "./Component/UI/Preloader/Preloader";
// import "./App.css";

const App = (props) => {
  console.log("navigator", navigator.onLine);
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
