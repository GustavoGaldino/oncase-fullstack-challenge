import '../styles/components/Main.css'

import { ChartData } from 'chart.js';

import { DoughnutGraph } from './DoughnutGraph';
import { Table } from './Table';
import IParticipation from '../interfaces/participations';

type MainProps = {
    data: ChartData<"doughnut", number[], unknown>;
    participations: IParticipation[];
}

export function Main ( {data, participations} : MainProps ) {
    return (
        <div className="main-container" >
            <Table
                participations = {participations}
            />
            <DoughnutGraph
                data = {data}
            />
        </div>
    )
}
