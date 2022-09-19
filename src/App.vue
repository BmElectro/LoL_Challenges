<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <nav>
      <div>
        <span>Challenges</span>
      </div>
      <div v-if="challengesReady">
        <input type="text" v-model="summonerName" placeholder="Search Summoner" @keyup.enter="getChallengesForPlayer()">
      </div>
      <div>
        <span v-if="summoner">{{summoner.name}}</span>
      </div>

    </nav>
    <div class="starting-page" v-if="!challengesReady">
      <input type="text" v-model="summonerName" placeholder="Search Summoner" @keyup.enter="getChallengesForPlayer()">
      <!-- <button @click="getChallengesForPlayer()">Get Challenges</button> -->
      <n-spin class="main-page-loading" v-if="showLoading && !summonerFetchError" :show="showLoading" size="large">
      <template #description>
        Loading {{summonerName}}
      </template>
    </n-spin>
    <span  class="main-page-loading"  v-if="summonerFetchError">
      {{summonerFetchError}}
    </span>
    </div>


    
    <UserProfile v-else-if="!showLoading && challengesReady" :challenges="challenges" :totalPoints="playerTotalPoints" :category-points="playerCategoryPoints"/>

  </n-config-provider>
</template>
  


<script setup lang="ts">





import UserProfile from './components/UserProfile.vue'
import { Summoner, challengesData, CategoryPoints, TotalPoints } from './assets/types'
import { onMounted, ref } from 'vue'
import { useChallengesStore } from './store/index'
import { NConfigProvider, GlobalThemeOverrides, NSpin } from 'naive-ui'



const challengesStore = useChallengesStore()
const { getChallengesConfig } = challengesStore


let summoner = ref<Summoner>()
let summonerName = ref<string>('')
let challenges = ref<challengesData.RootObject>({})
let playerChallenges = ref<challengesData.RootObject>({})
let playerCategoryPoints = ref<CategoryPoints>()
let playerTotalPoints = ref<TotalPoints>()
let showLoading = ref(false)
let summonerFetchError = ref('')

let challengesReady = ref(false)

async function getSummonerPUUID(summonerName: string){
  if(summonerName){
    const request = await fetch(`/api/getSummoner?summonerName=${summonerName}`)
    const result = await request.json()
    if(result.status){
      if(result.status.status_code == 404 || result.status.message == 'Data not found - summoner not found'){
        summonerFetchError.value = result.status.message
        throw new Error(result.status.message);
      }
    }
    else{
        summoner.value = result
    }
  }
}
async function getChallenges(challenge:challengesData.RootObject){
  const request = await fetch(`/api/getChallenges?summonerPUUID=${summoner.value?.puuid}`)
  const requestJson = await request.json()
  

  for (let [category, value] of Object.entries(challenge)){
            for(let [capstoneName, capstoneChallenges] of  Object.entries(value)){
                //console.log(i)
                for(let challenge of capstoneChallenges){
                    let [neededChall] = requestJson.challenges.filter((e: { challengeId: any }) => e.challengeId == challenge.id)
                    if(neededChall){
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
  try {
    summonerFetchError.value = ''
    challengesReady.value = false
    showLoading.value = true
    await getSummonerPUUID(summonerName.value)
    await getChallenges(playerChallenges.value)
    showLoading.value = false
    challengesReady.value = true
  } catch (error) {
    console.log(error)
  }

}



const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#FFFFFF'
  },
  Select:{
    peers:{
      InternalSelection: {
          color:'#363441',
          border:'#8444c0',
          textColor:'#FFFFFF',
          borderActive:'#FFFFFF',
          borderHover:'#8444c0',
          borderFocus:'#8444c0',
          colorActive: '#46465b',
          boxShadowHover: '#8444c0'
        },
      InternalSelectMenu:{
        color:'#363441',
        optionTextColor:'#FFFFFF',
        optionColorActive:'#46465b',
        optionCheckColor:'#46465b',
        optionColorPending:'#46465b',
        optionColorActivePending:"#636381",

      }
        
    }
  }
}
</script>


<style scoped>

</style>
