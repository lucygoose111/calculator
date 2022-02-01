const display = document.getElementById("display");
const chooseExponent = '<sup class="choose-exponent">𝒴</sup>';
const buttons = [
  "clear",
  "backspace",
  "exponent",
  "divide",
  7,
  8,
  9,
  "multiply",
  4,
  5,
  6,
  "subtract",
  1,
  2,
  3,
  "plus",
  "pos-neg-toggle",
  0,
  "decimal",
  "equals",
];

buttons.forEach((buttonType) => {
  let buttonElement = document.getElementById("btn-" + buttonType);
  buttonElement.addEventListener("click", function () {
    clickButton(buttonType);
  });
});

const round = (number, decimalPlaces) => {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen;
};

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
      let findLastExponent = new RegExp(chooseExponent + "$");
      if (display.innerHTML.match(findLastExponent)) {
        display.innerHTML = display.innerHTML.replace("𝒴", type);
        return;
      }

      if (
        display.innerHTML.match(/<sup class="choose-exponent">[0-9]+<\/sup>$/)
      ) {
        let exponentMatch = display.innerHTML.match(
          /<sup class="choose-exponent">([0-9]+)<\/sup>$/
        );

        let exponent = exponentMatch[1] + type;

        let exponentSup = '<sup class="choose-exponent">' + exponent + "</sup>";

        display.innerHTML = display.innerHTML.replace(
          /<sup class="choose-exponent">[0-9]+<\/sup>$/,
          exponentSup
        );
        return;
      }

      display.innerHTML += type;

      break;

    case "plus":
      display.innerHTML += " +&nbsp;";

      break;

    case "subtract":
      display.innerHTML += " -&nbsp;";

      break;

    case "multiply":
      display.innerHTML += " ×&nbsp;";

      break;

    case "divide":
      display.innerHTML += " ÷&nbsp;";

      break;

    case "clear":
      display.innerHTML = "";

      break;

    case "backspace":
      display.innerHTML = display.innerHTML.substring(
        0,
        display.innerHTML.length - 1
      );

      break;

    case "decimal":
      display.innerHTML += ".";

      break;

    case "pos-neg-toggle":
      let findLastNumberRegex = null;
      if (display.innerHTML.match(/\s[\+\-×÷]\s/)) {
        findLastNumberRegex = /.\s([\-0-9.]+)$/;
      } else {
        findLastNumberRegex = /([\-0-9.]+)$/;
      }

      let findLastNumber = display.innerHTML.match(findLastNumberRegex);
      if (findLastNumber) {
        let lastNumber = findLastNumber[1];
        let lastNumberAltered = null;
        if (!lastNumber.match("-")) {
          lastNumberAltered = parseFloat("-" + lastNumber);
        } else {
          lastNumberAltered = parseFloat(
            lastNumber.replace(/-([0-9.]+)$/, "$1")
          );
        }

        display.innerHTML = display.innerHTML.replace(
          /[\-0-9.]+$/,
          lastNumberAltered
        );
      }

      break;

    case "exponent":
      display.innerHTML += chooseExponent;

      break;

    case "equals":
      let displayText = display.innerHTML.replace("&nbsp;", " ");
      let findExponentSups = display.innerHTML.match(
        /[\-0-9.]+<sup class="choose-exponent">[0-9]+<\/sup>/g
      );

      if (findExponentSups) {
        findExponentSups.forEach((exponentSup) => {
          let findNumbers = exponentSup.match(
            /([\-0-9.]+)<sup class="choose-exponent">([0-9]+)<\/sup>/
          );

          let mainNumber = parseFloat(findNumbers[1]);
          let exponentNumber = parseInt(findNumbers[2]);

          let exponentResult = mainNumber ** exponentNumber;

          displayText = displayText.replace(exponentSup, exponentResult);
        });

        let findOperators = displayText.toString().match(/[\+\-×÷]/);
        if (findExponentSups.length === 1 && !findOperators) {
          display.innerHTML = displayText;
          return;
        }
      }

      let baseEquation = displayText.match(
        /([\-0-9.]+)\s([\+\-×÷])\s([\-0-9.]+)/
      );
      if (baseEquation) {
        let num1 = parseFloat(baseEquation[1]);
        let operator = baseEquation[2];
        let num2 = parseFloat(baseEquation[3]);
        let result = 0;

        switch (operator) {
          case "+":
            result = num1 + num2;
            break;
          case "-":
            result = num1 - num2;
            break;
          case "×":
            result = num1 * num2;
            break;
          case "÷":
            result = num1 / num2;
            break;
        }

        result = handleDecimals(result);
        display.innerHTML = result;
      } else {
        alert("Invalid equation.");
      }

      break;
  }
}

function handleDecimals(result) {
  let resultString = result.toString();
  let trimRepeatingDecimalNumbers = resultString.replace(
    /(\d)\1{9}[0-9]+/,
    "$1$1"
  );
  trimRepeatingDecimalNumbers = trimRepeatingDecimalNumbers.replace(
    /[0]+$/,
    ""
  );

  let trimToDecimal = trimRepeatingDecimalNumbers.replace(/^[0-9]+\./, "");
  let decimalPoints = trimToDecimal.length;
  if (decimalPoints > 3) {
    decimalPoints = decimalPoints - 1;
  }
  let decimalPointModifer = "1";
  for (i = 1; i <= decimalPoints; i++) {
    decimalPointModifer += "0";
  }
  decimalPointModifer = parseInt(decimalPointModifer);

  let resultFloat = parseFloat(trimRepeatingDecimalNumbers);

  result = Math.round(resultFloat * decimalPointModifer) / decimalPointModifer;

  return result;
}
