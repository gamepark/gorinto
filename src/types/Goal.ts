import {TFunction} from 'i18next'

type Goal = {
    image : string;
    hint? : (t:TFunction) => string;
    text : (t:TFunction) => string;
    conflictLetter : string;
}

export default Goal