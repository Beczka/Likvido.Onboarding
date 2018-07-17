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
            entry: {}
        };
        this.steps = ['payment step', 'details step', 'account step', 'greeting step'];
        this.changeStep = this.changeStep.bind(this);
        this.changePart = this.props.changePart;
        this.changeStatus = this.props.changeStatus;
        this.saveData = this.saveData.bind(this);
    }

    renderStep() {
        const { value = '', entry, activeStep } = this.state;
        switch (activeStep) {
            case 'payment step':
                return <Payment changeStep={this.changeStep} spinner={this.props.spinner} data={data.data_payment} value={value} />
            case 'details step':
                return <Details changeStep={this.changeStep} spinner={this.props.spinner} data={data.data_details} value={value} entry={entry[activeStep]} saveData={this.saveData}/>;
            case 'account step':
                return <Account changeStep={this.changeStep} data={data.data_account} entry={entry[activeStep]} saveData={this.saveData} />;
            case 'greeting step':
                return <Greeting changeStep={this.changePart} data={data.data_greeting} />;
        }
    }

    changeStep(back, value) {
        const backStep = back || false;
        const { activeStep } = this.state;

        this.steps.filter((el, key) => {
            if (activeStep === el) {
                this.changeStatus('Opret konto', 'progress');
                this.setState({ activeStep: this.steps[backStep ? key + 1 : key - 1] });
            }
        })
        value && this.setState({ value: value || '' });
    }

    saveData(saveData) {
        let { entry = {}, activeStep } = this.state;
        entry[activeStep] = saveData;
        this.setState(entry)
    }

    render() {
        return (this.renderStep())
    }
}
