import React from 'react'
import './Message.css'

export const Message = ({ message }) => {
    return (
        <div className="container">
            <h3 className="title">{message}</h3>
        </div>
    )
}