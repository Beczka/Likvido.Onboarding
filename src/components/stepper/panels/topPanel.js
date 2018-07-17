import React from 'react'
import { RadioButton } from '../../../smpl-components/index';

export default class TopPanel extends React.Component {
    render() {
        const { parts } = this.props;
        return (
            <div className="menu">
                {parts.map((el, index) => {
                    return (
                        <div className={`wrapper ${index+1 === parts.length ? 'last' : ''}`}>
                            <div className={`step ${el.status ? 'active' : ''}`}>
                                <RadioButton status={el.status} />
                                <div className="name">
                                    <p>{el.name}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
