import React from 'react';

const RadioButton = ({ status = '',className= '', onChange = () => { }, styles = {}, ...props }) => {
    return (
        <div className={`status-field ${className}`} onClick={onChange}>
            <div className="status">
                <div className={status}></div>
            </div>
        </div>
    )
};

export default RadioButton;