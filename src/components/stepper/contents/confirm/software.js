import { Button, RadioButton } from '../../../../smpl-components/index';
import Economic from '../../../../styles/img/e-conomic-logo-til-web.png';
import Billy from '../../../../styles/img/billy-logo-final_blue.png';
import Dinero from '../../../../styles/img/dinero-logo.png';
import UniConta from '../../../../styles/img/UniConta_Logo_FINAL_RGB_pos_1500p_72dpi.png';
import MicrosoftDynamics from '../../../../styles/img/MS-Dynamics-CRM-kupit.png';
import defaultProps from '../../../../default';
import React from 'react';
import {config} from '../../../../config/config.js';

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
            active: false,
            id: 0
        }, {
            name: 'dinero',
            img: Dinero,
            active: false,
            id: 2
        }, {

            name: 'billy',
            img: Billy,
            active: false,
            id: 1
        }];
    }

    changeProgram(id) {

        if (id === 0) {
            window.open(`https://secure.e-conomic.com/secure/api1/requestaccess.aspx?appPublicToken=${config.ECONOMIC_APP_PUBLIC_TOKEN}&redirectUrl={1}`)
        }

        this.props.changeStep(true);
    }

    render() {
        const { selectProgram } = this.state;
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep, data, changePart } = this.props;

        return (
            <div className="container">
                <div className="left-panel-block">
                    <div className="left-panel-container-header max-width-550">
                        {data.content.container_header}
                    </div>
                    <div className="left-panel-container-text left-panel-container-content">
                        {data.content.header_content}
                    </div>
                    <div className="container-accounting-program">
                        {this.accountingProgram.map((el, index) => {
                            return <div key={index}
                                className={el.id === selectProgram ? 'accounting-program active' : 'accounting-program'}
                                onClick={() => { this.props.saveProgram(el); this.setState({ selectProgram: el.id }) }}>
                                <img src={el.img} alt="..." className={el.name === 'UniConta' ? 'UniConta' : ''} />
                                <RadioButton status={el.id === selectProgram ? 'progress' : ''} className={el.id === 'UniConta' && 'UniConta'} />
                            </div>
                        })}
                    </div>
                    <div className="left-panel-container-text left-panel-container-body padding-top-35">
                        Understotter vi endnu ikke dit regnskabsprogram? Skriv til os pa kontakt@likvido.dk og fa tilsendt info om vores REST.API og andre integrationsmuligheder.
                    </div>
                    <div className="container-button padding-top-45">
                        <Button onChange={() => selectProgram !== '' ? this.changeProgram(selectProgram) : ''} title={<span className="button-container-title">Næste <span className='block-arrow'>→</span> </span>} styles={{ backgroundColor: btnPrimaryColor }} />
                        <Button onChange={() => changePart(false)} title={'Forrige'} className={'button button-back'} />
                    </div>
                </div>
            </div>
        )
    }
}
