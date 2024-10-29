import {FakeDataItem} from "../generate-fake-data";

const TableComponent = ({rows}: {rows: FakeDataItem[]}) => {
  return (
    <table>
      <tbody>
        {rows && rows.map(row =>(
          <tr key={row.id}>
            <td>
              <div style={{overflow:"visible"}}>
              <div className="draggable rct-item" id={`drop-${row.id}`} style={{width:"50px", backgroundColor:"pink",overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{row.title}</div>
              </div>
              </td>
            <td>{row.color}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default TableComponent
