import elementResizeDetectorMaker from 'element-resize-detector'

function addListener (component) {
  component._erd = elementResizeDetectorMaker({
    strategy: 'scroll'
  })

  component._erdWidth = component.refs.container.offsetWidth

  component._erd.listenTo(component.refs.container, (element) => {
    var width = element.offsetWidth

    if (component._erdWidth !== width) {
      component.resize(component.props)
      component._erdWidth = width
    }
  })
}

function removeListener (component) {
  component._erd.removeAllListeners(component.refs.container)
}

export default { addListener, removeListener }
