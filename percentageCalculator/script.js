let obtain = document.getElementById("obtain");
let total = document.getElementById("total");
let percentBtn = document.getElementById("percentBtn");
let percentOutput = document.querySelector(".percentOutput");
let outputBox = document.querySelector(".outputBox")
let formula;

function calper(eobtain, etotal) {
    formula = eobtain / etotal * 100;
    return formula;
}

percentBtn.addEventListener('click', () => {
    if (obtain.value == NaN && total.value == NaN) {
        percentOutput.style.display = "none";
    } else {
        let ouput_var = calper(obtain.value, total.value);
        percentOutput.style.display = "flex";
        outputBox.innerHTML = parseFloat(ouput_var).toFixed(2);
    }
})
