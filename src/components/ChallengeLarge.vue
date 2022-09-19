<template>
    <div class="challenge-large">
        <!-- <span class="border-color" :class="challenge.level"></span> -->
        <div class="challenge-info-container-large">
            <div class="challenge-info-container-large-header"> 
                <div class="challenge-large-header-info-left"><span>{{getChallengeName(challenge)}}</span>
                    <div class="challenge-img-progress-large">
                        <div class="challenge-img-progress-large-img">
                            <img :src="getChallengeImg(id, challenge.level)" alt="" srcset="" style="height: 50px; width: 50px;">
                            <div class="threshhold-container"><div class="threshold"></div>{{getThreshholdText(challenge.value, challenge.level, challenge)}}</div>
                        </div>
                        <n-progress class="challenge-progress-large" type="line" :percentage="percentage" :rail-color="'#292935'" :indicator-placement="'inside'">  </n-progress>
                    </div>
                </div>
                <div class="challenge-large-header-info-right">
                    <span :class="'level'+challenge.level">{{challenge.level}}</span>
                    <span v-if="getGamemodes(challenge) != 'NONE'">{{getGamemodes(challenge)}}</span>
                </div>
            </div>
            <div class="challenge-info-container-large-body">
                <span class="challenge-info-section-title">Description:</span>
                <span class="challenge-text" v-html="getChallengeTextLarge(challenge)"></span>
            </div>
            <span v-if="challenge.idListType == 'CHAMPION'" class="challenge-info-section-title">Champions available for this challenge:</span>
            <div class="champs-list-container" v-if="challenge.idListType == 'CHAMPION'">
                
                <div class="champ-challenge-large" v-for="id in challenge.ids">
                    <img :src="getChampImage(id)" alt="">
                    {{champIds[id.toString()]}}
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NProgress } from 'naive-ui'
import {onMounted, ref} from 'vue'
import { champIds } from '../assets/champsIds'
import { ChallengeRender, getChallengeImg, getChallengeName, getChallengeText, getThreshholdText, calculatePercentage, getGamemodes, getChallengeTextLarge, getChampImage } from '../composables/challengesRender' 
const props = defineProps<{challenge:ChallengeRender.Challenge}>()
const challenge = props.challenge

const id = challenge.id

let percentage = ref(0)



onMounted(()=>{
    calculatePercentage(percentage, challenge)
})
</script>

<style>

</style>