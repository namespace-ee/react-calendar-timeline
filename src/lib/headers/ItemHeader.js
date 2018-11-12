import React from 'react';


class ItemHeader extends React.PureComponent {
    render(){
        
    }
}


const ItemHeaderWrapper = ({
    style,
    className,
    props,
  }) => (
    <TimelineStateConsumer>
      {({ getTimelineState }) => {
        const timelineState = getTimelineState()
        return (
          <ItemHeader
            style={style}
            className={className}
            props={props}
          />
        )
      }}
    </TimelineStateConsumer>
  )
  
  ItemHeaderWrapper.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    props: PropTypes.object,
  }
  