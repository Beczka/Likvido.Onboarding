import React from 'react';

const Checkbox = ({ title = 'Default', error = false, value = false, url = '', onChange = () => { } }) => {
    return (
            <label className="container-custom-checkbox container-checkbox-value" >
                <span onClick={onChange}>{title}</span> {url && <u onClick={() => {window.open(url)}}>handelsbetingelser </u>}
                <input type="checkbox" checked={value ? true : false} onChange={() => { }} />
                <span className={`custom-checkmark active ${error ? 'error' : ''}`} onClick={onChange}></span>
            </label>
    )
};

export default Checkbox;