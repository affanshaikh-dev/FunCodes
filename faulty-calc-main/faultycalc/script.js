// + - - 
// * - + 
// - - /
// / - **

let random = Math.random();
let a = prompt("Enter Your First Number");
let b = prompt("Enter Your Operation");
let c = prompt("Enter Your Second Number");

let obj = {
    "+": "-",
    "*": "+", 
    "-": "/",
    "/": "**"
}

if(random > 0.1) {
    alert(`Result: ${eval(`${a} ${b} ${c}`)}`)
} else {
    b = obj[b]
    alert(`Result: ${eval(`${a} ${b} ${c}`)}`)
}

