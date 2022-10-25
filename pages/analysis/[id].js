import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import ProfilePageButton from "../../components/profile-page-button";
import GlobalControllerLayout from "../../layouts/global-controller-layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllDateofProfileClickAsync } from "../../stores/analysisSlice";
import Loading from "../../components/loading";

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
           position: 'top',
           
    },

    
   
    title: {
        //display: true,
        // text: 'Kart Kullanımı',
    },
  },
};

function Analysis() {
  const nowDate = new Date(Date.now()).getFullYear();

  const [selectedYear, setSelectedYear] = useState();
  const [yearList, setYearList] = useState([]);
  const [monthCountAllList, setMonthCountAllList] = useState([]);

  const labels = [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ];

  const data = {
    
    labels ,
    datasets: [
      {
        label: "Tıklanma Sayıları",
        //   data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        data: monthCountAllList,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const [dateList, setDateList] = useState([]);

  const dispatch = useDispatch();

  const clickDateList = useSelector(
    (state) => state.analysisSlice.clickDateList
  );
  const clickDateStatus = useSelector((state) => state.analysisSlice.status);

  useEffect(() => {

    console.log("clickdate bakalı:", clickDateList )

    clickDateList !== undefined
      ? clickDateList.map((v) => {
          const value = new Date(v);
          console.log(value);
          setDateList((e) => [
            ...e,
            {
              day: value.getDay(),
              month: value.getMonth(),
              year: value.getFullYear(),
            },
          ]);
        })
      : setDateList([]);

    console.log("date liste buarada:",dateList);

    const selectedYearFilter = dateList.filter((f) => f.year == selectedYear);
    const monthCount = selectedYearFilter.reduce((toplam, item) => {
      return (toplam[item.month] = (toplam[item.month] || 0) + 1), toplam;
    }, Object.create(null));

    const startYear = dateList.reduce((startYear, item) => {
      startYear = 30000;
      return (
        (startYear = item.year < startYear ? item.year : startYear), startYear
      );
    }, null);
    console.log("year list = --------");
    console.log(startYear);

    const allYears = [];
    const nowYear = new Date().getFullYear();

    // sart year error
    if (startYear != null) {
      for (let i = startYear; i <= nowYear; i++) {
        allYears.push(i);
      }
    }

    setYearList(allYears);
    setMonthCountAllList([]);
    console.log(monthCount);
    const analiz = [];
    for (let index = 0; index < 12; index++) {
      analiz.push(monthCount[index] ? monthCount[index] : 0);
    }

    setMonthCountAllList(analiz);

    console.log(monthCountAllList);

    /*  console.log(date.getMonth());
          date.getMonth().forEach(element => {
              setlabels(v => [...v, element]);
          });
          console.log(labels);
     
    */
  }, [clickDateList, selectedYear]);

  useEffect(() => {
    const nowYear = new Date().getFullYear();
    console.log(nowYear);
    setSelectedYear(nowYear + "");
    dispatch(
      getAllDateofProfileClickAsync(localStorage.getItem("selectedProfileId"))
    );
  }, []);

  return (
    <>
      <GlobalControllerLayout>
        {" "}
        {clickDateStatus == "loading" ? <Loading /> : ""}{" "}
        <div className="main-content ">
          <div className="main-container">
            <div className="main-card-global">
              <div className="main-card">
                <div className="main-card-header">
                 HibritCard Kullanımı{" "}
                </div>{" "}
                <div className="main-card-text ">
                   HibritCard profil etkileşim sayısı
                </div>{" "}
                <div className="select-year">
                  <select
                    value={selectedYear}
                    onChange={(v) => setSelectedYear(v.target.value)}
                  >
                    {" "}
                    {yearList.map((v, i) => (
                      <option value={v} key={i}>
                        {" "}
                        {v}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>{" "}
                <div className="chart">
                  {/**  <Line height={300} options={options} data={data} />*/}{" "}
                  <Line options={options} data={data} />{" "}
                </div>{" "}
                {/**   <div className='main-card-bottom-text '>
                                                            Temmuz ayı etkileşimi bir önceki aya göre: <span>%24 arttı</span>
                            </div>**/}{" "}
              </div>{" "}
            </div>
            <div className="main-card-global">
              <div className="main-card">
                <div className="main-card-header">
                  Rehbere Kadetme{" "}
                </div>{" "}
                <div className="main-card-text ">
                  Rehbere eklenme sayısı
                </div>{" "}
                <div className="select-year">
                  <select
                    value={selectedYear}
                    onChange={(v) => setSelectedYear(v.target.value)}
                  >
                    {" "}
                    {yearList.map((v, i) => (
                      <option value={v} key={i}>
                        {" "}
                        {v}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>{" "}
                <div className="chart">
                  {/**  <Line height={300} options={options} data={data} />*/}{" "}
                  <Line options={options} data={data} />{" "}
                </div>{" "}
                {/**   <div className='main-card-bottom-text '>
                                                            Temmuz ayı etkileşimi bir önceki aya göre: <span>%24 arttı</span>
                            </div>**/}{" "}
              </div>{" "}
            </div>
          </div>{" "}
        </div>
        <ProfilePageButton />
      </GlobalControllerLayout>{" "}
    </>
  );
}

export default Analysis;
