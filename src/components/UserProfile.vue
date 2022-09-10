<template>
  <main>

    <div class="category-selector">
        <div v-for="category in categoryButtons" :key="category" @click="selectCategory(category)" class="category-button" :class="{selected: category == selectedCategory}">{{category}}</div>
    </div>

  
   
    <div class="category-container">
      <div class="secondary-category-container">
        <div v-for="(capstone, key) in selectedCategoryRender" :key="key" style="display: flex; flex-direction: column; align-items: center;">
              <div class="category-title">{{key}}</div>
              <div class="challenge-container">
                  <Challenge v-for="challenge in capstone" :challenge="challenge" :key="key" />
              </div>
          </div>
      </div>

    </div>



</main>
  
</template>
    
  
  
<script setup lang="ts">
import Challenge from './Challenge.vue'
import {ref, computed} from 'vue'
import {challengesData } from '../assets/types'

const props = defineProps<{challenges:challengesData.RootObject}>()
const challenges = props.challenges


let selectedCategory = ref('')


function selectCategory(category: string){
  selectedCategory.value = category
}

const selectedCategoryRender = computed(()=>{
  if(selectedCategory.value == 'All'){
    let objectToRender:challengesData.CapstoneCategory = {}
    for(const [key, value] of Object.entries(challenges)){
        objectToRender = {...objectToRender, ...value}
    }
    return objectToRender
  }else{
    for(const [key, value] of Object.entries(challenges)){
      if(selectedCategory.value == key){
        return value
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