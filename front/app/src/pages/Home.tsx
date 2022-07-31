import { useState, useEffect } from 'react';

import { fetchParticipationsData } from '../api/api';

import { generateRandomRGBAsString } from '../utils/utils';

import { ChartData, ChartDataset } from 'chart.js';

import IParticipation from '../interfaces/participations';

import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'

import '../styles/pages/Home.css'

export function Home () {

    const [participations, setParticipations] = useState<IParticipation[]>([]);

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

        participations.map( (participation : IParticipation) => {
            
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
        <div className="home-container">
            <Navbar
                participations={participations}
                setParticipations={setParticipations}
            />
            <Main
                data={data}
                participations={participations}
            />
        </div>
    );
}