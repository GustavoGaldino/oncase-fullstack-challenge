import IParticipation from '../interfaces/participations';
import '../styles/components/Table.css'

type TableProps = {
    participations: IParticipation[];
}

const tableHeadCells = [
    {
        text: "",
        indexCell: true
    },
    {
        text: "First Name",
        indexCell: false
    },
    {
        text: "First Name",
        indexCell: false
    },
    {
        text: "Participation",
        indexCell: false
    },
    {
        text: "Percentage",
        indexCell: false
    },
]

export function Table ({participations} : TableProps) {
    return (
        <div className="table-container">
            <table>
                <tr>
                    {tableHeadCells.map(cell => {
                        return (
                            <th className={cell.indexCell ? "index-cell" : "normal-cell"}>
                                {cell.text}
                            </th>
                        )
                    })}
                </tr>
                {participations.map( (p, index) => {
                    return (
                        <tr>
                            <td className="index-cell" >
                                {index}
                            </td>
                            <td className="normal-cell">
                                {p.firstName}
                            </td>
                            <td className="normal-cell">
                                {p.lastName}
                            </td>
                            <td className="normal-cell">
                                {p.participation}
                            </td>
                            <td className="normal-cell">
                                {p.participation}
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}