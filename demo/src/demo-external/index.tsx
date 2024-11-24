// App.jsx
import dayjs from "dayjs";
import {ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import Timeline, {
    CursorMarker,
    OnItemDragObjectMove,
    OnItemDragObjectResize,
    ReactCalendarTimelineProps, TimelineMarkers, TodayMarker,
} from 'react-calendar-timeline';
import 'react-calendar-timeline/dist/Timeline.scss';



import CustomInfoLabel from "../demo-custom-info-label/CustomInfoLabel";
import generateFakeData, {FakeDataItem, FakeGroup} from "../generate-fake-data";
import interact from 'interactjs';
import TableComponent from './TableComponent';

type TimelineProps = ReactCalendarTimelineProps<FakeDataItem, FakeGroup>;

const minTime = dayjs().add(-16, 'months').valueOf()
const maxTime = dayjs().add(16, 'months').valueOf()

const App = () => {

    const [groups, setGroups] = useState<FakeGroup[]>([]);
    const [items, setItems] = useState<FakeDataItem[]>([]);
    const [newItems, setNewItems] = useState<FakeDataItem[]>([])
    const [showInfoLabel, setShowInfoLabel] = useState<boolean>(false)
    const [infoLabelTime, setInfoLabelTime] = useState<string>('')
    const [infoLabelGroupTitle, setInfoGroupLabelTitle] = useState<string | ReactNode>('')
    const [infoLabelHeading, setInfoLabelHeading] = useState<string>('')
    const [init, setInit] = useState<boolean>(false)
    const start = useMemo(() => dayjs()
        .startOf('day')
        .valueOf(), [])
    const end = useMemo(() => dayjs()
        .startOf('day').add(14, 'day')
        .valueOf(), [])

    useEffect(() => {
        const {groups: gr, items: fakeItems} = generateFakeData(15, 100)
        setItems(fakeItems.splice(0, Math.floor(fakeItems.length / 2)))
        setNewItems(fakeItems.splice(0, 10))
        setGroups(gr)
        setInit(true)
    }, [])

    const timelineRef = useRef<Timeline<FakeDataItem, FakeGroup>>(null);

    const interactRef = useRef(interact);
    useEffect(() => {
        interactRef.current('.draggable')
            .draggable({
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'timeline-ext-wrapper',
                        endOnly: true,
                    }),
                    interact.modifiers.restrict({
                        restriction: '.dropzone', // restrict dragging to the dropzone element
                        endOnly: true, // only restrict at the end of the drag
                    }),
                    interact.modifiers.snap({
                        targets: [
                            (x, y) => {
                                const timelineElement = timelineRef.current;
                                const {top, left} = timelineElement!.getBoundingClientRect();

                                return {
                                    x: x,
                                    y: (Math.round(y / timelineRef.current!.props.lineHeight) * timelineRef.current!.props.lineHeight),
                                    offset: {top: top, left: left}
                                }
                            },
                        ], relativePoints: [{x: 0.5, y: 0.5}]
                    })
                ],
                autoScroll: true,
                listeners: {
                    start(event) {
                        const target = event.target;
                        const timelineElement = timelineRef.current;
                        if (timelineElement == null) return;
                        target.setAttribute("data-c", target.style)
                        target.style.width = '50px';
                        target.style.height = timelineElement.props.lineHeight;
                        target.style.backgroundColor = "purple"

                    },
                    move(event) {
                        //Show the button as being moved
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                        target.style.position = "absolute"
                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    },
                },
            }).on("dragend", (event) => {
            event.target.removeAttribute("data-x");
            event.target.removeAttribute("data-y");
            event.target.style.transform = "translate(0px, 0px)";
            event.target.style = event.target.getAttribute("data-c");
            event.target.removeAttribute("data-c");
        });

        interactRef.current('.timeline-dropzone').dropzone({
            accept: '.draggable',
            overlap: 0.5,
            ondrop(event) {
                console.log("dropped")
                event.stopImmediatePropagation()
                event.target.classList.remove('drop-active');
                const droppedId = event.relatedTarget.id.split('-')[1];
                const dropPosition = event.dragEvent.client;

                //const x1 = (parseFloat(event.dragEvent.client.getAttribute('data-x')) || 0) + event.dx;
                const timelineElement = timelineRef.current;
                if (timelineElement == null) {
                    console.log("Timeline not found");
                    return;
                }
                const {top} = timelineElement.getBoundingClientRect();
                const x = dropPosition.x;
                const y = dropPosition.y - top;

                const {time, groupIndex} = timelineElement.calculateDropCoordinatesToTimeAndGroup(x, y)


                const group = groups[groupIndex];
                if (!group) {
                    console.error('Group not found');
                    return
                }

                const startTime = dayjs(time);
                const endTime = startTime.clone().add(1, 'day');
                const itemToDrop = newItems.filter(i => i.id === Number(droppedId))[0];
                console.log("Dropped at ", startTime.format("DD-MM-YYYY HH:mm"), endTime, itemToDrop)

                setNewItems(newItems.filter(i => i.id !== itemToDrop.id))
                setItems((prevItems) => [
                    ...prevItems,
                    {
                        id: itemToDrop.id,
                        group: group.id as string,
                        title: itemToDrop.title,
                        start_time: startTime.valueOf(),
                        end_time: endTime.valueOf(),
                        color: itemToDrop.color,
                        bgColor: itemToDrop.bgColor,
                        canMove: true,
                        canResize: false,
                    },
                ]);
            },
        }).on('dragenter', function (event) {
            console.log("dragenter")
            event.target.classList.add('drop-active')
            event.relatedTarget.classList.add('drop-active-element')
        }).on("dragleave", function (event) {
            console.log("dragleave")
            event.target.classList.remove('drop-active')
            event.relatedTarget.classList.remove('drop-active-element')
        });
        return () => {
            interactRef.current('.draggable').unset();
            interactRef.current('.timeline-dropzone').unset();
        }
    }, [groups, items]);

    const handleItemMove: TimelineProps['onItemMove'] = (itemId: number, dragTime: number, newGroupOrder: number) => {

        const group = groups[newGroupOrder]

        setItems(items => (
            items.map(
                item =>
                    item.id === itemId
                        ? Object.assign({}, item, {
                            start_time: dragTime,
                            end_time: dragTime + (item.end_time - item.start_time),
                            group: group.id
                        })
                        : item
            )));
        setShowInfoLabel(false)
        setInfoLabelTime('')

    }

    const handleItemResize: TimelineProps['onItemResize'] = (itemId, time, edge) => {
        setItems(items => (items.map(
            item =>
                item.id === itemId
                    ? Object.assign({}, item, {
                        start_time: edge === 'left' ? time : item.start_time,
                        end_time: edge === 'left' ? item.end_time : time
                    })
                    : item
        )))
        setShowInfoLabel(false)
        setInfoLabelTime('')

    }


    const handleItemDrag: TimelineProps['onItemDrag'] = (dragitem: OnItemDragObjectMove | OnItemDragObjectResize) => {
        const {newGroupOrder} = dragitem as OnItemDragObjectMove;
        const group = groups[newGroupOrder]
        const newInfoLabelGroupTitle = group ? group.title : ''
        const newInfoLabelTime = dayjs(dragitem.time).format('dddd, MMMM DD YYYY')
        let heading = ''
        switch (dragitem.eventType) {
            case 'move':
                heading = '🚚 Moving'
                break
            case 'resize':
                heading = '📅 Resizing'
                break
        }
        console.log(dayjs(dragitem.time).format('dddd, MMMM DD YYYY'), heading, infoLabelTime !== infoLabelTime, infoLabelGroupTitle !== infoLabelGroupTitle, infoLabelGroupTitle)
        if (
            infoLabelTime !== newInfoLabelTime ||
            infoLabelGroupTitle !== newInfoLabelGroupTitle
        ) {
            setShowInfoLabel(true)
            setInfoLabelTime(newInfoLabelTime)
            setInfoGroupLabelTitle(newInfoLabelGroupTitle)
            setInfoLabelHeading(heading)

        }
    }
    const handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {

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

    const itemRenderer: TimelineProps['itemRenderer'] = (props) => {
        const {item, itemContext, getItemProps, getResizeProps,} = props
        const {left: leftResizeProps, right: rightResizeProps} = getResizeProps()
        const backgroundColor = itemContext.selected ? itemContext.dragging ? 'red' : item.selectedBgColor : item.bgColor;
        const borderColor = itemContext.resizing ? 'red' : item.color;
        return (
            <div
                {...getItemProps({
                    style: {
                        backgroundColor,
                        color: item.color,
                        borderColor,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderRadius: 4,
                        borderLeftWidth: itemContext.selected ? 3 : 1,
                        borderRightWidth: itemContext.selected ? 3 : 1,
                    }
                })}
            >
                {itemContext.useResizeHandle ? (
                    <div {...leftResizeProps} />
                ) : null}

                <div
                    style={{
                        height: itemContext.dimensions.height,
                        overflow: 'hidden',
                        paddingLeft: 3,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {itemContext.title}
                </div>


                {itemContext.useResizeHandle ? (
                    <div {...rightResizeProps} />
                ) : null}
            </div>
        )
    }


    return (init ?
            <>
                {showInfoLabel ? (
                    <CustomInfoLabel
                        time={infoLabelTime}
                        groupTitle={infoLabelGroupTitle}
                        heading={infoLabelHeading}
                    />
                ) : null}
                <div style={{display: "grid", gridTemplateColumns: "75% 25%"}}>
                    <div className="timeline-ext-wrapper" style={{width: "100%"}}>
                        <Timeline
                            ref={timelineRef}
                            groups={groups}
                            items={items}

                            sidebarWidth={150}
                            sidebarContent={<div>Above The Left</div>}
                            canMove
                            canResize="right"
                            canSelect
                            dragSnap={24 * 60 * 60 * 1000}
                            defaultTimeStart={start}
                            defaultTimeEnd={end}
                            itemTouchSendsClick={false}
                            buffer={3}
                            minZoom={24 * 60 * 60 * 1000} // 24 hours
                            maxZoom={30 * 24 * 60 * 60 * 1000} // 1 month
                            stackItems
                            itemHeightRatio={0.75}
                            itemRenderer={itemRenderer}
                            className="timeline-dropzone"

                            onItemMove={handleItemMove}
                            onItemResize={handleItemResize}
                            onItemDrag={handleItemDrag}
                            onTimeChange={handleTimeChange}
                        >
                            <TimelineMarkers>
                                <TodayMarker/>
                                <CursorMarker/>
                            </TimelineMarkers>
                        </Timeline>
                    </div>
                    <div><TableComponent rows={newItems}/></div>
                </div>
            </> : "please wait..."

    );
};

export default App;
