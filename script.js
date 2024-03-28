/* eslint-disable no-unused-vars */
// moze kiedys: https://10015.io/tools/css-triangle-generator

// *& GLOBAL VARIABLE ----
let rangeElements = [];
let pickerElements = [];
// --------------

// ! BOXSHADOW
// range variables
let horizontalLength = 10;
let verticalLength = 10;
let blurRadius = 5;
let spreadRadius = 0;
let opacity = 0.75;

// color variables
let shadowColor = "#000000";
let backgroundColor = "#272627";
let boxColor = "#06e07f";

// outline/inset variable
let outlineOrInset = false; // false means outline and true means inset
let outlineOrInsetVariable = "";

// ? BOXSHADOW DOM
let shadowColorNumber, shadowColorPicker;
let backgroundColorNumber, backgroundColorPicker; 
let boxColorNumber, boxColorPicker;
let horizontalLengthNumber, horizontalLengthRange;
let verticalLengthNumber, verticalLengthRange;
let blurRadiusNumber, blurRadiusRange;
let spreadRadiusNumber, spreadRadiusRange;
let opacityNumber, opacityRange;
let outlineOrInsetCheckbox;
let rect;
let resultElement;
// --------------

document.addEventListener("DOMContentLoaded", () => {
    switch(document.title) {
        case "CSS Tools - boxshadow":
            jsInitialize("boxshadow")
            break;
        case "CSS Tools - gradient":
            jsInitialize("gradient");
            break;
        case "CSS Tools - border":
            jsInitialize("border");
            break;
        case "CSS Tools - glassmorphism":
            jsInitialize("glassmorphism");
            break;
        default:
            console.log('bad documentTitle, i need to fix that (fuck this language)');
    }
});

function jsInitialize(arg) {
    switch(arg) {
        case "boxshadow":
            shadowColorNumber = document.querySelector('.shadow-color-picker');
            shadowColorPicker = document.querySelector('.shadow-color-text')
            shadowColorNumber.value = shadowColor;
            shadowColorPicker.value = shadowColor;

            backgroundColorNumber = document.querySelector('.background-color-picker');
            backgroundColorPicker = document.querySelector('.background-color-text')
            backgroundColorNumber.value = backgroundColor;
            backgroundColorPicker.value = backgroundColor;

            boxColorNumber = document.querySelector('.box-color-picker');
            boxColorPicker = document.querySelector('.box-color-text')
            boxColorNumber.value = boxColor;
            boxColorPicker.value = boxColor;

            horizontalLengthNumber = document.querySelector('.horizontal-length-number');
            horizontalLengthRange = document.querySelector('.horizontal-length-range');
            horizontalLengthNumber.value = horizontalLength;
            horizontalLengthRange.value = horizontalLength;

            verticalLengthNumber = document.querySelector('.vertical-length-number');
            verticalLengthRange = document.querySelector('.vertical-length-range');
            verticalLengthNumber.value = verticalLength;
            verticalLengthRange.value = verticalLength;

            blurRadiusNumber = document.querySelector('.blur-radius-number');
            blurRadiusRange = document.querySelector('.blur-radius-range');
            blurRadiusNumber.value = blurRadius;
            blurRadiusRange.value = blurRadius;

            spreadRadiusNumber = document.querySelector('.spread-radius-number');
            spreadRadiusRange = document.querySelector('.spread-radius-range');
            spreadRadiusNumber.value = spreadRadius;
            spreadRadiusRange.value = spreadRadius;

            opacityNumber = document.querySelector('.opacity-number');
            opacityRange = document.querySelector('.opacity-range');
            opacityNumber.value = opacity;
            opacityRange.value = opacity;

            outlineOrInsetCheckbox = document.querySelector('.outline-or-inset-input');

            rangeElements = [horizontalLengthRange, verticalLengthRange, blurRadiusRange, spreadRadiusRange, opacityRange];
            pickerElements = [shadowColorPicker, backgroundColorPicker, boxColorPicker];

            rect = document.querySelector('.box-shadow-rect');
            setRectStyle();

            addFunctionality();
            break;
        case "gradient":

            break;
        case "border":
            
            break;
        case "glassmorphism":

            break;
        default:
            console.log("this will never happen");
    }
}

function addFunctionality() {
    for(let element of rangeElements) {
        let elementNumber = element.previousElementSibling.lastElementChild.firstElementChild;
        element.addEventListener("input", () => {
            elementNumber.value = element.value;
            setRectVariableValues(elementNumber);
        })
        elementNumber.addEventListener("input", () => {
            element.value = elementNumber.value;
            // console.log(elementNumber.value);
            setRectVariableValues(element);
        })
    }

    // console.log(rangeElements[rangeElements.length - 1].value);

    for(let element of pickerElements) {
        let elementText = element.parentElement.firstElementChild;
        element.addEventListener("input", () => {
            elementText.value = element.value;
            setRectVariableValues(elementText);
        })
        elementText.addEventListener("input", () => {
            element.value = elementText.value;
            setRectVariableValues(element);
        });
    }

    outlineOrInsetCheckbox.addEventListener("input", () => {
        if(!outlineOrInset) {
            outlineOrInset = true;
            outlineOrInsetVariable = "inset";
            setRectStyle();
        } else if (outlineOrInset) {
            outlineOrInset = false;
            outlineOrInsetVariable = "";
            setRectStyle();
        }
    })
}

function setRectVariableValues(element) {
    // console.log(element.className);
    if (element.className === "horizontal-length-number" || element.className === "horizontal-length-range") {
        horizontalLength = element.value;
    } else if (element.className === "vertical-length-number" || element.className === "vertical-length-range") {
        verticalLength = element.value;
    } else if (element.className === "blur-radius-number" || element.className === "blur-radius-range") {
        blurRadius = element.value;
    } else if (element.className === "spread-radius-number" || element.className === "spread-radius-range") {
        spreadRadius = element.value;
    } else if (element.className === "box-color-text" || element.className === "box-color-picker") {
        boxColor = element.value;
    } else if (element.className === "background-color-text" || element.className === "background-color-picker") {
        backgroundColor = element.value;
    } else if (element.className === "shadow-color-text" || element.className === "shadow-color-picker") {
        shadowColor = element.value;
    } else if (element.className === "opacity-number" || element.className === "opacity-range") {
        opacity = element.value;
    } else if (element.className === "outline-or-inset-input") {
        console.log('xd');
    }

    setRectStyle();
}

function setRectStyle() {
    rect.style.backgroundColor = boxColor;
    rect.style.boxShadow = horizontalLength + "px " + verticalLength + "px " + blurRadius + "px " + spreadRadius + "px " + hexToRGBA(shadowColor, opacity) + " " + outlineOrInsetVariable;
    rect.parentElement.style.backgroundColor = backgroundColor;

    setResult();
}

function hexToRGBA(hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (opacity > 0.0) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

function setResult() {
    resultElement = document.querySelector('.code-result-span');
    resultElement.innerText = "box-shadow: " + horizontalLength + "px " + verticalLength + "px " + blurRadius + "px " + spreadRadius + "px " + hexToRGBA(shadowColor, opacity) + " " + outlineOrInsetVariable;
}