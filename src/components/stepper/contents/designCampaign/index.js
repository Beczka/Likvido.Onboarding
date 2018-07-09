import React from 'react';
// import Details from './details';
import Design from './design';
import Distribution from './distribution';
// import data from './comparingMockup.json';

export default class DesignCampaing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 'distribution step',
            entry: {}
        };
        this.steps = ['distribution step', 'Design kampagne', 'account step', 'greeting step'];
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
            // case 'account step':
            //     return <Account changeStep={this.changeStep} data={data.data_account} entry={entry[activeStep]} saveData={this.saveData} />;
            // case 'greeting step':
            //     return <Greeting changeStep={this.changePart} data={data.data_greeting} />;
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
