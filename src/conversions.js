export const wordNumbers = {
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

export const mulipliers = ['hundred', 'thousand', 'million', 'billion','trillion','quadrillion'];
export const scales=[100,1000,1000000,1000000000,1000000000000,1000000000000000];
export const singlesGroup  = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
export const teensGroup = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
export const tensGroup = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
export const thousandsGroup = ["", "thousand", "million", "billion",'trillion','quadrillion'];
export const scalesByTens=[20,30,40,50,60,70,80,90];
export const moneyText=['dollars','dollar','bucks','buck','cents','cent','pennies','penny','greenbacks','quid'];
export const conjuctions=['and','with'];
/*Not used currently*/ export const badChars=[',','.','$','-','&','%','#','@','!']; 
export const moneyWordsReplacement={quarter:'twenty five',dime:'ten', nickel:'five',grand:'thousand',o:'zero',oh:'zero',Nought:'zero',Zilch:'zero',Nil:'zero'};
export const centsWords=['quarter','dime','nickel'];
export const dollarReplacement=['dollars','dollar','bucks','buck','greenbacks','quid'];
export const centReplacement=['cents','cent','pennies','penny'];
export const validWords=[
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
    'hundred',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'point'
];

export default {mulipliers,wordNumbers,scales,singlesGroup ,teensGroup,tensGroup,thousandsGroup,moneyText}
