import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const apiUrl = process.env.REACT_APP_API_URL;

export function News({id}) {
  const [getting, setGot] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setGot(false);
      setError(null);
      let json;
      try{
        const result = await fetch(apiUrl+id);
        if (!result.ok) {
          <Redirect to="/ERROR" />;
        }

        json = await result.json();
        setItems(json);  
        setGot(true); 
      }catch(e){
        <Redirect to="/ERROR" />
      }


    }
    fetchData();
  },[])


  console.log(id);
  if(!getting) return <p>Loading...</p>
  else if(error) return <p>Error</p>
  else{
    return <div>
      {items.items.map(it => (<p>{it.title}</p>))}
    </div>
  }
}