import { Button } from '../../../../smpl-components/index';
import defaultProps from '../../../../default';
import React from 'react';
import Switch from 'react-ios-switch';
import Img from '../../../../styles/img/Flat Line Modern Concept Illustration - Teamwork.png';

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
        const { changeStep } = this.props;
        const { checked } = this.state;

        return (
            <div className="left-panel-block padding-top-25px">
                <div className="left-panel-container-header">
                    Er du klar til at starte din kampage?
                </div>
                <div className="left-panel-container-text left-panel-container-content">
                    Gennemga din kampagne forneden og klik "start inddrivelse" nar du er klar.
                </div>
                <div className="switch-container">
                    < Switch
                        checked={checked}
                        offColor="white"
                        onChange={() => this.setState({checked: !checked})}
                        onColor="#666ee8"
                        className="switch"
                    />
                    <label>Start kun sager efter manuel godkendelse vie e-mail / SMS</label>
                </div>
                <img className="Fill-1" src={Img} />

                <div className="container-button">
                    <Button onChange={() => changeStep(true)} title={'Næste →'} styles={{ backgroundColor: btnPrimaryColor }} />
                    <Button onChange={() => changeStep(false)} title={'Forrige'} className={'button button-back'} />
                </div>
            </div>
        )
    }
}
