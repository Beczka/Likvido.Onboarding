import React from 'react';
import { Button, Spinner } from '../index';
import defaultProps from '../../default'
import Home from '../../styles/img/home.png';

export default class TopPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showItem: false,
            searchValue: '',
            openInput: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentWillMount() {
        this.updatedSelect();
    }

    updatedSelect = () => {
        this.setState({ searchValue: this.props.selectValue })
    }

    handleClick() {
        if (!this.state.showItem) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState(prevState => ({
            showItem: !prevState.showItem,
        }));
    }

    handleOutsideClick(e) {
        if (this.node.contains(e.target)) {
            return;
        }
        this.handleClick();
    }

    render() {
        const { data = [], changeStep = () => { }, loader = true, search = () => { } } = this.props;
        const { showItem, searchValue } = this.state;
        const { btnPrimaryColor } = defaultProps.btnStyles;
        return (
            <div>
                <div className="search-container">
                    <img className="icon-home" src={Home} alt="..." />
                    <span className="divider" />
                    <input className='search-value' placeholder={'Skriv navnet på din virksomhed eller dit CVR nummer'}
                        value={searchValue}
                        type="text"
                        onChange={(el) => { this.setState({ searchValue: el.target.value }); search(el) }}
                        onClick={() => this.setState({ showItem: !showItem, openInput: false })} />
                    <Button onChange={!!searchValue ? () => changeStep(true, searchValue) : () => { }} title={<span className="button-container-title">Søg <span className='block-arrow'>→</span> </span>} styles={{ backgroundColor: btnPrimaryColor }} />
                    <div className={`search-container-block ${this.state.showItem ? 'show' : ''}`} >
                        <div styles={{ position: 'relative' }}>
                            <div className="search-container-block-list">
                                {loader && <Spinner />}
                                <div className="search-container-block-item">
                                    <span className="search-container-block-label-main">Virksomhedsnavn</span>
                                    <span className="search-container-block-cvr-main">CVR</span>
                                    <span className="search-container-block-arrow">→</span>
                                </div>
                                {data.map((el, index) => {
                                    return <div className="search-container-block-item" key={index}
                                        onClick={() => changeStep(true, el.registrationName)} >
                                        <span className="search-container-block-label">{el.label}</span>
                                        <span className="search-container-block-cvr">{el.registrationName}</span>
                                        <span className="search-container-block-arrow">→</span>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="search-container-block-item" >
                            <span className="search-value" onClick={changeStep} style={{ color: btnPrimaryColor }}>Opret manuelt, klik her</span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
