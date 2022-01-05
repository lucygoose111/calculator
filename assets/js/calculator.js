const display = document.getElementById('display');

const buttons = ['clear','backspace','exponent','divide', 7,8,9,'multiply', 4,5,6, 'subtract', 1,2,3, 'plus', 'pos-neg-toggle', 0, 'decimal', 'equals'];

buttons.forEach(buttonType=>{

    let buttonElement = document.getElementById('btn-'+buttonType);
    buttonElement.addEventListener('click', function () {

        clickButton(buttonType);

    });

});

function clickButton(type) {

    switch (type) {

        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:

            display.innerText += type;

            break;

        case 'plus':

            display.innerText += '+';

            break;

        case 'subtract':

            display.innerText += '-';

            break;

        case 'multiply':

            display.innerText += '×';

            break

        case 'divide':

            display.innerText += '÷';

            break;
        
        case 'clear':

            display.innerText = '';

            break;
        

        case 'backspace':

            display.innerText = display.innerText.substring(0, display.innerText.length - 1);
            
            break;
        
        case 'decimal':

            display.innerText += '.';

            break;
        
        case 'equals':

            let validEquation = display.innerText.match(/([0-9.]+)([\+\-×÷])([0-9.]+)/);
            if (validEquation) {
                
                let num1 = parseFloat(validEquation[1]);
                let operator = validEquation[2];
                let num2 = parseFloat(validEquation[3]);
                let result = 0;

                switch (operator) {

                    case '+':
                        result = num1 + num2;
                        break;
                    case '-':
                        result = num1 - num2;
                        break;
                    case '×':
                        result = num1 * num2;
                        break;
                    case '÷':
                        result = num1 / num2;
                        break;

                }

                display.innerText = result;

            
            }

            else {

                alert('invalid equation');

            }

            break;

    }

}