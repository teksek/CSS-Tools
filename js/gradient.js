/* eslint-disable no-unused-vars */

// -------------
// ! GRADIENT
// queryselectors of elements
const inputsDiv = document.querySelector('.inputs');
const linearBtn = document.querySelector("[name='linear']").addEventListener('click', setLinear)
const radialBtn = document.querySelector("[name='radial']").addEventListener('click', setRadial)
const addColorBtn = document.querySelector("[name='addColor']").addEventListener('click', addColor);
const removeColorBtn = document.querySelector("[name='removeColor']").addEventListener('click', removeColor);
let rect = document.querySelector('.gradient-rect');

let angle = 90;

let isLinear = false;

let linearElement;
let radialElement;
let closeBrackets;
let colorNumber = 0;
let angleDefault = 90;

let color1, color2, color3, color4, color5, color6;
let color1Fill, color2Fill, color3Fill, color4Fill, color5Fill, color6Fill;
let color1Color, color2Color, color3Color, color4Color, color5Color, color6Color;

document.addEventListener("DOMContentLoaded", () => {
    jsInitialize();
})

function jsInitialize() {
    setLinear();
}

function setLinear() {
    if(!isLinear) {
        removeLeavings();

        linearElement = document.createElement('div');
        linearElement.classList.add('linear-element')
        linearElement.appendChild(document.createElement('h2'));
        let h2text = document.createTextNode('Linear {');
        linearElement.firstChild.appendChild(h2text);
        let angleElement = document.createElement('div');
        angleElement.classList.add('input-item');
        angleElement.classList.add('range-div');
        angleElement.appendChild(document.createElement('span'));
        let angleSpan = document.createTextNode('Kąt');
        angleElement.firstChild.appendChild(angleSpan);
        let angleElementChild = document.createElement('div');

        let angleNumber = document.createElement('input');
        angleNumber.setAttribute('type', "number");
        angleNumber.setAttribute('class', 'angle-number');

        angleElementChild.appendChild(angleNumber);
        angleElement.appendChild(angleElementChild);

        linearElement.appendChild(angleElement);

        linearElement.appendChild(document.createElement('h2'));
        closeBrackets = document.createTextNode('}');
        linearElement.lastChild.appendChild(closeBrackets);

        let angleRangeElement = document.createElement('input');
        angleRangeElement.setAttribute('type', 'range');
        angleRangeElement.setAttribute('class', 'angle-range')
        angleRangeElement.setAttribute('min', '0');
        angleRangeElement.setAttribute('max', '360');
        angleRangeElement.setAttribute('style', 'margin-left: 5%; width: 95%;');
        linearElement.insertBefore(angleRangeElement, linearElement.lastChild);

        isLinear = true;

        render(linearElement);

        color1 = new Color();
        color1.createHTMLElement();
        color1 = inputsDiv.lastElementChild.lastElementChild;
        addFunctionality(color1);
        color2 = new Color();
        color2.createHTMLElement();
        color2 = inputsDiv.lastElementChild.lastElementChild;
        addFunctionality(color2);

        color1Color = "#1f84ef", color1Fill = 0;
        color2Color = "#e3073c", color2Fill = 100;

        addFunctionality(linearElement);
        createResult();
        setRectStyle();
    } else {
        console.log("it's already linear");
        const newPopup = new Popup("It's already linear!", "error");
        newPopup.createElement();
    }
}

function setRadial() {
    if(isLinear) {
        removeLeavings();

        radialElement = document.createElement('div');
        radialElement.classList.add('radial-element')
        radialElement.appendChild(document.createElement('h2'));
        let h2text = document.createTextNode('Radial {');
        radialElement.firstChild.appendChild(h2text);
        let angleElement = document.createElement('div');
        angleElement.classList.add('input-item');
        angleElement.classList.add('range-div');

        isLinear = false;

        render(radialElement);

        color1 = new Color();
        color1.createHTMLElement();
        color1 = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element'))).lastElementChild;
        addFunctionality(color1);
        color2 = new Color();
        color2.createHTMLElement();
        color2 = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element'))).lastElementChild;
        addFunctionality(color2);

        createResult();
        setRectStyle();
    } else {
        console.log("it's already radial");
        const newPopup = new Popup("It's already radial!", "error");
        newPopup.createElement();
    }
}

function addColor() {
    if(colorNumber === 2) {
        color3 = new Color();
        color3.createHTMLElement();
        color3 = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element'))).lastElementChild;

        color3Fill = 100;
        color3Color = "#ffd200";
        color2Fill = 50;

        updateColors();
        addFunctionality(color3);
    } else if (colorNumber === 3) {
        color4 = new Color();
        color4.createHTMLElement();
        color4 = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element'))).lastElementChild;

        color4Fill = 100;
        color4Color = "#06e07f";
        color2Fill = 33;
        color3Fill = 66;

        updateColors();
        addFunctionality(color4);
    } else if (colorNumber === 4){
        color5 = new Color();
        color5.createHTMLElement();
        color5 = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element'))).lastElementChild;

        color5Color = "#1f84ef";
        color5Fill = 100;
        color2Fill = 25;
        color3Fill = 50;
        color4Fill = 75;

        updateColors();
        addFunctionality(color5);
    } else if (colorNumber === 5) {
        color6 = new Color();
        color6.createHTMLElement();
        color6 = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element'))).lastElementChild;

        color6Color = "#e3073c";
        color6Fill = 100;
        color2Fill = 20;
        color3Fill = 40;
        color4Fill = 60;
        color5Fill = 80;

        updateColors();
        addFunctionality(color6);
    } else if (colorNumber === 6) {
        const newPopup = new Popup("Six colors is the maximum number.", "warning");
        newPopup.createElement();
    }
}

function updateColors(color) {
    let allColorElements = [color1, color2, color3, color4, color5, color6];
    let allColorFillVariables = [color1Fill, color2Fill, color3Fill, color4Fill, color5Fill, color6Fill];
    let allColorInputVariables = [color1Color, color2Color, color3Color, color4Color, color5Color, color6Color];
    let counter = 0;

    allColorElements.forEach((element) => {
        if(element) {
            let fillElement = element.querySelector(`.color-number${counter + 1}`);
            let colorInputElement = element.querySelector(`.color-input${counter + 1}`);
            let colorRangeElement = element.querySelector(`.color-range${counter + 1}`);

            if (fillElement) fillElement.value = allColorFillVariables[counter];
            if (colorRangeElement) colorRangeElement.value = allColorFillVariables[counter];
            if (colorInputElement) colorInputElement.value = allColorInputVariables[counter];
            counter++;
        }
    })
    setRectStyle();
}

function moreColors(HTMLstring) {
    if (color3 && color3Fill !== undefined && color3Color !== undefined) {
        HTMLstring += `, ${color3Color} ${color3Fill}%`;
    }
    if (color4 && color4Fill !== undefined && color4Color !== undefined) {
        HTMLstring += `, ${color4Color} ${color4Fill}%`;
    }
    if (color5 && color5Fill !== undefined && color5Color !== undefined) {
        HTMLstring += `, ${color5Color} ${color5Fill}%`;
    }
    if (color6 && color6Fill !== undefined && color6Color !== undefined) {
        HTMLstring += `, ${color6Color} ${color6Fill}%`;
    }
    return HTMLstring;
}

function removeColor() {
    let latestColor = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element'))).lastElementChild;
    if(colorNumber > 2) {
        latestColor.remove();
        colorNumber--;

        closeBrackets = document.createElement('h2');
        closeBrackets.innerHTML = "}";
        latestColor = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element'))).lastElementChild;
        latestColor.appendChild(closeBrackets);

        updateColorVariables();
        setRectStyle();
        setResult(getCurrentGradientString());
    } else {
        const newPopup = new Popup("Two colors is the minimum amout!", "warning");
        newPopup.createElement();
    }
}

function updateColorVariables() {
    color1Color = document.querySelector('.color-input1')?.value || "#1f84ef";
    color1Fill = document.querySelector('.color-number1')?.value || 0;

    color2Color = document.querySelector('.color-input2')?.value || "#e3073c";
    color2Fill = document.querySelector('.color-number2')?.value || 100;

    color3Color = document.querySelector('.color-input3')?.value || undefined;
    color3Fill = document.querySelector('.color-number3')?.value || undefined;

    color4Color = document.querySelector('.color-input4')?.value || undefined;
    color4Fill = document.querySelector('.color-number4')?.value || undefined;

    color5Color = document.querySelector('.color-input5')?.value || undefined;
    color5Fill = document.querySelector('.color-number5')?.value || undefined;

    color6Color = document.querySelector('.color-input6')?.value || undefined;
    color6Fill = document.querySelector('.color-number6')?.value || undefined;
}

function getCurrentGradientString() {
    let HTMLstring = "";

    if(isLinear) {
        HTMLstring += "linear-gradient(";
        HTMLstring += angle + "deg, ";
    } else {
        HTMLstring += "radial-gradient(";
    }

    HTMLstring += `${color1Color} ${color1Fill}%, `;
    HTMLstring += `${color2Color} ${color2Fill}%`;

    HTMLstring = moreColors(HTMLstring);
    
    HTMLstring += ")";
    return HTMLstring;
}

function createResult() {
    let resultElement = document.querySelector('.code-result-span');
    if (resultElement) {
        resultElement.innerText = getCurrentGradientString() + ";";
    } else {
        resultElement = document.createElement('span');
        resultElement.classList.add('code-result-span');
        resultElement.innerText = getCurrentGradientString() + ";";

        let resultBoxChild = document.createElement('div');
        resultBoxChild.classList.add('code-result');
        resultBoxChild.classList.add('code-result-gradient');
        resultBoxChild.appendChild(resultElement);

        let resultBox = document.createElement('div');
        resultBox.style.display = "flex";
        resultBox.style.justifyContent = "center";
        resultBox.style.alignItems = "center";
        resultBox.classList.add('result-box');
        resultBox.appendChild(resultBoxChild);

        let result = document.createElement('div');
        result.classList.add("result-block");
        let resultH2 = document.createElement('h2');
        resultH2.innerHTML = "Result";
        resultH2.style.textAlign = "center";
        result.appendChild(resultH2);
        result.appendChild(resultBox);

        inputsDiv.appendChild(result);
    }
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function render(element) {
    inputsDiv.appendChild(element);

    if(isLinear) {
        document.querySelector('.angle-number').value = angleDefault;
    }
}

function removeLeavings() { 
    colorNumber = 0;
    let resultBlock = inputsDiv.querySelector('.result-block');
    if(resultBlock) {
        resultBlock.remove();
    }
    let leavingsArray = [];
    if(!isLinear) {
        leavingsArray.push(inputsDiv.querySelector('.radial-element'));
        console.log("Zmiana z Radial na Linear...")
    } else {
        leavingsArray.push(inputsDiv.querySelector('.linear-element'));
        console.log("Zmiana z Linear na Radial...");
    }
    if (leavingsArray != "") {
        leavingsArray.forEach((leaving) => {
            leaving.remove();
        })
    }
}

function addFunctionality(element) {
    if(element.className === "linear-element") {
        let angleNumber = element.querySelector('.input-item').lastChild.firstChild;
        let angleRange = element.querySelector('.angle-range');
        angleRange.addEventListener('input', () => {
            angleNumber.value = angleRange.value;
            setRectVariableValues(angleNumber);
        })
        angleNumber.addEventListener('input', () => {
            angleRange.value = angleNumber.value;
            setRectVariableValues(angleRange);
        })
    } else if(element.className === "color-div") {
        let parentDiv = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element')));
        let colorNumberEl = parentDiv.querySelector(`.color-number${colorNumber}`);
        let colorRange = parentDiv.querySelector(`.color-range${colorNumber}`);
        let colorPicker = parentDiv.querySelector(`.color-input${colorNumber}`);
        if(colorNumber == 1) {
            colorNumberEl.value = 0;
            colorRange.value = 0;
            colorPicker.value = "#1f84ef";
        } else if (colorNumber == 2) {
            colorNumberEl.value = 100;
            colorRange.value = 100;
            colorPicker.value = "#e3073c";
        }
        colorRange.addEventListener('input', () => {
            colorNumberEl.value = colorRange.value;
            setRectVariableValues(colorNumberEl);
        })
        colorNumberEl.addEventListener('input', () => {
            colorRange.value = colorNumberEl.value;
            setRectVariableValues(colorRange);
        })
        colorPicker.addEventListener('input', () => {
            setRectVariableValues(colorPicker);
        })
    }
}

function setRectVariableValues(element) {
    if(element.className === "angle-number" || element.className === "angle-range") {
        angle = element.value;
    } else if (element.className === "color-number1" || element.className === "color-range1") {
        color1Fill = element.value;
    } else if (element.className === "color-number2" || element.className === "color-range2") {
        color2Fill = element.value;
    } else if (element.className === "color-number3" || element.className === "color-range3") {
        color3Fill = element.value;
    } else if (element.className === "color-number4" || element.className === "color-range4") {
        color4Fill = element.value;
    } else if (element.className === "color-number5" || element.className === "color-range5") {
        color5Fill = element.value;
    } else if (element.className === "color-number6" || element.className === "color-range6") {
        color6Fill = element.value;
    } else if (element.className === "color-input1") {
        color1Color = element.value;
    } else if (element.className === "color-input2") {
        color2Color = element.value;
    } else if (element.className === "color-input3") {
        color3Color = element.value;
    } else if (element.className === "color-input4") {
        color4Color = element.value;
    } else if (element.className === "color-input5") {
        color5Color = element.value;
    } else if (element.className === "color-input6") {
        color6Color = element.value;
    }

    setRectStyle();
}

function setRectStyle() {
    let HTMLstring = getCurrentGradientString();
    rect.style.background = HTMLstring;
    setResult(HTMLstring);
}

function setResult(HTMLstring) {
    let resultElement = document.querySelector('.code-result-span');
    resultElement.innerText = HTMLstring + ";";
}

class Color {
    constructor() {
        colorNumber++;
    }

    createHTMLElement() {
        let container = document.createElement('div');
        container.classList.add('color-div');
        let colorElement = document.createElement('div');
        colorElement.classList.add('input-item');
        colorElement.classList.add('range-div');
        colorElement.classList.add(`color-element${colorNumber}`)
        colorElement.appendChild(document.createElement('span'));
        let colorSpan = document.createTextNode((`Kolor ${colorNumber}`));
        colorElement.firstChild.appendChild(colorSpan);
        let colorElementChild = document.createElement('div');

        let colorInput = document.createElement('input');
        colorInput.setAttribute('type', "color");
        colorInput.classList.add("color-picker");
        colorInput.classList.add(`color-input${colorNumber}`);

        let colorNumberElement = document.createElement('input');
        colorNumberElement.setAttribute('type', 'number');
        colorNumberElement.setAttribute('class', `color-number${colorNumber}`);

        colorElementChild.appendChild(colorInput);
        colorElementChild.appendChild(colorNumberElement);
        colorElement.appendChild(colorElementChild);

        let colorRangeElement = document.createElement('input');
        colorRangeElement.setAttribute('type', 'range');
        colorRangeElement.setAttribute('class', `color-range${colorNumber}`)
        colorRangeElement.setAttribute('min', '0');
        colorRangeElement.setAttribute('max', '100');
        colorRangeElement.setAttribute('style', 'margin-left: 5%; width: 95%;');

        let parentDiv = ((inputsDiv.querySelector('.linear-element')) || (inputsDiv.querySelector('.radial-element')));

        container.appendChild(colorElement);

        parentDiv.appendChild(container);
        container.appendChild(colorRangeElement);

        closeBrackets.remove();
        closeBrackets = document.createElement('h2');
        closeBrackets.innerHTML = "}";
        parentDiv.lastChild.appendChild(closeBrackets);
    }
}

class Popup {
    text = "";
    type = "";

    constructor(text = "Done.", type = "default") {
        this.text = text;
        this.type = type;
    }

    createElement() {
        if (this.type === "default") {
            this.giveNewElementType("notification-default");
        } else if (this.type === "warning") {
            this.giveNewElementType("notification-warning");
        } else {
            this.giveNewElementType("notification-error");
        }
    }

    giveNewElementType(className) {
        const notificationsDiv = document.querySelector('.notifications');

        const newNotification = document.createElement('div');
        newNotification.classList.add(className);
        let newContent = "";

        if (this.text.charAt(this.text.length - 1) === ".") {
            newContent = document.createTextNode(this.text);
        } else {
            if (className === "default") {
                newContent = document.createTextNode(this.text + ".");
            } else {
                newContent = document.createTextNode(this.text + "!");
            }
        }
        newNotification.appendChild(newContent);

        const newX = newNotification.appendChild(document.createElement('div'));
        newX.classList.add('basic-flexbox-notification');

        let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('fill', 'currentColor');
        svgElement.setAttribute('height', '20px');
        svgElement.setAttribute('viewBox', '0 0 20 20');
        svgElement.setAttribute('width', '20px');
        svgElement.style.zIndex = "2000";
        let svgPath = svgElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
        svgPath.setAttribute('d', 'm18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z');

        newX.appendChild(svgElement);
        newX.addEventListener('click', () => {
            newNotification.remove();  
        });

        const existingNotifications = document.querySelectorAll('.notifications > *');

        existingNotifications.forEach(notification => {
        const bottom = parseInt(notification.style.bottom || 0, 10);
            notification.style.bottom = (bottom + 120) + 'px'; 
        });

        notificationsDiv.insertBefore(newNotification, notificationsDiv.firstElementChild);

        setTimeout(() => {
            newNotification.remove();
        }, 3000)
    }
}