import React from 'react';
import Software from './software';
import Integration from './integration'
import data from './confirmMockup.json'

export default class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 'software step',
            program: '',
            entry: {}
        };
        this.steps = ['software step', 'details step', 'loading step'];
        this.changeStatus = this.props.changeStatus;
        this.changeLoading = this.props.changeLoading;
        this.changeStep = this.changeStep.bind(this);
        this.changePart = this.props.changePart;
        this.saveProgram = this.saveProgram.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    renderStep() {
        const { activeStep, program, entry } = this.state;
        switch (activeStep) {
            case 'software step':
                return <Software key={activeStep} changeStep={this.changeStep} changePart={this.changePart} data={data.data_software} saveProgram={this.saveProgram} />
            case 'details step':
                return <Integration key={activeStep} saveData={this.saveData} changeLoading={this.changeLoading} changeStep={this.changeStep} data={data.data_integration} entry={entry[activeStep]} program={program} />
            case 'loading step':
                this.changePart(true);
                this.changeLoading(true);
                return <div key={activeStep} />
            default:
                return <div />
        }
    }

    changeStep(back) {
        const backStep = back || false;

        const { activeStep } = this.state;
        this.steps.forEach((el, key) => {
            if (activeStep === el) {
                this.changeStatus('Tilknyt regnskabssystem', 'progress');
                this.setState({ activeStep: this.steps[backStep ? key + 1 : key - 1] });
            }
        })
    }

    saveProgram(name) {
        this.setState({ program: name })
    }

    saveData(saveData) {
        let { entry = {}, activeStep } = this.state;
        entry[activeStep] = saveData;
        this.setState(entry);
    }

    render() {
        return (this.renderStep())
    }
}
