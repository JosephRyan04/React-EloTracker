import Body from '../components/Body';
import { useState, useEffect } from 'react';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function ExplorePage() {
    const [posts, setPosts] = useState();
    useEffect(() => {
        (async () => {
          const response = await fetch('/api/update-elo/cwax-450');
          if (response.ok) {
            const results = await response.text();
            console.log(results)
            setPosts(results);
          }
          else {
            console.log(BASE_API_URL +"REAL ERROR!!")
            setPosts(null);
          }
        })();
      }, []);


  return (
    <Body sidebar>
      <h1>Explore</h1>
      <p>TODO</p>
      <>
      {posts && <p>{posts}</p>}
      </>
    </Body>
  );
}