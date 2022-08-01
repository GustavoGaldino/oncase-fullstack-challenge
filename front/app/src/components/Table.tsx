import '../styles/components/Table.css'

import { Dispatch, SetStateAction, useState } from 'react'

import { BsPencil, BsTrash, BsCheckSquare, BsXSquare } from 'react-icons/bs'

import { fetchParticipationsData, removeParticipationData, updateParticipationData } from '../api/api'

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

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target : any = event.target;

        const newParticipation : string = target.participation.value;
        const firstName : string = target.firstName.value;
        const lastName : string = target.lastName.value;

        const apiResponse = await updateParticipationData({
            firstName,
            lastName,
            participation: Number(newParticipation)
        });

        if ( apiResponse.ok ) {
            setParticipations(  (await fetchParticipationsData()).data );
        }

        await setAlert ({
            show: true,
            message: apiResponse.message,
            warning: !apiResponse.ok,
        });

        await setEditingIndex(-1);

    }

    const [editingIndex, setEditingIndex] = useState<Number>(-1);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {tableHeadCells.map( (cell, index) => {
                            return (
                                <th className={cell.indexCell ? "index-cell" : "normal-cell"} key={index}>
                                    {cell.text}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {participations.map( (p, index) => {
                        return (
                            <tr key={index}>
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
                                    {
                                        index !== editingIndex ? 
                                        <>
                                            {p.participation}
                                            <button onClick={() => {
                                                setEditingIndex(index)
                                            }} >
                                                < BsPencil className="pencil-icon" />
                                            </button>
                                        </>
                                        :
                                        <form className="participation-form" onSubmit={handleUpdate}>
                                            <input
                                                placeholder={ String(p.participation) }
                                                type="number"
                                                name="participation"
                                                min="1"
                                                defaultValue={p.participation}
                                            />
                                            <input
                                                name="firstName"
                                                type="hidden"
                                                value={p.firstName}
                                            />
                                            <input
                                                name="lastName"
                                                type="hidden"
                                                value={p.lastName}
                                            />
                                            <button onClick={() => {
                                                setEditingIndex(-1)
                                            }}>
                                                <BsXSquare className="cancel-icon" />
                                            </button>
                                            <button type="submit" >
                                                <BsCheckSquare className="confirm-icon" />
                                            </button>
                                        </form>
                                    }
                                </td>
                                <td className="normal-cell">
                                    {p.percentage ? String(p.percentage ) + "%"  : "Unknown"}
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
                </tbody>
            </table>
        </div>
    );
}