import '../styles/components/Navbar.css'

import { Dispatch, SetStateAction } from 'react'

import IParticipation from '../interfaces/participations'

import { addParticipationData, fetchParticipationsData } from '../api/api'

type NavbarProps = {
    setParticipations: Dispatch<SetStateAction<IParticipation[]>>;
    participations : IParticipation[];
}

export function Navbar({participations, setParticipations} : NavbarProps) {

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

            await addParticipationData ({
                firstName, lastName, participation
            })

            setParticipations( await fetchParticipationsData() )

        }
    }

    return (
        <div className="navbar-container" >
            <form action="" className="navbar-form" onSubmit={handleSubmit} >
                <input placeholder="First Name" name="firstName" />
                <input placeholder="Last Name" name="lastName" />
                <input
                    placeholder="Participation"
                    type="number"
                    min="0"
                    name="participation"
                />
                <button type="submit">
                    Send
                </button>
            </form>
        </div>
    )
}