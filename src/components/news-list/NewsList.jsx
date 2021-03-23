import React, { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  // TODO sækja yfirlit fréttaflokka

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  useEffect(() => {
    async function fetchData() {
      setIsLoaded(false);
      setError(null);
      let json;


      try {
        const result = await fetch(apiUrl);

        // Getum líka haft flóknari villumeðhöndlun hér, gripið 4xx villur sér eða eitthvað þannig
        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
        for(let i=0;i<json.length;i++){
            const res = await fetch(json[i].url);
              // Getum líka haft flóknari villumeðhöndlun hér, gripið 4xx villur sér eða eitthvað þannig
            if (!res.ok) {
              throw new Error('result not ok');
            }
    
            var jason = await res.json();
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
    // þar sem við notum báðar af þessum state breytum, þá eru þau dependecy fyrir þetta effect
    // ef annaðhvor breytist, þá keyrir effect aftur, annars ekki
  }, []);






  if (error) {
    return <p>ERROR</p>
  } else if (!isLoaded) {
    return <div>Loading.....</div>
  } else {
    console.log(items);
    return <div class="topics">
              {items.map(
                id => 
                  <div class="topics-items">
                    <h4>{id.title}</h4>
                    <p>{id.items[0].title}</p>
                    <p>{id.items[1].title}</p>
                    <p>{id.items[2].title}</p>
                    <p>{id.items[3].title}</p>
                    <p>{id.items[4].title}</p>
                  </div>
              )}
          </div>
  }
}