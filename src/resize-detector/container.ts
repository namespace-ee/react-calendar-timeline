
import elementResizeDetectorMaker from 'element-resize-detector'

function addListener<T extends object>(component: ListenerParam<T>) {
  component._erd = elementResizeDetectorMaker({
    strategy: 'scroll'
  })

  component._erdWidth = component.container.offsetWidth

  component._erd.listenTo(component.container, (element: HTMLElement) => {
    const width = element.offsetWidth

    if (component._erdWidth !== width) {
      component.resize(component.props)
      component._erdWidth = width
    }
  })
}

export type ListenerParam<T extends object> = {
  _erd: {
    listenTo: (container: HTMLElement, callback: (element: HTMLElement) => void) => void
    removeAllListeners: (container: HTMLElement) => void
  },
  props: T,
  resize: (props: T) => void,
  _erdWidth: number,
  container: HTMLElement
}

function removeListener<T extends object>(component: ListenerParam<T>) {
  component._erd.removeAllListeners(component.container)
}

export default { addListener, removeListener }
