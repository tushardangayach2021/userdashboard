import { API } from '../api/api';
import { fetch, post, remove } from '../api/httpClient';
import * as ActionTypes from './ActionTypes';
            
// actions
export const signupUser = (user) => {
    user.active=0;
    (async function () {
        const url = API.AUTH.REGISTER;
        try {
            const response = await post(url, user);
            console.log(response.data, "on post")
            user=response.data;
            console.log("user data respose", user);
        } catch {
            console.log("Issue in posting data")
        }
    })();
    console.log("user data out", user);

    return {
        type: ActionTypes.Add_USER,
        payload: user
    }
};
export const checkUserLogin = ()=>dispatch=>{
    let users;
    let signedUserComplete;
    let isUserMatch=false;
    (async function () {
        const url = API.AUTH.REGISTER;
        try {
            const response = await fetch(url);
            console.log(response);
            users=response.data;
            isUserMatch = users.some((e, i) => {
                    if(e.active===1){
                        signedUserComplete = e;
                    }
                    console.log("Inside signinUserFinal", signedUserComplete)
                
                return e.active===1
            })
            console.log("checkUserLogin", signedUserComplete,users,isUserMatch)
            dispatch(signinUserFinal(signedUserComplete,users,isUserMatch))
            
        } catch {
            console.log("Issue in posting data")
        }
    })();
}
const signinUserFinal =(signedUserComplete,users,isUserMatch)=>{
    return {
        type: ActionTypes.SIGIN_USER,
        payload: {signedUserComplete,users,isUserMatch}
    }
}
export const signinUser = (user)=>(dispatch) => {
    let users;
    let signedUserComplete;
    let signinedUser = user;
    let isUserMatch=false;
    (async function (user) {
        const url = API.AUTH.REGISTER;
        try {
            const response = await fetch(url);
            console.log(response);
            users=response.data;
            isUserMatch = users.some((e, i) => {
                if (e.email === signinedUser.email && e.password === signinedUser.password) {
                    console.log(e.email, signinedUser.email, e.password, signinedUser.password, e.email === signinedUser.email, e.password === signinedUser.password)
                    e.active=1;
                    signedUserComplete = e
                    console.log("Inside", signedUserComplete)
                }
                return e.email === signinedUser.email && e.password === signinedUser.password
            })
            dispatch(signinUserFinal(signedUserComplete,users,isUserMatch))
            
        } catch {
            console.log("Issue in posting data")
        }
    })(user);
    console.log("userdet in action", {signedUserComplete,users,isUserMatch})
    // return {
    //     type: ActionTypes.SIGIN_USER,
    //     payload: {signedUserComplete,users,isUserMatch}
    // }
};
export const signoutUser = () => {
    let newusers;
    (async function () {
        const url = API.AUTH.REGISTER;
        try {
            const response = await fetch(url);
            console.log(response);
            let users=response.data;
            newusers = users.map((e, i) =>{ e.active=0;})
            
        } catch {
            console.log("Issue in posting data")
        }
    })();
    console.log("userdet in action", {newusers})
    return {
        type: ActionTypes.SIGNOUT_USER,
    }
};
const userToUser = (user) => ({
    type: ActionTypes.Add_USER,
    payload: user
})