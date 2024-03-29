import Body from '../components/Body';
import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {range, keyBy} from "lodash";
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/Card';
import rankIcon from '../assets/caret-up-fill.svg'
import { CaretUp, CaretDown } from "@phosphor-icons/react";

const CB = (0,
  keyBy)([{
      key: "none",
      name: "None"
  }, {
      key: "banned",
      name: "Banned"
  }, {
      key: "pending",
      name: "Pending"
  }, {
      key: "bronze1",
      name: "Bronze 1",
      color: "#E06A36"
  }, {
      key: "bronze2",
      name: "Bronze 2",
      color: "#E06A36"
  }, {
      key: "bronze3",
      name: "Bronze 3",
      color: "#E06A36"
  }, {
      key: "silver1",
      name: "Silver 1",
      color: "#B5A5B7"
  }, {
      key: "silver2",
      name: "Silver 2",
      color: "#B5A5B7"
  }, {
      key: "silver3",
      name: "Silver 3",
      color: "#B5A5B7"
  }, {
      key: "gold1",
      name: "Gold 1",
      color: "#F6A51E"
  }, {
      key: "gold2",
      name: "Gold 2",
      color: "#F6A51E"
  }, {
      key: "gold3",
      name: "Gold 3",
      color: "#F6A51E"
  }, {
      key: "plat1",
      name: "Platinum 1",
      color: "#91E8E0"
  }, {
      key: "plat2",
      name: "Platinum 2",
      color: "#91E8E0"
  }, {
      key: "plat3",
      name: "Platinum 3",
      color: "#91E8E0"
  }, {
      key: "diamond1",
      name: "Diamond 1",
      color: "#5DDFF4"
  }, {
      key: "diamond2",
      name: "Diamond 2",
      color: "#5DDFF4"
  }, {
      key: "diamond3",
      name: "Diamond 3",
      color: "#5DDFF4"
  }, {
      key: "master1",
      name: "Master 1",
      color: "#6847BA"
  }, {
      key: "master2",
      name: "Master 2",
      color: "#6847BA"
  }, {
      key: "master3",
      name: "Master 3",
      color: "#6847BA"
  }, {
      key: "grandmaster",
      name: "Grandmaster",
      color: "#E51D13"
  }], "key")

function nominalRank(e,t,n){
  return n < 5 ? CB.pending : e >= 2191.75 && t ? CB.grandmaster : e >= 2350 ? CB.master3 : e >= 2275 ? CB.master2 : e >= 2191.75 ? CB.master1 : e >= 2136.28 ? CB.diamond3 : e >= 2073.67 ? CB.diamond2 : e >= 2003.92 ? CB.diamond1 : e >= 1927.03 ? CB.plat3 : e >= 1843 ? CB.plat2 : e >= 1751.83 ? CB.plat1 : e >= 1653.52 ? CB.gold3 : e >= 1548.07 ? CB.gold2 : e >= 1435.48 ? CB.gold1 : e >= 1315.75 ? CB.silver3 : e >= 1188.88 ? CB.silver2 : e >= 1054.87 ? CB.silver1 : e >= 913.72 ? CB.bronze3 : e >= 765.43 ? CB.bronze2 : CB.bronze1
}

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
        
        setData(results.datapoints);
        setChange(results.latestchange);
        setElo(Math.round(results.rank * 10) / 10)
        setArr(range(0, results.datapoints.length))
        console.log(nominalRank(results.rank,results.globalrank,results.updatecount))
      }
      else {
        console.log(BASE_API_URL +"get_users bad request, check api server")
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