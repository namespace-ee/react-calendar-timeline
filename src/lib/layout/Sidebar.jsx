import React, { Component } from 'react';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let containerStyle = {
      width: `${this.props.width}px`,
      height: `${this.props.lineHeight * (this.props.groups.length + 2)}px`,
      boxSizing: 'border-box',
      borderRight: this.props.sidebarBorderRight,
      overflow: 'hidden',
      display: 'inline-block',
      verticalAlign: 'top',
      background: this.props.gradientBackground
    };

    let headerStyle = {
      height:`${this.props.lineHeight * 2}px`,
      lineHeight:`${this.props.lineHeight}px`,
      margin: '0',
      color: this.props.sidebarColor,
      background: this.props.sidebarBackgroundColor,
      borderRight: this.props.sidebarBorderRight,
      boxSizing: 'border-box',
      width: `${this.props.width}px`,
    };

    let groupsStyle = {
      width: `${this.props.width}px`
    };

    let elementStyle = {
      height: `${this.props.lineHeight}px`,
      lineHeight: `${this.props.lineHeight}px`,
      padding: '0 4px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      margin: '0'
    };

    if (this.props.fixedHeader) {
      headerStyle.position = 'fixed';
      headerStyle.zIndex = this.props.zIndex;
      groupsStyle.paddingTop = headerStyle.height;
    };

    let header = <div key='sidebar-header'
                      style={headerStyle}>
                    {this.props.children}
                  </div>;

    let groups = this.props.groups.map(group => {
      return (
        <p key={group.id} style={elementStyle}>
          {group.title}
        </p>
      );
    });

    return (
      <div style={containerStyle}>
        {header}
        <div style={groupsStyle}>
          {groups}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  groups: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  sidebarColor: React.PropTypes.string.isRequired,
  sidebarBackgroundColor: React.PropTypes.string.isRequired,
  gradientBackground: React.PropTypes.string.isRequired,
  zIndex: React.PropTypes.number,
  fixedHeader: React.PropTypes.bool,
  sidebarBorderRight: React.PropTypes.string
};
Sidebar.defaultProps = {
  fixedHeader: false,
  zIndex: 12,
  sidebarBorderRight: '1px solid #aaa'
};
