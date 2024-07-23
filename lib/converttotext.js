"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _conversions = require("./conversions.js");
var _helpers = require("./helpers.js");
function convertNumbersToText(numString) {
  /* split string into an array so they can be tested and updated separately 
  *(e.g. '3 dollars and sixty four cents' only needs the 3 converted)
  *Output would be three dollars and sixty four cents
  */
  var numArray = numString.split(' ');

  /*Loop through array*/
  numArray.forEach(function (val, index) {
    /*Check whether the value is a number if so perform the conversion */
    if ((0, _helpers.testNumber)(val)) {
      /*Convert string to numbrer*/
      var numValue = parseInt(val);
      /*Convert the nuumber to words*/
      var numString = numberToWords(numValue);
      /*Update the array and replace the number with its corresponding word(s)*/
      numArray[index] = numString;
    }
  });
  /*Return the value as an updated string*/
  return numArray.join(' ');
}
function numberToWords(num) {
  /*if input is 0 then return zero and stop evaluation*/
  if (num === 0) return "zero";
  var words = "";
  /*Evaluate number until it is fully parsed iterating unit index to detetermine thousands place for each loop*/
  for (var i = 0, unitIndex = 0; num > 0; i++, num = Math.floor(num / 1000)) {
    /*Get remainder after dividing number by 1000*/
    var chunk = num % 1000;
    if (chunk > 0) {
      /*Convert current set to words then a add current group to the from of the return value */
      var chunkWords = convertNum(chunk);
      words = chunkWords + (unitIndex > 0 ? " " + _conversions.thousandsGroup[unitIndex] + " " : "") + words;
    }
    unitIndex++;
  }
  return words.trim();
}
function convertNum(num) {
  /*Converts groups <1000 to corresponging words to meet the value first checking hundreds then tens then ones place */
  var numWords = "";
  if (num > 99) {
    numWords += _conversions.singlesGroup[Math.floor(num / 100)] + " hundred ";
    num %= 100;
  }
  if (num > 10 && num < 20) {
    numWords += _conversions.teensGroup[num - 10] + " ";
  } else {
    numWords += _conversions.tensGroup[Math.floor(num / 10)] + " ";
    num %= 10;
  }
  numWords += _conversions.singlesGroup[num] + " ";
  return numWords.trim();
}
var _default = exports["default"] = {
  convertNumbersToText: convertNumbersToText
};