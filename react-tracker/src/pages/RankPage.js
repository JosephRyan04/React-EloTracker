import Body from '../components/Body';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";



const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export default function RankPage() {
    const {user} = useParams();
    const [data, setData] = useState();




    useEffect(() => {
        (async () => {
          const response = await fetch('/api/user-ranks?player=' + user);
          if (response.ok) {
            const results = await response.json();
            console.log(results)
            console.log(user + " Named")
            setData(results);
          }
          else {
            console.log(BASE_API_URL +"REAL ERROR!!")
            setData(null);
          }
        })();
      }, [user]);
    

  return (
    <Body sidebar>

    <h1>Explore</h1>
    <p>Ranked page</p>
    <>
      {data}
    </>
    
  </Body>
    
  );
}