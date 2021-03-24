import React, { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;
const hostname = process.env.REACT_APP_API_ENDPOINT;

export function NewsList() {
  // TODO sækja yfirlit fréttaflokka

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items] = useState([]);


  useEffect(() => {
    async function fetchData() {
      setIsLoaded(false);
      setError(null);
      let json;
      try {
        const result = await fetch(apiUrl);
        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
        for(let i=0;i<json.length;i++){
            const res = await fetch(json[i].url);
            if (!res.ok) {
              throw new Error('result not ok');
            }    
            var jason = await res.json();
            jason['id'] = json[i].id;
            items.push(jason);
        }         
        } catch (e) {
          setError('Gat ekki sótt gögn.');
          return;
        } finally {
          setIsLoaded(true);
        }
      }
    fetchData();
  },[]);

  if (error) {
    return <p>ERROR loading data please try again</p>
  } else if (!isLoaded) {
    return <div>Loading.....</div>
  } else {
    console.log(items);
    return <div class="topics">
              {items.map(
                id => 
                  <div class="topics-items">
                    <h4>{id.title}</h4>
                    <a href={id.items[0].link}><p>{id.items[0].title}</p></a>
                    <a href={id.items[1].link}><p>{id.items[1].title}</p></a>
                    <a href={id.items[2].link}><p>{id.items[2].title}</p></a>
                    <a href={id.items[3].link}><p>{id.items[3].title}</p></a>
                    <a href={id.items[4].link}><p>{id.items[4].title}</p></a>
                    <a class="topic-items-return-link"href={hostname+'id/'+id.id}>Sjá allar fréttir</a>
                  </div>
              )}
          </div>
  }
}