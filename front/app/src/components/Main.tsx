import '../styles/components/Main.css'

import { Dispatch, SetStateAction } from 'react'

import { ChartData } from 'chart.js';

import { DoughnutGraph } from './DoughnutGraph';
import { Table } from './Table';
import IParticipation from '../interfaces/participations';

type MainProps = {
    data: ChartData<"doughnut", number[], unknown>;
    participations: IParticipation[];
    setParticipations: Dispatch<SetStateAction<IParticipation[]>>;
}

export function Main ( {data, participations, setParticipations} : MainProps ) {
    return (
        <div className="main-container" >
            <Table
                participations = {participations}
                setParticipations = {setParticipations}
            />
            <DoughnutGraph
                data = {data}
            />
        </div>
    )
}
