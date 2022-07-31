import env from 'react-dotenv'

import IParticipation from '../interfaces/participations';
import { APIResponse } from './interfaces/apiInterfaces';

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

export async function addParticipationData ( data : IParticipation ) : Promise<void> {

    const config  = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(`${env.API_ENDPOINT}/participations`, config)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res;
    })
    .then(res => res.json())

    return response;
}

export async function removeParticipationData (data : IParticipation) : Promise<APIResponse> {
    
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(`${env.API_ENDPOINT}/participations`, config)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res;
    })
    .then(res => res.json());

    return {
        ok: true,
        message: "Success"
    };


}