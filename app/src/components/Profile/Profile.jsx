import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckbox } from '../../store/profile/actions';
import { profileCheckbox } from '../../store/profile/selector';

export const Profile = () => {
    const checkboxValue = useSelector(state => state.checkbox)
    const name = useSelector(profileCheckbox);
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