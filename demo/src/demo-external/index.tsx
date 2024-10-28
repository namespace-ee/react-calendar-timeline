// App.jsx
import dayjs from "dayjs";
import {useEffect, useState, useRef, useMemo} from 'react';
import Timeline from 'react-calendar-timeline';
import interact from 'interactjs';
import generateFakeData, {FakeDataItem} from "../generate-fake-data";
import TableComponent from './TableComponent';

// const groups = [
//   { id: 1, title: 'Group 1' },
//   { id: 2, title: 'Group 2' },
//   { id: 3, title: 'Group 3' },
// ];


const App = () => {
  const {groups:gr, items: fakeItems} = generateFakeData(10,10)
  const groups =useMemo(()=>gr,[gr])
  const [items, setItems] = useState<FakeDataItem[]>(fakeItems.splice(0, Math.floor(fakeItems.length / 2)));
  const [newItems, setNewItems] = useState<FakeDataItem[]>(fakeItems)


  const timelineRef = useRef<Timeline>(null);


  useEffect(() => {
    interact('.draggable')
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'timeline-dropzone',
            endOnly: false,
          }),
          interact.modifiers.snap({
            targets: [
              (x, y) => {
                const timelineElement = timelineRef.current;
                const {top, left} = timelineElement!.getBoundingClientRect();
              return{
                x: x,
                y: Math.round(y / timelineRef.current!.props.lineHeight) * timelineRef.current!.props.lineHeight,
                offset: {top: top, left: left}
              }},
            ]
          })
        ],
        autoScroll: true,
        listeners: {
          start(event) {
            const target = event.target;
            const timelineElement = timelineRef.current;
            if (timelineElement == null) return;
            target.style.width = '50px';
            target.style.height = timelineElement.props.lineHeight;
            target.style.overflow = "hidden";
            target.style.textWrap = "nowrap";
            target.style.whiteSpace = "nowrap";

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
            const timelineElement = timelineRef.current;
            if (timelineElement == null) return;
            const startTime = dayjs(timelineElement.pageXToTime(x));
            console.log(startTime.format("dd-MM-YYYY HH:mm"))
          },
        },
      });

    interact('.timeline-dropzone').dropzone({
      accept: '.draggable',
      overlap: 0.5,

      ondrop(event) {

        event.stopImmediatePropagation()
        const fk_joborder = event.relatedTarget.id.split('-')[1];
        const dropPosition = event.dragEvent.client;
        const timelineElement = timelineRef.current;
        if (timelineElement == null) return;
        const {top, left} = timelineElement.getBoundingClientRect();
        const x = dropPosition.x - left;
        const y = dropPosition.y - top;

        const groupIndex = Math.floor(y / timelineElement.props.lineHeight);
        const group = groups[groupIndex];
        if (!group) return

        const startTime = dayjs(timelineElement.pageXToTime(x));
        const endTime = startTime.clone().add(8, 'hours');
        const itemToDrop = newItems.filter(i => i.id === Number(fk_joborder))[0];
        console.log(startTime, endTime, itemToDrop)

        setNewItems(newItems.filter(i => i.id !== itemToDrop.id))
        // setRows(prevRows => prevRows.filter(row => row.id !== Number(fk_joborder)));
        setItems((prevItems) => [
          ...prevItems,
          {
            id: itemToDrop.id,
            group: group.id,
            title: itemToDrop.title,
            start_time: startTime.valueOf(),
            end_time: endTime.valueOf(),
            canMove: false,
            canResize: false,
          },
        ]);
      },
    });
  }, []);

  return (
    <div  style={{display: "grid", gridTemplateColumns: "50% 50%"}}>
      <div style={{width: "100%"}}>
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
