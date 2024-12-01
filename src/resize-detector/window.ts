function addListener(component: {
  _resizeEventListener?: (e: UIEvent) => void
  resize: () => void
}) {
  component._resizeEventListener = () => component.resize()

  window.addEventListener('resize', component._resizeEventListener)
}

function removeListener(component: Record<string, any>) {
  window.removeEventListener('resize', component._resizeEventListener!)
}

export default { addListener, removeListener }
