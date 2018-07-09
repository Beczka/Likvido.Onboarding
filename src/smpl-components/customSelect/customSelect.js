import React from 'react';
import { Button, Spinner } from '../index';
import defaultProps from '../../default'
import Home from '../../styles/img/home.png';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
    };

  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    const { placeholder = '' } = this.props;
    return (
      <Select
        name="form-field-name"
        placeholder={placeholder}
        value={selectedOption}
        onChange={this.handleChange}
        
        options={[
          { value: 'Nej, start automatisk', label: 'Nej, start automatisk' },
          { value: '[Ja, kræver godkendelse', label: '[Ja, kræver godkendelse' },
        ]}
      />
    );
  }
}
