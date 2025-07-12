const displayHistory = document.querySelector('.display-history');
const display = document.querySelector('.display-input');
const temporaryResult = document.querySelector('.temporary-result');
const number = document.querySelectorAll('.number');
const operation = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clearAll = document.querySelector('.clear-all');
const clearLast = document.querySelector('.last-entity');

let dis1Num = "";
let dis2Num = "";
let result = null; 
let lastOperation = "";
let haveDot = false;

number.forEach((num) => {
    num.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot) {
            console.log(e.target.innerText)
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        display.innerText = dis2Num;
    })
})

operation.forEach((op) => {
    op.addEventListener('click', (e) => {
        if (!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
})

function clearVar(name = '') {
    dis1Num += dis2Num + ' ' + name + ' ';
    displayHistory.innerText = dis1Num;
    display.innerText = '';
    dis2Num = '';
    temporaryResult.innerText = result;
}

function mathOperation() {
    if (lastOperation === 'X') {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equal.addEventListener('click', () => {
    if (!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display.innerText = result;
    temporaryResult.innerText = '';
    dis2Num = result;
    dis1Num = '';
})

clearAll.addEventListener('click', (e) => {
    dis1Num = '';
    dis2Num = '';
    haveDot = false;
    displayHistory.innerText = '';
    display.innerText = '';
    temporaryResult.innerText = '';
    result = '';
    lastOperation = '';
})

clearLast.addEventListener('click', (e) => {
    display.innerText = '';
    dis2Num = '';
})

window.addEventListener('keydown', (e) => {
    if (
        e.key === '0' ||
        e.key === '1' || 
        e.key === '2' || 
        e.key === '3' || 
        e.key === '4' || 
        e.key === '5' || 
        e.key === '6' || 
        e.key === '7' || 
        e.key === '8' ||
        e.key === '9'  
    ){
        clickButton(e.key)
    } else if (
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/' ||
        e.key === '%'
    ){
        clickOperation(e.key)
    } else if (
        e.key === '*'
    ){
        clickOperation('x')
    } else if (
        e.key === "Enter" || e.key === "="
    ){
        clickEqual();
    } else if (
        e.key === 'Backspace'
    ){
        clickClear()
    } else if (e.key === 'Delete'){
        clickClearAll()
    }
})

function clickButton(key){
    number.forEach((button) => {
        if(button.innerText === key){
            button.click()
        }
    })
}

function clickOperation(key){
    operation.forEach((operation)=>{
        if (operation.innerText === key){
            operation.click()
        }
    })
} 

function clickEqual(){
    equal.click()
}

function clickClearAll(){
    clearAll.click()
}

function clickClear(){
    clearLast.click()
}