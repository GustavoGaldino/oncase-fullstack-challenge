import '../styles/components/Table.css'

import { Dispatch, SetStateAction } from 'react'

import { BsTrash } from 'react-icons/bs'

import { fetchParticipationsData, removeParticipationData } from '../api/api'

import IAlert from '../interfaces/alert';
import IParticipation from '../interfaces/participations';

type TableProps = {
    participations: IParticipation[];
    setParticipations: Dispatch<SetStateAction<IParticipation[]>>;
    setAlert: Dispatch<SetStateAction<IAlert>>;
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
    {
        text: "",
        indexCell: true
    }
]

export function Table ({participations, setParticipations, setAlert} : TableProps) {

    const handleRemove = async (firstName: string, lastName: string) => {

        const apiResponse = await removeParticipationData({
            firstName,
            lastName
        })

        if (apiResponse.ok) {
            setParticipations ( (await fetchParticipationsData()).data );
        }

        setAlert ({
            show: true,
            message: apiResponse.message,
            warning: !apiResponse.ok,
        })

    }

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
                                <span>
                                    {index}
                                </span>
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
                                {p.percentage ? String(p.percentage * 100) + "%"  : "Unknown"}
                            </td>
                            <td className="index-cell" >
                                <button type="button" onClick={() => {
                                    handleRemove(p.firstName, p.lastName);
                                }}>
                                    <BsTrash />
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}