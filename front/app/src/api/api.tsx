import env from 'react-dotenv'

import IParticipation from '../interfaces/participations';
import { APIResponse } from './interfaces/apiInterfaces';

const API_ENDPOINT = env.API_ENDPOINT || "http://localhost:5000";

export async function fetchParticipationsData () : Promise<APIResponse> {
    const response = await fetch(`${API_ENDPOINT}/participations`).then(res => res.json());

    return {
        ok: response.ok,
        message: response.message,
        statusCode: response.status,
        data: response.data
    };

}

export async function addParticipationData ( data : IParticipation ) : Promise<APIResponse> {

    const config  = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(`${API_ENDPOINT}/participations`, config).then(res => res.json());

    return {
        ok: response.ok,
        message: response.message,
        statusCode: response.status,
    };

}

export async function removeParticipationData (data : IParticipation) : Promise<APIResponse> {
    
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(`${API_ENDPOINT}/participations`, config).then(res => res.json());

    return {
        ok: response.ok,
        message: response.message,
        statusCode: response.status,
    };

}

export async function resetParticipationData () : Promise<APIResponse> {

    const config = {
        method: 'POST',
    }

    const response = await fetch(`${API_ENDPOINT}/participations/reset` , config).then(res => res.json());

    return {
        ok: response.ok,
        message: response.message,
        statusCode: response.status,
    };

}

export async function updateParticipationData (data : IParticipation) : Promise<APIResponse> {

    const config = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(`${API_ENDPOINT}/participations`, config).then(res => res.json());

    return {
        ok: response.ok,
        message: response.message,
        statusCode: response.status,
    };

}