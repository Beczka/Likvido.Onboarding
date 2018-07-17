import React from 'react'
import { Button } from '../../../../smpl-components/index'
import defaultProps from '../../../../default'
import Img from '../../../../styles/img/Flat Line Modern Concept Illustration - Teamwork.png';
import f389 from '../../../../styles/img/1f389.png';

export default class Greeting extends React.Component {
    render() {
        const { changeStep } = this.props;
        const { content } = this.props.data;
        const { btnPrimaryColor } = defaultProps.btnStyles;

        return (
            <div className="left-panel-block greeting">
                <div className="left-panel-container-header">
                    {content.container_header} <img src={f389}/>
                </div>
                <div className="left-panel-container-text left-panel-container-content text-align-senter">
                    {content.header_content}
                </div>
                <img className="Fill-1" src={Img} />
                <Button onChange={changeStep} title={'Tilknyt regnskabsprogram'} styles={{ backgroundColor: btnPrimaryColor, width: 235 }} />
            </div>
        )
    }
}
