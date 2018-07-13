import React from 'react';
import { Button, Input } from '../../../../smpl-components/index';
import defaultProps from '../../../../default';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Validation from '../../../validation';
import Switch from 'react-ios-switch';

export default class ModalVideo extends React.Component {
    constructor(props) {
        super(props)

        const { dataSwitch } = this.props;
        this.state = {

        }
    }


    render() {
        const { btnPrimaryColor } = defaultProps.btnStyles;
        const { saveData, openModal } = this.props;

        return (
            <div className="modal-container">
                <div className="modal modal-video-container">
                    <div className="modal-header">
                        <div className="modal-header-title">
                        Video guide: Sådan synkroniserer du Likvido med Dinero
                        </div>
                        <div className="modal-header-icon" onClick={() => openModal()}>
                            <a className='close' />
                        </div>
                    </div>
                    <div className="modal-video">
                        {/* <video width="400" height="300"  src="https://youtube.com/watch?v=yBLdQ1a4-JI" controls="controls" poster="video/duel.jpg"/> */}
                        <iframe  src="https://www.youtube.com/embed/Ct6BUPvE2sM" frameborder="0" allow="autoplay; encrypted-media" />
                    </div>
                </div>
            </div>
        )
    }
}
