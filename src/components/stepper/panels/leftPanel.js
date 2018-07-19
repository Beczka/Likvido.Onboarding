import React from 'react'
import Design from '../contents/designCampaign/index'
import Account from '../contents/createAccount/index'
import Confirm from '../contents/confirm/index'
import SelectCases from '../contents/selectCases/index'
import ConfirmCampaign from '../contents/confirmCampaign/index'
import { Spinner } from '../../../smpl-components/index';

export default class LeftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePart: this.props.activePart || 'Opret konto',
            status: false,
            activeStep: ''
        };
        this.activeStep = '';
        this.changePart = this.changePart.bind(this);
        this.changeStatus = this.props.changeStatus;
        this.spinner = this.spinner.bind(this);
        this.saveActiveStep = this.props.saveActiveStep;
        this.saveData = this.saveData.bind(this);
        this.data = {}
    }

    renderPart() {
        const { activePart } = this.state;
        switch (activePart) {
            case 'Opret konto':
                return <Account key={activePart} changePart={this.changePart} saveData={this.saveData} spinner={this.spinner} changeStatus={this.changeStatus} />
            case 'Tilknyt regnskabssystem':
                return <Confirm key={activePart} changePart={this.changePart} saveData={this.saveData} changeLoading={this.props.changeLoading} changeStatus={this.changeStatus} />
            case 'Design kampagne':
                return <Design key={activePart} changePart={this.changePart} changeStatus={this.changeStatus} />
            case 'Vælg sager':
                return <SelectCases key={activePart} changePart={this.changePart} changeStatus={this.changeStatus} />
            case 'Bekræft kampagne':
                return <ConfirmCampaign key={activePart} changePart={this.changePart} activeStep={this.props.activeStep} saveActiveStep={this.props.saveActiveStep} key={6} changeLoading={this.props.changeLoading} changeStatus={this.changeStatus} />
            default:
                return <div />
        }
    }

    changePart(back) {
        const backStep = back || false;
        const { activePart } = this.state;
        const { parts, saveActivePart } = this.props;
        parts.filter((el, key) => {
            if (activePart === el.name) {
                this.setState({ activePart: backStep ? parts[key + 1].name : parts[key -1].name });
                saveActivePart( backStep ? parts[key + 1].name : parts[key -1].name);
                this.changeStatus(parts[key].name, backStep ? 'success' :'');
                this.changeStatus(backStep ? parts[key + 1].name : parts[key -1].name, 'progress');
            }
        })
    }

    saveData(data) {
        const {activePart= ''} = this.state;
        this.data[activePart] = data;
        this.props.saveData(this.data);
        
    }

    saveActiveStep(el) {
        this.activeStep = el.activeStep
    }

    spinner(status) {
        this.setState({ status: status })
    }

    renderSpinner() {
        const { status = false } = this.state;
        return status && <Spinner key={1} />
    }

    render() {
        return (
            <div className="left-panel containers">{[this.renderPart(), this.renderSpinner()]}</div>
        )
    }
}
