import { Button, RadioButton } from '../../../../smpl-components/index';
import defaultProps from '../../../../default';
import React from 'react';

export default class confirmation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: true,
        }
        this.dataSwitch = {};
        this.openModal = this.openModal.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    openModal(status, row) {
        this.setState({ openModal: status ? status : false, row: row ? row : '' })
    }

    saveData(data, editorStateContent, editorStateHeader) {
        let { row } = this.state;
        this.dataSwitch[row] = data || [];
        this.setState({ editorStateContent: editorStateContent, editorStateHeader: editorStateHeader })
    }


    render() {
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep,changePart } = this.props;

        return ([
            <div className="left-panel-block padding-top-25px height-auto align-items-center" key={19}>
                <div className="left-panel-container-header ">
                    Er du klar til at starte din kampage?
                </div>
                <div className="left-panel-container-text left-panel-container-content">
                    Gennemga din kampagne forneden og klik "start inddrivelse" nar du er klar.
                </div>
                <div className="left-panel-info-container">
                    <div className="left-panel-info-row">
                        <div className="left-panel-info-tr">
                            <div className="wrapper">
                                <div className="step">
                                    <RadioButton status={'success'} />
                                    <div className="left-panel-info-title">
                                        Rykkerflow  kommende faktura
                                    </div>
                                </div>
                            </div>
                            <div className="left-panel-info-body">
                                5 dage efter at en regning forfalder vil Likvido automatisk igangseatte et rykkerflow
                            </div>
                        </div>
                        <div className="left-panel-info-tr">
                            <div className="wrapper">
                                <div className="step">
                                    <RadioButton status={'success'} />
                                    <div className="left-panel-info-title">
                                        Rykkerflow  eksisterende faktura
                                    </div>
                                </div>
                            </div>
                            <div className="left-panel-info-body">
                                Du har valgt 5 eksisterende faktura som skal starte med et rykkerflow
                            </div>
                        </div>
                    </div>
                    <div className="left-panel-info-row">
                        <div className="left-panel-info-tr">
                            <div className="wrapper">
                                <div className="step">
                                    <RadioButton status={'success'} />
                                    <div className="left-panel-info-title">
                                        Inkasso  kommende faktura
                                    </div>
                                </div>
                            </div>
                            <div className="left-panel-info-body">
                                Hvis skyldner ikke har betalt efter rykker 2 sender Likvido en mail og SMS hvor
                                du med et klik kanstarte en inkassosag
                            </div>
                        </div>
                        <div className="left-panel-info-tr">
                            <div className="wrapper">
                                <div className="step">
                                    <RadioButton status={'success'} />
                                    <div className="left-panel-info-title">
                                        Inkasso  kommende faktura
                                    </div>
                                </div>
                            </div>
                            <div className="left-panel-info-body">
                                Du har valgt 10 eksisterende faktura som skal starte med et rykkerflow
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-button">
                    <Button onChange={() => changeStep(true)} title={'Start inddrivelse'} styles={{ backgroundColor: btnPrimaryColor }} />
                    <Button onChange={() => changePart(false)} title={'Ret kampagne'} className={'button button-back'} />
                </div>
            </div>,
            <div key={21} className="left-panel-block left-panel-payment-info height-auto align-items-center margin-bottom-30">
                <div className="left-panel-container-text text-bolt">
                    Er du i tvivl om det mindste?
                        <br />
                    Ring til vores hotline pa <span className="panel-bl-content">71749362</span>
                    </div>
            </div>
        ])
    }
}
