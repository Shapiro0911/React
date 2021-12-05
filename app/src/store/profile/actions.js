export const TOGGLE_CHECKBOX = 'PROFILE:TOGGLE_CHECKBOX';
export const SIGN_IN = "PROFILE::SIGN_IN";
export const SIGN_OUT = "PROFILE::SIGN_OUT";

export const toggleCheckbox = {
    type: TOGGLE_CHECKBOX
}

export const signIn = () => ({
    type: SIGN_IN,
});

export const signOut = () => ({
    type: SIGN_OUT,
});