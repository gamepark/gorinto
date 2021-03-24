import {TFunction} from 'i18next'

type Goal = {
  hint?: (t: TFunction) => string;
  text: (t: TFunction) => string;
  conflictLetter?: 'A' | 'B' | 'C' | 'D';
}

export default Goal