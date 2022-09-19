<template>
  <main>

    <div class="category-selector">
        <div class="totat-point-display" v-if="totalPoints">
          <n-progress
            indicator-placement="inside"
            type="circle"
            :percentage="getCategoryPercentage(totalPoints.current,
              parseFloat(getTotalPointsThreshold()||'0'))
            "
            :rail-color="'#292935'" gap-position="bottom" :gap-degree="70" class="total-point-progress">
            <div class="total-points-text">
              <span :class="'level'+totalPoints.level">{{totalPoints.level}}</span>
              <span>{{totalPoints.current + '/' + getTotalPointsThreshold()}}</span>
            </div>

          </n-progress>
        </div>
        <div v-for="category in categoryButtons" :key="category" :id="category" @click="selectCategory(category)" class="category-button" @mouseenter="animateHoverRect(category)" :class="{selected: category == selectedCategory}">{{category}}</div>
    </div>

  
   
    <div class="category-container">
      <div v-if="selectedCategory" class="category-header">
        <div style="display: flex;">
          <label for="">Sort:</label>
          <n-select class="category-header-select" v-model:value="sortObject" :options="sortOptions" size="small"></n-select>
        </div>
        <input type="text" placeholder="Search" v-model="searchTerm">
        <div v-if="categoryPoints && ['TEAMWORK','IMAGINATION','VETERANCY','COLLECTION','EXPERTISE'].includes(selectedCategory)" class="category-points-container">
          <span :class="'level'+getCategoryRank(selectedCategory)">{{getCategoryRank(selectedCategory)}}</span>
          <div class="category-points">
            <span >{{categoryPoints[selectedCategory as keyof typeof categoryPoints].current}}</span>/<span >{{getCategoryNextThreshold(selectedCategory)}}</span>
          </div>
          <n-progress
            indicator-placement="inside"
            type="line"
            :percentage="getCategoryPercentage(
              categoryPoints[selectedCategory as keyof typeof categoryPoints].current,
              parseFloat(getCategoryNextThreshold(selectedCategory)||'0')
            )"
            :rail-color="'#292935'">
          </n-progress>
        </div>
      </div>
      <div class="secondary-category-container" id="secondary-category-container">
        <div v-for="(capstone, key) in selectedCategoryRender" :key="key" style="display: flex; flex-direction: column; align-items: center;">
              <div class="category-title">{{key}}</div>
              <div class="challenge-container">
                  <Challenge v-for="challenge in capstone" :challenge="challenge" :key="challenge.id" />
              </div>
          </div>
      </div>

    </div>



</main>
  
</template>
    
  
  
<script setup lang="ts">
import Challenge from './Challenge.vue'
import {ref, computed, watch} from 'vue'
import { challengesData, CategoryPoints, TotalPoints  } from '../assets/types'
import { sortObject, sortChallengesAll, sortOptions, sortChallengesSingleCategory} from '../composables/challengesSort'
import { NSelect, NProgress } from 'naive-ui'
import { useChallengesStore } from '../store/index'
import { storeToRefs } from 'pinia'
const props = defineProps<{challenges:challengesData.RootObject, categoryPoints:CategoryPoints|undefined, totalPoints:TotalPoints|undefined }>()
const challenges = props.challenges
const categoryPoints = props.categoryPoints
const totalPoints = props.totalPoints


const challengesStore = useChallengesStore()
const { largeCapstones } = challengesStore



const selectedCategory = ref('')
const searchTerm = ref('')

function selectCategory(category: string){
  selectedCategory.value = category
  const div = document.getElementById('secondary-category-container')
  div?.scroll({top:0,left:0,behavior:'smooth'})
  animateHoverRect(category)

}
function animateHoverRect(category: string){

  const categoryButton = document.getElementById(category)
  const rect = categoryButton?.getClientRects()
  // console.log(rect)
  if(rect){
    document.documentElement.style.setProperty('--category-selector-position-top', (rect[0].top - 110).toString()+'px')
    document.documentElement.style.setProperty('--category-selector-position-left', rect[0].left.toString()+'px')
  }
}
function getCategoryPercentage(value:number, full:number){
  return Math.round((value/full)*100)
}
function getCategoryNextThreshold(selectedCategory: string){
  if(largeCapstones && categoryPoints){
    for(let challenge of largeCapstones){

      if(challenge.localizedNames?.en_GB.name == selectedCategory){
        switch (categoryPoints[selectedCategory as keyof typeof categoryPoints].level) {
                case 'IRON':
                    return `${challenge.thresholds['BRONZE']}`
                case 'BRONZE':
                  return `${challenge.thresholds['SILVER']}`
                    
                case 'SILVER':
                return `${challenge.thresholds['GOLD']}`
                    
                case 'GOLD':
                return `${challenge.thresholds['PLATINUM']}`
                    
                case 'PLATINUM':
                return  `${challenge.thresholds['DIAMOND']}`
                    
                case 'DIAMOND':
                return `${challenge.thresholds['MASTER']}`
                    
                case 'MASTER':
                return `${challenge.thresholds['GRANDMASTER']}`
                    
                case 'GRANDMASTER':
                return  `${challenge.thresholds['CHALLENGER']}`
                    
                case 'CHALLENGER':
                return  `${challenge.thresholds['CHALLENGER']}`
                  
                default:
                    break;
            }
      }
    }
  }
}
function getTotalPointsThreshold(){
  const level = totalPoints?.level
  if(level && largeCapstones){
    switch (level) {
                case 'IRON':
                    return `${largeCapstones[0].thresholds['BRONZE']}`
                case 'BRONZE':
                  return `${largeCapstones[0].thresholds['SILVER']}`
                    
                case 'SILVER':
                return `${largeCapstones[0].thresholds['GOLD']}`
                    
                case 'GOLD':
                return `${largeCapstones[0].thresholds['PLATINUM']}`
                    
                case 'PLATINUM':
                return  `${largeCapstones[0].thresholds['DIAMOND']}`
                    
                case 'DIAMOND':
                return `${largeCapstones[0].thresholds['MASTER']}`
                    
                case 'MASTER':
                return `${largeCapstones[0].thresholds['GRANDMASTER']}`
                    
                case 'GRANDMASTER':
                return  `${largeCapstones[0].thresholds['CHALLENGER']}`
                    
                case 'CHALLENGER':
                return  `${largeCapstones[0].thresholds['CHALLENGER']}`
                default:
                    break;
            }
  }
}
function getCategoryRank(selectedCategory: string){
  if(categoryPoints){
    return categoryPoints[selectedCategory as keyof typeof categoryPoints].level
  }
}
function filterChallengesBySearch(capstone: challengesData.CapstoneCategory){
  let newCapstone:challengesData.CapstoneCategory = {}
  let neededChallenges:challengesData.Challenge[] = []
  for (let [key, value] of Object.entries(capstone)){
    neededChallenges = []
    for (let challenge of value){
      if(challenge.name.toLocaleLowerCase().includes(searchTerm.value.toLocaleLowerCase())  || 
        challenge.localizedNames.en_GB.shortDescription.toLocaleLowerCase().includes(searchTerm.value.toLocaleLowerCase()) ||
        challenge.localizedNames.en_GB.description.toLocaleLowerCase().includes(searchTerm.value.toLocaleLowerCase()) ||
        challenge.localizedNames.en_GB.name.toLocaleLowerCase().includes(searchTerm.value.toLocaleLowerCase())
      ){
        neededChallenges.push(challenge)
      }
    }
    console.log(neededChallenges, searchTerm.value)
    if(neededChallenges.length != 0){
      newCapstone[key] = neededChallenges
    }
  }
  return newCapstone
}
const selectedCategoryRender = computed(()=>{

  if(selectedCategory.value == 'All'){
    if(searchTerm.value == ''){
      return sortChallengesAll(challenges)
    }else{
      return filterChallengesBySearch(sortChallengesAll(challenges))
    }
  }else{
    for(const [key, value] of Object.entries(challenges)){
      if(selectedCategory.value == key){
        if(searchTerm.value == ''){
          return sortChallengesSingleCategory(value)
        }else{
          return filterChallengesBySearch(sortChallengesSingleCategory(value))
        }
      }
    } 
  }
})
const categoryButtons = computed(()=>{
  let categories = []
  for(const [key, value] of Object.entries(challenges)){
    categories.push(key)
  }
  categories.push('All')
  return categories
})



</script> 
<style>

</style> 