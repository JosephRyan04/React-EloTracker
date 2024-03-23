import Body from '../components/Body';
import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {range} from "lodash";
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/Card';
import { CaretUp, CaretDown } from "@phosphor-icons/react";



const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export default function EloChart() {
  const [data, setData] = useState(null);
  const [elo, setElo] = useState(null);
  const [change, setChange] = useState(null);
  const [arr, setArr] = useState();
  const {user} = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/user-ranks?player=' + user);
      if (response.ok) {
        const results = await response.json();
        console.log(results)
        console.log(user + " Named")
        
        setData(results.datapoints);
        setChange(results.latestchange);
        setElo(Math.round(results.rank * 10) / 10)
        setArr(range(0, results.datapoints.length))
      }
      else {
        console.log(BASE_API_URL +"REAL ERROR!!")
        setData(null);
      }
    })();
  }, [user]);
  
  return (
    <Body sidebar>

      <Row id="RankChart">
      <Card className="chart-container">
        <div className='d-flex flex-row'>
          <h1>{elo}</h1>
          <div className='d-flex flex-column'>
          <text>Rating</text>
          {change >= 0 && <h4>{change}<CaretUp size={24} color="#2ECC40" weight="fill"/></h4>}
          {change < 0 && <h4>{change}<CaretDown size={24} color="#FF4C09" weight="fill"/></h4>}
          </div>
          
          </div>

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
            responsive: true,
            maintainAspectRatio: true,
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
        </Card>
      </Row>


    </Body>
    
  );
}