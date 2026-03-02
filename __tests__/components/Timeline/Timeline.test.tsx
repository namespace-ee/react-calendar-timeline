import { render } from '@testing-library/react'
import dayjs from 'dayjs'
import Timeline from 'lib/Timeline'
import type { ReactCalendarTimelineProps } from 'lib/Timeline'
import type { TimelineItemBase, TimelineGroupBase } from 'lib/types/main'
import { noop } from 'test-utility'

type TimelineProps = ReactCalendarTimelineProps<TimelineItemBase<number>, TimelineGroupBase>

// Timeline.defaultProps contains null for many optional fields and string
// literals wider than expected union types. We need items & groups to be
// required while the rest can stay partial.
const defaultProps = {
  ...(Timeline.defaultProps as unknown as Partial<Omit<TimelineProps, 'ref'>>),
  items: [] as TimelineItemBase<number>[],
  groups: [] as TimelineGroupBase[],
}

describe('Timeline', () => {
  describe('initialization', () => {
    it('renders with defaultTimeStart and defaultTimeEnd', () => {
      const defaultTimeStart = dayjs('2018-01-01').valueOf()
      const defaultTimeEnd = dayjs('2018-03-01').valueOf()

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
