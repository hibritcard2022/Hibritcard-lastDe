import React from 'react'
import Header from '../components/header'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import ProfilePageButton from '../components/profile-page-button';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            //     position: 'top',
        },
        title: {
            //   display: true,
            //   text: 'Kart Kullanımı',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [

        {
            label: 'Tıklanma Sayıları',
            //   data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
            data: [10, 5, 8, 2, 3, 7, 4],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export const data2 = {
    labels,
    datasets: [

        {
            label: 'Rehbere Kaydetme Sayıları',
            //   data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
            data: [3, 4, 8, 7, 2, 4, 5],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


function AnalysisOld() {
    return (
        <>
            <Header />

            <div className='main-content '>
                <div className='main-container'>
                    <div className='main-card-global'>
                        <div className='main-card'>
                            <div className='main-card-header'>
                                Kart Kullanımı
                            </div>
                            <div className='main-card-text '>
                                Aylara göre Hibrit Cart etkileşim sayınızı görebilirsiniz.
                            </div>
                            <div className='chart'>

                                {/**  <Line height={300} options={options} data={data} />*/}
                                <Line options={options} data={data} />
                            </div>
                            <div className='main-card-bottom-text '>
                                Temmuz ayı etkileşimbir önceki aya göre: <span>%24 arttı</span>
                            </div>
                        </div>
                    </div>
                    <div className='main-card-global'>
                        <div className='main-card'>
                            <div className='main-card-header'>
                                Rehbere Kaydetme
                            </div>
                            <div className='main-card-text '>
                                Aylara göre rehbere eklenme sayınızı görebilirsiniz.
                            </div>
                            <div className='chart'>

                                {/**  <Line height={300} options={options} data={data} />*/}
                                <Line options={options} data={data2} />
                            </div>
                            <div className='main-card-bottom-text '>
                                Temmuz ayı etkileşimbir önceki aya göre: <span>%24 arttı</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <ProfilePageButton />
        </>
    )
}

export default AnalysisOld