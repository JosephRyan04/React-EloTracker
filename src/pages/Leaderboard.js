import Body from '../components/Body';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Leaderboard() {
    const [streak, setStreak] = useState();
    const [games, setGames] = useState(null);
    const [ranks, setRanks] = useState(null);
    useEffect(() => {
        (async () => {
          const response = await fetch(BASE_API_URL + '/api/top-streak');
          if (response.ok) {
            const results = await response.json();
            setStreak(results);
          }
          else {
            console.log(BASE_API_URL +" failed to hit /api/top-streak")
            setStreak(null);
          }
        })();
      }, []);

      function get_games(){
        if(games == null){
        (async () => {
          const response = await fetch( BASE_API_URL + '/api/most-games');
          const rank_response = await fetch( BASE_API_URL + '/api/top-ranked');
          if (response.ok) {
            const results = await response.json();
            setGames(results);

            const rank_results = await rank_response.json();
            setRanks(rank_results);
          }
          else {
            console.log(BASE_API_URL +" failed to hit /api/most-games")
            setGames(null);
          }
        })();
      }
      }

  return (
    <Body sidebar>
      <div className='leaderboard'>
      <h1>Leaderboard</h1>
      <Tabs
      variant='pills'
      defaultActiveKey="streak"
      id="uncontrolled-tab-example"
      transition={false}
      className="mb-3"  onClick={get_games}
    >
      <Tab id='tab-end' eventKey="streak" title="Win streak">
      <Card className='grid p-3'>
      <div className='d-flex justify-content-between stat-text'>
        <div className='d-flex gap-4'><p>Rank</p><p>Player</p></div>
        <p>Best win streak</p>
        </div>
            {streak &&
              streak.map( (rank, index) => {
                return (
                  <div key={rank.code}><hr className='m-1'/>
                  <div className='d-flex justify-content-between stat-text'>
                    
                    <div className='d-flex gap-5'>
                      <p>{index + 1}</p><a href={'/user/' + rank.code.replace('#', "-")} className='navbar-brand'><p>{rank.code}</p></a>
                      </div>
                    <p>{rank.maxstreak}</p>
      
                  </div>
                  </div>
                );
              })
            }
            </Card>
      </Tab>
      <Tab eventKey="setcount" title="Set count">  
      <Card className='grid p-3'>
      <div className='d-flex justify-content-between stat-text'>
        <div className='d-flex gap-4'><p>Rank</p><p>Player</p></div>
        <p>Set count</p>
        </div>
            {games &&
              games.map( (game, index) => {
                return (
                  <div key={game.code}><hr className='m-1'/>
                  <div className='d-flex justify-content-between stat-text'>
                    
                    <div className='d-flex gap-5'><p>{index + 1}</p><a href={'/user/' + game.code.replace('#', "-")} className='navbar-brand'><p>{game.code}</p></a></div>
                    <p>{game.gamecount}</p>
      
                  </div>
                  </div>
                );
              })
            }
            </Card>
      </Tab>
      <Tab eventKey="rating" title="Rating" >
      <Card className='grid p-3'>
      <div className='d-flex justify-content-between stat-text'>
        <div className='d-flex gap-4'><p>Rank</p><p>Player</p></div>
        <p>Rating</p>
        </div>
            {ranks &&
              ranks.map( (rank, index) => {
                return (
                  <div key={rank.code}><hr className='m-1'/>
                  <div className='d-flex justify-content-between stat-text'>
                    
                    <div className='d-flex gap-5'>
                      <p>{index + 1}</p><a href={'/user/' + rank.code.replace('#', "-")} className='navbar-brand'><p>{rank.code}</p></a>
                      </div>
                    <p>{Math.round(rank.rank * 10) / 10}</p>
      
                  </div>
                  </div>
                );
              })
            }
            </Card>
      </Tab>
    </Tabs>
    </div>
    </Body>
  );
}