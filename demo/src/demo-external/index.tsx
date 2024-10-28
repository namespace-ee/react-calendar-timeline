// App.jsx
import dayjs from "dayjs";
import {useEffect, useState, useRef} from 'react';
import Timeline from 'react-calendar-timeline';
import interact from 'interactjs';
import generateFakeData, {FakeDataItem, FakeGroup} from "../generate-fake-data";
import TableComponent from './TableComponent';

// const groups = [
//   { id: 1, title: 'Group 1' },
//   { id: 2, title: 'Group 2' },
//   { id: 3, title: 'Group 3' },
// ];


const App = () => {

  const [groups,setGroups] =useState<FakeGroup[]>([]);
  const [items, setItems] = useState<FakeDataItem[]>([]);
  const [newItems, setNewItems] = useState<FakeDataItem[]>([])

  useEffect(()=>{
    const {groups:gr, items: fakeItems} = generateFakeData()
    setItems(fakeItems.splice(0, Math.floor(fakeItems.length / 2)))
      setNewItems(fakeItems)
    setGroups(gr)
  },[])

  const timelineRef = useRef<Timeline>(null);

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
          interact.modifiers.snap({
            targets: [
              (x, y) => {
                const timelineElement = timelineRef.current;
                const {top, left} = timelineElement!.getBoundingClientRect();
              return{
                x: x,
                y: (Math.round(y / timelineRef.current!.props.lineHeight) * timelineRef.current!.props.lineHeight)+ (timelineRef.current!.props.lineHeight/2),
                offset: {top: top, left: left}
              }},
            ], relativePoints: [{ x: 0.5, y: 0.5 }]
          })
        ],
        autoScroll: true,
        listeners: {
          start(event) {
            const target = event.target;
            const timelineElement = timelineRef.current;
            if (timelineElement == null) return;
            //target.style.width = '50px';
            target.style.height = timelineElement.props.lineHeight;
          },
          move(event) {
            //Show the button as being moved
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            //const x = event.clientX + 10; // adjust the x coordinate to be 10px to the right of the mouse cursor
            //target.style.transform = `translate(${x}px, ${event.clientY}px)`

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
        },
      }).on("dragend", (event) => {
      event.target.removeAttribute("data-x");
      event.target.removeAttribute("data-y");
      event.target.style.transform = "translate(0px, 0px)";
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
        const x = dropPosition.x ;
        const y = dropPosition.y-top;


        const {time,group:groupIndex}=timelineElement.pageXToTime(x,y)

        //const groupIndex = Math.floor(y / timelineElement.props.lineHeight);
        const group = groups[groupIndex];
        if (!group) {
          console.error('Group not found');
          return
        }

        const startTime = dayjs(time);
        const endTime = startTime.clone().add(1, 'day');
        const itemToDrop = newItems.filter(i => i.id === Number(droppedId))[0];
        console.log("Dropped at ",startTime.format("DD-MM-YYYY HH:mm"), endTime, itemToDrop)

        setNewItems(newItems.filter(i => i.id !== itemToDrop.id))
        setItems((prevItems) => [
          ...prevItems,
          {
            id: itemToDrop.id,
            group: group.id as string,
            title: itemToDrop.title,
            start_time: startTime.valueOf(),
            end_time: endTime.valueOf(),
            canMove: false,
            canResize: false,
          },
        ]);
      },
    }).on('dragenter', function (event) {
      event.target.classList.add('drop-active')
      event.relatedTarget.classList.add('drop-active-element')
    }).on("dragleave", function (event) {
      event.target.classList.remove('drop-active')
      event.relatedTarget.classList.remove('drop-active-element')
    });
    return () => {
      interactRef.current('.draggable').unset();
      interactRef.current('.timeline-dropzone').unset();
    }
  }, [groups,items]);

  return (
    <div style={{display: "grid", gridTemplateColumns: "50% 50%"}}>
      <div  className="timeline-ext-wrapper" style={{width: "100%"}}>
        <Timeline
          ref={timelineRef}
          groups={groups}
          items={items}
          dragSnap={24 * 60 * 60 * 1000}
          defaultTimeStart={dayjs()
            .startOf('day')
            .valueOf()}

          defaultTimeEnd={dayjs()
            .startOf('day').add(14, 'day')
            .valueOf()}
          // itemRenderer={itemRenderer}
          className="timeline-dropzone"
        />
      </div>
      <div><TableComponent rows={newItems}/></div>

    </div>
  );
};

export default App;
