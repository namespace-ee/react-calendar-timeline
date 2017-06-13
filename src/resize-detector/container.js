import elementResizeDetectorMaker from 'element-resize-detector'

function addListener (component) {
  component._erd = elementResizeDetectorMaker({
    strategy: 'scroll'
  })

  component._erd.listenTo(component.refs.container, () => {
    component.resize(component.props)
  })
}

function removeListener (component) {
  component._erd.removeAllListeners(component.refs.container)
}

export default { addListener, removeListener }
