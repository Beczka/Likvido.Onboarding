import React from 'react';
import DebtCollection from './debtCollection';
import Design from './design';
import Distribution from './distribution';
import CurrentDebtors from './currentDebtors';

export default class DesignCampaing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 'distribution step',
            entry: {}
        };
        this.steps = ['distribution step', 'Design kampagne', 'Debt collection', 'Current debtors'];
        this.changeStep = this.changeStep.bind(this);
        this.changePart = this.props.changePart;
        this.changeStatus = this.props.changeStatus;
        this.saveData = this.saveData.bind(this);
    }

    renderStep() {
        const { value,entry,activeStep } = this.state;

        switch (activeStep) {
            case 'distribution step':
                return <Distribution changeStep={this.changeStep} />
            case 'Design kampagne':
                return <Design changeStep={this.changeStep} />;
            case 'Debt collection':
                return <DebtCollection changeStep={this.changeStep} />;
            case 'Current debtors':
                return <CurrentDebtors changeStep={this.changeStep}  />;
        }
    }

    changeStep(back, value) {
        const backStep = back || false;
        const { activeStep } = this.state;

        this.steps.filter((el, key) => {
            if (activeStep === el) {
                this.changeStatus('Design kampagne', 'progress');
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
