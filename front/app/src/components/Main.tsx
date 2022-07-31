import '../styles/components/Main.css'

import { ChartData } from 'chart.js';

import { DoughnutGraph } from './DoughnutGraph';

type MainProps = {
    data: ChartData<"doughnut", number[], unknown>;
}

export function Main ( {data} : MainProps ) {
    return (
        <div className="main-container" >
            <DoughnutGraph
                data = {data}
            />
        </div>
    )
}
