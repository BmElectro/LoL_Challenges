<template>
  <main>

    <div class="category-selector">
        <div v-for="category in categoryButtons" :key="category" :id="category" @click="selectCategory(category)" class="category-button" @mouseenter="animateHoverRect(category)" :class="{selected: category == selectedCategory}">{{category}}</div>
    </div>

  
   
    <div class="category-container">
      <div v-if="selectedCategory" class="category-header">
        <div style="display: flex;">
          <label for="">Sort:</label>
          <n-select class="category-header-select" v-model:value="sortObject" :options="sortOptions" size="small"></n-select>
        </div>
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
import {ref, computed} from 'vue'
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



let selectedCategory = ref('')


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
  console.log(categoryPoints, largeCapstones)
  if(largeCapstones && categoryPoints){
    for(let challenge of largeCapstones){
      console.log(challenge.localizedNames)

      if(challenge.localizedNames?.en_GB.name == selectedCategory){
        console.log(categoryPoints[selectedCategory as keyof typeof categoryPoints].level)
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
function getCategoryRank(selectedCategory: string){
  if(categoryPoints){
    return categoryPoints[selectedCategory as keyof typeof categoryPoints].level
  }
}
const selectedCategoryRender = computed(()=>{

  if(selectedCategory.value == 'All'){
    return sortChallengesAll(challenges)
  }else{
    for(const [key, value] of Object.entries(challenges)){
      if(selectedCategory.value == key){
        return sortChallengesSingleCategory(value)
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