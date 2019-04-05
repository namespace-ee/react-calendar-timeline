import interact from 'interactjs'
function stopPropagation(event) {
    event.stopPropagation()
}



import React, { Component } from 'react'

export default class Point extends Component {
    ref = React.createRef()

    updateLine = this.updateLine.bind(this)
    updateLine(x,y,reset){
        const {end, dimensions, id} = this.props
        // console.log('LINE UPDATED')
        
        let line = document.getElementById(id)
        if(!line){
            const svg = document.getElementById('svg-canvas');
            line = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
            line.style.stroke = "#00a0fc"; //Set stroke colour
            line.style.strokeWidth = "2px"; //Set stroke width
            line.id = id
            svg.appendChild(line);
            // console.log(svg)
        }

        const top = dimensions.top
        const left = dimensions.left
        const width = dimensions.width
        const height = dimensions.height
        const startX = end ? left + width - 10 : left + 10
        const startY = end ? top + height -10 : top + 10
        const offsetX = startX
        const offsetY = end ? startY + 14 : startY - 14
        const endX = offsetX + x || offsetX
        const endY = offsetY + y ||  offsetY
        // console.log(line)
        line && line.setAttribute("d",`M ${startX} ${startY} L ${endX} ${endY}`)
    }

    dragEndListener = this.dragEndListener.bind(this)
    dragEndListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = 0,
            y = 0
        // translate the element
        target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';
        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        // endX.current = offsetX.current
        // endY.current = offsetY.current
        this.updateLine(0,0,'reset')
    }

    dragMoveListener = this.dragMoveListener.bind(this)
    dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';
        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        // endX.current = offsetX.current + x
        // endY.current = offsetY.current + y
        this.updateLine(x,y)
    }

    componentDidMount(){
        interact(this.ref.current)
        .draggable({
            autoScroll: true,
            onmove: this.dragMoveListener,
            onend: this.dragEndListener
        })
        this.updateLine()
    }
    componentWillReceiveProps(props){
        this.props = props
        this.updateLine()
    }
    componentWillUnmount(){
        const svg = document.getElementById('svg-canvas');
        const line = document.getElementById(this.props.id)
        svg.removeChild(line);
        interact(this.ref.current).unset()
    }

    render() {
        const style = {
            position: 'absolute',
            [this.props.end ? 'right' : 'left']: 4,
            [this.props.end ? 'bottom' : 'top']: -10,
            width: 8,
            height: 8,
            borderRadius: 4,
            background: '#00a0fc',
        }
        return <div id={this.props.itemId} style={style} className="dragged-point" ref={this.ref} onMouseDown={stopPropagation}/>
  }
}