import { REQUEST_STATUS } from "../../utils/constants";

export const selectCharactersList = (state) => state.characters.charactersList;
export const selectCharactersLoading = (state) => state.characters.request.status === REQUEST_STATUS.LOADING;
export const selectCharactersError = (state) => state.characters.request.error;