import { chatsReducer } from "../reducer";
import { SET_CHATS } from '../actions'

describe("chatsReducer", () => {
    it("should return the initial state", () => {
        expect(chatsReducer(undefined, {})).toEqual([]);
    });
    it("should handle SET_CHATS", () => {
        const previousState = [];
        const setAction = {
            type: SET_CHATS,
            payload: { id: "chat1", name: "chat1" },
        };
        expect(chatsReducer(previousState, setAction)).toEqual({
            id: "chat1",
            name: "chat1"
        });
    });
});