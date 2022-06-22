import { API_URL } from "../../utils/constants"

export const REQUEST_CHARACTERS_LOADING = "CHARACTERS::REQUEST_LOADING";
export const REQUEST_CHARACTERS_SUCCESS = "CHARACTERS::REQUEST_SUCCESS";
export const REQUEST_CHARACTERS_FAILURE = "CHARACTERS::REQUEST_FAILURE";

export const getCharactersLoading = () => ({
    type: REQUEST_CHARACTERS_LOADING
})

export const getCharactersSuccess = (characters) => ({
    type: REQUEST_CHARACTERS_SUCCESS,
    payload: characters
})

export const getCharactersFailure = (err) => ({
    type: REQUEST_CHARACTERS_FAILURE,
    payload: err
})

export const getCharacters = () => async (dispatch) => {
    dispatch(getCharactersLoading());
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error");
        }
        const result = await response.json();
        dispatch(getCharactersSuccess(result));
    } catch (err) {
        dispatch(getCharactersFailure(err.message));
    }
};