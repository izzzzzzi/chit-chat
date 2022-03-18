export const API_BASE_LOGIN_URL = 'http://localhost:8080';
export const API_BASE_USER_URL = 'http://localhost:8081';
export const ACCESS_TOKEN = 'accessToken';
export const USER = 'user';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth/redirect'

export const GOOGLE_AUTH_URL = API_BASE_LOGIN_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_LOGIN_URL + '/oauth2/authorization/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const ENNEAGRAM_TYPE = [
    'i don\'t know you',
    '1w2', '2w1', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6',
    '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1', '1w9'
]
export const MBTI_TYPE = [
    'i don\'t know you',
    'ISTJ', 'ISFJ', 'ISFP', 'ISTP', 'INFJ', 'INTP', 'INTJ', 'INFP',
    'ESFP', 'ESTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENFP', 'ENTP', 'ENTJ'
]

export const ENNEAGRAM_TO_REQUEST_ENUM = {
    'i don\'t know you' : 'CANCEL_ENNEAGRAM_VOTE',
    '1w9' : 'ONE_WING_NONE',
    '1w2' : 'ONE_WING_TWO',
    '2w1' : 'TWO_WING_ONE',
    '2w3' : 'TWO_WING_THREE',
    '3w2' : 'THREE_WING_TWO',
    '3w4' : 'THREE_WING_FOUR',
    '4w3' : 'FOUR_WING_THREE',
    '4w5' : 'FOUR_WING_FIVE',
    '5w4' : 'FIVE_WING_FOUR',
    '5w6' : 'FIVE_WING_SIX',
    '6w5' : 'SIX_WING_FIVE',
    '6w7' : 'SIX_WING_SEVEN',
    '7w6' : 'SEVEN_WING_SIX',
    '7w8' : 'SEVEN_WING_EIGHT',
    '8w7' : 'EIGHT_WING_SEVEN',
    '8w9' : 'EIGHT_WING_NINE',
    '9w8' : 'NINE_WING_EIGHT',
    '9w1' : 'NINE_WING_ONE'
}

export const RESPONSE_ENNEAGRAM_TO_ENNEAGRAM = {
    'i don\'t know you' : 'CANCEL_ENNEAGRAM_VOTE',
    'ONE_WING_NONE' : '1w9',
    'ONE_WING_TWO' : '1w2',
    'TWO_WING_ONE' : '2w1',
    'TWO_WING_THREE' : '2w3',
    'THREE_WING_TWO' : '3w2',
    'THREE_WING_FOUR' : '3w4',
    'FOUR_WING_THREE' : '4w3',
    'FOUR_WING_FIVE' : '4w5',
    'FIVE_WING_FOUR' : '5w4',
    'FIVE_WING_SIX' : '5w6',
    'SIX_WING_FIVE' : '6w5',
    'SIX_WING_SEVEN' : '6w7',
    'SEVEN_WING_SIX' : '7w6',
    'SEVEN_WING_EIGHT' : '7w8',
    'EIGHT_WING_SEVEN' : '8w7',
    'EIGHT_WING_NINE' : '8w9',
    'NINE_WING_EIGHT' : '9w8',
    'NINE_WING_ONE' : '9w1'
};

export const MBTI_TO_REQUEST_ENUM = {
    'i don\'t know you' : 'CANCEL_MBTI_VOTE',
    'ISTJ' : 'ISTJ',
    'ISFJ' : 'ISFJ',
    'ISFP' : 'ISFP',
    'ISTP' : 'ISTP',
    'INFJ' : 'INFJ',
    'INTP' : 'INTP',
    'INTJ' : 'INTJ',
    'INFP' : 'INFP',
    'ESFP' : 'ESFP',
    'ESTP' : 'ESTP',
    'ESTJ' : 'ESTJ',
    'ESFJ' : 'ESFJ',
    'ENFJ' : 'ENFJ',
    'ENFP' : 'ENFP',
    'ENTP' : 'ENTP',
    'ENTJ' : 'ENTJ'
};

export const RESPONSE_MBTI_TO_MBTI = {
    'CANCEL_MBTI_VOTE' : 'i don\'t know you',
    'ISTJ' : 'ISTJ',
    'ISFJ' : 'ISFJ',
    'ISFP' : 'ISFP',
    'ISTP' : 'ISTP',
    'INFJ' : 'INFJ',
    'INTP' : 'INTP',
    'INTJ' : 'INTJ',
    'INFP' : 'INFP',
    'ESFP' : 'ESFP',
    'ESTP' : 'ESTP',
    'ESTJ' : 'ESTJ',
    'ESFJ' : 'ESFJ',
    'ENFJ' : 'ENFJ',
    'ENFP' : 'ENFP',
    'ENTP' : 'ENTP',
    'ENTJ' : 'ENTJ'
};

export const MBTI_ID = "0";
export const ENNEAGRAM_ID = "1";

export const JOIN = "Join";
export const CANCEL = "Cancel";
export const WAIT = "wait";