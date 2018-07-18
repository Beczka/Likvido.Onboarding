import React from 'react';
import Greeting from './greeting';
import Confirmation from './confirmation';

export default class ConfirmCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: this.props.activeStep || 'Confirmation page',
            entry: {}
        };
        this.steps = ['Confirmation page', 'loading step', 'Greeting'];
        this.changeStep = this.changeStep.bind(this);
        this.changePart = this.props.changePart;
        this.changeStatus = this.props.changeStatus;
        this.saveData = this.saveData.bind(this);
        this.changeLoading = this.props.changeLoading;
        this.saveActiveStep = this.props.saveActiveStep;

    }

    renderStep() {
        const { activeStep } = this.state;
        switch (this.props.activeStep || activeStep) {
            case 'Confirmation page':
                return <Confirmation changeStep={this.changeStep} key={activeStep} changePart={this.changePart}/>;
            case 'loading step':
                this.changeLoading(true, 'Vi starter dine dager', 'Vent mens vi opretter dine sager', 'Opretter');
                this.changeStep(true);
                return <div key={activeStep} />
            case 'Greeting':
                return <Greeting changeStep={this.changeStep} key={activeStep} />;
            default:
                return <div />

        }
    }

    changeStep(back, value) {
        const backStep = back || false;
        const { activeStep } = this.state;

        this.steps.forEach((el, key) => {
            if (activeStep === el) {
                this.changeStatus('Bekræft kampagne', 'success');
                this.saveActiveStep({ activeStep: this.steps[backStep ? key + 1 : key - 1] });
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
