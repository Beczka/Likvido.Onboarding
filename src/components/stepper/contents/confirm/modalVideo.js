import React from 'react';
import defaultProps from '../../../../default';

export default class ModalVideo extends React.Component {

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
                        <iframe  src="https://www.youtube.com/embed/Ct6BUPvE2sM" frameBorder="0" allow="autoplay; encrypted-media" />
                    </div>
                </div>
            </div>
        )
    }
}
