<template>
    <div class="challenge">
        <span class="border-color" :class="challenge.level"></span>
        <div class="challenge-info-container">
            <div class="challenge-info"><span>{{getChallengeName()}}</span><span :class="'level'+challenge.level">{{challenge.level}}</span></div>
            <span class="challenge-text" v-html="getChallengeText()"></span>
            <div class="secondary-info-container">
                <div class="challenge-img-progress">
                    <n-progress class="challenge-progress" type="circle" :percentage="percentage" gap-position="bottom" :gap-degree="70" :height="100" :rail-color="'#292935'">
                        <img :src="getChallengeImg(id, challenge.level)" alt="" srcset="" style="height: 50px; width: 50px;">
                    </n-progress>
                </div>
                <div class="threshhold-container"><div class="threshold"></div>{{getThreshholdText(challenge.value, challenge.level, id)}}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NProgress } from 'naive-ui'
import {onMounted, ref} from 'vue'
interface LANG {
        description: string;
        name: string;
        shortDescription: string;
}
interface LocalizedNames {
    ar_AE: LANG;
    cs_CZ: LANG;
    de_DE: LANG;
    el_GR: LANG;
    en_AU: LANG;
    en_GB: LANG;
    en_PH: LANG;
    en_SG: LANG;
    en_US: LANG;
    es_AR: LANG;
    es_ES: LANG;
    es_MX: LANG;
    fr_FR: LANG;
    hu_HU: LANG;
    it_IT: LANG;
    ja_JP: LANG;
    ko_KR: LANG;
    pl_PL: LANG;
    pt_BR: LANG;
    ro_RO: LANG;
    ru_RU: LANG;
    th_TH: LANG;
    tr_TR: LANG;
    vi_VN: LANG;
    vn_VN: LANG;
    zh_CN: LANG;
    zh_MY: LANG;
    zh_TW: LANG;
}

interface Reward {
    asset: string;
    category: string;
    name: string;
    quantity: number;
}

interface RANK {
    rewards: Reward[];
    value: number;
}

interface Thresholds {
    [key: string]: RANK
}

interface Challenge {
    id: number;
    state: string;
    leaderboard: boolean;
    thresholds: Thresholds;
    capstoneGroupId: number;
    capstoneGroupName: string;
    capstoneId: number;
    category: string;
    gameModes: string[];
    hasLeaderboard: boolean;
    isCapstone: boolean;
    parentCapstoneName: string;
    name: string;
    percentile?: number;
    level: string;
    value: number;
    achievedTime: any;
    localizedNames: LocalizedNames;
}
const props = defineProps<{challenge:Challenge}>()
const challenge = props.challenge

const id = challenge.id

let percentage = ref(0)
function getChallengeText(){
    return challenge.localizedNames.en_GB.shortDescription
}
function getChallengeName(){
    return challenge.localizedNames.en_GB.name
}

function getChallengeImg(challengeId:number, level: string){
    if(level == 'NONE'){
        return `./challenges-images/${challengeId}-IRON.png`
    }else{
        return `./challenges-images/${challengeId}-${level.toUpperCase()}.png`
    }
}
function getThreshholdText(value: number, level: string, challengeId:number){
        let toReturn = ''
        if(Object.keys(challenge.thresholds).length == 1){
            toReturn =  `${value}/${challenge.thresholds[Object.keys(challenge.thresholds)[0]]?.value}`
        }else{
            switch (level) {
                case 'IRON':
                    toReturn =  `${value}/${challenge.thresholds['BRONZE']?.value}`
                    if(toReturn == '' || toReturn.includes('undefined')){
                        let availableRanks = ['SILVER','GOLD','PLATINUM','DIAMOND','MASTER','GRANDMASTER','CHALLENGER']
                        let currentIndex = 0
                        while((toReturn == '' || toReturn.includes('undefined')) && currentIndex <= 6){
                            toReturn =  `${value}/${challenge.thresholds[availableRanks[currentIndex]]?.value}`
                            currentIndex++
                        }
                    }
                    break
                case 'BRONZE':
                    toReturn =  `${value}/${challenge.thresholds['SILVER']?.value}`
                    break
                case 'SILVER':
                    toReturn =  `${value}/${challenge.thresholds['GOLD']?.value}`
                    break
                case 'GOLD':
                    toReturn =  `${value}/${challenge.thresholds['PLATINUM']?.value}`
                    break
                case 'PLATINUM':
                    toReturn =  `${value}/${challenge.thresholds['DIAMOND']?.value}`
                    break
                case 'DIAMOND':
                    toReturn =  `${value}/${challenge.thresholds['MASTER']?.value}`
                    break
                case 'MASTER':
                    toReturn =  `${value}/${challenge.thresholds['GRANDMASTER']?.value}`
                    break
                case 'GRANDMASTER':
                    toReturn =  `${value}/${challenge.thresholds['CHALLENGER']?.value}`
                    break
                case 'CHALLENGER':
                    toReturn =  `${value}/${challenge.thresholds['CHALLENGER']?.value}`
                    break
                default:
                    break;
            }
        }
        if(toReturn == '' || toReturn.includes('undefined')){
            return value.toString()
        }else{
            return toReturn
        }
}
onMounted(()=>{
    const [part, full] = getThreshholdText(challenge.value, challenge.level, id).split('/')
    let calculatedPercentage = Math.round((parseFloat(part)/parseFloat(full))*100)
    if(calculatedPercentage > 100 || calculatedPercentage == NaN){
        percentage.value = 100
    }else{
        percentage.value = calculatedPercentage
    }
})
</script>

<style>

</style>