import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckbox } from '../../store/profile/actions';
import { profileCheckbox } from '../../store/profile/selectors';

export const Profile = () => {
    const profile = useSelector(profileCheckbox);
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(toggleCheckbox);
    }

    return (
        <>
            <input type="checkbox" checked={profile.checkbox} onChange={handleChange} />
            <span>{profile.name}</span>
        </>
    )
}