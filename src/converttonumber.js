
import {keyWordCheck,cleanString,wordReplacement,removeInvalidWords,currencyChangeReplacement} from './helpers.js';
import { wordNumbers,mulipliers,scales,moneyText,dollarReplacement,centReplacement,validWords,scalesByTens,conjuctions } from "./conversions.js";
import convertText from './converttotext.js';

function convertNumber(input,optionals=[]){
    /*Normalize string with all lower case */
    input = input.toLowerCase().trim();
    var hasMultiplier=false;
    
    /* remove special characters from the string so parsing is easier*/
    input=cleanString(input).trim();

    var changeReplacement=currencyChangeReplacement(input);

    input=changeReplacement.input.trim();
    var impliedDecimal=changeReplacement.impliedDecimal;

    /* Convert string to array for testing*/
    var testParseText = input.split(' ');
    
    
    if(keyWordCheck(input,moneyText)){
        input=wordReplacement(input,dollarReplacement,'point').trim();
        if (keyWordCheck(input,centReplacement)){
            input = wordReplacement(input,centReplacement,'').trim();
            impliedDecimal=true;
        }
        if (input.includes('point')){
            input=wordReplacement(input,conjuctions,' ');
        }else{
            input=wordReplacement(input,conjuctions,' point ');
        }
        
        input=convertText.convertNumbersToText(input).trim();
    }else if (keyWordCheck(input,conjuctions) && (input.includes('point') || !impliedDecimal)){
        input=wordReplacement(input,conjuctions,' ');
        input=convertText.convertNumbersToText(input).trim();
    }else if (keyWordCheck(input,conjuctions) && impliedDecimal){
        input=wordReplacement(input,conjuctions,' point ');
        input=convertText.convertNumbersToText(input).trim();
    }else{
        input=convertText.convertNumbersToText(input).trim();
    }
    
    input=removeInvalidWords(input,validWords).trim();

    /*Parse final cleaned up string*/
    var parsedText = input.split(' ');

    /*Remove and empty strings from the final result*/
    parsedText = parsedText.filter(item => item !== '');

    if (parsedText.includes('point')){
        /*Functionality to properly parse decimal values*/
        var pointTotal =  pointConversion(parsedText,impliedDecimal)

        var total=pointTotal.total;
        hasMultiplier=pointTotal.hasMultiplier;
    }else{
        /*Convert non decimal values*/
        var numText=[]
        parsedText.forEach(word =>{
            numText.push(wordNumbers[word])
        })

        /*Test whether we are using multipliers (e.g. hundreds or thousands) vs concatentating words (e.g. three fifty => 350)*/
        if (keyWordCheck(input,mulipliers)){  
            /*Reverse the arry so numbers can be added smallest to largest */
            var numTextReverse=numText.reverse();
            var total = parseMultipliers(numTextReverse);
            hasMultiplier=true;
        }else{
            var total =  parseNonMultipliers(numText,false);
        }
    }

    if (impliedDecimal){
        total=parseFloat(total.toFixed(2));
    }

    /*if optional parameters were incldued then check them here*/
    if (optionals.length>0){
        optionals.forEach(opt=>{
            switch (opt.option){
                case 'ExpectedRange':
                    var expectedValues=opt.value
                    let {min,max}=opt.value
                    if(total<min || total>max){

                        /*Value was outside of the expected results, need to determine by how much and perform some basic checks*/
                        var delta = Math.min(Math.abs(total - min), Math.abs(total - max));
                        
                        if (hasMultiplier){
                            var multipliersUsed=[];
                            parsedText.forEach(word=>{

                                if (mulipliers.includes(word)){
                                    multipliersUsed.push(wordNumbers[word]);
                                }
                            })
                            
                            var maxMultiplier=Math.max(...multipliersUsed);
                            /*Easy check to see if the maximum multiplier is already bigger than the max expected, if so contiue with high confidence*/
                            if (maxMultiplier>max){
                                break;
                            }

                            /*Check to see numbers to the left of the maximum multiplier times the multiplier are outside of maximum expected range, if so, continue*/
                            var maxMultiplierWord = Object.entries(wordNumbers).find(([key, val]) => val === maxMultiplier);
                            var maxMultiplierIndex=parsedText.indexOf(maxMultiplierWord[0])
                            var multiplierArray=parsedText.slice(0, maxMultiplierIndex);
                            var multiplierNumText=[]
                            multiplierArray.forEach(word =>{
                                multiplierNumText.push(wordNumbers[word])
                            })

                            if (keyWordCheck(multiplierArray.join(' '),mulipliers)){
                                var multiplierArrayReverse=multiplierNumText.reverse();
                                var multiplierArraytotal = parseMultipliers(multiplierArrayReverse);
                            }else{
                                var multiplierArraytotal =  parseNonMultipliers(multiplierNumText,false);
                            }   

                            multiplierArraytotal*=maxMultiplier

                            if (multiplierArraytotal>max){
                                break;
                            }

                        }
                        /*No multipliers found or the math didnt tell us the calculated value was likely right so lets do some more checks*/

                        /* Number is already a float, dont try to divide more lets leave and return the previously calculated total*/
                        if (typeof total === 'number' && total % 1 !== 0){
                            break;
                        }else{
                            /* Try treating the total as a decimal and divide by 100 to see if that gets us within the appropriate range */
                            var newTotal=total/100;
                            if (newTotal>min && newTotal<max){
                                total=newTotal
                            }
                        }
                    }
                    break;
                default:
                    break;
            }   

        })
    }


    return total
}



function pointConversion(parsedResponse,impliedDecimal){
    var hasMultiplier=false;
    /*find where the word point is then split the input into 2 arrays*/
    const pointIndex=parsedResponse.indexOf('point')
    const wholeNumbersArray=parsedResponse.slice(0, pointIndex);
    const decimalArray=parsedResponse.slice(pointIndex+1);

    /*Merge newly created arrays into string to check for multipliers*/
    var wholeNumbersArrayString = wholeNumbersArray.join(' ');
    var decimalArrayString = decimalArray.join(' ');

    var wholeNumberTotal=0.0;
    var decimalTotal=0.0;
    /*Check if we have whole numbers in our array and if so begin conversion*/
    if(wholeNumbersArray.length>0){
        /*Convert text to an array of numbers */
        var wholeNumbersText=[]
        wholeNumbersArray.forEach(word =>{
        wholeNumbersText.push(wordNumbers[word])
        })

        /*Test whether we are using multipliers (e.g. hundreds or thousands) vs concatentating words (e.g. three fifty => 350)*/
        if (keyWordCheck(wholeNumbersArrayString,mulipliers)){  
            var wholeNumbersTextReverse=wholeNumbersText.reverse();
            wholeNumberTotal = parseMultipliers(wholeNumbersTextReverse);
            hasMultiplier=true
        }else{
            wholeNumberTotal =  parseNonMultipliers(wholeNumbersText,false);
        
        }
    }    

    var performDecimalCalc=true;
    /*Check if we have decimals in our array and if so begin conversion*/
    if (decimalArrayString.length>0){
        /*Convert text to an array of numbers */
        var decimalNumText=[]
        decimalArray.forEach(word =>{
            decimalNumText.push(wordNumbers[word])
        })

        /*Test whether we are using multipliers (e.g. hundreds or thousands) vs concatentating words (e.g. three fifty => 350)*/
        if (keyWordCheck(decimalArrayString,mulipliers)){  
            var decimalNumTextReverse=decimalNumText.reverse();
            decimalTotal = parseMultipliers(decimalNumTextReverse);
            hasMultiplier=true
        }else{
            decimalTotal =  parseNonMultipliers(decimalNumText,true,impliedDecimal);
            performDecimalCalc=false;
        }   
    }
 
    /* Combine results */
    if(performDecimalCalc){
        var decimalAdd=0.0;
        var decimalLength=  Math.floor(Math.log10(decimalTotal)) + 1;
        const orderOfMagnitude = Math.pow(10, decimalLength);
        if ((decimalTotal/orderOfMagnitude)>0){
            decimalAdd=decimalTotal/orderOfMagnitude
        }
    }else{
        decimalAdd=decimalTotal;
    }
    
    var pointTotal= wholeNumberTotal+decimalAdd
    
    var result ={'total':pointTotal, 'hasMultiplier':hasMultiplier}

    return result;
}

function parseNonMultipliers(numericResponse,isDecimal,impliedDecimal){

    isDecimal=isDecimal==null?false:isDecimal;

    /*This function simply concatenates the values in the order they are presented e.g. three fifty becomes 350*/
    var previousValue=0;
    var currString = ''
    var totalString=''
    numericResponse.forEach(number =>{     
        /*If the number is a multiple of 10 then convert the string and add the number then convert the result back to a string else append the number to the end of the string */ 
        if (scalesByTens.includes(parseFloat(previousValue))  && !scalesByTens.includes(parseFloat(number))){
            var thisVal = parseFloat(totalString)+number
            totalString=thisVal.toString();
            currString=number.toString();
        }
        else{
            currString=number.toString();
            totalString+=currString
        }
       previousValue=currString;
    });


    var result=parseFloat(totalString)
    if(impliedDecimal && totalString.length<=2){
        result=result/100;
    }else if (isDecimal){
        var decimalLength= totalString.length;
        var divisor = Math.pow(10, decimalLength);
        result=result/divisor;
    }

    return result
}

function parseMultipliers(numsArray){
    var maxMultiplier=1
    var currMultiplier=1
    var currSet = 0
    var currSecondSet=0
    var total=0


/*Test stuff here */
    var digitsSinceMultiplier=0
    var floatTotal=0.0
/*End Test stuff */
    
     /* Var digits since multiplier = 0 
    if digits since multiplier>=2 then we need to re-evaluate the string and treat this as a decimal
    */
    numsArray.forEach(function (num,i){
        /*If this number is a multiplier or we have reached the end of the array then we need to perform calculations from our current set of numbers and add them to the total */
        if(scales.includes(num)|| i==numsArray.length-1){
            /*Test if this is the end of the array */    
            var numAdded=false
            if(i==numsArray.length-1 && num<maxMultiplier){
                currSet+=num
                numAdded=true;
            }
            
            /*Test if new max multiplier or end of array*/
            if(num>maxMultiplier || i==numsArray.length-1){
                currSet*=currMultiplier
                /*If new max multiplier then multiply the total by the previous max multiplier else add the sets together*/
                if (currMultiplier<maxMultiplier){
                    total+=((currSecondSet+currSet)*maxMultiplier)
                // }else if (i==numsArray.length-1){
                //     total+=num;
                }else{
                    total+=((currSecondSet+currSet))
                }

                if (!numAdded && i==numsArray.length-1 ){
                    total+=num;
                }

                /*Set variables for next loop*/
                maxMultiplier=num;
                currMultiplier=num;
                currSet=0
                currSecondSet=0
            }else if (num<maxMultiplier){
                /*If the current multiplier is < the max then update the current multiplier and move current set to second set and reset current set
                * this is used to handle transitions between hundred and larger multipliers to ensure we are only multiplying by 100 those numbers in the hundreds place
                */
                currMultiplier=num;
                currSecondSet=currSet
                currSet=0;
            }
            digitsSinceMultiplier=0;
        }else{
            /*Not a multiplier so just add the number to our current set and continue*/
            if (digitsSinceMultiplier<2){
                currSet+=num;
            }else{
                var floatDivisor = currSet.toString().length;
                var divisor = Math.pow(10, floatDivisor);
                floatTotal=(currSet/divisor);
                currSet=num;
                digitsSinceMultiplier=0;
            }

            
/*Test stuff here */
            digitsSinceMultiplier++;
/*END Test stuff*/
        }
    })
    total+=floatTotal;

    return total
}

export default {convertNumber};