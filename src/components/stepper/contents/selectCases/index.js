import React from 'react';
// import DebtCollection from './debtCollection';
// import Design from './design';
import Confirmation from '../confirmCampaign/confirmation';
import CurrentDebtors from './currentDebtors';

export default class SelectCases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 'Current debtors',
            entry: {}
        };
        this.steps = ['Current debtors', 'Confirmation page', 'Debt collection', 'Current debtors'];
        this.changeStep = this.changeStep.bind(this);
        this.changePart = this.props.changePart;
        this.changeStatus = this.props.changeStatus;
        this.saveData = this.saveData.bind(this);
    }

    renderStep() {
        const { value,entry,activeStep } = this.state;

        switch (activeStep) {
            case 'Current debtors':
                return <CurrentDebtors changeStep={this.changePart} />
        }
    }

    changeStep(back, value) {
        const backStep = back || false;
        const { activeStep } = this.state;

        this.steps.filter((el, key) => {
            if (activeStep === el) {
                this.changeStatus('Vælg sager', 'progress');
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
