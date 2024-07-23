import numConversion from'./converttonumber.js';
import textConversion from './converttotext.js';


export function convertToNumber (text,optionals) {
    return numConversion.convertNumber(text,optionals);
}

export function convertToText (text) {
    return textConversion.convertNumbersToText(text);
}
  
export default {convertToNumber,convertToText};
