import React from 'react'
import { render } from '@testing-library/react'
import dayjs from 'dayjs'
import Timeline from 'lib/Timeline'
import { noop } from 'test-utility'

const defaultProps = {
  ...Timeline.defaultProps,
  items: [],
  groups: []
}

describe('Timeline', () => {
  describe('initialization', () => {
    it('renders with defaultTimeStart and defaultTimeEnd', () => {
      const defaultTimeStart = dayjs('2018-01-01').toDate()
      const defaultTimeEnd = dayjs('2018-03-01').toDate()

      const props = {
        ...defaultProps,
        defaultTimeStart,
        defaultTimeEnd
      }

      const { container } = render(<Timeline {...props} />)

      expect(container.querySelector('.rct-scroll')).toBeDefined()
    })

    it('renders with visibleTimeStart and visibleTimeEnd', () => {
      const visibleTimeStart = dayjs('2018-01-01').valueOf()
      const visibleTimeEnd = dayjs('2018-03-01').valueOf()

      const props = {
        ...defaultProps,
        visibleTimeStart,
        visibleTimeEnd
      }

      const { container } = render(<Timeline {...props} />)

      expect(container.querySelector('.rct-scroll')).toBeDefined()
    })

    it('throws error if neither visibleTime or defaultTime props are passed', () => {
      const props = {
        ...defaultProps,
        visibleTimeStart: undefined,
        visibleTimeEnd: undefined,
        defaultTimeStart: undefined,
        defaultTimeEnd: undefined
      }
      vi.spyOn(console, 'error').mockImplementation(noop)
      expect(() => render(<Timeline {...props} />)).toThrow(
        'You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline'
      )
      vi.restoreAllMocks()
    })
  })
})
