

import React from 'react';

const Switch = ({ checked = false, onClick = () => { } }) => {
    return (
        <div className="switch__container" onClick={onClick}>
            <input className="switch switch--shadow" type="checkbox" checked={checked} onChange={() => { }} />
            <label htmlFor="switch-shadow"></label>
        </div>
    )
};

export default Switch;
