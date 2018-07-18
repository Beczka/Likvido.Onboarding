import { Button, RadioButton } from '../../../../smpl-components/index';
import Economic from '../../../../styles/img/e-conomic-logo-til-web.png';
import Billy from '../../../../styles/img/billy-logo-final_blue.png';
import Dinero from '../../../../styles/img/dinero-logo.png';
import defaultProps from '../../../../default';
import React from 'react';

export default class Software extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectProgram: ''
        };
        this.data = {};
        this.accountingProgram = [{
            name: 'e-conomic',
            img: Economic,
            active: false
        }, {
            name: 'dinero',
            img: Dinero,
            active: false
        }, {

            name: 'billy',
            img: Billy,
            active: false
        }, {
            name: '1',
            img: Economic,
            active: false
        }, {
            name: '2',
            img: Dinero,
            active: false
        }, {

            name: '3',
            img: Billy,
            active: false
        }];
    }

    render() {
        const { selectProgram } = this.state;
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep, data, changePart } = this.props;

        return (
            <div className="container">
                <div className="left-panel-block">
                    <div className="left-panel-container-header">
                        {data.content.container_header}
                    </div>
                    <div className="left-panel-container-text left-panel-container-content">
                        {data.content.header_content}
                    </div>
                    <div className="container-accounting-program">
                        {this.accountingProgram.map((el, index) => {
                            return <div key={index}
                                className={el.name === selectProgram ? 'accounting-program active' : 'accounting-program'}
                                onClick={() => { this.props.saveProgram(el.name); this.setState({ selectProgram: el.name }) }}>
                                <img src={el.img}  alt="..." />
                                <RadioButton status={el.name === selectProgram ? 'progress' : ''} />
                            </div>
                        })}
                    </div>
                    <div className="left-panel-container-text left-panel-container-body">
                        Understotter vi endnu ikke dit regnskabsprogram? Skriv til os pa kontakt@likvido.dk og fa tilsendt info om vores REST.API og andre integrationsmuligheder.
                    </div>
                    <div className="container-button">
                        <Button onChange={() => selectProgram !== '' ? changeStep(true) : ''} title={'Næste →'} styles={{ backgroundColor: btnPrimaryColor }} />
                        <Button onChange={() => changePart(false)} title={'Forrige'} className={'button button-back'} />
                    </div>
                </div>
            </div>
        )
    }
}
