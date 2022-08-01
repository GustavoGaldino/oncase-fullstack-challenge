import '../styles/components/Navbar.css'

import { BsArrowClockwise } from 'react-icons/bs'

import { Dispatch, SetStateAction } from 'react'

import IParticipation from '../interfaces/participations'

import { addParticipationData, fetchParticipationsData, resetParticipationData } from '../api/api'
import { APIResponse } from '../api/interfaces/apiInterfaces'
import IAlert from '../interfaces/alert'

type NavbarProps = {
    setParticipations: Dispatch<SetStateAction<IParticipation[]>>;
    participations : IParticipation[];
    setAlert: Dispatch<SetStateAction<IAlert>>;
}

export function Navbar({participations, setParticipations, setAlert} : NavbarProps) {

    function isStringPositiveInteger (str : string ) {
        const num : Number = Number(str)

        return Number.isInteger(num) && num > 0
    }

    function isFormDataValid(firstName: string, lastName: string, participation: string) {
        return (
            (firstName !== undefined) && (lastName !== undefined)
            && (participation !== undefined) && (isStringPositiveInteger(participation))
        );
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
        event.preventDefault();

        const target : any = event.target;

        const firstName : string = target.firstName.value;
        const lastName : string = target.lastName.value;
        const participationAsString : string = target.participation.value;

        if ( isFormDataValid(firstName, lastName, participationAsString) ) {

            const participation : number = Number( participationAsString );

            const apiResponse : APIResponse = await addParticipationData ({
                firstName, lastName, participation
            })

            if ( apiResponse.ok ) {
                setParticipations(  (await fetchParticipationsData()).data )         
            }

            setAlert ({
                show: true,
                message: apiResponse.message,
                warning: !apiResponse.ok,
            })

        }
    }

    async function handleReset() {
        const apiResponse : APIResponse = await resetParticipationData();

        if ( apiResponse.ok ) {
            setParticipations(  (await fetchParticipationsData()).data )         
        }

        setAlert ({
            show: true,
            message: apiResponse.message,
            warning: !apiResponse.ok,
        })
    }

    return (
        <div className="navbar-container" >
            <form action="" className="navbar-form" onSubmit={handleSubmit} >
                <input placeholder="First Name" name="firstName" />
                <input placeholder="Last Name" name="lastName" />
                <input
                    placeholder="Participation"
                    type="number"
                    min="1"
                    name="participation"
                />
                <button type="submit">
                    Send
                </button>
            </form>

            <button className="reset-icon-container" onClick={handleReset}>
                <BsArrowClockwise />
            </button>
        </div>
    )
}