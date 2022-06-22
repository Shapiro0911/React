import { useEffect, useRef, useState } from "react";

export const ContactItem = ({ contact }) => {
    const cleanUp = useRef(false);
    const [rippleArray, setRippleArray] = useState([]);
    const [timeout, setRippleTimeout] = useState(null);

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
        <div className="link chatItem-btn">
            <div className="rippleContainer" onMouseDown={showRipple}>
                {rippleArray.length > 0 &&
                    rippleArray.map((ripple, index) => {
                        return (
                            <span key={"ripple-" + index} style={ripple}></span>
                        )
                    })
                }
            </div>
            <div className="chatItem-text">
                <h4 className="chatname">{contact.name}</h4>
            </div>
        </div>
    );
};