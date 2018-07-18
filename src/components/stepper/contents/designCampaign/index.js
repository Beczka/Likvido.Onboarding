import React from 'react';
import DebtCollection from './debtCollection';
import Design from './design';
import Distribution from './distribution';

export default class DesignCampaing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 'distribution step',
            entry: {}
        };
        this.steps = ['distribution step', 'Design kampagne', 'Debt collection'];
        this.changeStep = this.changeStep.bind(this);
        this.changePart = this.props.changePart;
        this.changeStatus = this.props.changeStatus;
        this.saveData = this.saveData.bind(this);
    }

    renderStep() {
        const { activeStep } = this.state;

        switch (activeStep) {
            case 'distribution step':
                return <Distribution key={activeStep} changeStep={this.changeStep} changePart={this.changePart} />
            case 'Design kampagne':
                return <Design key={activeStep} changeStep={this.changeStep} />;
            case 'Debt collection':
                return <DebtCollection key={activeStep} changeStep={this.changePart} />;
            default:
                return <div />
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
