import env from 'react-dotenv'

import IParticipation from '../interfaces/participations';

export async function fetchParticipationsData () : Promise<IParticipation[]> {
    const response = await fetch(`${env.API_ENDPOINT}/participations`).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res;
    }).then( (res : Response) => res.json())

    console.log(response)

    return response
}

export function addParticipationData () : void {
    return;
}

export function removeParticipationData () : void {
    return;
}