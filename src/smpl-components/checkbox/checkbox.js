import React from 'react';

const Checkbox = ({ title = 'Default', value = false, url = '', onChange = () => { } }) => {
    return (
        <label className="container-custom-checkbox container-checkbox-value">
            {title} {url && <a href={url}>handelsbetingelser </a>}
            <input type="checkbox" checked={value && 'checked'}/>
            <span className={`custom-checkmark active`} onClick={onChange}></span>
        </label>
    )
};

export default Checkbox;