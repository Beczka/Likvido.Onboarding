import { Button, CustomSelect } from '../../../../smpl-components/index';
import SettingsReminder from './settingsReminder';
import defaultProps from '../../../../default';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import React from 'react';
import alert from '../../../../styles/img/alert-circle-i.png';

export default class Design extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            checked: true,
            dataSwitch: {},
            editorStateContent: {},
            email: {},
            editorStateHeader: {},
            row: ''
        }
        
        this.dataSwitch = {};
        this.editorStateContent= {};
        this.email= {};
        this.editorStateHeader= {};
        this.openModal = this.openModal.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    openModal(status) {
        this.setState({ openModal: status ? status : false })
    }

    saveData(data, editorStateContent2, editorStateHeader2, email2) {
        let { row } = this.state;
        this.dataSwitch[row] = data || [];
        this.editorStateContent[row] = editorStateContent2;
        this.editorStateHeader[row] = editorStateHeader2;
        this.email[row] = email2;
    }


    render() {
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep } = this.props;
        const { openModal, row, } = this.state;

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
            accessor: d => <u href="#" onClick={() => {this.openModal(true); this.setState({row: d.name})}}>Se mere</u>,
            maxWidth: 100
        }, {
            Header: props => <span>Kraves godkendelse? <img src={alert}  alt="..."/></span>, // Custom header components!
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

        return ([openModal && <SettingsReminder openModal={this.openModal} email={this.email[row]} saveData={this.saveData} editorStateHeader={this.editorStateHeader[row]} editorStateContent={this.editorStateContent[row]} dataSwitch={this.dataSwitch[row]} key={16}/>,
        <div className="left-panel-block padding-top-25px" key={17}>
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
                <Button onChange={() => changeStep(true)} title={'Næste (inkasso indstillinger) →'} styles={{ backgroundColor: btnPrimaryColor, width: 260 }} />
                <Button onChange={() => changeStep(false)} title={'Forrige'} className={'button button-back'} />
            </div>
        </div>
        ])
    }
}
