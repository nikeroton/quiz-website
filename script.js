var name=prompt("Enter your Full Name");
var num1=prompt("Enter your admission no.");

alert("Best of Luck");
let question_number_element = document.getElementById("question-number");
let question_txt_element = document.getElementById("question-txt");
let option_1_element = document.getElementById("option1");
let option_2_element = document.getElementById("option2");
let option_3_element = document.getElementById("option3");
let option_4_element = document.getElementById("option4");
let next_button = document.getElementById("next-button");
let time_element = document.getElementById("timer");


let current_question_number=0;
let score=0;
let time;
const total_time = 1015;
let sec = total_time;

/******Handle timer*********/
function timer(){
    time_element.innerHTML = sec;
    sec--;
    if(sec==0){
        sec = total_time;
        clearInterval(time);
        checkIfScore();
        current_question_number++;
        showQuestion();
    }    
}

function checkIfScore(){
    let optionIdSelected = document.querySelector('input[name = opt]:checked');
            
    let option_correct = quizQuestions[current_question_number].correct;
    if(optionIdSelected!=null)
    {            
        if(optionIdSelected.id==option_correct){
            score++;        
        }
    }
}

/**
 * A function to show question and options on html page.
 */

function showQuestion(){
    sec = total_time; //assign sec to total time of timer
    clearInterval(time);
    timer();
    time = setInterval(timer,1000);
    //uncheck all the option seleceted
    document.querySelectorAll("input[name = opt]").forEach(option=> option.checked=false)
    
    if(current_question_number>=quizQuestions.length){
        goToResultPage();
    }
    //set questions and options from array
    question_number_element.innerHTML = (current_question_number+1) + ". ";
    question_txt_element.innerHTML = quizQuestions[current_question_number].question;
    option_1_element.innerHTML = quizQuestions[current_question_number].opt1;
    option_2_element.innerHTML = quizQuestions[current_question_number].opt2;
    option_3_element.innerHTML= quizQuestions[current_question_number].opt3;
    option_4_element.innerHTML= quizQuestions[current_question_number].opt4;
    // time = setInterval(timer,1000);
    
}

/**
 * Handling Event listner on button click
 */
next_button.addEventListener('click',()=>{
   checkIfScore();
    current_question_number ++;
    if(current_question_number>=quizQuestions.length){
        // show final answer
        goToResultPage();        

    }else{
        //show next question
        showQuestion();
    }
    
});
function goToResultPage(){
    current_question_number = 0;
    localStorage.setItem("score", score);
    location.href = "./resultPage.html";
}


/////////////////////////////////////
let quizQuestions=[];
const URL = 'questions.json'
 async function getData(){
 const response = await fetch(URL);
 const data = await response.json();
 quizQuestions = data;
 console.log(quizQuestions);
 showQuestion();
}
getData();














