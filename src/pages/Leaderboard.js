import Body from '../components/Body';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Leaderboard() {
    const [streak, setStreak] = useState();
    useEffect(() => {
        (async () => {
          const response = await fetch('/api/top-streak');
          if (response.ok) {
            const results = await response.json();
            setStreak(results);
          }
          else {
            console.log(BASE_API_URL +"REAL ERROR!!")
            setStreak(null);
          }
        })();
      }, []);


  return (
    <Body sidebar>
      <h1>Explore</h1>
      <p>TODO</p>
      <Card className='grid p-3'>
      {streak &&
        streak.map(post => {
          return (
            <div className='d-flex justify-content-between stat-text' key={post.code}>
            
              <a href={'/user/' + post.code.replace('#', "-")} className='navbar-brand'><b>{post.code}</b></a>  
              Best win streak {post.maxstreak} &mdash; Rank {Math.round(post.rank * 10) / 10}
            
            </div>
          );
        })
      }
      </Card>
    </Body>
  );
}