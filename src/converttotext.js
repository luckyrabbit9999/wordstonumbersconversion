import { singlesGroup ,teensGroup,tensGroup,thousandsGroup } from "./conversions.js";
import {testNumber} from './helpers.js';

function convertNumbersToText(numString){
    /* split string into an array so they can be tested and updated separately 
    *(e.g. '3 dollars and sixty four cents' only needs the 3 converted)
    *Output would be three dollars and sixty four cents
    */
    var numArray=numString.split(' ');

    /*Loop through array*/
    numArray.forEach(function(val,index){
        /*Check whether the value is a number if so perform the conversion */
        if(testNumber(val)){
            /*Convert string to numbrer*/
            var numValue=parseInt(val);
            /*Convert the nuumber to words*/
            var numString = numberToWords(numValue)
            /*Update the array and replace the number with its corresponding word(s)*/
            numArray[index]=numString
        }
        
    })
    /*Return the value as an updated string*/
    return numArray.join(' ');
}

function numberToWords(num) {
    /*if input is 0 then return zero and stop evaluation*/
    if (num === 0) return "zero";

    let words = "";
    /*Evaluate number until it is fully parsed iterating unit index to detetermine thousands place for each loop*/
    for (let i = 0, unitIndex = 0; num > 0; i++, num = Math.floor(num / 1000)) {
        /*Get remainder after dividing number by 1000*/
        let chunk = num % 1000;

        if (chunk > 0) {
            /*Convert current set to words then a add current group to the from of the return value */
            let chunkWords = convertNum(chunk);
            words = chunkWords + (unitIndex > 0 ? " " + thousandsGroup[unitIndex] + " " : "") + words;
        }
        unitIndex++;
    }

    return words.trim();
}

function convertNum(num) {
    /*Converts groups <1000 to corresponging words to meet the value first checking hundreds then tens then ones place */
    let numWords = "";

    if (num > 99) {
        numWords += singlesGroup[Math.floor(num / 100)] + " hundred ";
        num %= 100;
    }

    if (num > 10 && num < 20) {
        numWords += teensGroup[num - 10] + " ";
    } else {
        numWords += tensGroup[Math.floor(num / 10)] + " ";
        num %= 10;
    }
    numWords += singlesGroup[num] + " ";

    return numWords.trim();
}

export default {convertNumbersToText};

