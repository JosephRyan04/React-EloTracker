import Body from "../components/Body";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { round, keyBy, max, size } from "lodash";
import { Row, Col } from "react-bootstrap/esm/";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "chartjs-adapter-date-fns";
import {
  CaretUp,
  CaretDown,
  Lightning,
  ArrowsClockwise,
  UserPlus,
} from "@phosphor-icons/react";
import Sidebar from "../components/Sidebar";

const rank_tier = (0, keyBy)(
  [
    {
      key: "none",
      name: "None",
    },
    {
      key: "banned",
      name: "Banned",
    },
    {
      key: "pending",
      name: "Pending",
    },
    {
      key: "bronze1",
      name: "Bronze 1",
      color: "#E06A36",
    },
    {
      key: "bronze2",
      name: "Bronze 2",
      color: "#E06A36",
    },
    {
      key: "bronze3",
      name: "Bronze 3",
      color: "#E06A36",
    },
    {
      key: "silver1",
      name: "Silver 1",
      color: "#B5A5B7",
    },
    {
      key: "silver2",
      name: "Silver 2",
      color: "#B5A5B7",
    },
    {
      key: "silver3",
      name: "Silver 3",
      color: "#B5A5B7",
    },
    {
      key: "gold1",
      name: "Gold 1",
      color: "#F6A51E",
    },
    {
      key: "gold2",
      name: "Gold 2",
      color: "#F6A51E",
    },
    {
      key: "gold3",
      name: "Gold 3",
      color: "#F6A51E",
    },
    {
      key: "plat1",
      name: "Platinum 1",
      color: "#91E8E0",
    },
    {
      key: "plat2",
      name: "Platinum 2",
      color: "#91E8E0",
    },
    {
      key: "plat3",
      name: "Platinum 3",
      color: "#91E8E0",
    },
    {
      key: "diamond1",
      name: "Diamond 1",
      color: "#5DDFF4",
    },
    {
      key: "diamond2",
      name: "Diamond 2",
      color: "#5DDFF4",
    },
    {
      key: "diamond3",
      name: "Diamond 3",
      color: "#5DDFF4",
    },
    {
      key: "master1",
      name: "Master 1",
      color: "#6847BA",
    },
    {
      key: "master2",
      name: "Master 2",
      color: "#6847BA",
    },
    {
      key: "master3",
      name: "Master 3",
      color: "#6847BA",
    },
    {
      key: "grandmaster",
      name: "Grandmaster",
      color: "#E51D13",
    },
  ],
  "key"
);

function nominalRank(rating, placement, setcount) {
  // console.log(placement);
  return setcount < 5
    ? rank_tier.pending
    : rating >= 2191.75 && placement
    ? rank_tier.grandmaster
    : rating >= 2350
    ? rank_tier.master3
    : rating >= 2275
    ? rank_tier.master2
    : rating >= 2191.75
    ? rank_tier.master1
    : rating >= 2136.28
    ? rank_tier.diamond3
    : rating >= 2073.67
    ? rank_tier.diamond2
    : rating >= 2003.92
    ? rank_tier.diamond1
    : rating >= 1927.03
    ? rank_tier.plat3
    : rating >= 1843
    ? rank_tier.plat2
    : rating >= 1751.83
    ? rank_tier.plat1
    : rating >= 1653.52
    ? rank_tier.gold3
    : rating >= 1548.07
    ? rank_tier.gold2
    : rating >= 1435.48
    ? rank_tier.gold1
    : rating >= 1315.75
    ? rank_tier.silver3
    : rating >= 1188.88
    ? rank_tier.silver2
    : rating >= 1054.87
    ? rank_tier.silver1
    : rating >= 913.72
    ? rank_tier.bronze3
    : rating >= 765.43
    ? rank_tier.bronze2
    : rank_tier.bronze1;
}

function mapData(x, y) {
  const resp = x.map((x, i) => {
    return {
      x: x,
      y: y[i],
    };
  });
  return resp;
}

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export default function EloChart() {
  const [response, setResponse] = useState("blank2");

  const [responseCode, setResponseCode] = useState(null);
  const [slpResponse, setSlpResponse] = useState(false);

  const [elo, setElo] = useState(null);
  const [streak, setStreak] = useState(null);
  const [change, setChange] = useState(null);
  const [arr, setArr] = useState("blank");
  const [tier, setTier] = useState("blank");
  const { user } = useParams();

  useEffect(() => {
    const sidebar = document.querySelector(".Sidebar");
    if (sidebar) {
      console.log("collapsed");
    }
    (async () => {
      const apiResponse = await fetch(
        BASE_API_URL + "/api/user-ranks?player=" + user
      );
      setResponseCode(apiResponse.ok);
      if (apiResponse.ok) {
        const results = await apiResponse.json();
        console.log(results);

        setResponse(results);
        setChange(results.latestchange);
        setStreak(results.maxstreak);
        setElo(Math.round(results.rank * 10) / 10);
        setArr(mapData(results.timestamps, results.datapoints));
        setTier(
          nominalRank(
            results.rank,
            results.globalrank + results.regionalrank,
            results.updatecount
          )
        );
      } else {
        console.log(BASE_API_URL + " get_users bad request, check api server");
      }
    })();
  }, [user]);

  function UpdateElo() {
    (async () => {
      const apiResponse = await fetch(BASE_API_URL + "/api/update-elo/" + user);
      if (apiResponse.ok) {
        const results = await apiResponse.json();
        console.log(results);
        document.location.reload();
      } else {
        setSlpResponse(true);
        console.log(BASE_API_URL + " Update Elo bad request");
      }
    })();
  }

  return (
    <>
      <Sidebar hidden_sm={"hidden"} />
      <Body>
        {responseCode && (
          <Row id="RankChart" className="d-flex gap-2">
            <Col md={8}>
              <Card className="chart-container p-0">
                <div className="card-header d-flex flex-row gap-5 p-3">
                  <div className="d-flex flex-row">
                    <img
                      src={`/icons/${tier.key}.svg`}
                      alt={`Rank icon: ${tier.key}`}
                      width="65"
                    />
                    <div className="d-flex flex-column align-items-center">
                      <h4>{response.code}</h4>
                      <b id="rating">{tier.name}</b>
                    </div>
                  </div>

                  <div className="d-flex flex-row">
                    <h1>{elo}</h1>
                    <div className="d-flex flex-column">
                      <b id="rating">Rating</b>
                      {change >= 0 && (
                        <h4 id="shift">
                          {change}
                          <CaretUp size={24} color="#58b501" weight="fill" />
                        </h4>
                      )}
                      {change < 0 && (
                        <h4 id="shift">
                          {change}
                          <CaretDown size={24} color="#FF4C09" weight="fill" />
                        </h4>
                      )}
                    </div>
                  </div>
                </div>

                <hr />
                <div className="d-flex chart-div p-3">
                  <Line
                    data={{
                      datasets: [
                        {
                          label: "Glicko-2 Rating",
                          data: arr,
                          backgroundColor: "rgba(49, 0, 87, 0.3)",
                          borderColor: "#310057",
                        },
                      ],
                      text: "Monthly Revenue & Cost",
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
                          //type: 'time',
                          grid: {
                            display: false,
                            color: "#00000000",
                            zeroLineColor: "#ddd",
                            borderColor: "#ddd",
                          },
                          border: {
                            width: 1,
                            color: "#212529",
                          },
                          ticks: {
                            display: false,
                          },
                          time: {
                            unit: "day",
                            displayFormats: {
                              second: "HH:mm:ss",
                              minute: "HH:mm:ss",
                              hour: "HH:mm",
                              day: "MMM dd",
                              month: "MMM-yyyy",
                              year: "yyyy",
                            },
                            tooltipFormat: "MMM dd HH:mm",
                          },
                        },
                        y: {
                          display: true,
                          grace: 100,
                          ticks: {
                            stepSize: 0,
                          },
                          grid: {
                            color: "#212529",
                          },
                          border: {
                            width: 1,
                            color: "#212529",
                          },
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

            <Col
              id="playerstats"
              className="d-flex flex-column gap-3 align-items-start"
            >
              {(response.regionalrank || response.globalrank) && (
                <Card className="grid p-3">
                  <h4>Placements</h4>

                  <div className="d-flex flex-row justify-content-between">
                    <b id="rating">Global</b>
                    <b className="stat-text">#{response.globalrank}</b>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <b id="rating">Regional</b>
                    <b className="stat-text">#{response.regionalrank}</b>
                  </div>
                </Card>
              )}

              <Card className="grid p-3">
                <h4>Stats</h4>
                <hr />
                <div className="d-flex flex-row align-items-end gap-3">
                  <div className="d-flex flex-column">
                    <b id="rating">Set Count</b>
                    <b className="stat-text">{response.updatecount}</b>
                  </div>

                  <div className="d-flex flex-column">
                    <b id="rating">Datapoints</b>
                    <b className="stat-text">{size(response.datapoints)}</b>
                  </div>
                </div>
                <hr />

                <div className="d-flex flex-row align-items-end gap-3">
                  <div className="d-flex flex-column">
                    <b id="rating">Record</b>
                    <b className="stat-text">
                      {" "}
                      {response.wins}W - {response.losses}L
                    </b>
                  </div>
                  <div className="d-flex flex-column">
                    <b id="rating">(W/L)</b>
                    <b className="stat-text">
                      ({round(response.wins / response.losses, 2)})
                    </b>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="d-flex flex-row align-items-end gap-3 p-3">
                  <div className="d-flex flex-column">
                    <b id="rating">Best Win Streak</b>
                    <b className="stat-text">
                      <Lightning size={20} color="#e0af00" weight="duotone" />
                      {streak}
                    </b>
                  </div>
                  <div className="d-flex flex-column">
                    <b id="rating">Peak Rating</b>
                    <b className="stat-text">{max(response.datapoints)}</b>
                  </div>
                </div>
              </Card>
              <div className="d-flex flex-row align-items-center gap-1">
                <Button
                  id="slp-button"
                  variant="outline-success"
                  href={`https://slippi.gg/user/${user}`}
                >
                  <img
                    src={`/icons/SlippiLogo.svg`}
                    alt="Slp logo"
                    height="24"
                  />{" "}
                  Profile
                </Button>{" "}
                <Button
                  id="update-button"
                  variant="outline-success"
                  onClick={UpdateElo}
                >
                  <ArrowsClockwise size={24} color="#ffffff" /> Update
                </Button>{" "}
              </div>
            </Col>
          </Row>
        )}
        {!responseCode && (
          <div>
            <h1>User not in database yet: {user}</h1>
            <Button
              id="update-button"
              variant="outline-success"
              onClick={UpdateElo}
            >
              <UserPlus size={24} color="#ffffff" /> Add User
            </Button>{" "}
            {slpResponse && (
              <h3>
                User does not exist in slippi, please check for typos in the
                connect code
              </h3>
            )}
          </div>
        )}
      </Body>
    </>
  );
}
