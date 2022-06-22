import { REQUEST_CHARACTERS_LOADING, REQUEST_CHARACTERS_SUCCESS, REQUEST_CHARACTERS_FAILURE } from "./actions";
import { REQUEST_STATUS } from "../../utils/constants";

const initialState = {
    charactersList: [],
    request: {
        status: REQUEST_STATUS.IDLE,
        error: '',
    }
}

export const charactersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case REQUEST_CHARACTERS_LOADING: {
            return {
                ...state,
                request: {
                    ...state.request,
                    status: REQUEST_STATUS.LOADING
                }
            }
        }
        case REQUEST_CHARACTERS_SUCCESS: {
            return {
                ...state,
                charactersList: payload,
                request: {
                    status: REQUEST_STATUS.SUCCESS
                }
            }
        }
        case REQUEST_CHARACTERS_FAILURE: {
            return {
                ...state,
                request: {
                    status: REQUEST_STATUS.FAILURE,
                    error: payload
                }
            }
        }
        default:
            return state;
    }
}