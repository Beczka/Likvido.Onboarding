import React from 'react';
import Details from './details';
import Payment from './payment';
import Account from './account';
import Greeting from './greeting';
import data from './comparingMockup.json';

export default class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 'payment step',
            entry: {},
            value: '',
            id: ''
        };
        this.steps = ['payment step', 'details step', 'account step', 'greeting step'];
        this.changeStep = this.changeStep.bind(this);
        this.changePart = this.props.changePart;
        this.changeStatus = this.props.changeStatus;
        this.saveData = this.saveData.bind(this);
        this.saveID = this.saveID.bind(this);
    }

    renderStep() {
        const { value = '', entry, activeStep, id } = this.state;
        switch (activeStep) {
            case 'payment step':
                return <Payment key={activeStep} changeStep={this.changeStep} spinner={this.props.spinner} data={data.data_payment} value={value} />
            case 'details step':
                return <Details key={activeStep} changeStep={this.changeStep} spinner={this.props.spinner} data={data.data_details} value={value} entry={entry[activeStep]} saveData={this.saveData} />;
            case 'account step':
                return <Account key={activeStep} changeStep={this.changeStep} saveID={this.saveID} spinner={this.props.spinner} entryAll={entry} data={data.data_account} entry={entry[activeStep]} saveData={this.saveData} />;
            case 'greeting step':
                return <Greeting key={activeStep} changeStep={this.changePart} id={id} data={data.data_greeting} entry={entry} value={value}/>;
            default:
                return <div />
        }
    }

    changeStep(back, value, updated) {
        const backStep = back || false;
        const { activeStep, entry = {} } = this.state;

        this.steps.forEach((el, key) => {
            if (activeStep === el) {
                this.changeStatus('Opret konto', 'progress');
                this.setState({ activeStep: this.steps[backStep ? key + 1 : key - 1] });
            }
        })
        if (updated) {
            entry['details step'] = {};
            this.setState(entry)
        }
        activeStep === 'payment step' && (entry[activeStep] = { value: value });
        activeStep === 'payment step' && this.setState({ value: value || '', entry });
        this.setState(entry)
    }

    saveData(saveData) {
        let { entry = {}, activeStep } = this.state;
        entry[activeStep] = saveData;
        this.props.saveData(entry)
        this.setState(entry)
    }

    saveID(id) {
        this.setState({ id: id })
    }

    render() {
        return (this.renderStep())
    }
}
