export type Coin = {
    id: string
    symbol: string
    name: string
    platforms?: {
        [key: string]: string
    }
}

export async function fetchCoinList(): Promise<Coin[]> {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1'
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-f8rYSYofVSkG9D8TPYhpvdJ4'}
    };
    
    const result = await fetch(url, options)
      .then(res => res.json())
      .then(json => {
          console.log(json);
          return json;
      })
      .catch(err => console.error(err))

    return result
}