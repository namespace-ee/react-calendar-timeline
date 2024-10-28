import {FakeDataItem} from "../generate-fake-data";

const TableComponent = ({rows}: {rows: FakeDataItem[]}) => {
  return (
    <table>
      <tbody>
        {rows && rows.map(row =>(
          <tr key={row.id}>
            <td><button className="draggable" id={`drop-${row.id}`} style={{width:"50px", overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{row.title}</button></td>
            <td>{row.color}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default TableComponent
