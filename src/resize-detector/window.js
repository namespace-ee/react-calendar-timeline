function addListener(component) {
  component._resizeEventListener = {
    handleEvent: () => {
      component.resize()
    }
  }

  window.addEventListener('resize', component._resizeEventListener)
}

function removeListener(component) {
  window.removeEventListener('resize', component._resizeEventListener)
}

export default { addListener, removeListener }
