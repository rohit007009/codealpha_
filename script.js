const calculator = {
    currentInput: '0',
    previousInput: '',
    operation: undefined,
    resetScreen: false
};

const currentInputElement = document.querySelector('.current-input');
const previousOperationElement = document.querySelector('.previous-operation');

function updateDisplay() {
    currentInputElement.value = calculator.currentInput;
    if (calculator.operation != null) {
        previousOperationElement.textContent = 
            `${calculator.previousInput} ${calculator.operation}`;
    } else {
        previousOperationElement.textContent = '';
    }
}

function appendNumber(number) {
    if (calculator.currentInput === '0' || calculator.resetScreen) {
        calculator.currentInput = '';
        calculator.resetScreen = false;
    }
    calculator.currentInput += number;
}

function chooseOperation(operation) {
    if (calculator.currentInput === '') return;
    if (calculator.previousInput !== '') {
        compute();
    }
    calculator.operation = operation;
    calculator.previousInput = calculator.currentInput;
    calculator.resetScreen = true;
}

function compute() {
    let computation;
    const prev = parseFloat(calculator.previousInput);
    const current = parseFloat(calculator.currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (calculator.operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    
    calculator.currentInput = computation.toString();
    calculator.operation = undefined;
    calculator.previousInput = '';
}

function clear() {
    calculator.currentInput = '0';
    calculator.previousInput = '';
    calculator.operation = undefined;
}

function deleteNumber() {
    if (calculator.currentInput.length === 1 || 
        (calculator.currentInput.length === 2 && calculator.currentInput.startsWith('-'))) {
        calculator.currentInput = '0';
    } else {
        calculator.currentInput = calculator.currentInput.slice(0, -1);
    }
}

function addDecimal() {
    if (calculator.resetScreen) {
        calculator.currentInput = '0';
        calculator.resetScreen = false;
    }
    if (calculator.currentInput.includes('.')) return;
    calculator.currentInput += '.';
}

document.querySelectorAll('button[value^="0"], button[value^="1"], button[value^="2"], button[value^="3"], button[value^="4"], button[value^="5"], button[value^="6"], button[value^="7"], button[value^="8"], button[value^="9"]').forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.value);
        updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.value);
        updateDisplay();
    });
});

document.querySelector('.equal-sign').addEventListener('click', () => {
    compute();
    updateDisplay();
});

document.querySelector('button[value="AC"]').addEventListener('click', () => {
    clear();
    updateDisplay();
});

document.querySelector('button[value="backspace"]').addEventListener('click', () => {
    deleteNumber();
    updateDisplay();
});

document.querySelector('.decimal').addEventListener('click', () => {
    addDecimal();
    updateDisplay();
});