import React from 'react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorShow: false,
            errorShowAlredy: false
        };
        this.validation = this.validation.bind(this);
    }

    updated() {
        const { defaultValue = '', update = false } = this.props;
        update && this.validation(defaultValue)
    }

    componentWillReceiveProps(nextProps) {
        const { defaultValue = '', update = false, updatedDone = () => { },alredy } = nextProps
        update && this.validation(defaultValue);
        alredy && this.setState({ errorShowAlredy: true })
        updatedDone();
    }

    validation(el) {
        const { name, alredy, changeAlready = () => {} } = this.props;
        const value = typeof el === 'object' ? el.target.value : el;
        let error = false;
        this.setState({ errorShowAlredy: false })
            changeAlready();

        if (!!this.props.dublPass) {
            error = this.props.error(value, this.props.dublPass)
        }
        else {
            error = this.props.error(value)
        }

        this.props.onChange(name, value);
        if (value === '') {
            this.setState({ errorShow: true });
            return '';
        }

        this.setState({ errorShow: !error });

    }

    alredy() {
        this.setState({ errorShowAlredy: true });
    }

    render() {
        const { errorMes = '', alredy = false, errorMesAlredy = '', placeholder = '', autofocus = false, defaultValue = '', type = '', name = '', title = '' } = this.props;
        const { errorShow, errorShowAlredy } = this.state;

        return (
            <div className="input-block">
                {title && <div className="input-title">
                    {title}
                </div>}
                <div>
                    <input type={type} name={name} autoComplete="off" autoFocus={autofocus} placeholder={placeholder} defaultValue={defaultValue} className={`input-value ${errorShow ? 'error' : ''}`} onChange={this.validation} />
                </div>
                <span className={`error-message ${errorShow || errorShowAlredy ? 'show' : ''}`}> {errorShow ? errorMes : errorShowAlredy && errorMesAlredy}</span>
            </div>
        )
    }
}
