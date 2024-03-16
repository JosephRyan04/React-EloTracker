import Body from '../components/Body';
import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {range} from "lodash";


const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export default function EloChart() {
  const [data, setData] = useState();
  const [arr, setArr] = useState();
  const {user} = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/user-ranks?player=' + user);
      if (response.ok) {
        const results = await response.json();
        console.log(results)
        console.log(user + " Named")
        setData(results);
        setArr(range(0, results.length))
      }
      else {
        console.log(BASE_API_URL +"REAL ERROR!!")
        setData(null);
      }
    })();
  }, [user]);
  
  return (
    <Body sidebar>
      <h1>PLEASE</h1>
      <p>TODO</p>
      <>
      <div className="dataCard ratingCard">
        <Line
          data={{
            labels: arr,
            datasets: [
              {
                label: "Glicko-2 Rating",
                data: data,
                backgroundColor: "rgba(49, 0, 87, 0.2)",
                borderColor: "#310057",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                fill: true,
                tension: .2,
              },
            },
            scales: {
              x: {
                display: false,
                grid: {
                  display: false
                }
              },
              y: {
                display: true,
                grace: 100,
                ticks: {
                  stepSize: 0
                }

              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue & Cost",
              },
            },
          }}
        />
      </div>
      </>
    </Body>
  );
}