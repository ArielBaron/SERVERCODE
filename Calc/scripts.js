const EqutionLabel = document.getElementById("eq");
const grid_items = document.getElementsByClassName("grid-item");
const btnE = document.getElementById("="); // "=" button
const btnC = document.getElementById("C"); // "C" button
const title = document.getElementById("Time")
let hasSyntaxError = false;

const UpdateTime = () => {
    const DateObject = new Date()
    let Am_Pm =  DateObject.getHours() > 12 ? "PM":"AM"
    let hour = DateObject.getHours()-12 > 12 ? DateObject.getHours()-12:DateObject.getHours()
    title.textContent = `The time is: ${hour}:${DateObject.getMinutes()} ${Am_Pm}`
}
const update_title = setInterval(UpdateTime,1000)

for (let i = 0; i < grid_items.length; i++) {
    if (grid_items[i].textContent !== btnE.textContent && grid_items[i].textContent !== btnC.textContent) {
        grid_items[i].onclick = () => {
            if (hasSyntaxError) {
                EqutionLabel.textContent = "";
                hasSyntaxError = false;
            }
            EqutionLabel.textContent += grid_items[i].textContent;
            
        };
    }
}

btnC.onclick = () => {
    EqutionLabel.textContent = "";
    hasSyntaxError = false;
};

btnE.onclick = () => {
    console.log("Expression:", EqutionLabel.textContent); // Check the content
    let Equation = EqutionLabel.textContent;

    // Loop to handle "e" and "π" conversions
    let correctedEquation = "";
    for (let i = 0; i < Equation.length; i++) {
        if (i < Equation.length - 1 && "eπ√".includes(Equation[i + 1]) && "0123456789eπ".includes(Equation[i])) {
            correctedEquation += Equation[i] + "*";
        } else {
            correctedEquation += Equation[i];
        }
    }

    // Loop to handle square root conversion
    let i = 0;
    let correctedSqrtEquation = "";
    while (i < correctedEquation.length) {
        if ("√".includes(correctedEquation[i])) {
            let number = "";
            i++; // Move past the √ sign
            while (i < correctedEquation.length && "0123456789.e".includes(correctedEquation[i])) {
                number += correctedEquation[i];
                i++;
            }
            correctedSqrtEquation += "Math.sqrt(" + number + ")";
        } else {
            correctedSqrtEquation += correctedEquation[i];
            i++;
        }
    }
    
    // Replacing symbols and evaluating the expression
    let result = correctedSqrtEquation.replace(/x/g, "*").replace(/÷/g, "/").replace(/π/g, "Math.PI").replace(/e/g, "Math.E");
    result = result.replace(/\^/g, "**");

    console.log(result);
    try {
        result = eval(result);
        EqutionLabel.textContent = result;
    } catch (error) {
        EqutionLabel.textContent = "Syntax Error";
        hasSyntaxError = true;
    }
};



