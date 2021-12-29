import React, {Suspense, useEffect} from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Users from "../../containers/Users";
// import { connect } from "react-redux";
// import { signupUser, signinUser, signoutUser,checkUserLogin } from "../redux/ActionCreators";
// import Signup from "./Signup";
// import Signin from "./Signin";
import PersistentDrawerLeft from "../Header";
import { Box } from "@mui/material";
import ViewData from "../ViewData";
// import ViewData from "./ViewData";

// const ViewData = React.lazy(() => import("./ViewData")); // Lazy-loaded
function Dashboard(props) {
//   const match = useRouteMatch()

  return (<>
    <PersistentDrawerLeft isUserLogin={props.isUserLogin} loginedUser={props.loginedUser} signoutUser={props.signoutUser} checkUserLogin={props.checkUserLogin} />
    <Box>
    <Switch>
        <Route exact path="/dashboard/" component={()=>(<ViewData />)} />
        <Route exact path="/dashboard/user" component={()=>(<Users isUserLogin={props.isUserLogin} loginedUser={props.loginedUser} signoutUser={props.signoutUser} checkUserLogin={props.checkUserLogin} />)} />
    </Switch>
    </Box>
      </>
  );
}

export default Dashboard;
