import { API } from '../api/api';
import { fetch, patch, post, remove } from '../api/httpClient';
import localStorageService from '../api/localStorageService';
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
export const checkUserLogin = ()=> async ()=>{
    let users; 
    let signedUserComplete;
    let isUserMatch=false;
    // console.log("id:",id)
    const id= localStorageService.getUserId()
    console.log("id:",id)

        const url = API.AUTH.REGISTER;
        try {
            const response = await fetch(url);
            users=response.data;
            console.log("In checkUserLogin", response.data, users[parseInt(id)-1]);
            return {isUserLogin: users[parseInt(id)-1].active, userLogin: users[parseInt(id)-1].active?users[parseInt(id)-1]:{}}
            // console.log("checkUserLogin", signedUserComplete,users,isUserMatch)
        } catch {
            console.log("Issue in posting data")
        }
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
};
export const signoutUser = ()=> async () => {
        const url = API.AUTH.REGISTER;
        const id = localStorageService.getUserId();
    try {
        const response1 = await fetch(url+'/'+id);
        response1.data.active=0;
        let user_detail = response1.data;
        console.log("user_detail",user_detail)
        const response2 = await patch(url+'/'+id, user_detail);
        console.log(response1, response2);
        window.location.href = 'http://localhost:3001/signin/?href=' + "http://localhost:3000/dashboard/user";

    } catch{
        console.log()
    }
};
const userToUser = (user) => ({
    type: ActionTypes.Add_USER,
    payload: user
})