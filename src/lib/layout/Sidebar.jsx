import React, { Component } from 'react';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style = {
      width: `${this.props.width}px`,
      height: `${this.props.lineHeight * (this.props.groups.length + 2)}px`,
      boxSizing: 'border-box',
      borderRight: '1px solid #000',
      overflow: 'hidden',
      display: 'inline-block',
      verticalAlign: 'top',
      background: this.props.gradientBackground
    };

    let header = <p key='sidebar-header'
                    style={{
                      height:`${this.props.lineHeight * 2}px`,
                      lineHeight:`${this.props.lineHeight}px`,
                      margin: '0',
                      color: this.props.headerColor,
                      background: this.props.headerBackgroundColor
                    }}>
                  </p>;

    let elementStyle = {
      height: `${this.props.lineHeight}px`,
      lineHeight: `${this.props.lineHeight}px`,
      padding: '0 4px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      margin: '0'
    }

    let groups = this.props.groups.map(group => {
      return (
        <p key={group.id} style={elementStyle}>
          {group.title}
        </p>
      );
    });

    return (
      <div style={style}>
        {header}
        {groups}
      </div>
    );
  }
}

Sidebar.propTypes = {
  groups: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  headerColor: React.PropTypes.string.isRequired,
  headerBackgroundColor: React.PropTypes.string.isRequired,
  gradientBackground: React.PropTypes.string.isRequired
};
Sidebar.defaultProps = {
};
