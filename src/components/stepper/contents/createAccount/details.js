import React from 'react';
import { Button, Input } from '../../../../smpl-components/index';
import defaultProps from '../../../../default';
import Validation from '../../../validation';
import API from '../../../../APIconfig.json';
import axios from 'axios';

export default class Details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            loader: false
        }
        this.selectData = this.selectData.bind(this);
        this.checkData = this.checkData.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    updatedDone() {
        this.state.update && this.setState({ update: false })
    }

    selectData(name, value) {
        let { data } = this.state;

        data[name] = value;
        this.setState(data);

        this.props.saveData(data);
    }

    checkData() {
        const { data } = this.state;
        let succses = true;
        this.setState({ update: true });
        if (Object.keys(data).length < 4) {
            succses = false;
        }
        for (var el in data) {
            if (data[el].length === 0)
                succses = false
        }

        return succses;
    }

    async getData() {
        const { entry ={}}= this.props
        if (!!!this.props.value) {
            return
        }
        if (!!Object.keys(entry).length) {
            this.setState({ data: this.props.entry });
            return
        }

        this.props.spinner(true);

        try {
            const res = await axios.get(API.detailAPI, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    value: this.props.value
                },
            });
            let { data = {} } = this.state;
            this.props.spinner();
            data.officialName = res.data.officialName;
            data.vat = res.data.vat;
            data.address = res.data.address;
            data.zipcode = res.data.zipcode;
            data.city = res.data.city;

            this.setState({ data: data, loader: false });
            this.props.saveData(data)
        } catch (e) {
            console.log('Err: ', e)
            this.props.spinner();
        }
    }

    getSaveData(name) {
        const { entry = [] } = this.props;
        let value = '';
        for (var el in entry) {
            if (el === name) {
                value = entry[el]
            }
        }
        return value;
    }

    render() {
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep, entry } = this.props;
        const { content } = this.props.data;
        const { data = {}, loader, update } = this.state;

        return (
            <div className="left-panel-block">
                <div className="left-panel-container-header">
                    {content.container_header}
                </div>
                <div className="left-panel-container-text left-panel-container-content">
                    {content.header_content}
                </div>
                <div className="container-inp">
                    <Input title={'Firmanavn'}
                        updatedDone={this.updatedDone()}
                        update={update}
                        error={(el) => { return Validation.validationName(el) }}
                        name="officialName"
                        defaultValue={data.officialName || this.getSaveData('Firmanavn')}
                        errorMes={'Navnet er forkert'}
                        onChange={(name, value) => { this.selectData(name, value) }} />

                    <Input title={'CVR NUMMER'}
                        updatedDone={this.updatedDone()}
                        update={update}
                        error={(el) => { return Validation.validationCVR(el) }}
                        name="vat"
                        defaultValue={data.vat || this.getSaveData('companyRegistrationId')}
                        errorMes={'Navnet er forkert'}
                        onChange={(name, value) => { this.selectData(name, value) }} />
                </div>
                <div className="container-inp">
                    <Input title={'ADRESSE'}
                        updatedDone={this.updatedDone()}
                        update={update}
                        error={(el) => { return Validation.validationName(el) }}
                        name="address"
                        defaultValue={data.address || this.getSaveData('address')}
                        errorMes={'Adresse er forkert'}
                        onChange={(name, value) => { this.selectData(name, value) }} />
                </div>
                <div className="container-inp">
                    <Input title={'POSTNUMMER'}
                        updatedDone={this.updatedDone()}
                        update={update}
                        error={(el) => { return Validation.validationZipcode(el) }}
                        name="zipcode"
                        defaultValue={data.zipcode || this.getSaveData('zipcode')}
                        type={''}
                        errorMes={'Adgangskode er forkert'}
                        onChange={(name, value) => { this.selectData(name, value) }} />

                    <Input title={'BY'}
                        type={''}
                        updatedDone={this.updatedDone()}
                        update={update}
                        error={(el) => { return Validation.validationName(el) }}
                        name="city"
                        defaultValue={data.city || this.getSaveData('city')}
                        errorMes={'Adgangskode er forkert'}
                        onChange={(name, value) => { this.selectData(name, value) }} />
                </div>
                <div className="container-button">
                    <Button onChange={() => this.checkData() ? changeStep(true) : ''} title={<span className="button-container-title">Næste <span className='block-arrow'>→</span> </span>} styles={{ backgroundColor: btnPrimaryColor }} />
                    <Button onChange={() => changeStep(false)} title={'Forrige'} className={'button button-back'} />
                </div>
            </div>
        )
    }
}
