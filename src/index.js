import Timeline from './lib/Timeline'

const EVENTS_TO_MODIFY = [
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
  'wheel'
]

const originalAddEventListener = document.addEventListener.bind()

const originalRemoveEventListener = document.removeEventListener.bind()

if (document) {
  document.addEventListener = (type, listener, options, wantsUntrusted) => {
    let modOptions = options
    if (EVENTS_TO_MODIFY.includes(type)) {
      if (typeof options === 'boolean') {
        modOptions = {
          capture: options,
          passive: false
        }
      } else if (typeof options === 'object') {
        modOptions = {
          passive: false,
          ...options
        }
      }
    }

    return originalAddEventListener(type, listener, modOptions, wantsUntrusted)
  }

  document.removeEventListener = (type, listener, options) => {
    let modOptions = options
    if (EVENTS_TO_MODIFY.includes(type)) {
      if (typeof options === 'boolean') {
        modOptions = {
          capture: options,
          passive: false
        }
      } else if (typeof options === 'object') {
        modOptions = {
          passive: false,
          ...options
        }
      }
    }
    return originalRemoveEventListener(type, listener, modOptions)
  }
}

export {
  default as TimelineMarkers
} from './lib/markers/public/TimelineMarkers'
export { default as TodayMarker } from './lib/markers/public/TodayMarker'
export { default as CustomMarker } from './lib/markers/public/CustomMarker'
export { default as CursorMarker } from './lib/markers/public/CursorMarker'
export { default as TimelineHeaders } from './lib/headers/TimelineHeaders'
export { default as SidebarHeader } from './lib/headers/SidebarHeader'
export { default as CustomHeader } from './lib/headers/CustomHeader'
export { default as DateHeader } from './lib/headers/DateHeader'
export default Timeline
