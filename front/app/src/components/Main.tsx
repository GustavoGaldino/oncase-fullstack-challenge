import '../styles/components/Main.css'

import { Dispatch, SetStateAction } from 'react'

import { ChartData } from 'chart.js';

import { DoughnutGraph } from './DoughnutGraph';
import { Table } from './Table';

import IParticipation from '../interfaces/participations';
import IAlert from '../interfaces/alert';

type MainProps = {
    data: ChartData<"doughnut", number[], unknown>;
    participations: IParticipation[];
    setParticipations: Dispatch<SetStateAction<IParticipation[]>>;
    setAlert: Dispatch<SetStateAction<IAlert>>;
}

export function Main ( {data, participations, setParticipations, setAlert} : MainProps ) {
    return (
        <div className="main-container" >
            <Table
                participations = {participations}
                setParticipations = {setParticipations}
                setAlert={setAlert}
            />
            <DoughnutGraph
                data = {data}
            />
        </div>
    )
}
