<template>


    <div class="challenge" :id="challenge.id.toString()" @click="showModal = true">
        <span class="border-color" :class="challenge.level"></span>
        <div class="challenge-info-container">
            <div class="challenge-info"><span>{{getChallengeName(challenge)}}</span><span :class="'level'+challenge.level">{{challenge.level}}</span></div>
            <span class="challenge-text" v-html="getChallengeText(challenge)"></span>
            <div class="secondary-info-container">
                <div class="challenge-img-progress">
                    <n-progress class="challenge-progress" type="circle" :percentage="percentage" gap-position="bottom" :gap-degree="70" :height="100" :rail-color="'#292935'">
                        <img :src="getChallengeImg(id, challenge.level)" alt="" srcset="" style="height: 50px; width: 50px;">
                    </n-progress>
                </div>
                <div class="threshhold-container"><div class="threshold"></div>{{getThreshholdText(challenge.value, challenge.level, challenge)}}</div>
            </div>
        </div>
    </div>

    <n-modal v-model:show="showModal">
        <ChallengeLarge :challenge="challenge"/>
    </n-modal>

</template>

<script setup lang="ts">
import ChallengeLarge  from './ChallengeLarge.vue'
import { NProgress,NModal } from 'naive-ui'
import {onMounted, ref} from 'vue'
import { ChallengeRender, getChallengeImg, getChallengeName, getChallengeText, getThreshholdText, calculatePercentage } from '../composables/challengesRender' 
const props = defineProps<{challenge:ChallengeRender.Challenge}>()
const challenge = props.challenge

const id = challenge.id

let percentage = ref(0)
let showModal = ref(false)
let showLarge = ref(false)

onMounted(()=>{
    setTimeout(() => {calculatePercentage(percentage, challenge) }, 200);

})
</script>

<style>

</style>