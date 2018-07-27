import React from 'react';

const Button = ({ title = 'Default',href = '', className = 'button', onChange, styles = {}, ...props }) => {
    return (
        <button className={className} href={href} onClick={onChange} style={styles} {...props}>{title}</button>
    )
};

export default Button;