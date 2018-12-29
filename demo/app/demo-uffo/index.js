import React, { Component } from 'react'
import moment from 'moment'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Timeline,{ TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
// import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'
import TimelineItem from './TimelineItem'
import tasks from './tasks'


import DragItem from './DragItem';


var minTime = moment()
  .add(-6, 'months')
  .valueOf()
var maxTime = moment()
  .add(6, 'months')
  .valueOf()

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

const groups = [
  { id: '1', allowDrop:true, title: 'Tia', rightTitle: 'Veum', bgColor: '#abd1f2', picture: 'https://ora-profile-pictures.s3.amazonaws.com/2377d3dbacc009aec666744a0e43614890af7033' },
  { id: '2', allowDrop:true, title: 'Mike', rightTitle: 'Veum', bgColor: '#abd1f2', picture: 'https://ora-profile-pictures.s3.amazonaws.com/9184942b5f3e799ba117cbde235a4ef689baad11?1528382473' },
  { id: '3', allowDrop:true, title: 'Clara', rightTitle: 'Veum', bgColor: '#abd1f2', picture: 'https://ora-profile-pictures.s3.amazonaws.com/7cd097265abbbbce3830ce9b8bb3949a9a5f468a' },
  { id: 'empty', allowDrop:true, title: '', height: 800 },
]

const items = [
  {
    id: 1,
    group: 1,
    title: 'dsadasdasda',
    start: moment().add(-3, 'days').valueOf(),
    end: moment().valueOf(),
    color: '#c9622a',
    bgColor: '#fec2a0',
    canMove: true,
    canResize: true,
  },
  {
    id: 2,
    group: 2,
    title: 'aaaaaaaaaa',
    start: moment().add(-2, 'days').valueOf(),
    end: moment().add(2, 'days').valueOf(),
    color: '#500093',
    bgColor: '#b972f2',
    canMove: true,
    canResize: true,
    canResizeLeft: true
  },
  {
    id: 3,
    group: 1,
    title: 'dasda da sd asd',
    start: moment().add(-20, 'days').valueOf(),
    end: moment().add(-7, 'days').valueOf(),
    color: '#0071b3',
    bgColor: '#42b9fd',
    canMove: true,
    canResize: true,
    canResizeLeft: true
  },
  {
    id: 4,
    group: 2,
    title: 'dasda da sd asd',
    start: moment().add(-13, 'days').valueOf(),
    end: moment().add(-7, 'days').valueOf(),
    color: '#9e372e',
    bgColor: '#f2968f',
    canMove: true,
    canResize: true,
    canResizeLeft: true
  },
]

const GroupRenderer = ({ group }) => (
	<div className="v h" style={{ height: '100%' }}>
		{group.picture && <img className="avatar40" src={group.picture} alt="avatar" />}
	</div>
)



export default class App extends Component {
  timelineRef = React.createRef()
  constructor(props) {
    super(props)

    const defaultTimeStart = moment()
			.startOf('month')
		const defaultTimeEnd = moment()
			.endOf('month')

		this.state = {
      items,
      groups,
			defaultTimeStart,
			defaultTimeEnd,
		}
  }

  handleCanvasClick = (groupId, time, event) => {
    console.log('Canvas clicked', groupId, moment(time).format())
  }

  handleCanvasContextMenu = (group, time, e) => {
    console.log('Canvas context menu', group, moment(time).format())
  }

  handleItemClick = (itemId, _, time) => {
    console.log('Clicked: ' + itemId, moment(time).format())
  }

  handleItemSelect = (itemId, _, time) => {
    console.log('Selected: ' + itemId, moment(time).format())
  }

  handleItemDoubleClick = (itemId, _, time) => {
    console.log('Double Click: ' + itemId, moment(time).format())
  }

  handleItemContextMenu = (itemId, _, time) => {
    console.log('Context Menu: ' + itemId, moment(time).format())
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            })
            : item
      )
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    console.log(items)
    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
              start: edge === 'left' ? time : item.start,
              end: edge === 'left' ? item.end : time
            })
            : item
      )
    })

    console.log('Resized', itemId, time, edge)
  }

  // this limits the timeline to -6 months ... +6 months
  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime)
    } else if (visibleTimeStart < minTime) {
      updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
    } else if (visibleTimeEnd > maxTime) {
      updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
    } else {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    }
  }

  moveResizeValidator = (action, item, time, resizeEdge) => {
    if (time < new Date().getTime()) {
      var newTime =
        Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)
      return newTime
    }

    return time
  }

  setItemPosition = (style) => {
    this.draggedItem = style
  }

  onCanvasClick = (groupId, time, e) => {
    console.log(groupId, moment(time).format('D/MM'), e)
  }
  onDragEnd = ({source,destination}) => {
    if (!destination) {
			return
    }
    if (source.droppableId === destination.droppableId) {
      console.log('handle reorder')
    }else{
      console.log(destination, this.draggedItem, 'JACKPOT!')
      const regex = /translate\(|px/;
      const translated = Number(this.draggedItem.transform.split(regex)[1])
      const left = this.draggedItem.left + translated
      const fakeEvent = {clientX:left}
      const time = this.timelineRef.current.timeFromItemEvent(fakeEvent)
  
      console.log(moment(time).format('D/MM'))
      const task = tasks[source.index]
      const item = {
        start: time,
        end: moment(time).add(3, 'days').valueOf(),
        id:task.id,
        title:task.title,
        color: '#cf8625',
        bgColor: '#ffc77d',
        group: Number(destination.droppableId),
        canMove: true,
        canResize: true,
      }
      console.log(item)
      const {items} = this.state
      // console.log(items[0])
      // items = items.push(item)
      this.setState({
        items: [...items,item]
      })
    }
  }

  render() {
		const {
			defaultTimeStart,
      defaultTimeEnd,
      selected,
      groups,
      items
		} = this.state


		return <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}><div className="v">
			<Timeline
        ref={this.timelineRef}
				onItemMove={this.handleItemMove}
				onItemResize={this.handleItemResize}
				onTimeChange={this.handleTimeChangeFirst}
				groups={groups}
				items={items}
				keys={keys}
				fixedHeader="fixed"
        fullUpdate
        onCanvasClick={this.onCanvasClick}
        onCanvasDoubleClick={this.onCanvasClick}
				selected={selected}
				sidebarWidth={68}
				lineHeight={64}
				headerLabelGroupHeight={20}
				headerLabelHeight={20}
				itemHeightRatio={0.75}
				itemRenderer={TimelineItem}
				groupRenderer={GroupRenderer}
				sidebarContent={<div>Team</div>}
				itemsSorted
				itemTouchSendsClick
				stackItems
        showCursorLine
        useResizeHandle
				canMove
				dragSnap={24 * 60 * 60 * 1000}
				canResize
				defaultTimeStart={defaultTimeStart}
				defaultTimeEnd={defaultTimeEnd}
			>
				<TimelineMarkers>
					<TodayMarker>
						{({ styles }) => {
							const customStyles = {
								...styles,
								backgroundColor: '#ff94a8',
								width: '2px',
							}
							return <div style={customStyles} onClick={() => {}} />
						}}
					</TodayMarker>

				</TimelineMarkers>
			</Timeline>
      
      <div className="backlog">
       <Droppable droppableId="inbox">
          {(provided, snapshot) => (<div className={`droppable${snapshot.isDraggingOver ? ' dragging-over' : ''}`} ref={provided.innerRef}>
              {tasks.map((task,index) => <DragItem setItemPosition={this.setItemPosition} key={task.id} index={index} task={task}/>)}
                  {provided.placeholder}
          </div>)}
	      </Droppable>
      </div>

		</div>
    </DragDropContext>
	}
}
