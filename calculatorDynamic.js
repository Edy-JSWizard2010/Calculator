function getHistory() {
    return document.getElementById("History Value").innerHTML;
}

function printHistory(num){
    document.getElementById("History Value").innerHTML=num;
}

function getOutput() {
    return document.getElementById("Output Value").innerHTML;
}

function printOutput(num){
    if (!num || "" == num) {
        document.getElementById("Output Value").innerText="";
        console.log(num);
    }else{
        document.getElementById("Output Value").innerHTML=getFormattedNumber(num);
    }
}``
function getFormattedNumber(num){
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator")
for(var i = 0; i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        console.log("The Operator Clicked:"+this.id);
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        } else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {// if out put has a value
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }else{
            var output=getOutput();
            var history=getHistory();
            if (output != "") {
                output=reverseNumberFormat(output);
                history=history+output;
            }
            if (this.id == "=") {
                var isEndWithOperator = false;
                ["%","/","*","+","-"].forEach(function(operator) {
                    var lastIndex = history.lastIndexOf(operator)
                    if(lastIndex != -1) {
                        isEndWithOperator = lastIndex == history.length -1;
                    }  
                });
                if(isEndWithOperator) {
                    history = history.substring(0,history.length-1);
                }
                var result=eval(history);
                printOutput(result);
                printHistory("");
            }else{
                history=history+this.id;
                printHistory(history);
                printOutput();
            }
        }
    });
}

var number = document.getElementsByClassName("number")
for(var i = 0; i<number.length;i++){
    number[i].addEventListener('click',function(){
        var output=reverseNumberFormat(getOutput())
        if (output !=NaN) { // if out put is number
            output=output+this.id;
            printOutput(output);
        }
    });
}