Package to convert words to numbers or numbers to words

convertToText(64)  // sixty four

convertToNumber(three thousand six hundred ninety dollars and seventy five cents) //3690.75



#1.01 
**updated to pass along optional parameter to allow hints for the output
    currently the only option is ExpectedRange to pass in a min and max value (both are required if this is used)
**minor bug fix to address decimals that may not be implicit

twenty three ninety nine could be 23.99 or 2399 passing in an optional parameter setting min and max values will help to alleviate some confusion in the output
convertToNumber ('twenty three ninety nine') //2399
convertToNumber ('twenty three ninety nine',[{"option": "ExpectedRange","value": {"min": 10,"max": 500}}]) //23.99