import React from 'react';
import CurrentDebtors from './currentDebtors';

export default class SelectCases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 'Current debtors',
            entry: {}
        };
        this.steps = ['Current debtors'];
        this.changeStep = this.changeStep.bind(this);
        this.changePart = this.props.changePart;
        this.changeStatus = this.props.changeStatus;
        this.saveData = this.saveData.bind(this);

    }

    renderStep() {
        const { activeStep } = this.state;

        switch (activeStep) {
            case 'Current debtors':
                return <CurrentDebtors changeStep={this.changePart} key={activeStep} />
            default:
                return <div />
        }
    }

    changeStep(back, value) {
        const backStep = back || false;
        const { activeStep } = this.state;

        this.steps.filter((el, key) => {
            if (activeStep === el) {
                this.changeStatus('Vælg sager', 'progress');
                // this.saveActiveStep({ activeStep: this.steps[backStep ? key + 1 : key - 1] });
                this.setState({ activeStep: this.steps[backStep ? key + 1 : key - 1] });
            }
        })
        value && this.setState({ value: value });
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
