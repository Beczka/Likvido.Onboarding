import React from 'react';
import { Button, Input } from '../../../../smpl-components/index';
import defaultProps from '../../../../default';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Validation from '../../../validation';
import Switch from 'react-ios-switch';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class SettingsReminder extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dataSwitch: [
                {
                    name: 'reminder',
                    value: true,
                    label: 'Send reminder 5 dage for forfald'
                }, {
                    name: 'email',
                    value: true,
                    label: 'Send pa e-mail'
                }, {
                    name: 'sms',
                    value: true,
                    label: 'Send pa SMS'

                }, {
                    name: 'post',
                    value: true,
                    label: 'Send med post hvis der ikke findes en e-mail eller telefonnummer (gratis)'

                }
            ],
            checked: true,
            editorStateContent: this.props.editorStateContent || '',
            editorStateHeader: this.props.editorStateHeader || '',
            email: this.props.email || ''

        }
        this.updatedDone = this.updatedDone.bind(this);
        this.selectData = this.selectData.bind(this);
        this.changeSwitch = this.changeSwitch.bind(this);

        this.onChangeContent = (editorState) => {
            this.setState({ editorStateContent: editorState });
        };
        this.onChangeHeader = (editorState) => this.setState({ editorStateHeader: editorState });
    }

    componentDidMount() {
        this.setState({dataSwitch: this.props.dataSwitch || [
            {
                name: 'reminder',
                value: true,
                label: 'Send reminder 5 dage for forfald'
            }, {
                name: 'email',
                value: true,
                label: 'Send pa e-mail'
            }, {
                name: 'sms',
                value: true,
                label: 'Send pa SMS'

            }, {
                name: 'post',
                value: true,
                label: 'Send med post hvis der ikke findes en e-mail eller telefonnummer (gratis)'

            }
        ] })
    }

    updatedDone() {
        this.state.update && this.setState({ update: false })
    }

    selectData(name, value) {
        this.setState({ email: value })
    }

    changeSwitch(index, value) {
        let { dataSwitch } = this.state;
        dataSwitch[index].value = !value;
        this.setState(dataSwitch);
    }

    render() {
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { saveData, openModal } = this.props;
        const { update = false, dataSwitch, editorStateContent, editorStateHeader, email } = this.state;

        return (
            [<div className="modal-container" onClick={() => openModal(false)} key={200} />,
            <div className="modal" key={201}>
                <div className="modal-header">
                    <div className="modal-header-title">
                        Indstillinger for reminder 5 dage for forfald
                        </div>
                    <div className="modal-header-icon">
                        <a className="close" onClick={() => openModal(false)} />
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-body-container-radio">
                        {dataSwitch.map((el, index) => {
                            return <div className="switch-container" key={Math.random()}>
                                < Switch
                                    checked={el.value}
                                    offColor="white"
                                    onChange={() => this.changeSwitch(index, el.value)}
                                    onColor="#666ee8"
                                    className="switch"
                                />
                                <label>{el.label}</label>
                            </div>

                        })}
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
                                    <input type="text" value={editorStateHeader} placeholder={'En venlig reminder om faktura <faktura> forfalder om 5 dage'} onChange={(el) => this.onChangeHeader(el.target.value)} />
                                </div>
                            </div>
                            <div className="subject-line-container">
                                {/* <textarea value={editorStateContent} onChange={(el) => this.onChangeContent(el.target.value)} /> */}
                                <Editor
                                    editorState={editorStateContent}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={(editorState) => this.onChangeContent(editorState)}
                                />
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
                                        defaultValue={email}
                                        error={(el) => { return Validation.validationEmail(el) }}
                                        onChange={(name, value) => { this.selectData(name, value) }} />
                                </div>
                                <Button onChange={() => { }} title={'Send test'} styles={{ backgroundColor: btnPrimaryColor }} />
                            </div>

                            <div className="container-button">
                                <Button onChange={() => { saveData(dataSwitch, editorStateContent, editorStateHeader, email); openModal(false) }} title={'Gem'} styles={{ backgroundColor: btnPrimaryColor }} />
                                <Button onChange={() => { openModal(false) }} title={'Annuller'} className={'button button-back'} />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 3</h2>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            ])
    }
}
