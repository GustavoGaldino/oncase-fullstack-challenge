import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartDataset, ChartData } from 'chart.js';

import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react';

import '../styles/components/DoughnutGraph.css'

import { fetchParticipationsData } from '../api/api';

import IParticipation from '../interfaces/participations';
import { generateRandomRGBAsString } from '../utils/utils';

export function DoughnutGraph () {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const [participations, setParticipations] = useState<IParticipation[] | any>([]);

    const [data, setData] = useState<ChartData<"doughnut", number[], unknown>>( { datasets: [] } )

    // whenever participations change, update data
    useEffect(() => {
        let newDataState : ChartData<"doughnut", number[], unknown> = {
            datasets: [],
            labels: []
        } 

        let firstDataset : (ChartDataset | any) = {
            label: "Participations",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        };

        participations.map( (participation : IParticipation | any) => {
            newDataState.labels?.push(`${participation.firstName} ${participation.lastName}`)

            firstDataset.data.push( participation.participation )

            firstDataset.backgroundColor.push( generateRandomRGBAsString() )

            firstDataset.borderColor.push( "#fff" ) 

        })

        newDataState.datasets.push(firstDataset)

        setData(newDataState)

    }, [participations]);

    useEffect(() => {

        async function fetchResultFromAPIandSetState() {
            const resultFromAPI = await fetchParticipationsData();
            setParticipations ( resultFromAPI )
        }

        fetchResultFromAPIandSetState()

    }, [])

    return (
        <div className="doughnut-container">
            <Doughnut data={data} />
        </div>
    );
}