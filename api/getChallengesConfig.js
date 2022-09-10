import fetch from 'node-fetch'


export default async function getChallenges(req, res){
    try {
        const challengesConfig = await fetch(`https://eun1.api.riotgames.com/lol/challenges/v1/challenges/config?api_key=${process.env.API_KEY}`)
        res.json(await challengesConfig.json()) 
    } catch (error) { 
        res.json(error) 
    }
}