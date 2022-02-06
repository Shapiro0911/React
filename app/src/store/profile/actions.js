import { set } from "firebase/database";
import { getUserRefByID, usersRef } from "../../services/firebase";
import { onValue } from "firebase/database";

export const SIGN_IN = "PROFILE::SIGN_IN";
export const SIGN_OUT = "PROFILE::SIGN_OUT";
export const SET_PROFILE_INFO = "PROFILE::SET_PROFILE_INFO";

export const signInStore = (userID) => ({
    type: SIGN_IN,
    payload: userID
});

export const signOut = () => ({
    type: SIGN_OUT,
});

export const setProfileInfo = (userID, userInfo) => ({
    type: SET_PROFILE_INFO,
    payload: { userID, userInfo }
});

export const signUpStore = (userID, userInfo) => () => {
    set(getUserRefByID(userID), { name: userInfo.username, email: userInfo.userEmail });
}

export const initProfileTracking = (userID) => (dispatch) => {
    onValue(usersRef, (snapshot) => {
        const userInfo = {
            email: "",
            username: ""
        };
        snapshot.forEach((userSnap) => {
            if (userSnap.key === userID) {
                userInfo.email = userSnap.val().email;
                userInfo.username = userSnap.val().name;
                dispatch(setProfileInfo(userID, userInfo));
                return;
            }
        });
    })
}