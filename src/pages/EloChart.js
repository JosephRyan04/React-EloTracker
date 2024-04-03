import Body from '../components/Body';
import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {range, keyBy} from "lodash";
import {Row, Col} from 'react-bootstrap/esm/';
import Card from 'react-bootstrap/Card';
import { CaretUp, CaretDown, Lightning } from "@phosphor-icons/react";



const rank_tier = (0,
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

function nominalRank(rating,placement,setcount){
  console.log(placement);
  return setcount < 5 ? rank_tier.pending : rating >= 2191.75 && placement ? rank_tier.grandmaster : rating >= 2350 ? rank_tier.master3 : rating >= 2275 ? rank_tier.master2 : rating >= 2191.75 ? rank_tier.master1 : rating >= 2136.28 ? rank_tier.diamond3 : rating >= 2073.67 ? rank_tier.diamond2 : rating >= 2003.92 ? rank_tier.diamond1 : rating >= 1927.03 ? rank_tier.plat3 : rating >= 1843 ? rank_tier.plat2 : rating >= 1751.83 ? rank_tier.plat1 : rating >= 1653.52 ? rank_tier.gold3 : rating >= 1548.07 ? rank_tier.gold2 : rating >= 1435.48 ? rank_tier.gold1 : rating >= 1315.75 ? rank_tier.silver3 : rating >= 1188.88 ? rank_tier.silver2 : rating >= 1054.87 ? rank_tier.silver1 : rating >= 913.72 ? rank_tier.bronze3 : rating >= 765.43 ? rank_tier.bronze2 : rank_tier.bronze1
}

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export default function EloChart() {
  const [response, setResponse] = useState("");
  const [data, setData] = useState(null);
  const [elo, setElo] = useState(null);
  const [streak,setStreak] = useState(null);
  const [change, setChange] = useState(null);
  const [arr, setArr] = useState();
  const [tier, setTier] = useState("blank")
  const {user} = useParams();
  console.log(tier);
  

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/user-ranks?player=' + user);
      if (response.ok) {
        const results = await response.json();
        console.log(results)
        
        setResponse(results);
        setData(results.datapoints);
        setChange(results.latestchange);
        setStreak(results.maxstreak);
        setElo(Math.round(results.rank * 10) / 10)
        setArr(range(0, results.datapoints.length))
        setTier(nominalRank(results.rank,results.globalrank + results.regionalrank,results.updatecount));
        // const img = document.createElement('img');
        // img.loading = 'lazy';
        // img.src = `src/assets/${tier.key}.svg`;

        
      }
      else {
        console.log(BASE_API_URL +"get_users bad request, check api server")
        setData(null);
      }
    })();
  }, [user]);
  

  return (
    <Body>

      <Row id="RankChart" className='d-flex gap-2'>
      <Col md={8}>
      <Card className="chart-container p-0">
      <div className="card-header d-flex flex-row gap-5 p-3">
          <div className='d-flex flex-row'>
          <img src={`/icons/${tier.key}.svg`} alt={`Rank icon: ${tier.key}`} width="65"/>
          <div className='d-flex flex-column align-items-center'>
          <h4>{response.code}</h4>
            <b id='rating'>{tier.name}</b>
          </div>

          </div>

          <div className='d-flex flex-row'>
            <h1>{elo}</h1>
            <div className='d-flex flex-column'>
              <b id='rating'>Rating</b>
              {change >= 0 && <h4 id='shift'>{change}<CaretUp size={24} color="#58b501" weight="fill"/></h4>}
              {change < 0 && <h4 id='shift'>{change}<CaretDown size={24} color="#FF4C09" weight="fill"/></h4>}
            </div>
          
          </div>

        </div>
        <div className='d-flex chart-div p-3'>
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
            text: "Monthly Revenue & Cost"
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            elements: {
              line: {
                fill: true,
                tension: 0,
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
                text: "Glicko-2 Elo Ratings",
              },
            },
          }}
        />
        </div>
        </Card>

        </Col>

        <Col className='d-flex flex-column gap-3 align-items-start'>
        <Card className='p-3'>
          <h4>Placements</h4>
          <b id='rating'>Global: {response.globalrank}</b>
        </Card>
        <Card className='d-flex flex-row p-3'>
          <h4>Stats</h4>
          <b id='rating'>Total Games: {response.updatecount}</b>
          <b id='rating'>Wins: {response.wins}</b>
          <b id='rating'>Losses: {response.losses}</b>
        </Card>
        <Card>
        <div className='d-flex flex-row justify-content-between p-3'>
          <div className='d-flex flex-column align-items-center'>
          <b id='rating'>Best Win Streak</b>
          <h4 id='shift'><Lightning size={24} color="#e0af00" weight="duotone"/>{streak}</h4>
          </div>
          </div>
        </Card>
        </Col>

      </Row>


    </Body>
    
  );
}