export const SIGN_IN = "PROFILE::SIGN_IN";
export const SIGN_OUT = "PROFILE::SIGN_OUT";

export const signInStore = (userID) => ({
    type: SIGN_IN,
    payload: userID
});

export const signOut = () => ({
    type: SIGN_OUT,
});
