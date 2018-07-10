import { Button, CustomSelect } from '../../../../smpl-components/index';
import SettingsReminder from './settingsReminder';
import defaultProps from '../../../../default';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import React from 'react';

export default class Design extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            checked: true,
            dataSwitch: {},
            editorStateContent : ''
        }
        this.dataSwitch = {};
        this.openModal = this.openModal.bind(this);
        this.saveData = this.saveData.bind(this);

    }

    openModal(status, row) {
        this.setState({ openModal: status ? status : false, row: row ? row : '' })
    }

    saveData(data,editorStateContent,editorStateHeader) {
        let { row } = this.state;
        this.dataSwitch[row] = data || [];
        this.setState({editorStateContent:editorStateContent,editorStateHeader: editorStateHeader})
    }


    render() {
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep } = this.props;
        const { openModal, editorStateContent, row } = this.state;
        const data = [{
            name: 'Venlig pamindekse',
            id: 5
        }, {
            name: 'Rykker 1',
            id: 7
        }, {
            name: 'Reminder',
            id: 10
        }, {
            name: 'Rykker 2 + inkassovarsel',
            id: 15
        }, {
            name: 'Final notice',
            id: 22
        }];

        const columns = [{
            Header: props => <span className="justify-content-center">Dage efter <br /> forfald</span>,
            accessor: 'id',
            maxWidth: 100
        }, {
            Header: 'Emne',
            accessor: 'name',
            className: 'text-hiden',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: 'Detaljer',
            accessor: d => <u href="#" onClick={() => this.openModal(true, d.name)}>Se mere</u>,
            maxWidth: 100
        }, {
            Header: props => <span>Kraves godkendelse?</span>, // Custom header components!
            accessor: 'friend.age',
            minWidth: 250,
            Cell: row => (
                <div className={row.index >= 2 ? 'top' : ''}
                    style={{
                        width: "100%",
                        height: "100%",

                    }}
                >
                    <CustomSelect placeholder={'Nej, Start automatisk'} />
                </div>)
        }];

        return ([openModal && <SettingsReminder openModal={this.openModal} saveData={this.saveData} editorStateContent={editorStateContent} dataSwitch={this.dataSwitch[row]} />,
        <div className="left-panel-block padding-top-25px">
            <div className="left-panel-container-header">
                Design dit rykkerflow
                </div>
            <div className="left-panel-container-text left-panel-container-content">
                Nar en faktura i dit regnskabsprogram fremover er forfalden mere end 5 dage igangsetter vi
                et rykkerflow. Din virksomher er afsender pa kommunikationen og dine kunder kan ikke se at du bruger Likvido.
                </div>

            <ReactTable
                data={data}
                columns={columns}
                showPagination={false}
                pageSize={5}
            />

            <div className="container-button">
                <Button onChange={() => { }} title={'Næste (inkasso indstillinger) →'} styles={{ backgroundColor: btnPrimaryColor, width: 260 }} />
                <Button onChange={() => changeStep(false)} title={'Forrige'} className={'button button-back'} />
            </div>
        </div>
        ])
    }
}
