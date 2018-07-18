import React from 'react'
import { Button } from '../../../../smpl-components/index'
import defaultProps from '../../../../default'
import { Pie } from 'react-chartjs-2';

export default class Distribution extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                labels: [
                    'Ikke forfalden',
                    '1-30 dage forfalden',
                    '30-200 dage forfalden',
                    'Over 200 dage forfalden',
                ],
                datasets: [{
                    data: [200, 40, 50, 35],
                    backgroundColor: [
                        '#666ee8',
                        '#50a7d7',
                        '#464855',
                        '#ff4961'
                    ]
                }]
            },
        }

    }


    render() {
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { changeStep,changePart } = this.props;
        const { data } = this.state;

        return (
            <div className="left-panel-block align-items-center ">
                <span className="panel-bl-content margin-0">Ubetalte faktura du har tilgode</span>
                <div className="left-panel-container-header font-bolt">
                    477.500 DKK
                </div>
                <div className="left-panel-container-text left-panel-container-content text-align-senter">
                    Likvido hjelper dig ned at inddrive denne geld hurtigt, effektivt og gratis.
                    Brug 2 minutter pa at designe et rykker & inkasso flow, og velg efterfolgende
                    hvad der skal ske med dine nuverende faktura.
                </div>
                <Pie data={data} 
                options={{
                    maintainAspectRatio: false
                }} />
                <div className="container-button">
                    <Button onChange={() => changeStep(true)} title={'Design inddrivelsesflow'} styles={{ backgroundColor: btnPrimaryColor, width: 235 }} />
                    <Button onChange={() => changePart(false)} title={'Forrige'} className={'button button-back'} />
                </div>
            </div>
        )
    }
}
