import React, {Suspense, useEffect} from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Users from "../containers/Users";
import { connect } from "react-redux";
import { signupUser, signinUser, signoutUser,checkUserLogin } from "../redux/ActionCreators";
import Signup from "./Signup";
import Signin from "./Signin";
import PersistentDrawerLeft from "./Header";
import Dashboard from "./dashboard/Dashboard";
// import ViewData from "./ViewData";
const mapStateToProps = (state) => {
  return {
    users: state.users,
    isUserLogin: state.users.isUserLogin,
    loginedUser: state.users.loginedUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signupUser : (firstname, lastname, email, dob, password) =>
  dispatch(signupUser(firstname, lastname, email, dob, password)),
  signinUser: (email, password)=>
  dispatch(signinUser(email, password)),
  signoutUser : ()=>
  dispatch(signoutUser()),
  checkUserLogin: ()=>dispatch(checkUserLogin()) 
});
const ViewData = React.lazy(() => import("./ViewData")); // Lazy-loaded
function Main(props) {
  return (
    <Switch>
      <Route exact path="/" component={()=><Users isUserLogin={props.isUserLogin} loginedUser={props.loginedUser} signoutUser={props.signoutUser} checkUserLogin={props.checkUserLogin} />} />
      <Route exact path="/?user_id=:id" component={()=><Users isUserLogin={props.isUserLogin} loginedUser={props.loginedUser} signoutUser={props.signoutUser} checkUserLogin={props.checkUserLogin} />} />
      {/* <Route exact path="/success" component={()=><Users isUserLogin={props.isUserLogin} loginedUser={props.loginedUser} signoutUser={props.signoutUser} checkUserLogin={props.checkUserLogin}  />} /> */}
      <Route exact path="/signup" component={()=><Signup signupUser={props.signupUser} isUserLogin={props.isUserLogin} checkUserLogin={props.checkUserLogin} />} />
      {/* <Route exact path="/signin" component={()=><Signin signinUser={props.signinUser} isUserLogin={props.isUserLogin} />} /> */}
      <Route exact path="/signin" component={()=><Signin signinUser={props.signinUser} isUserLogin={props.isUserLogin} checkUserLogin={props.checkUserLogin} />} />
      <Route exact path="/viewdata" component={()=>(<Suspense fallback={<div className="container" style={{background: "black", color: "white", height: "100vh" }}><div className="row col-md-12"><h3 className="text-center">Loading...</h3></div></div>}><ViewData /></Suspense>)} />
      <Route path="/dashboard" component={()=>(<Dashboard isUserLogin={props.isUserLogin} loginedUser={props.loginedUser} signoutUser={props.signoutUser} checkUserLogin={props.checkUserLogin} />)} />
      {/* <Redirect to="/signup" /> */}
    </Switch>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
