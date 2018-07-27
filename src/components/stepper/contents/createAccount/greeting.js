import React from 'react'
import { Button } from '../../../../smpl-components/index'
import defaultProps from '../../../../default'
import Img from '../../../../styles/img/Flat Line Modern Concept Illustration - Teamwork.png';
import f389 from '../../../../styles/img/1f389.png';
import axios from 'axios';
import API from '../../../../APIconfig.json';

export default class Greeting extends React.Component {

    async sendData() {
        let data = {};
        const { entry } = this.props;

        data['companyName'] = entry['details step'].officialName;
        data['companyRegistrationNumber'] = entry['details step'].vat;
        data['address'] = entry['details step'].address;
        data['zipCode'] = entry['details step'].zipcode;
        data['city'] = entry['details step'].city;
        data['officeEmail'] = entry['account step'].filter((el) => el.name === 'email' && el.value)[0].value;
        data['officePhone'] = entry['account step'].filter((el) => el.name === 'number' && el.value)[0].value;
        data['firstName'] = entry['account step'].filter((el) => el.name === 'name' && el.value)[0].value;
        data['lastName'] = entry['account step'].filter((el) => el.name === 'surname' && el.value)[0].value;
        data['password'] =  entry['account step'].filter((el) => el.name === 'password' && el.value)[0].value;
        try {
            const res = await axios.post(API.creditorsAPI, {
                data: data
            });
        } catch (e) {
            console.log('Err: ', e)
        }
    }

    render() {
        const { changeStep } = this.props;
        const { content } = this.props.data;
        const { btnPrimaryColor } = defaultProps.btnStyles;
        this.sendData();
        return (
            <div className="left-panel-block greeting">
                <div className="left-panel-container-header">
                    {content.container_header} <img src={f389} alt="..." />
                </div>
                <div className="left-panel-container-text left-panel-container-content text-align-senter">
                    {content.header_content}
                </div>
                <img className="Fill-1" src={Img} alt="..." />
                <Button onChange={changeStep} title={'Tilknyt regnskabsprogram'} styles={{ backgroundColor: btnPrimaryColor, width: 235 }} />
            </div>
        )
    }
}
