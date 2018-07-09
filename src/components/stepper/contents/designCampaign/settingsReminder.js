import React from 'react'
import { Button, Input } from '../../../../smpl-components/index'
import defaultProps from '../../../../default'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Validation from '../../../validation'

export default class SettingsReminder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
        this.updatedDone = this.updatedDone.bind(this);
        this.selectData = this.selectData.bind(this);
    }

    updatedDone() {
        this.state.update && this.setState({ update: false })
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

        // this.props.saveData(data);
    }


    render() {
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep } = this.props;
        const { update = false } = this.state;
        

        return (
            <div className="modal-container">
                <div className="modal">
                    <div className="modal-header">
                        <div className="modal-header-title">
                            Indstillinger for reminder 5 dage for forfald
                        </div>
                        <div className="modal-header-icon">
                            <a className='close' />
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="modal-body-container-radio">
                            <div>
                                <input type="radio" />
                                <label>Send reminder 5 dage for forfald </label>
                            </div>
                            <div>
                                <input type="radio" />
                                <label>Send pa e-mail</label>
                            </div>
                            <div>
                                <input type="radio" />
                                <label>Send pa SMS </label>
                            </div>
                            <div>
                                <input type="radio" />
                                <label>Send med post hvis der ikke findes en e-mail eller telefonnummer (gratis)</label>
                            </div>
                        </div>
                        <Tabs selectedTabPanelClassName="active">
                            <TabList className="tabs-header-container">
                                <Tab selectedClassName="active">E-mail skabelon</Tab>
                                <Tab selectedClassName="active">SMS skabelon</Tab>
                                <Tab selectedClassName="active">Brev skabelon</Tab>
                            </TabList>

                            <TabPanel>
                                <div className="subject-line-constainer">
                                    <span>Emnelinje:</span>
                                    <div className="subject-line-block">
                                        <span>En venlig reminder om faktura {'<faktura>'} forfalder om 5 dage </span>
                                    </div>
                                </div>
                                <div className="subject-line-container">
                                    testestsettestestsettestestsettestestsettestestsettestestsettestestsettestestsettestestsettestestset
                                    testestsettestestsettestestsettestestsettestestset
                                    testestsettestestsettestestsettestestsettestestsettestestsettestestsettestestsetteste
                                    stsettestestsettestestsettestestsettestestsettestestset
                                    testestsettestestsettestestsettestestset testestsettestestsettestestsettestestset testestsette
                                    stestsettestestset testestsettestestsettestestset  testestsettestestsettestestset
                                    testestsettestestsettestestset testestsettestestsettestestset testestsettestestset testestsette
                                    stestsettestestset
                                    testestsettestestsettestestset testestsettestestsettestestset
                                    testestsettestestsettestestset  testestsettestestsettestestset
                                    testestsettestestsettestestset testestsettestestsetvtestestsettestestsettestestsettestestset
                                    testestsettestestsettestestsettestestsettestestsettestestset testestsettest
                                    estsettestestset testestsettestestsettestestset testestsettestestsettestestset testestsettestestse
                                    ttestestsettestestsettestestsettestestset testestsettestestsettestestset
                                    testestsettestestsettestestset testestsettestestset
                                    testestsettestestsettestestset testestsettestestset
                                    testestsettestestsettestestset testestsettestestset
                                    testestsettestestsettestestset testestsettestestset
                                    testestsettestestsettestestset testestsettestestsetsdsadasddasdasdasdasd
                                    testestsettestestsettestestset testestsettestestsetsdsadasddasdasdasdasdtest
                                    estsettestestsettestestset testestsettestestsettestestsettestestsettestestset testestsettestestset
                                    testestsettestestsettestestset testestsettestestsettestestsettestestsettestestset testestsettestestset
                                    testestsettestestsettestestset testestsettestestsettestestsettestestsettestestset testestsettestestset
                                    testestsettestestsettestestset testestsettestestset testestsettestestsettestestset testestsettestestset
                                    testestsettestestsettestestset testestsettestestset testestsettestestsettestestset
                                     testestsettestestset testestsettestestsettestestset testestsettestestset testestsettestestsettestestset
                                      testestsettestestset
                                    testestsettestestsettestestsette stestsettestestsettestestset
                                    </div>

                                <div className="subject-line-email-container">
                                    <span>Fa tilsendt en test mail </span>
                                    <div className="container-inp">
                                        <Input
                                            name='email'
                                            updatedDone={this.updatedDone()}
                                            update={update}
                                            placeholder={'E-mail (arbejdsmail) '}
                                            errorMes={'e-mail er forkert'}
                                            error={(el) => { return Validation.validationEmail(el) }}
                                            onChange={(name, value) => { this.selectData(name, value) }} />
                                    </div>
                                    <Button onChange={() => { }} title={'Send test'} styles={{ backgroundColor: btnPrimaryColor }} />
                                </div>

                                <div className="container-button">
                                    <Button onChange={() => { }} title={'Gem'} styles={{ backgroundColor: btnPrimaryColor }} />
                                    <Button onChange={() => { }} title={'Annuller'} className={'button button-back'} />
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <h2>Any content 2</h2>
                            </TabPanel>
                            <TabPanel>
                                <h2>Any content 2</h2>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div >
        )
    }
}
