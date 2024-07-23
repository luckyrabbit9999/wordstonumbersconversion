import{moneyWordsReplacement,centsWords} from "./conversions.js";

export function keyWordCheck(text, keywords) {
    // Create a regex pattern to match any of the keywords
    const pattern = new RegExp(keywords.join('|'), 'i'); // 'i' flag for case-insensitive matching
    // Check if the text contains any of the keywords
    var result = pattern.test(text);

    return result;
  }


export function cleanString(str) {
  /*Define characters to remove from the string */
  var charactersToRemove = ",.$-";
  // Create a regex pattern from the charactersToRemove
  var pattern = new RegExp(`[${charactersToRemove}]`, 'g');
  /**Perform character replacement based on regex pattern */
  str=str.replace(pattern, ' ');

  /*Perform operation again with a different set of characters to clean up */
  charactersToRemove='&%#@!';
  pattern = new RegExp(`[${charactersToRemove}]`, 'g');
  str=str.replace(pattern, ' ');

  return str;
}

export function testNumber(numString) {
  // Trim the string to remove any leading/trailing whitespace
  numString = numString.trim();
  // Check if the string is not empty and is not NaN when converted to a number
  var result=!isNaN(numString) && numString !== '';

  return result;
}

export function wordReplacement(input,wordArray,replaceWith){
  /*Pass in string value and an array of words that should be replaced, replce with is a single value so all words that match would update the the new word*/
  if(replaceWith==null|| replaceWith==''){
    replaceWith=' ';
  };
  const pattern = new RegExp(`\\b(${wordArray.join('|')})\\b`, 'gi');
  input = input.replace(pattern, replaceWith);
  return input;
}

export function removeInvalidWords(input,wordsToKeep){
  /*Filter text to remove any word that isn't already predefined as a word necessary for the number evaluation*/
  var parsedInput = input.split(' ');
  var filteredInput = parsedInput.filter(word => wordsToKeep.includes(word.toLowerCase()));
  var returnVal = filteredInput.join(' ');
  return returnVal;
}

export function currencyChangeReplacement(input){
  /*replace common synonyms with their appropriate values such as quarter gets updated to twenty five*/
  var impliedDecimal=false;

  centsWords.forEach(word=>{
    const pattern = new RegExp(`\\b${word}\\b`, 'g');
    if (pattern.test(input)){
      impliedDecimal=true;
    }
    
  })

  for (var word in moneyWordsReplacement){

    if (moneyWordsReplacement.hasOwnProperty(word)) {
      const pattern = new RegExp(`\\b${word}\\b`, 'g');
      input = input.replace(pattern, moneyWordsReplacement[word]);
    }
  }
  var returnVal={'input':input,'impliedDecimal':impliedDecimal}

  return returnVal;
}

export default {keyWordCheck,cleanString,testNumber}

