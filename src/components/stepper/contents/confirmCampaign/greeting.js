import React from 'react'
import { Button } from '../../../../smpl-components/index'
import defaultProps from '../../../../default'
import Img from '../../../../styles/img/Flat Line Modern Concept Illustration - Success.png';

export default class Greeting extends React.Component {
    render() {
        const { changeStep } = this.props;
        const { btnPrimaryColor } = defaultProps.btnStyles;

        return (
            <div className="left-panel-block greeting align-items-center">
                <div className="left-panel-container-header text-align-center">
                    Tillykke Maximilian!<br/>
                    Du er nu pa vej til hurtigere betaling
                </div>
                <div className="left-panel-container-text left-panel-container-content text-align-senter">
                    Dine sagger er nu oprette hos Likvido. Du vil modtage en bekraeftelse pa mail, samt login till
                    Likvido.dk. Via din konto kan du folge sagerne i real time.
                </div>
                <img className="Fill-1" src={Img}  alt="..." />
                <Button onChange={() => {}} title={'Ga til dashboard'} styles={{ backgroundColor: btnPrimaryColor, width: 235 }} />
            </div>
        )
    }
}
