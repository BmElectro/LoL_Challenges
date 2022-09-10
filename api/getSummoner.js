import fetch from 'node-fetch'

export default async function getSummoner(req, res){
    try {
        const { summonerName } = req.query
        const summoner = await fetch(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`)
        const data = await summoner.json()
        res.json(data) 
    } catch (error) {
        console.log(error)
        res.json(error) 
    }
}