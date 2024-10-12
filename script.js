let calculateScreen = document.querySelector('.calculate');
let resultScreen = document.querySelector('.result');

let currentInput = '';
let previousInput = '';
let operator = '';
let isCalculated = false;

function tapNum(num) {
    if (isCalculated) {
        currentInput = ''; 
        isCalculated = false;
    }

    if (num === '.' && currentInput.includes('.')) return;

    currentInput += num;
    displayCalculation(); 
}

function tapOperator(op) {
    if (currentInput === '') return;
    if (previousInput && currentInput && operator) {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    displayCalculation();
}

function tapResult() {
    if (!previousInput || !currentInput || !operator) return;

    calculate();
    isCalculated = true;
}

function calculate() {
    let result;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    resultScreen.innerText = `=${result}`;
    calculateScreen.innerText = `${previousInput}${operator}${currentInput}`;
    currentInput = result.toString();
    previousInput = '';
    operator = '';
}

function displayCalculation() {
    calculateScreen.innerText = `${previousInput}${operator}${currentInput}`.trim();
}

function tapClear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    calculateScreen.innerText = '0';
    resultScreen.innerText = '=0';
}

function tapDel() {
    currentInput = currentInput.slice(0, -1);
    displayCalculation();
    if (!currentInput) {
        calculateScreen.innerText = '0';
    }
}
