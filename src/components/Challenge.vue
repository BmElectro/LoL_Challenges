<template>
    <div class="challenge">
        <span class="border-color" :class="challenge.level"></span>
        <div class="challenge-info-container">
            <div class="challenge-info"><span>{{getChallengeName()}}</span><span :class="'level'+challenge.level">{{challenge.level}}</span></div>
            <span class="challenge-text" v-html="getChallengeText()"></span>
            <img :src="getChallengeImg(id, challenge.level)" alt="" srcset="" style="height: 50px; width: 50px;">
            <div class="threshhold-container"><div class="threshold"></div>{{getThreshholdText(challenge.value, challenge.level, id)}}</div>
        </div>
    </div>
</template>

<script setup lang="ts">


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

function getChallengeText(){
    return challenge.localizedNames.en_GB.shortDescription
}
function getChallengeName(){
    return challenge.localizedNames.en_GB.name
}

function getChallengeImg(challengeId:number, level: string){ 
    return `./challenges-images/${challengeId}-${level.toUpperCase()}.png`
}
function getThreshholdText(value: number, level: string, challengeId:number){
        let toReturn = ''
        if(Object.keys(challenge.thresholds).length == 1){
            toReturn = value.toString()
        }else{
            switch (level) {
                case 'Iron':
                    toReturn =  `${value}/${challenge.thresholds['BRONZE']?.value}`
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
</script>

<style>

</style>