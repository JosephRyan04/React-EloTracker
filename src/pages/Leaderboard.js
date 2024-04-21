import Body from '../components/Body';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Leaderboard() {
    const [streak, setStreak] = useState();
    const [games, setGames] = useState(null);
    useEffect(() => {
        (async () => {
          const response = await fetch('/api/top-streak');
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
          if (response.ok) {
            const results = await response.json();
            setGames(results);
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
      <h1>Leaderboard</h1>
      <p>By winstreak</p>
      <Tabs
      defaultActiveKey="streak"
      id="uncontrolled-tab-example"
      transition={false}
      className=""  onClick={get_games}
    >
      <Tab eventKey="streak" title="Win streak">
      <Card className='grid p-3'>
            {streak &&
              streak.map(post => {
                return (
                  <div className='d-flex justify-content-between stat-text' key={post.code}>
      
                    <a href={'/user/' + post.code.replace('#', "-")} className='navbar-brand'><b>{post.code}</b></a>
                    <p>Best win streak {post.maxstreak} &mdash; Rank {Math.round(post.rank * 10) / 10}</p>
      
                  </div>
                );
              })
            }
            </Card>
      </Tab>
      <Tab eventKey="setcount" title="Set count">  
      <Card className='grid p-3'>
            {games &&
              games.map(game => {
                return (
                  <div className='d-flex justify-content-between stat-text' key={game.code}>
      
                    <a href={'/user/' + game.code.replace('#', "-")} className='navbar-brand'><b>{game.code}</b></a>
                    <p>Sets played {game.gamecount} &mdash; Rank {Math.round(game.rank * 10) / 10}</p>
      
                  </div>
                );
              })
            }
            </Card>
      </Tab>
      <Tab eventKey="rating" title="Rating" disabled>
        Tab top rated players
      </Tab>
    </Tabs>

    </Body>
  );
}