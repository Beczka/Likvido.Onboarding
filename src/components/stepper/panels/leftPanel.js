import React from 'react'
import Design from '../contents/designCampaign/index'
import Account from '../contents/createAccount/index'
import Confirm from '../contents/confirm/index'
import {  Spinner } from '../../../smpl-components/index';

export default class LeftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePart: this.props.activePart || 'Opret konto',
            status: false
        };
        this.changePart = this.changePart.bind(this);
        this.changeStatus = this.props.changeStatus;
        this.spinner = this.spinner.bind(this);
    }

    renderPart() {
        const { activePart } = this.state;
        switch (activePart) {
            case 'Opret konto':
                return <Account changePart={this.changePart} key={2} spinner={this.spinner} changeStatus={this.changeStatus} />
            case 'Tilknyt regnskabssystem':
                return <Confirm changePart={this.changePart} key={3} changeLoading={this.props.changeLoading} changeStatus={this.changeStatus} />
            case 'Design kampagne':
                return <Design changePart={this.changePart} key={4} changeStatus={this.changeStatus} />
            case 'greeting step':
            // return <Greeting changePart={this.changePart} />
        }
    }

    changePart() {
        const { activePart } = this.state;
        const { parts, saveActivePart } = this.props;
        parts.filter((el, key) => {
            if (activePart === el.name) {
                this.setState({ activePart: parts[key + 1].name });
                saveActivePart(parts[key + 1].name);
                this.changeStatus(parts[key].name, 'success');
            }
        })
    }

    spinner(status) {
        this.setState({status:status})
    }

    renderSpinner() {
        const { status = false } = this.state;
        return status && <Spinner key={1}/>
    }

    render() {
        return (
            <div className="left-panel containers">{[this.renderPart(), this.renderSpinner()]}</div>
        )
    }
}
