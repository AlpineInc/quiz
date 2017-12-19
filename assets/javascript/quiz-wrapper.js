var questions = [{
    questionType: "radio",
    marks: 1,
    question: "Where is the correct place to insert a JavaScript?",
    answerOptions: [{
        id: 1,
        answer: "The <head> section",
        correct: false
    }, {
        id: 2,
        answer: "The <body> section",
        correct: false
    }, {
        id: 3,
        answer: "Both the <head> section and the <body> section are correct",
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
}];

$(document).ready(function() {
	    console.log(this);
    var quizGame = new Quiz(questions);
    quizGame.score = 10;
    var quizGame2 = new Quiz(questions);
    quizGame2.score = 20;
    quizGame.newQuiz();
    console.log(this);
    $(document).on("click", ".btn-start", function() {
        console.log(this);

        quizGame.nextQuestion();
    });


    $(document).on("click", "#btn-submit", function(event) {
        console.log(event);
        event.preventDefault();
        quizGame.answerHandler("submit");
    });

    $(document).on("click", ".btn-restart", function() {
    	quizGame.newQuiz();
    });

});