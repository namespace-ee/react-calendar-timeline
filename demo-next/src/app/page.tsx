

import dynamic from 'next/dynamic'
//Either use default stylesheet
import  "react-calendar-timeline/style.css"
//Or create your own...
//import '@/components/Timeline.scss'
const MyTimeline = dynamic(()=>import ('@/components/My-Timeline'),{loading:()=><p>asdsda</p>})
export default function Home() {
  return (
    <div >
      <main >
        <MyTimeline/>
      </main>

    </div>
  );
}
