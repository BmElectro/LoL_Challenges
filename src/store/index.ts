import { defineStore } from "pinia"
import { ref } from 'vue'
import { Challenges, Summoner, ChallengeConfigs, challengesData, Challenge } from '../assets/types'
import {data} from '../assets/challengesData'

let correctStuff:challengesData.RootObject = JSON.parse(JSON.stringify(data)  ) 


export const useChallengesStore = defineStore('challenges', () => {
    const challengesConfig = ref<ChallengeConfigs.ChallengeConfigsObject>({})
    const playerChallenges = ref<challengesData.RootObject>()
    

    

    async function getChallengesConfig(){
        const request = await fetch(`/api/getChallengesConfig`)
        const challengesConfigRequest: ChallengeConfigs.ChallengeConfig[]  = await request.json()
        for (let [category, value] of Object.entries(correctStuff)){
            //value.categoryName = capstoneCategory
            for(let [capstoneName, capstoneChallenges] of  Object.entries(value)){
                //console.log(i)
                for(let challenge of capstoneChallenges){
                    console.log(challengesConfigRequest)
                    let [neededChall] = challengesConfigRequest.filter(e => e.id == challenge.id)
                    console.log(neededChall)
                    // challenge.percentile = neededChall.percentile
                    // challenge.level = neededChall.level
                    // challenge.value = neededChall.value
                    // challenge.achievedTime = neededChall.achievedTime
                    if(neededChall.localizedNames){
                        challenge.localizedNames = neededChall.localizedNames
                    }
                }
            }
        }
        //playerChallenges.value = challengesConfigData
        return correctStuff
        //console.log(challengesConfig.value)
    }

    return { challengesConfig, getChallengesConfig , playerChallenges}
  })