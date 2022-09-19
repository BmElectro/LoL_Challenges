import {Ref} from 'vue'
import { champIds } from '../assets/champsIds'
export declare namespace ChallengeRender{
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
idListType: string,
ids: number[]
}
}


export function getChallengeText(challenge:ChallengeRender.Challenge){
    return challenge.localizedNames.en_GB.shortDescription
}
export function getChallengeName(challenge:ChallengeRender.Challenge){
    return challenge.localizedNames.en_GB.name
}

export function getChallengeImg(challengeId:number, level: string){
    if(level == 'NONE'){
        return `./challenges-images/${challengeId}-IRON.png`
    }else{
        return `./challenges-images/${challengeId}-${level.toUpperCase()}.png`
    }
}
export function getThreshholdText(value: number, level: string, challenge:ChallengeRender.Challenge){
        let toReturn = ''
        if(Object.keys(challenge.thresholds).length == 1){
            toReturn =  `${value}/${challenge.thresholds[Object.keys(challenge.thresholds)[0]]?.value}`
        }else{
            switch (level) {
                case 'NONE':
                    toReturn =  `${value}/${challenge.thresholds['IRON']?.value}`
                    if(toReturn == '' || toReturn.includes('undefined')){
                        let availableRanks = ['SILVER','GOLD','PLATINUM','DIAMOND','MASTER','GRANDMASTER','CHALLENGER']
                        let currentIndex = 0
                        while((toReturn == '' || toReturn.includes('undefined')) && currentIndex <= 6){
                            toReturn =  `${value}/${challenge.thresholds[availableRanks[currentIndex]]?.value}`
                            currentIndex++
                        }
                    }
                    break
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

export function calculatePercentage(percentage:Ref<number>, challenge:ChallengeRender.Challenge){
    const [part, full] = getThreshholdText(challenge.value, challenge.level, challenge).split('/')
    let calculatedPercentage = Math.round((parseFloat(part)/parseFloat(full))*100)
    if(calculatedPercentage > 100 || calculatedPercentage == NaN){
        percentage.value = 100
    }else{
        percentage.value = calculatedPercentage
    }
}


export function getGamemodes( challenge:ChallengeRender.Challenge){
    
    if(challenge.gameModes){
        let tempGameMode = challenge.gameModes[0]
        if(tempGameMode && tempGameMode == 'CLASSIC'){
            return 'Summoners Rift'
        }else if(tempGameMode && tempGameMode == 'ARAM'){
            return 'ARAM'
        }else{
            return 'NONE'
        }
    }else{
        console.log(challenge)
    }

}

export function getChallengeTextLarge(challenge:ChallengeRender.Challenge){
    return challenge.localizedNames.en_GB.description
}
export function getChampImage(id:number){
    return './champ_images/' + champIds[id.toString()] + '.png'
}