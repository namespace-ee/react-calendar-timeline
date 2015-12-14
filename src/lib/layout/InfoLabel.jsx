import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import moment from 'moment';

export default class InfoLabel extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    let style = {
      position: 'fixed',
      left: '100px',
      bottom: '50px',
      background: 'rgba(0,0,0,0.5)',
      color: 'white',
      padding: '10px',
      fontSize: '20px',
      borderRadius: '5px'
    }

    return (
      <div style={style}>
        {this.props.label}
      </div>
    );
  }
}

InfoLabel.propTypes = {
  label: React.PropTypes.string.isRequired
};
InfoLabel.defaultProps = {
  label: ''
};
