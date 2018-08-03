import { Button, Input } from '../../../../smpl-components/index';
import defaultProps from '../../../../default';
import Validation from '../../../validation';
import ModalVideo from './modalVideo'
import React from 'react';

export default class Integration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.data = [{ name: 'step 1', value: 'API Nøgle: Finder du vha. Dineros' }, { name: 'step 2', value: 'Firma ID: Dette kan du finde i bunden til venstre når du er logget ind i Dinero. Er du i tvivl kan du også følge' }, {
            name: 'step 3',
            value: 'test test 3',
            openModal: false
        }];

        this.openModal = this.openModal.bind(this);
    }

    updatedDone() {
        this.state.update && this.setState({ update: false })
    }

    selectData(name, value) {
        let { data } = this.state;
        let stop = true;

        data.forEach((el, index) => {
            if (el.name === name) {
                data[index].value = value;
                stop = false;
                this.setState(data);
                return
            }
        })
        if (stop) {
            data.push({ name: name, value: value })
            this.setState(data);
        }

        this.props.saveData(data);
    }

    getSaveData(name) {
        const { entry = [] } = this.props;
        let value = '';
        entry.forEach((el, index) => {
            if (el.name === name) {
                value = entry[index].value;
            }
        })
        return value;
    }

    checkData() {
        const { data } = this.state;
        const { program } = this.props;
        let succses = true;

        this.setState({ update: true });

        if (data.length < program.id) {
            succses = false;
        }
        data.forEach((el) => {
            if (el.value.length === 0)
                succses = false
        })
        return succses;
    }

    sendData() {
        const { data } = this.state;
        console.log('data',data[0].value + '|'+ data[1].value)
        this.props.changeStep(true);
    }

    openModal(status) {
        this.setState({ openModal: status ? status : false })
    }

    render() {
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep, data, program } = this.props;
        const { update, openModal } = this.state;

        return ([openModal && <ModalVideo openModal={this.openModal} key={13} />,
        <div className="container" key={14}>
            <div className="left-panel-block">
                <div className="left-panel-container-header">
                    Opsæt {program.name} integration
                </div>
                <div className="left-panel-container-header-content left-panel-container-text">
                    Se nedenstående guide for at opsætte {program.name}, eller ring til vores hotline på 71749662 eller skriv til &nbsp;
                    <a href='#' onClick={() => window.open('https://kontakt@likvido.dk')} className="panel-bl-content"> kontakt@likvido.dk</a>
                </div>
                <div className="left-panel-container-body">
                    <div>
                        <div className="container-inp">
                            <Input title={'Dit Dinero firma ID'}
                                name='firmaID'
                                updatedDone={this.updatedDone()}
                                autofocus={true}
                                update={update}
                                defaultValue={this.getSaveData('firmaID')}
                                placeholder={'Skriv dit firma ID'}
                                errorMes={'ID er forkert'}
                                error={(el) => { return Validation.validationName(el) }}
                                onChange={(name, value) => { this.selectData(name, value) }} />
                        </div>
                        {program.id === 2 &&
                            <div className="container-inp">
                                <Input title={'Din dinero API nøgle'}
                                    name='API'
                                    updatedDone={this.updatedDone()}
                                    update={update}
                                    defaultValue={this.getSaveData('API')}
                                    placeholder={'Skriv din API nøgle '}
                                    errorMes={'API er forkert'}
                                    error={(el) => { return Validation.validationName(el) }}
                                    onChange={(name, value) => { this.selectData(name, value) }} />
                            </div>
                        }
                    </div>
                    <div className="left-panel-container-body-content">
                        <span className="left-panel-container-body-content-title">Sådan gør du:</span>
                        <span>Skridt 1: API Nøgle: Finder du vha. {program.name}s <u onClick={() => program.id === 2 ? window.open('https://dinero.dk/support/saadan-opretter-du-en-api-noegle/') : window.open('https://www.billy.dk/api/#authentication')}>korte guide</u></span>
                        {program.id === 2 && <span >Skridt 2: Firma ID: Dette kan du finde i bunden til venstre når du er logget ind i {program.name}. Er du i tvivl kan du også følge <u onClick={() => window.open('https://dinero.dk/support/firma-id/')}>korte guide</u></span>}

                        <span className="left-panel-container-body-content-footer"> Du kan også se vores video guide, <u onClick={() => this.openModal(true)}>klik her</u> </span>
                    </div>
                </div>
                <div className={`container-button ${program.name}`}>
                    <Button onChange={() => { this.checkData(true) ? this.sendData() : () => { } }} title={<span className="button-container-title">Opsæt integration <span className='block-arrow'>→</span> </span>} styles={{ backgroundColor: btnPrimaryColor, width: 230 }} />
                    <Button onChange={() => changeStep(false)} title={'Afbryd'} className={'button button-back'} />
                </div>
            </div>
        </div>
        ])
    }
}
