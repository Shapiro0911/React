import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { profileAuth } from "../../store/profile/selectors";

export const PublicOutlet = () => {
    const authed = useSelector(profileAuth);

    return !authed ? <Outlet /> : <Navigate to="/chats" replace />;
};