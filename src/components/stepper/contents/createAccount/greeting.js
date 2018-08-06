import React from 'react'
import { Button } from '../../../../smpl-components/index'
import defaultProps from '../../../../default'
import Img from '../../../../styles/img/Flat Line Modern Concept Illustration - Teamwork.png';
import f389 from '../../../../styles/img/1f389.png';
import axios from 'axios';
import API from '../../../../APIconfig.json';

export default class Greeting extends React.Component {

    constructor(props) {
        super(props);

        this.openSite = this.openSite.bind(this);
    }

    openSite() {
        const { id } = this.props;
        window.open(`https://app.likvido.dk/Account/ActivateOnboarding?creditorId=${this.props.id}`);
        this.props.changeStep;
    }

    render() {
        const { changeStep } = this.props;
        const { content } = this.props.data;
        const { btnPrimaryColor } = defaultProps.btnStyles;
        return (
            <div className="left-panel-block greeting">
                <div className="left-panel-container-header">
                    {content.container_header} <img src={f389} alt="..." />
                </div>
                <div className="left-panel-container-text left-panel-container-content text-align-senter">
                    {content.header_content}
                </div>
                <img className="Fill-1" src={Img} alt="..." />
                <Button onChange={this.openSite} title={'Tilknyt regnskabsprogram'} styles={{ backgroundColor: btnPrimaryColor, width: 235 }} />
            </div>
        )
    }
}
