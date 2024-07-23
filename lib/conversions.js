"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordNumbers = exports.validWords = exports.thousandsGroup = exports.tensGroup = exports.teensGroup = exports.singlesGroup = exports.scalesByTens = exports.scales = exports.mulipliers = exports.moneyWordsReplacement = exports.moneyText = exports.dollarReplacement = exports["default"] = exports.conjuctions = exports.centsWords = exports.centReplacement = exports.badChars = void 0;
var wordNumbers = exports.wordNumbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
  thousand: 1000,
  million: 1000000,
  billion: 1000000000
};
var mulipliers = exports.mulipliers = ['hundred', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];
var scales = exports.scales = [100, 1000, 1000000, 1000000000, 1000000000000, 1000000000000000];
var singlesGroup = exports.singlesGroup = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var teensGroup = exports.teensGroup = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
var tensGroup = exports.tensGroup = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
var thousandsGroup = exports.thousandsGroup = ["", "thousand", "million", "billion", 'trillion', 'quadrillion'];
var scalesByTens = exports.scalesByTens = [20, 30, 40, 50, 60, 70, 80, 90];
var moneyText = exports.moneyText = ['dollars', 'dollar', 'bucks', 'buck', 'cents', 'cent', 'pennies', 'penny', 'greenbacks', 'quid'];
var conjuctions = exports.conjuctions = ['and', 'with'];
/*Not used currently*/
var badChars = exports.badChars = [',', '.', '$', '-', '&', '%', '#', '@', '!'];
var moneyWordsReplacement = exports.moneyWordsReplacement = {
  quarter: 'twenty five',
  dime: 'ten',
  nickel: 'five',
  grand: 'thousand',
  o: 'zero',
  oh: 'zero',
  Nought: 'zero',
  Zilch: 'zero',
  Nil: 'zero'
};
var centsWords = exports.centsWords = ['quarter', 'dime', 'nickel'];
var dollarReplacement = exports.dollarReplacement = ['dollars', 'dollar', 'bucks', 'buck', 'greenbacks', 'quid'];
var centReplacement = exports.centReplacement = ['cents', 'cent', 'pennies', 'penny'];
var validWords = exports.validWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'point'];
var _default = exports["default"] = {
  mulipliers: mulipliers,
  wordNumbers: wordNumbers,
  scales: scales,
  singlesGroup: singlesGroup,
  teensGroup: teensGroup,
  tensGroup: tensGroup,
  thousandsGroup: thousandsGroup,
  moneyText: moneyText
};