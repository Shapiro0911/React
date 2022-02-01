import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './Navigation.css'
import { useState, useRef, useEffect } from 'react';

export const Navigation = () => {
    const [menuVisible, setMenuVisibility] = useState(false);
    const [ripple, setRipple] = useState({});
    const cleanUp = useRef(false)

    const handleClick = () => {
        menuVisible ? setMenuVisibility(false) : setMenuVisibility(true);
    }

    const showRipple = (event) => {
        const rippleContainer = event.currentTarget;
        const size = rippleContainer.offsetWidth;
        const pos = rippleContainer.getBoundingClientRect();
        const x = event.pageX - pos.x - (size / 2);
        const y = event.pageY - pos.y - (size / 2);
        const rippleStyle = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
        const ripple = { style: rippleStyle, container: 'rippleContainer' }
        setRipple(ripple);
        setTimeout(() => {
            if (!cleanUp.current) {
                const ripple = { style: {}, container: '' }
                setRipple(ripple);
            }
        }, 860)
    }

    useEffect(() => {
        return () => {
            cleanUp.current = true
        }
    }, [])

    return (
        <div className="nav">
            <div className="ripple" onClick={(event) => { handleClick(); showRipple(event); }}>
                <FontAwesomeIcon className='bars' icon={faBars} />
                <div className={ripple.container} style={ripple.style}></div>
            </div>
            <input className="nav-search-input" placeholder='Search' />
            {menuVisible ?
                <div className="nav-menu">
                    <ul>
                        <li>
                            <Link to='/profile' className="link">Profile</Link>
                        </li>
                    </ul>
                </div> : null}
        </div>
    )
}