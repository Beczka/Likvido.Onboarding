import { Button, Checkbox, CustomSelect } from '../../../../smpl-components/index';
import ReactTable from "react-table";
import defaultProps from '../../../../default';
import Switch from 'react-ios-switch';
import React from 'react';


export default class CurrentDebtors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            checked: true,
            dataSwitch: {},
            editorStateContent: '',
            selection: 0,
            allCheck: false,
            data: [
                {
                    kunde: 'Venlig pamindekse',
                    faktura: 5,
                    belob: '5.000 DKK',
                    _id: 1,
                    forfalden: 'Nej',
                    value: false

                }, {
                    kunde: 'Rykker 1',
                    faktura: 7,
                    belob: '5.000 DKK',
                    _id: 2,
                    forfalden: 'Nej',
                    value: false

                }, {
                    kunde: 'Reminder',
                    faktura: 10,
                    _id: 3,
                    belob: '5.000 DKK',
                    forfalden: 'Nej',
                    value: false

                }, {
                    kunde: 'Rykker 2 + inkassovarsel',
                    faktura: 15,
                    _id: 4,
                    belob: '5.000 DKK',
                    forfalden: '2 dage',
                    value: false
                }, {
                    kunde: 'Final notice',
                    faktura: 22,
                    _id: 5,
                    belob: '5.000 DKK',
                    forfalden: '25 dage',
                    value: false
                }]
        }
        this.dataSwitch = {};
        this.openModal = this.openModal.bind(this);
        this.saveData = this.saveData.bind(this);
        this.selectRow = this.selectRow.bind(this);
    }

    openModal(status, row) {
        this.setState({ openModal: status ? status : false, row: row ? row : '' })
    }

    saveData(data, editorStateContent, editorStateHeader) {
        let { row } = this.state;
        this.dataSwitch[row] = data || [];
        this.setState({ editorStateContent: editorStateContent, editorStateHeader: editorStateHeader })
    }

    selectRow(id, status, all) {
        let { data = [] } = this.state;
        let selection = 0;
        let allStatus = true;

        if (all) {
            data.forEach((el, index) => {
                data[index].value = status;
            })
        } else {
            data[id - 1].value = status;
        }

        data.forEach((el) => {
            !el.value ? ( allStatus = false ): (selection++);
        })

        this.setState({ data: data, allCheck: allStatus,selection:selection });
    }

    render() {
        const { checked = false, data, allCheck, selection } = this.state;
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep } = this.props;

        const columns = [{
            accessor: '_id',
            maxWidth: 50,
            Cell: props => <div><Checkbox title={''} value={props.original.value} onChange={() => this.selectRow(props.original._id, !props.original.value)} /></div>
        }, {
            Header: 'Kunde',
            accessor: 'kunde',
            className: 'text-hiden',
            maxWidth: 160,
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Faktura nr.',
            accessor: 'faktura',
            maxWidth: 100,
            Cell: props => <span className='color-grey'>{props.value}</span> // Custom cell components!
        },
        {
            Header: 'Belob',
            accessor: 'belob',
            maxWidth: 100,
            Cell: props => <span className='color-grey'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Forfalden',
            accessor: 'forfalden',
            maxWidth: 100,
            Cell: props => <span className='color-grey'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Start',
            accessor: 'start',
            minWidth: 100,
            Cell: row => (
                <div className={row.index >= 2 ? 'top' : ''}
                    style={{
                        width: "100%",
                        height: "100%",

                    }}
                >
                    <CustomSelect placeholder={'Rykker'} data={['Inkasso','Stanbdy','Rykker']} />
                </div>)
        },
        {
            Header: 'Ret',
            accessor: 'ret',
            maxWidth: 70,
            Cell: row => (
                <div
                    style={{
                        width: "100%",
                        height: "100%",

                    }}
                >

                </div>)
        }];

        return (
            <div className="left-panel-block padding-top-25px react-table">
                <div className="left-panel-container-header">
                    Hvan skal vi gore med dine nuvaerende skyldnere?
                </div>
                <div className="left-panel-container-text left-panel-container-content">
                    Vaelg hvad der skal ske med dine forfaldne faktura fra dit regnskabsprogram. Ud fra gaeldens alder har vi anbefalet at starte enter
                    med rykkerkampagnen eller at ga direkte til inkassovarsel.
                </div>
                <div className="switch-container">
                    < Switch
                        checked={checked}
                        offColor="white"
                        onChange={() => this.setState({ checked: !checked })}
                        onColor="#666ee8"
                        className="switch"
                    />
                    <label>Sammenflet flere krav pa samme kunde</label>
                </div>
                <ReactTable
                    data={data}
                    columns={columns}
                    showPagination={false}
                    pageSize={data.length}
                />
                <div className="react-table-bottom-header">
                    <Checkbox title={`${selection} valg till inddrivelse`} value={allCheck} onChange={() => { this.setState({ allCheck: !allCheck }); this.selectRow('', !allCheck, true) }} />
                </div>
                <div className="container-button">
                    <Button onChange={() => changeStep(true)} title={'Ga til bekraeftelse'} styles={{ backgroundColor: btnPrimaryColor, width: 260 }} />
                    <Button onChange={() => changeStep(false)} title={'Forrige'} className={'button button-back'} />
                </div>
            </div>
        )
    }
}
