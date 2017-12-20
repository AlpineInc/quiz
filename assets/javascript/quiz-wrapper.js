//Initialize the questions for the quiz game
var questions = [{
    questionType: "radio",
    marks: 1,
    question: "Where is the correct place to insert a JavaScript?",
    answerOptions: [{
        id: 1,
        answer: "The &lt;head&gt; section",
        correct: false
    }, {
        id: 2,
        answer: "The &lt;body&gt; section",
        correct: false
    }, {
        id: 3,
        answer: "Both the &lt;head&gt; section and the &lt;body&gt; section are correct",
        correct: true
    }]
}, {
    questionType: "radio",
    marks: 1,
    question: "Does Javascript support functions?",
    answerOptions: [{
        id: 1,
        answer: "Yes, it does.",
        correct: true
    }, {
        id: 2,
        answer: "No. It does not.",
        correct: false
    }]
}, {
    questionType: "radio",
    marks: 1,
    question: "Javascript is same as Java",
    answerOptions: [{
        id: 1,
        answer: "True",
        correct: false
    }, {
        id: 2,
        answer: "False",
        correct: true
    }]
},{
    questionType: "radio",
    marks: 1,
    question: "What is the correct syntax for referring to an external script called xxx.js?",
    answerOptions: [{
        id: 1,
        answer: "&lt;script href=&quot;xxx.js&quot;&gt;",
        correct: false
    }, {
        id: 2,
        answer: "&lt;script src=&quot;xxx.js&quot;&gt;",
        correct: true
    }, {
        id: 3,
        answer: "&lt;script name=&quot;xxx.js&quot;&gt;",
        correct: false
    }]
}];


//Initialize the game
$(document).ready(function() {
	//Create new instance of the Quiz function. Passing the list of questions, timelimit (seconds)
	//and time interval (seconds) between question as input to initialize the game.
    var quiz = new Quiz(/*list of questions*/ questions, /*timelimit per question*/ 10, /*time interval between questions*/ 5);
    quiz.newGame();

    //Event handler for Start game button click
    $(document).on("click", "#btn-start", function() {
        quiz.nextQuestion();
    });

    //Event handler for submit answer button click
    $(document).on("click", "#btn-submitAns", function(event) {
        //Prevent the form action from being submitted. This helps prevent page reload.
        event.preventDefault();
        quiz.answerHandler("submit");
    });

    //Event handler for restart game button click
    $(document).on("click", "#btn-restart", function() {
        quiz.newGame();
    });
});