const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있다.
const buttons = calculator.querySelector('.calculator_buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있다.

function calculate(n1, operator, n2) {
    let result = 0;
    if (operator === "+") {
        result = Number(n1) + Number(n2);
    } else if (operator === '–') {
        result = Number(n1) - Number(n2);
    } else if (operator === '×') {
        result = Number(n1) * Number(n2);
    } else if (operator === '÷') {
        result = Number(n1) / Number(n2);
    }
    return String(result);
}

const display = document.querySelector('.calculator_result'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있다.
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', function (event) {

    const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있다.
    const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져온다.
    const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져온다.

    if (target.matches('button')) {
        if (action === 'number') {
            if (display.textContent === '0' || previousKey === 'operator') {
                display.textContent = buttonContent;
            } else {
                display.textContent = display.textContent + buttonContent;
            }
            previousKey = 'number';
        }
        
        if (action === 'operator') {
            firstNum = display.textContent;
            operatorForAdvanced = buttonContent;
            previousKey = 'operator';
        }

        if (action === 'decimal') {

        }
        if (action === 'clear') {
            firstNum = undefined;
            operatorForAdvanced = undefined;
            previousNum = undefined;
            display.textContent = '0';
            previousKey = 'clear';
        }

        if (action === 'calculate') {
            previousNum = display.textContent;
            display.textContent = calculate(firstNum, operatorForAdvanced, previousNum)
            previousKey = 'calculate';
        }
    }

});