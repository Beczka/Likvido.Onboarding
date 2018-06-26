import React from 'react';
import { Button } from '../index';
import defaultProps from '../../default'

export default class TopPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showItem: false,
            searchValue: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
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
        const { data = [], changeStep = () => { }, search = () => { }, selectValue = () => { } } = this.props;
        const { showItem, searchValue } = this.state;
        const { btnPrimaryColor } = defaultProps.btnStyles;

        return (
            <div >
                <div className="search-container">
                    <img className="icon-home" />
                    <span className="divider" />
                    <input className='search-value' placeholder={'Skriv navnet på din virksomhed eller dit CVR nummer'}
                        value={searchValue}
                        onChange={(el) => { this.setState({ searchValue: el.target.value }); search(el) }}
                        onClick={() => this.setState({showItem: !showItem})} />
                    <Button onChange={!!searchValue && changeStep} title={'Søg →'} styles={{ backgroundColor: btnPrimaryColor }} />
                    <div className={`search-container-block ${this.state.showItem ? 'show' : ''}`} >
                        <div className="search-container-block-item">
                            <span className="search-container-block-label-main">Virksomhedsnavn</span>
                            <span className="search-container-block-cvr-main">CVR</span>
                            <span className="search-container-block-arrow">→</span>
                        </div>
                        {data.map((el, index) => {
                            return <div className="search-container-block-item" key={index} 
                                        onClick={() => this.setState({ searchValue: el.registrationName, showItem: !showItem })} >
                                <span className="search-container-block-label">{el.label}</span>
                                <span className="search-container-block-cvr">{el.registrationName}</span>
                                <span className="search-container-block-arrow">→</span>
                            </div>
                        })}
                    </div>
                </div>

            </div>
        )
    }
}
