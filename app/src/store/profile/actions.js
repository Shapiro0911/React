import { set } from "firebase/database";
import { getUserRefByID } from "../../services/firebase";

export const SIGN_IN = "PROFILE::SIGN_IN";
export const SIGN_OUT = "PROFILE::SIGN_OUT";
export const SIGN_UP = "PROFILE::SIGN_UP";

export const signInStore = (userID) => ({
    type: SIGN_IN,
    payload: userID
});

export const signUp = (userID, userInfo) => ({
    type: SIGN_UP,
    payload: { userID, userInfo }
})

export const signOut = () => ({
    type: SIGN_OUT,
});

export const signUpStore = (userID, userInfo) => (dispatch) => {
    dispatch(signUp(userID, userInfo));
    set(getUserRefByID(userID), { name: userInfo.username, email: userInfo.userEmail });
}