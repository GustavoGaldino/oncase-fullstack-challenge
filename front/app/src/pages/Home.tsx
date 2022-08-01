import { useState, useEffect } from 'react';

import { fetchParticipationsData } from '../api/api';

import { generateRandomRGBAsString } from '../utils/utils';

import { ChartData, ChartDataset } from 'chart.js';

import IParticipation from '../interfaces/participations';

import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'

import '../styles/pages/Home.css'
import { Alert } from '../components/Alert';
import IAlert from '../interfaces/alert';

export function Home () {

    const [participations, setParticipations] = useState<IParticipation[]>([]);

    const [data, setData] = useState<ChartData<"doughnut", number[], unknown>>( { datasets: [] } )

    const [alert, setAlert] = useState<IAlert>({
        show: false,
        warning: false,
        message: ""
    });

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

        let totalParticipation = 0;

        participations.forEach( (participation : IParticipation) => {
            
            newDataState.labels?.push(`${participation.firstName} ${participation.lastName}`)

            firstDataset.data.push( participation.participation )

            if (participation.participation !== undefined) {
                totalParticipation += participation.participation;
            }

            firstDataset.backgroundColor.push( generateRandomRGBAsString() )

            firstDataset.borderColor.push( "#fff" ) 

        })

        participations.forEach ( (participation : IParticipation) => {
            if (participation.participation !== undefined) {
                let percentage : number | string = Math.round(100 * participation.participation / totalParticipation);
                participation.percentage = Number(percentage);
            }
        } );

        newDataState.datasets.push(firstDataset)

        setData(newDataState)

    }, [participations]);

    useEffect(() => {

        async function fetchResultFromAPIandSetState() {
            setParticipations ( (await fetchParticipationsData()).data )
        }

        fetchResultFromAPIandSetState()

    }, [])

    return (
        <div className="home-container">

            <Navbar
                participations={participations}
                setParticipations={setParticipations}
                setAlert={setAlert}
            />

            <Main
                data={data}
                participations={participations}
                setParticipations={setParticipations}
                setAlert={setAlert}
            />

            { 
                alert.show ?
                <Alert
                    alert={alert}
                    setAlert={setAlert}
                />
                :
                <></>
            }   
            
        </div>
    );
}