import { render } from '@testing-library/react'
import Timeline from 'lib/Timeline'
import dayjs from 'dayjs'
import type { TimelineItemBase } from 'lib/types/main'

const groups = [
  { id: 2, title: 'group 2' },
  { id: 1, title: 'group 1' },
  { id: 3, title: 'group 3' }
]

const items: TimelineItemBase<number>[] = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: dayjs('1995-12-25').valueOf(),
    end_time: dayjs('1995-12-25').add(1, 'hour').valueOf()
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: dayjs('1995-12-25').subtract(30, 'minute').valueOf(),
    end_time: dayjs('1995-12-25').add(30, 'minute').valueOf()
  },
  {
    id: 3,
    group: 3,
    title: 'item 3',
    start_time: dayjs('1995-12-25').add(2, 'hour').valueOf(),
    end_time: dayjs('1995-12-25').add(3, 'hour').valueOf()
  }
]

describe('Timeline', () => {
  it('renders component with empty groups', () => {
    expect(() =>
      render(
        <Timeline
          groups={[]}
          items={items}
          defaultTimeStart={dayjs('1995-12-25').subtract(12, 'hour').valueOf()}
          defaultTimeEnd={dayjs('1995-12-25').add(12, 'hour').valueOf()}
        />
      )
    ).not.toThrow()
  })

  it('renders items without corresponding group', () => {
    const itemsNoValidGroup = [
      {
        start_time: dayjs('1995-12-25').subtract(2, 'hour').valueOf(),
        end_time: dayjs('1995-12-25').add(2, 'hour').valueOf(),
        group: -1,
        id: 1,
        title: 'Title'
      }
    ]

    expect(() =>
      render(
        <Timeline
          groups={groups}
          items={itemsNoValidGroup}
          defaultTimeStart={dayjs('1995-12-25').subtract(12, 'hour').valueOf()}
          defaultTimeEnd={dayjs('1995-12-25').add(12, 'hour').valueOf()}
        />
      )
    ).not.toThrow()
  })

  it('should render items', () => {
    const { container } = render(
      <Timeline
        items={items}
        groups={groups}
        defaultTimeStart={dayjs('1995-12-25').subtract(12, 'hour').valueOf()}
        defaultTimeEnd={dayjs('1995-12-25').add(12, 'hour').valueOf()}
      />
    )

    expect(container.querySelectorAll('.rct-item').length).toEqual(3)
  })

  it('should render custom elements using itemRenderer with title', () => {
    const { container } = render(
      <Timeline
        items={items}
        groups={groups}
        defaultTimeStart={dayjs('1995-12-25').subtract(12, 'hour').valueOf()}
        defaultTimeEnd={dayjs('1995-12-25').add(12, 'hour').valueOf()}
        itemRenderer={({
          itemContext,
          getItemProps,
        }) => {
          return <h1 {...getItemProps({})}>{itemContext.title}</h1>
        }}
      />
    )

    const renderedItems = container.querySelectorAll('h1.rct-item')
    expect(renderedItems.length).toEqual(3)
    renderedItems.forEach((el, index) => {
      expect(el.textContent).toEqual(items[index].title)
    })
  })
})
