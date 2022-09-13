

export interface TotalPoints {
    level: string;
    current: number;
    max: number;
    percentile: number;
}

export interface CATEGORY {
    level: string;
    current: number;
    max: number;
    percentile: number;
}

export interface CategoryPoints {
    VETERANCY: CATEGORY;
    TEAMWORK: CATEGORY;
    IMAGINATION: CATEGORY;
    EXPERTISE: CATEGORY;
    COLLECTION: CATEGORY;
}

export interface Challenge {
    challengeId: number;
    percentile: number;
    level: string;
    value: number;
    achievedTime: any;
    position?: number;
    playersInLevel?: number;
    mainCategory?: string;
    secondaryCategory?:string;
}

export interface Preferences {
    bannerAccent: string;
    title: string;
    challengeIds: number[];
}

export interface Challenges {
    totalPoints: TotalPoints;
    categoryPoints: CategoryPoints;
    challenges: Challenge[];
    preferences: Preferences;
}


export interface Summoner {
    id: string
    accountId: string
    puuid:string
    name:string
    profileIconId:number
    revisionDate:number
    summonerLevel:number
}
export declare module ChallengeConfigs {

    export interface LANG {
        description: string;
        name: string;
        shortDescription: string;
    }
    export interface ChallengeConfigsObject {
        [key:number]: ChallengeConfig

    }
    export interface LocalizedNames {
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

    export interface Thresholds {
        CHALLENGER: number;
        GRANDMASTER: number;
        SILVER: number;
        GOLD: number;
        IRON: number;
        BRONZE: number;
        MASTER: number;
        PLATINUM: number;
        DIAMOND: number;
    } 
    export interface ThresholdReward {
        asset: string;
        category: string;
        name: string;
        quantity: number;
    }

    export interface ThresholdRank {
        rewards: ThresholdReward[];
        value: number;
    }

    export interface ThresholdsVerbose {
        BRONZE?: ThresholdRank;
        DIAMOND?: ThresholdRank;
        GOLD?: ThresholdRank;
        IRON?: ThresholdRank;
        MASTER?: ThresholdRank;
        PLATINUM?: ThresholdRank;
        SILVER?: ThresholdRank;
        CHALLENGER?: ThresholdRank;
        GRANDMASTER?: ThresholdRank;
    }


    export interface ChallengeConfig {
        id: number;
        localizedNames?: LocalizedNames;
        state: string;
        leaderboard: boolean;
        thresholds:  ThresholdsVerbose;
        capstoneGroupId: number;
        capstoneGroupName: string;
        capstoneId: number;
        category: string;
        gameModes: string[];
        hasLeaderboard: boolean;
        isCapstone: boolean;
        parentCapstoneName: string;
        challengeId: number;
        percentile?: number;
        level: string;
        value: number;
        achievedTime: any;
    }

}
export declare module challengesData {
    export interface LANG {
        description: string;
        name: string;
        shortDescription: string;
    }
    export interface LocalizedNames {
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

    export interface Reward {
        asset: string;
        category: string;
        name: string;
        quantity: number;
    }

    export interface RANK {
        rewards: Reward[];
        value: number;
    }

    export interface Thresholds {
        [key: string]: RANK
    }

    export interface Challenge {
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

    export interface CapstoneCategory{
        [key: string]: Challenge[]
    }
    export interface RootObject {
        [key: string]: CapstoneCategory;

    }

}

export interface SortObject{
    
    method: string
    direction: string
}