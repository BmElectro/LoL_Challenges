import fetch from 'node-fetch'


export default async function getChallenges(req, res){
    try {
        
        const {summonerPUUID} = req.query 
        const challengesIds = await fetch(`https://eun1.api.riotgames.com/lol/challenges/v1/player-data/${summonerPUUID}?api_key=${process.env.API_KEY}`)
        res.json(await challengesIds.json()) 
    } catch (error) { 
        res.json(error) 
    }
}