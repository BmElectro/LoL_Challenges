<template>

  <nav>
    <div>
      <span>Challenges</span>
    </div>
    <div>
      <span>Welcome {{}}</span>
    </div>
    

  </nav>

  <main v-if="!challengesReady">
    <input type="text" v-model="summonerName" placeholder="Enter username">
    <button @click="getChallengesForPlayer()">Get Challenges</button>
  </main>


  
   <UserProfile v-else :challenges="challenges"/>

</template>
  


<script setup lang="ts">





import UserProfile from './components/UserProfile.vue'
import { Summoner, challengesData, CategoryPoints, TotalPoints } from './assets/types'
import { onMounted, ref } from 'vue'
import { useChallengesStore } from './store/index'




const challengesStore = useChallengesStore()
const { getChallengesConfig } = challengesStore


let summoner = ref<Summoner>()
let summonerName = ref<string>('')
let challenges = ref<challengesData.RootObject>({})
let playerChallenges = ref<challengesData.RootObject>({})
let playerCategoryPoints = ref<CategoryPoints>()
let playerTotalPoints = ref<TotalPoints>()



let challengesReady = ref(false)

async function getSummonerPUUID(summonerName: string){
  if(summonerName){
    const request = await fetch(`/api/getSummoner?summonerName=${summonerName}`)
    summoner.value = await request.json()
  }
}
async function getChallenges(challenge:challengesData.RootObject){
  const request = await fetch(`/api/getChallenges?summonerPUUID=${summoner.value?.puuid}`)
  const requestJson = await request.json()
  

  for (let [category, value] of Object.entries(challenge)){
            for(let [capstoneName, capstoneChallenges] of  Object.entries(value)){
                //console.log(i)
                for(let challenge of capstoneChallenges){
                    console.log(challenge.id)
                    console.log(requestJson.challenges)
                    let [neededChall] = requestJson.challenges.filter((e: { challengeId: any }) => e.challengeId == challenge.id)
                    if(neededChall){
                      console.log(neededChall)
                      challenge.percentile = neededChall.percentile
                      challenge.level = neededChall.level
                      challenge.value = neededChall.value
                      challenge.achievedTime = neededChall.achievedTime
                    }else{
                      challenge.percentile = 0
                      challenge.level = 'IRON'
                      challenge.value = 0
                      challenge.achievedTime = 0
                    }       
                }
            }
  }
  challenges.value = challenge
  playerCategoryPoints.value = requestJson.categoryPoints
  playerTotalPoints.value = requestJson.totalPoints
  return
}


onMounted(async ()=>{
  console.log('mounted')
  playerChallenges.value = await getChallengesConfig()

})
async function getChallengesForPlayer(){
  await getSummonerPUUID(summonerName.value)
  await getChallenges(playerChallenges.value)
  challengesReady.value = true
}
</script>


<style scoped>

</style>
