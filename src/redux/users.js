import * as ActionTypes from './ActionTypes';
import { API } from '../api/api';

const checkUserLogin = (id, callback)=>async (dispatch)=>{
    let users;
    let signedUserComplete;
    let signinedUser;
    let isUserMatch=false;
    // (async function () {
        const url = API.AUTH.REGISTER;
        try {
            const response = await fetch(url);
            console.log("checkUserLogin data", response);
            users=response.data;
            // isUserMatch = users.some((e, i) => {
            //     if (e.email === signinedUser.email && e.password === signinedUser.password) {
            //         console.log(e.email, signinedUser.email, e.password, signinedUser.password, e.email === signinedUser.email, e.password === signinedUser.password)
            //         e.active=1;
            //         signedUserComplete = e
            //         console.log("Inside", signedUserComplete)
            //     }
            //     return e.email === signinedUser.email && e.password === signinedUser.password
            // })
            dispatch(signinUserFinal(signedUserComplete,users,isUserMatch))
            
        } catch {
            console.log("Issue in posting data")
        }
    // })();
}
const signinUserFinal =(signedUserComplete,users,isUserMatch)=>{
    return {
        type: ActionTypes.SIGIN_USER,
        payload: {signedUserComplete, users, isUserMatch}
    }
}
// checkUserLogin();
export const Users = (state = {
    users: [], // initial state
    isUserLogin: false, // initial state
    loginedUser: { email: '', password: '', firstname: '', lastname: '', password: '' }
}, action) => {
    switch (action.type) {
        // add new user
        case ActionTypes.Add_USER:
            let user = action.payload;
            let length = state.users.length;
            user.id = length+1;
            return { ...state, users: state.users.concat(user) };

        // signin user
        case ActionTypes.SIGIN_USER:
            let signedUserComplete = action.payload.signedUserComplete;
            let isUserMatch = action.payload.isUserMatch;
            state.users=action.payload.users;
            console.log("signedUserComplete", signedUserComplete, isUserMatch)
            console.log("nayadata", state.users)
            return { ...state, users: state.users, isUserLogin: isUserMatch, loginedUser: signedUserComplete };
        case ActionTypes.SIGNOUT_USER:
            return { ...state, users: state.users, isUserLogin: false, loginedUser: { email: '', password: '', firstname: '', lastname: '', password: '' } };
        default:
            return state;
    }
}