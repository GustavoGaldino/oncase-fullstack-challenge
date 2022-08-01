import { ChartData, ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';

import { Doughnut } from 'react-chartjs-2'

import '../styles/components/DoughnutGraph.css'

type DoughnutGraphProps = {
    data: ChartData<"doughnut", number[], unknown>;
}

export function DoughnutGraph ({data}: DoughnutGraphProps ) {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: "white",
                    font: {
                        size: 16
                    }
                }
            }
        }
    }

    return (
        <div className="doughnut-container">
            <Doughnut 
                data={data}

                options={options}
            />
        </div>
    );
}