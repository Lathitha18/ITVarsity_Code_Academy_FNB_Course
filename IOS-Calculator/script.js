let currentInput = '0';
let previousInput = '';
let operation = null;
let resetInput = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput;
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            if (currentInput === '0' || resetInput) {
                currentInput = value;
                resetInput = false;
            } else {
                currentInput += value;
            }
        } else if (button.classList.contains('function')) {
            if (value === 'AC') {
                currentInput = '0';
                previousInput = '';
                operation = null;
            } else if (value === '+/-') {
                currentInput = (parseFloat(currentInput) * -1).toString();
            } else if (value === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
            }
        } else if (button.classList.contains('operation')) {
            if (value !== '=') {
                previousInput = currentInput;
                operation = value;
                resetInput = true;
            } else {
                if (operation) {
                    currentInput = calculate(previousInput, currentInput, operation);
                    operation = null;
                }
                resetInput = true;
            }
        }

        updateDisplay();
    });
});

function calculate(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (op) {
        case '+': return (num1 + num2).toString();
        case '-': return (num1 - num2).toString();
        case '×': return (num1 * num2).toString();
        case '÷': return (num1 / num2).toString();
        default: return num2.toString();
    }
}

updateDisplay();