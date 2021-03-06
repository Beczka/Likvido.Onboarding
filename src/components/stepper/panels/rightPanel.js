import React from 'react';
import data from '../../../data.json';
import { Button } from '../../../smpl-components/index';
import Phone from '../../../styles/img/phone-call.png';
import IMG from '../../../styles/img/15272013_10210635591753271_8555579613083164333_o .jpg';
import tag from '../../../styles/img/tag.png';
import cheque from '../../../styles/img/cheque.png';
import alert from '../../../styles/img/alert-circle-big.png';
import Newsletter from '../../../styles/img/newsletter.png';

export default class RightPanel extends React.Component {
    render() {

        if (!!data[this.props.activeStep].blockName1) {
            const { blockName1, blockName2, blockName3, blockBody1, blockBody2, blockBody3 } = data[this.props.activeStep];
            return (
                <div className="right-panel containers">
                    <div className="right-panel-flex">

                        <div className="right-panel-container">
                            <img src={tag} alt="..." />
                            <div className="right-panel-container-title">
                                {blockName1}
                            </div>
                            <div className="right-panel-container-body">
                                {blockBody1}
                            </div>
                        </div>

                        <div className="right-panel-container">
                            <div className="right-panel-divider" />
                            <img src={cheque} alt="..." />

                            <div className="right-panel-container-title">
                                {blockName2}
                            </div>
                            <div className="right-panel-container-body">
                                {blockBody2}
                            </div>
                            <div className="right-panel-divider" />
                        </div>
                        <div className="right-panel-container">
                            <img src={alert} alt="..." />
                            <div className="right-panel-container-title">
                                {blockName3}
                            </div>
                            <div className="right-panel-container-body">
                                {blockBody3}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            const { userImg = false, userInfo, userHeader, userNumber = false, userEmail } = data[this.props.activeStep];
            return (
                <div className="right-panel containers">
                    {!!userImg && <img className="img" src={IMG} alt="..." />}
                    <div className="right-panel-header">
                        {userHeader}
                    </div>
                    <div className="right-panel-user-info">
                        {userInfo}
                    </div>
                    <Button title={'Book et online møde'} className={'right-panel-button'} onClick={() => {window.open('https://meetings.hubspot.com/max107?_ga=2.132280780.391986377.1526122385-82282547.1525762738')}}  href={'https://meetings.hubspot.com/max107?_ga=2.132280780.391986377.1526122385-82282547.1525762738'}/>
                    {!!userNumber && <div className="container-number">
                        <span className="panel-bl-content">
                            <img src={Phone} alt="..." />
                            {userNumber}
                        </span>
                        <span className="panel-bl-content">
                            <img src={Newsletter} className="width-16" />
                            {userEmail}
                        </span>
                    </div>
                    }
                </div>
            )
        }
    }
}
