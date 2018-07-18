import React from 'react';

const Spinner = () => {
    return (
       [ <div className={'loader-container'} key={1}/>,<div className="lds-spinner" key={2} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>]
    )
};

export default Spinner;