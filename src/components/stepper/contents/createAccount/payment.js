import { Select } from '../../../../smpl-components/index';
import Economic from '../../../../styles/img/e-conomic-logo-til-web.png';
import Billy from '../../../../styles/img/billy-logo-final_blue.png';
import Dinero from '../../../../styles/img/dinero-logo.png';
import Rocket from '../../../../styles/img/🚀.png';
import API from '../../../../APIconfig.json';
import React from 'react';
import axios from 'axios';

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showItem: false,
            selectSearch: '',
            data: [],
            loader: false,
            load: false
        };

        this.cancel = () => { };
        this.data = this.props.data.search;
        this.fetchData = this.fetchData.bind(this);

    }

    async fetchData(value) {
        this.setState({ loader: true });
        let { load } = this.state;
        const CancelToken = axios.CancelToken;

        const source = CancelToken.source();
        if (load) {
            this.cancel('Operation canceled by the user.');
            this.setState({ load: false });
        }

        try {
            this.setState({ load: true });
            this.res = await axios.get(`https://testkredit.likvido.dk/api/v1/Company/typeahead?query=${value}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }, cancelToken: new CancelToken((c) => {
                    this.cancel = c;
                }),
            });
            this.cancel = () => { };

            this.setState({ data: this.res.data, loader: false, load: false });
        } catch (e) {
            this.setState({ loader: false });
        }

    }

    search = (el) => {
        this.setState({ selectSearch: el.target.value });
        this.fetchData(el.target.value);
    };

    render() {
        const { selectSearch, data, loader } = this.state;
        const { content } = this.props.data;
        const { changeStep, value } = this.props;

        return (
            <div className="container">
                <div className="left-panel-block">
                    <div className="left-panel-container-header max-width-530px">
                        {content.container_header} <img src={Rocket} />
                    </div>
                    <div className="left-panel-container-text left-panel-container-content">
                        {content.header_content}
                    </div>
                    <Select data={data} loader={loader} selectValue={!!value ? value : selectSearch} search={this.search} changeStep={(back, el, updated) => changeStep(back, el, updated)} />
                    <span className="panel-bl-content">Kan du ikke finde din virksomhed?&nbsp;
                            <u className="panel-bl-content" onClick={() => changeStep(true, '', true)}>Opret manuelt</u>
                    </span>
                </div>
                <div className="left-panel-block left-panel-payment-info">
                    <div className="left-panel-container-logo-container">
                        <div>
                            <img src={Billy} alt="..." />
                        </div>
                        <div>
                            <img src={Economic} alt="..." />
                        </div>
                        <div>
                            <img src={Dinero} alt="..." />
                        </div>
                    </div>
                    <div className="left-panel-container-text">
                        Likvido fungerer kun med ovenstående regnskabsprogrammer
                            <br />
                        <br />
                        Skriv til os på kontakt@likvido.dk hvis du har ønsker til andre integrationer.
                        </div>
                </div>
            </div>
        )
    }
}
