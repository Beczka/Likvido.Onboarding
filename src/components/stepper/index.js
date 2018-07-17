import React from 'react';
import LeftPanel from './panels/leftPanel'
import RightPanel from './panels/rightPanel'
import TopPanel from './panels/topPanel'
import data from '../../data.json'
import LoadingPage from './contents/loadingPage/loadingPage'

export default class step extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: [{
                name: 'Opret konto', status: 'progress'
            }, {
                name: 'Tilknyt regnskabssystem', status: ''
            }, {
                name: 'Design kampagne', status: ''
            }, {
                name: 'Vælg sager', status: ''
            }, {
                name: 'Bekræft kampagne', status: ''
            }],
            loading: false,
            activePart: 'Design kampagne',
        };

        this.changeStatus = this.changeStatus.bind(this);
        this.changeLoading = this.changeLoading.bind(this);
        this.saveActivePart = this.saveActivePart.bind(this);
        this.saveActiveStep =this.saveActiveStep.bind(this);
    }

    changeStatus(name, status) {
        let { parts } = this.state;

        parts.forEach((el, index) => {
            if (el.name === name) {
                parts[index].status = status;
            }
        });
        this.setState({ parts: parts });
    }

    saveActivePart(el) {
        this.setState({ activePart: el, activeStep: '' });
    }

    saveActiveStep(el) {
        this.activeStep = el.activeStep
    }

    changeLoading(status, title, body, progress) {
        this.setState({ loading: status, title: title, body: body, progress: progress })
    }

    render() {
        const { parts, loading, activePart = '', body, title, progress } = this.state;
        return ([
            <div className="compan-block">
                <div className="compan-logo">
                    {data.logo}
                </div>
                <div className="login">Allerede bruger? <u className="login-url">Login →</u>
                </div>

            </div>
            ,
            <div className="main">
                {loading ?
                    <div className="container-main">
                        <LoadingPage changeLoading={this.changeLoading} body={body} title={title} progress={progress} />
                    </div>
                    :
                    [<TopPanel parts={parts} />,
                    <div className="container-main">
                        <LeftPanel parts={parts} activePart={activePart} activeStep={this.activeStep} saveActiveStep={this.saveActiveStep} saveActivePart={this.saveActivePart} changeStatus={this.changeStatus} changeLoading={this.changeLoading} />
                        <RightPanel activeStep={activePart} />
                    </div>]
                }
            </div>
        ]

        )
    }
}
