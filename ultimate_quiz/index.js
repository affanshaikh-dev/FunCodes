const quizDB = [
    {
        question: "Q1: What is the full form of HTML?",
        a: "Hello To My land",
        b: "Hey Text Markup Language",
        c: "HyperText Makeup Language",
        d: "HyperText Markup Language",
        ans: "ans4"
    },
    {
        question: "Q2: What is the full form of CSS?",
        a: "Cascading Style Sheets",
        b: "Cascading Style Sheep",
        c: "Cartoon Style Sheets",
        d: "Cascading Super Sheets",
        ans: "ans1"
    },
    {
        question: "Q3: What is the full form of HTTP?",
        a: "HyperText Transfer Product",
        b: "HyperText Test Protocol",
        c: "Hey Tranfer Protocol",
        d: "HyperText Transfer Protocol",
        ans: "ans4"
    },
    {
        question: "Q4: What is the full form of JS?",
        a: "JavaScript",
        b: "JavaSuper",
        c: "JustScript",
        d: "JordenShoes",
        ans: "ans1"
    }
];

const question = document.querySelector('.question');
const option1 = document.querySelector(".ans1");
const option2 = document.querySelector(".ans2");
const option3 = document.querySelector(".ans3");
const option4 = document.querySelector(".ans4");
const submit = document.querySelector("#submit");
const answers = document.querySelectorAll(".option");
const showScore = document.querySelector("#showScore");

let quesQount = 0;
let score = 0;
// load question 
const loadQues = () => {
    const questionList = quizDB[quesQount];

    question.innerText = questionList.question;

    option1.innerText = questionList.a;
    option2.innerText = questionList.b;
    option3.innerText = questionList.c;
    option4.innerText = questionList.d;
}

loadQues();

const getCheckAns = () => {
    let answer;
    answers.forEach(curAnsElem => {
        if(curAnsElem.checked) {
            answer = curAnsElem.id;  
        }
    });
    return answer;
}

const deSelectAll = () => {
    answers.forEach((curAnsElem) => curAnsElem.checked = false)
}

submit.addEventListener('click', () => {
    const checkAns = getCheckAns();
    console.log(checkAns);

    if(checkAns === quizDB[quesQount].ans){
        score++;
    }

    quesQount++;

    deSelectAll();
    
    if(quesQount < quizDB.length) {
        loadQues();
    }else {
        showScore.innerHTML = `
            <h3>You Scored ${score}/${quizDB.length} <ion-icon name="logo-octocat"></ion-icon></h3>
            <button class="btn" onclick="location.reload()">Play Again</button>
        `;

        showScore.classList.remove('scoreArea')
    }
});


