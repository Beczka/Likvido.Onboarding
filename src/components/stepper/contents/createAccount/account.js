import React from 'react'
import { Button, Input, Checkbox } from '../../../../smpl-components/index'
import defaultProps from '../../../../default'
import Validation from '../../../validation'
import axios from 'axios';
import API from '../../../../APIconfig.json';

export default class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            password: '',
            checked: false,
            error: false,
            alredy: false
        }
        this.selectData = this.selectData.bind(this);
        this.checkData = this.checkData.bind(this);
        this.updatedDone = this.updatedDone.bind(this);
        this.changeAlready = this.changeAlready.bind(this);
    }

    updatedDone() {
        this.state.update && this.setState({ update: false });
    }

    selectData(name, value) {
        let { data } = this.state;
        let stop = true;

        data.forEach((el, index) => {
            if (el.name === name) {
                data[index].value = value;
                'password' === name &&
                    this.setState({ password: value });
                stop = false;
                this.setState(data);
                return
            }
        })
        if (stop) {
            'password' === name &&
                this.setState({ password: value });
            data.push({ name: name, value: value })
            this.setState(data);
        }

        this.props.saveData(data);
    }

    getSaveData(name) {
        const { entry = [] } = this.props;
        let value = '';
        entry.forEach((el, index) => {
            if (el.name === name) {
                value = entry[index].value;
            }
        })
        return value;
    }

    checkData() {
        const { data, checked } = this.state;
        let succses = true;
        let error = false;

        if (checked) {
            error = false
        } else {
            error = true;
        }

        this.setState({ update: true, error: error });

        if (data.length < 5) {
            return false;
        }
        data.forEach((el) => {
            if (el.value.length === 0)
                succses = false
        })
        return succses;
    }

    async sendData() {
        let data = {};
        const { entryAll } = this.props;
        this.props.spinner(true);
        data['companyName'] = entryAll['details step'].officialName;
        data['companyRegistrationNumber'] = entryAll['details step'].vat;
        data['address'] = entryAll['details step'].address;
        data['zipCode'] = entryAll['details step'].zipcode;
        data['city'] = entryAll['details step'].city;
        data['officeEmail'] = entryAll['account step'].filter((el) => el.name === 'email' && el.value)[0].value;
        data['officePhone'] = entryAll['account step'].filter((el) => el.name === 'number' && el.value)[0].value;
        data['firstName'] = entryAll['account step'].filter((el) => el.name === 'name' && el.value)[0].value;
        data['lastName'] = entryAll['account step'].filter((el) => el.name === 'surname' && el.value)[0].value;
        data['password'] = entryAll['account step'].filter((el) => el.name === 'password' && el.value)[0].value;

        try {

            const res = axios.post(API.creditorsAPI, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json-patch+json',
                },
            })
            if (!!res.data.error) {
                this.changeAlready(true);
            } else {
                this.props.saveID(res.data.id);
                this.props.changeStep(true);
            }
            this.props.spinner();
        } catch (e) {
            console.log('Err: ', e)
            this.props.spinner();
        }
    }

    changeAlready(alredy) {
        this.setState({ alredy: alredy ? alredy : false })
    }

    render() {
        const { changeStep, entry = [] } = this.props;
        const { password, update, checked, error, alredy } = this.state;
        const { content } = this.props.data;
        const { btnPrimaryColor } = defaultProps.btnStyles;

        let err = error ? !checked && true : false;
        return (
            <div className="left-panel-block">
                <div className="left-panel-container-header">
                    {content.container_header}
                </div>
                <div className="left-panel-container-text left-panel-container-content">
                    {content.header_content}
                </div>

                <div className="container-inp">
                    <Input title={'FORNAVN'}
                        name='name'
                        autofocus={true}
                        updatedDone={this.updatedDone()}
                        update={update}
                        defaultValue={this.getSaveData('name')}
                        placeholder={'Skriv dit fornavn'}
                        errorMes={'Navnet er forkert'}
                        error={(el) => { return Validation.validationName(el) }}
                        onChange={(name, value) => { this.selectData(name, value) }} />

                    <Input title={'EFTERNAVN'}
                        name='surname'
                        updatedDone={this.updatedDone()}
                        update={update}
                        defaultValue={this.getSaveData('surname')}
                        placeholder={'Skriv dit efternavn'}
                        errorMes={'Navnet er forkert'}
                        error={(el) => { return Validation.validationName(el) }}
                        onChange={(name, value) => { this.selectData(name, value) }} />
                </div>
                <div className="container-inp">
                    <Input title={'Arbejdsmail'}
                        name='email'
                        updatedDone={this.updatedDone()}
                        update={update}
                        defaultValue={this.getSaveData('email')}
                        placeholder={'E-mail (arbejdsmail) '}
                        errorMesAlredy={'E-mail is already taken'}
                        alredy={alredy}
                        changeAlready={this.changeAlready}
                        errorMes={'E-mail er forkert'}
                        error={(el) => { return Validation.validationEmail(el) }}
                        onChange={(name, value) => { this.selectData(name, value) }} />

                    <Input title={'Mobilnummer på kontaktperson'}
                        updatedDone={this.updatedDone()}
                        update={update}
                        defaultValue={this.getSaveData('number')}
                        name='number'
                        placeholder={'Mobilnummer (arbejde)'}
                        errorMes={'Nummeret er forkert'}
                        error={(el) => { return Validation.validationCVR(el) }}
                        onChange={(name, value) => { this.selectData(name, value) }} />
                </div>
                <div className="container-inp">
                    <Input title={'VÆLG PASSWORD (min 8 karakterer)'}
                        updatedDone={this.updatedDone()}
                        update={update}
                        defaultValue={this.getSaveData('password')}
                        name='password'
                        placeholder={'Skriv et password'}
                        type={'password'}
                        errorMes={'Adgangskode er forkert'}
                        error={(el) => { return Validation.validationPass(el) }}
                        onChange={(name, value) => { this.selectData(name, value) }} />

                    <Input title={'GENTAG PASSWORD'}
                        name='dublePassword'
                        updatedDone={this.updatedDone()}
                        update={update}
                        defaultValue={this.getSaveData('dublePassword')}
                        type={'password'}
                        placeholder={'Gentag password'}
                        errorMes={'Adgangskode er forkert'}
                        dublPass={password}
                        error={(el, el2) => { return Validation.validationDublPass(el, el2) }}
                        onChange={(name, value) => { this.selectData(name, value) }} />
                </div>

                <div className="container-checkbox">
                    <Checkbox title={'Jeg accepterer Likvido Inkasso ApS '} error={err} value={checked} onChange={() => this.setState({ checked: !checked })} url={'https://likvido.dk/betingelser/'} />
                </div>
                <div className="container-button">
                    <Button onChange={() => this.checkData() && checked && this.sendData()} title={<span className="button-container-title">Næste <span className='block-arrow'>→</span> </span>} styles={{ backgroundColor: btnPrimaryColor }} />
                    <Button onChange={() => changeStep(false)} title={'Forrige'} className={'button button-back'} />
                </div>
            </div>
        )
    }
}
