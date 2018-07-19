import React from 'react';
import { Button, CustomSelect } from '../../../../smpl-components/index';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import alert from '../../../../styles/img/alert-circle-i.png';
import defaultProps from '../../../../default';

export default class ModalTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    selectData(name, value) {
        this.setState({ email: value })
    }


    render() {
        const { saveData, openModal } = this.props;
        const { btnPrimaryColor } = defaultProps.btnStyles;

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
            Cell: props => <span className='number'>{props.value}</span>,
            minWidth: 300
        }, {
            Header: props => <span>Kraves godkendelse? <img src={alert} alt="..." /></span>,
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

        return (
            [<div className="modal-container" onClick={() => openModal(false)} key={200} />,
            <div className="modal modal-table" key={201}>
                <div className="modal-header">
                    <div className="modal-header-title">
                        Rediger inddrivelsen for
                        </div>
                    <div className="modal-header-icon">
                        <a className="close" onClick={() => openModal(false)} />
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-body-text">
                        Da denne faktura alerebe er forfalden 12 dage kan du ikke starte med  proaktive remindere.
                        Vi foreslar folgende inddrivelsesflow. Klik pa boksense for at fravaelge / redigere de enkelte stadier.
                        </div>
                    <ReactTable
                        data={data}
                        columns={columns}
                        showPagination={false}
                        pageSize={data.length}
                    />
                    <div className="container-button">
                        <Button onChange={() => { openModal(false) }} title={'Gem'} styles={{ backgroundColor: btnPrimaryColor }} />
                        <Button onChange={() => { openModal(false) }} title={'Annuller'} className={'button button-back'} />
                    </div>
                </div>
            </div>
            ])
    }
}
