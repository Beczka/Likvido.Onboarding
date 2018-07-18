import React from 'react';
import { Circle } from 'rc-progress';

export default class Integration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            percent: 0
        };
        this.selectData = this.selectData.bind(this);
        this.selectData();
    }


    selectData() {

    }

    render() {
        const { percent } = this.state;
        const { title = 'Godt gaet Maximilian', body = 'Vent mens vi hender data ud fra dit regnskabsprogram', progress = 'Henter data' } = this.props;
        setTimeout(() => {
            percent !== 100 ? this.setState({ percent: percent + 1 }) : this.props.changeLoading(false)
        }, 150);

        return (
            <div className="progress-container">
                <div className="progress-header">{title} </div>
                <div className="progress-text"> {body} </div>
                <div className="progress-status-container">
                    <div className="progress-status"> {progress} <span>{percent}%</span></div>
                    <div className="progress">
                        <Circle percent={percent} trailWidth={6} strokeWidth={7} trailColor="#f2f2f2" strokeColor="#1b88cc" />
                    </div>
                </div>
            </div>
        )
    }
}
