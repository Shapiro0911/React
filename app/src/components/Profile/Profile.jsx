import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckbox } from '../../store/profile/actions';

export const Profile = () => {
    const checkboxValue = useSelector(state => state.checkbox)
    const name = useSelector(state => state.name);
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(toggleCheckbox);
    }

    return (
        <>
            <input type="checkbox" checked={checkboxValue} onChange={handleChange} />
            <span>{name}</span>
        </>
    )
}