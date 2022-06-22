import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import './Navigation.css'
import { useState, useRef, useEffect } from 'react';
import { NavSearch } from './NavSearch/NavSearch';

export const Navigation = () => {
    const [menuVisible, setMenuVisibility] = useState(false);
    const cleanUp = useRef(false);
    const [rippleArray, setRippleArray] = useState([]);
    const [timeout, setRippleTimeout] = useState(null);

    const handleClick = () => {
        menuVisible ? setMenuVisibility(false) : setMenuVisibility(true);
    }

    const showRipple = (event) => {
        const rippleContainer = event.currentTarget;
        const size = rippleContainer.offsetWidth;
        const pos = rippleContainer.getBoundingClientRect();
        const x = event.pageX - pos.x - (size / 2);
        const y = event.pageY - pos.y - (size / 2);
        const newRipple = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
        setRippleArray((prevState) => [...prevState, newRipple]);

        setRippleTimeout(setTimeout(() => {
            if (!cleanUp.current) {
                setRippleArray([]);
            }
        }, 4000))
        clearTimeout(timeout);
    }

    useEffect(() => {
        return () => {
            cleanUp.current = true
        }
    }, [])

    return (
        <div className="nav">
            <div className="nav-btn" onClick={handleClick}>
                <FontAwesomeIcon className='bars' icon={faBars} />
                <div className="rippleContainer" onMouseDown={showRipple}>
                    {rippleArray.length > 0 &&
                        rippleArray.map((ripple, index) => {
                            return (
                                <span key={"ripple-" + index} style={ripple}></span>
                            )
                        })
                    }
                </div>
            </div>
            <NavSearch />
            {menuVisible &&
                <div className="nav-menu">
                    <ul className="nav-menu-list">
                        <li className="nav-menu-item">
                            <Link to='/profile' className="link nav-link">
                                <div className="nav-icon">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                Profile</Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to='/profile' className="link nav-link">
                                <div className="nav-icon">
                                    <FontAwesomeIcon icon={faCog} />
                                </div>
                                Settings</Link>
                        </li>
                    </ul>
                </div>}
        </div>
    )
}