export async function fetchNews() {
    const url = 'https://newsdata.io/api/1/latest?apikey=pub_64709fff90bc10be34e5f27de83848178771d&q=crypto&language=en'
    const options = { headers: { 'Accept': 'application/json' } }

    const result = await fetch(url, options)
    .then(res => res.json())
    .then(json => {
      return json
    })
    .catch(err => console.error(err))

    return result
}