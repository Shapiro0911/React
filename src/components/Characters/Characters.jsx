import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCharacters } from "../../store/Characters/actions";
import { selectCharactersList, selectCharactersLoading, selectCharactersError } from "../../store/Characters/selectors";

export const Characters = () => {
    const dispatch = useDispatch();
    const characters = useSelector(selectCharactersList);
    const isLoading = useSelector(selectCharactersLoading);
    const error = useSelector(selectCharactersError);

    const requestCharacters = async () => {
        dispatch(getCharacters());
    }

    useEffect(() => {
        requestCharacters();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {isLoading ? <CircularProgress /> : (
                <>
                    <button onClick={requestCharacters}>Get Request</button>
                    {error && <h3>Error: {error}</h3>}
                    <ul>
                        {characters.map((character, index) => <li key={index}>{character.name}</li>)}
                    </ul>
                </>
            )
            }
        </div >
    )
}