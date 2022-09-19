import { sort, inPlaceSort, ISortByObjectSorter  } from 'fast-sort'
import { SortObject, challengesData } from '../assets/types'
import {ref} from 'vue'


const sortOptions = [
    {
      label: 'Name Ascending',
      value: 'name ascending'
    },
    {
      label:'Name Descending',
      value: 'name descending'
    },
    {
        label:'Rank Descending',
        value:'rank descending'
    },
    {
      label:'Rank Ascending',
      value:'rank ascending'
    }
  ]
let sortObject = ref('rank descending')



function sortAllChallengesToName(value:challengesData.CapstoneCategory, direction:string){
    let newChallengesValue:challengesData.CapstoneCategory = {}
    if(direction == 'ascending'){
      for(let [key, _value] of Object.entries(value)){
        newChallengesValue[key] = sort(Object.values(_value)).by([{asc: e => e['name' as keyof typeof e]}])
      }
    }else{
      for(let [key, _value] of Object.entries(value)){
        newChallengesValue[key] = sort(Object.values(_value)).by([{desc: e => e['name' as keyof typeof e]}])
      }
    }
    return newChallengesValue
}
function sortAllChallengesToRank(value:challengesData.CapstoneCategory ,direction:string){
  let newChallengesValue:challengesData.CapstoneCategory = {}
  for(let [key, _value] of Object.entries(value)){
    let challengesSortObject:{[key:string]: challengesData.Challenge[]} = {NONE:[],IRON:[],BRONZE:[],SILVER:[],GOLD:[],PLATINUM:[],DIAMOND:[],MASTER:[],GRANDMASTER:[],CHALLENGER:[]}
    for(let challenge of _value){
      challengesSortObject[challenge.level].push(challenge)
    }
    let tempChallengesArray:challengesData.Challenge[] = []
    for (let [rank, challengeArray] of Object.entries(challengesSortObject)){
      tempChallengesArray = [...tempChallengesArray, ...challengeArray]
    }
    if(direction == 'ascending'){
        newChallengesValue[key] = tempChallengesArray
    }else{
        newChallengesValue[key] = tempChallengesArray.reverse()
    }
  }
  return newChallengesValue
}

function sortChallengesAll(challenges:challengesData.RootObject){
    let [method, direction] = sortObject.value.split(' ') 
    let objectToRender:challengesData.CapstoneCategory = {}
    for(const [key, value] of Object.entries(challenges)){
      if(method == 'name'){
        let sortedChallenges = sortAllChallengesToName(value, direction)
        objectToRender = {...objectToRender, ...sortedChallenges}
      }else if(method == 'rank'){
        let sortedChallenges = sortAllChallengesToRank(value, direction)
        objectToRender = {...objectToRender, ...sortedChallenges}
      }else{
        objectToRender = {...objectToRender, ...value}
      }
    }
    return objectToRender
}


function sortChallengesSingleCategory(category:challengesData.CapstoneCategory){
  let [method, direction] = sortObject.value.split(' ')
  let objectToRender:challengesData.CapstoneCategory = {}
 
  if(method == 'name'){
    let sortedChallenges = sortAllChallengesToName(category, direction)
    objectToRender = sortedChallenges
  }else if(method == 'rank'){
    let sortedChallenges = sortAllChallengesToRank(category, direction)
    objectToRender = sortedChallenges
  }else{
    objectToRender = category
  }
  return objectToRender
}

export {sortObject, sortChallengesAll, sortOptions, sortChallengesSingleCategory}