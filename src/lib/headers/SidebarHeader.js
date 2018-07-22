import React from 'react'
import PropTypes from 'prop-types'
import {TimelineHeadersConsumer} from './HeadersContext'
import {LEFT_VARIANT, RIGHT_VARIANT, LEFT_SIDEBAR_ID, RIGHT_SIDEBAR_ID} from './constants'

class SidebarHeader extends React.PureComponent {

    static propTypes = {
        children: PropTypes.func.isRequired,
        subscribeHeader: PropTypes.func.isRequired,
        rightSidebarWidth: PropTypes.number,
        leftSidebarWidth: PropTypes.number.isRequired,
    }

    constructor(props){
        super(props)
        console.log(props)
        const width = props.variant === RIGHT_VARIANT ? props.rightSidebarWidth : props.leftSidebarWidth
        const id = props.variant === RIGHT_VARIANT ? RIGHT_SIDEBAR_ID : LEFT_SIDEBAR_ID
        this.unsubscribe = props.subscribeHeader({
          renderer: props.children,
          props: {
              width,
          }
        }, id)
      }
    
      componentWillUnmount() {
        if (this.unsubscribe != null) {
          this.unsubscribe()
          this.unsubscribe = null
        }
      }

    render(){
        return null
    }
}

const SidebarWrapper = ({children}) => <TimelineHeadersConsumer>
    {({subscribeHeader, leftSidebarWidth, rightSidebarWidth})=>{
        return <SidebarHeader leftSidebarWidth={leftSidebarWidth} rightSidebarWidth={rightSidebarWidth} subscribeHeader={subscribeHeader} children={children}/>
    }}
</TimelineHeadersConsumer>

SidebarWrapper.propTypes={
    children: PropTypes.func.isRequired,
    variant: PropTypes.string,
}

SidebarWrapper.defaultProps = {
    variant: LEFT_VARIANT
}

export default SidebarWrapper
