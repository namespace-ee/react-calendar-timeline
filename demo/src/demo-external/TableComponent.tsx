import {FakeDataItem} from "../generate-fake-data";

const TableComponent = ({rows}: {rows: FakeDataItem[]}) => {
  return (
    <table>
        <thead>
        <tr>
            <td colSpan={2}>Choose any of these items to <br/> drop into the page</td>
        </tr>
        </thead>
      <tbody>
        {rows && rows.map(row =>(
          <tr key={row.id}>
            <td>
              <div style={{overflow:"visible"}}>
              <div className="draggable rct-item" id={`drop-${row.id}`} style={{width:"250px", backgroundColor:row.bgColor, color:row.color,overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{row.title}</div>
              </div>
              </td>

          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default TableComponent
