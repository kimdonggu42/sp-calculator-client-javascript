const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator_buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
    let result = 0;
    if (operator === '+') {
        result = Number(n1) + Number(n2)
    } else if (operator === '–') {
        result = Number(n1) - Number(n2)
    } else if (operator === '×') {
        result = Number(n1) * Number(n2)
    } else if (operator === '÷') {
        result = Number(n1) / Number(n2)
    }
    return String(result);
}

const display = document.querySelector('.calculator_result'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', function (event) {
    // 버튼을 눌렀을 때 작동하는 함수입니다.

    const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
    const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
    const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
    // ! 위 코드는 수정하지 마세요.

    // ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.
    if (target.matches('button')) {
        if (action === 'number') {
            if (display.textContent === '0' || previousKey === 'operator') {  // 0 또는 방금 누른 키가 연산자면, 새로운 숫자 입력해줘
                display.textContent = buttonContent;
            } else {
                display.textContent = display.textContent + buttonContent;
            }
            previousKey = 'number';  // previousKey === 방금 전에 누른 키
        }

        if (action === 'operator') {
            // 화면에 있는 첫번째 숫자가 저장되고,
            // 방금 누른 operator가 저장되고,
            // 방금 누른 키가 어떤 종류인지 저장해야 함

            // operator를 처음 눌렀을 때는, 계산이 필요 없음
            // operator가 있고 firstnum도 있다 -> 이전에 이미 operator를 누른적이 있다
            if (firstNum && operatorForAdvanced && previousKey !== 'operator' && previousKey !== 'calculate')
                display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent)
            firstNum = display.textContent;
            operatorForAdvanced = buttonContent;
            previousKey = 'operator';
        }

        if (action === 'decimal') {
            //  방금 누른 키가 operator면, operator인지 아닌지 분기
            if (previousKey != 'operator' && !display.textContent.includes('.')) {
                display.textContent = display.textContent + '.';
            } else if (previousKey === 'operator') {
                display.textContent = '0.';
            }
            previousKey = 'decimal';
        }
        
        if (action === 'clear') {
            firstNum = undefined;
            operatorForAdvanced = undefined;
            previousNum = undefined;
            display.textContent = 0;
            previousKey = 'clear';
        }

        if (action === 'calculate') {
            // enter 다음 또 엔터? previouskey - > calculator
            if (operatorForAdvanced) {  // operator가 없으면 동작 무시(ex : 3만 누르고 바로 enter쳤을때 무시)
                if (previousKey === 'calculate') {
                    display.textContent = calculate(display.textContent, operatorForAdvanced, previousNum);
                } else {
                    previousNum = display.textContent;
                    display.textContent = calculate(firstNum, operatorForAdvanced, previousNum);
                }
            }
            previousKey = 'calculate';
        }
    }

});