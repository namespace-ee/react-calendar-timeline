import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import moment from 'moment';

export default class Controls extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  zoomIn(e) {
    e.preventDefault();
    this.props.changeZoom(0.75);
  }

  zoomOut(e) {
    e.preventDefault();
    this.props.changeZoom(1.25);
  }

  render() {
    return (
      <p>
        <a href='#' onClick={this.zoomIn.bind(this)}>Zoom in</a> | <a href='#' onClick={this.zoomOut.bind(this)}>Zoom out</a>
      </p>
    );
  }
}

Controls.propTypes = {
  changeZoom: React.PropTypes.func.isRequired
};
Controls.defaultProps = {
};
