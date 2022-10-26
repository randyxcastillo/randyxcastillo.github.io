class Calculator {
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.previousOperandText.innerText = '';
        this.currentOperandText.innerText = '0';
        this.operation = undefined;
    }

    delete() {
        if(this.currentOperand.toString().length == 1 || this.currentOperand === Infinity || this.currentOperand === -Infinity) {
            this.currentOperand = '0';
        }
        else {
            this.currentOperand = this.currentOperand.toString().slice(0,-1);
        }
    }

    appendNumber(number) {
        if(number.toString() === '.' & this.currentOperand.toString().includes('.')){
            return;
        }
        else if(this.currentOperand.toString() === '0') {
            this.currentOperand = number.toString();
        }
        else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    factorial(n) {
        let answer = 1;
        if (n == 0 || n == 1){
            return answer;
        }else{
            for(var i = n; i >= 1; i--){
            answer = answer * i;
            }
            return answer;
        }  
    }

    chooseOperation(operation) {
        if(this.previousOperand.toString() !== '') {
            this.compute();
        }

        switch (operation.toString()) {
            case 'x!': 
                this.currentOperand = this.factorial(parseFloat(this.currentOperand));
                this.operation = undefined;
                this.previousOperand = '';
                return;
            case 'ln':
                this.currentOperand = Math.log(parseFloat(this.currentOperand));
                this.operation = undefined;
                this.previousOperand = '';
                return;
            case 'log':
                this.currentOperand = Math.log10(parseFloat(this.currentOperand));
                this.operation = undefined;
                this.previousOperand = '';
                return;
            case 'sin':
                this.currentOperand = Math.sin(parseFloat(this.currentOperand));
                this.operation = undefined;
                this.previousOperand = '';
                return;
            case 'cos':
                this.currentOperand = Math.cos(parseFloat(this.currentOperand));
                this.operation = undefined;
                this.previousOperand = '';
                return;
            case 'tan':
                this.currentOperand = Math.tan(parseFloat(this.currentOperand));
                this.operation = undefined;
                this.previousOperand = '';
                return;
            case 'EXP':
                this.currentOperand = Math.exp(parseFloat(this.currentOperand));
                this.operation = undefined;
                this.previousOperand = '';
                return;
            case 'Deg':
                this.operation = undefined;
                this.currentOperand = this.currentOperand;
                return;
            case ')':
                this.operation = undefined;
                this.currentOperand = this.currentOperand;
                return;
            case '(':
                this.operation = undefined;
                this.currentOperand = this.currentOperand;
                return;
            default:
                break;
        }

        if(operation.charCodeAt().toString() == '8730') {
            this.currentOperand = Math.sqrt(parseFloat(this.currentOperand));
            console.log(this.currentOperand);
            this.operation = undefined;
            this.previousOperand = '';
            return;
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';

    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) {return;}

        switch (this.operation) {
            case '+': 
                computation = prev + current;
                break;
            case '-': 
                computation = prev - current;
                break;
            default:
                break;
        }

        if(this.operation.charCodeAt().toString() == '215') {
            computation = prev * current;
        }
        else if(this.operation.charCodeAt().toString() == '247') {
            computation = prev / current;
        }
        else if(this.operation.charCodeAt().toString() == '37') {
            computation = prev % current;
        }
        else if(this.operation.charCodeAt().toString() == '120') {
            computation = Math.pow(prev, current);
        }

        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
