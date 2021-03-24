import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const apiUrl = process.env.REACT_APP_API_URL;
const url = process.env.REACT_APP_API_ENDPOINT;

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
          setError(result);
          setGot(true);
        }
        else{
          json = await result.json();
          setItems(json);  
          setGot(true); 
        }
        
      }catch(e){
        setError(e);
        setGot(true);
        <Redirect to="/ERROR" />
      }
    }
    fetchData();
  },[])



  if(!getting) return <p>Loading...</p>
  else if(error) return <Redirect to="/ERROR" />
  else {
    return <div class="display-topic">
      {items.items.map(it => (<a href={it.link}><p>{it.title}</p></a>))}
      <a href={url} >Til Baka</a>
    </div>
  }
}

//<a href={id.items[0].link}><p>{id.items[0].title}</p></a>