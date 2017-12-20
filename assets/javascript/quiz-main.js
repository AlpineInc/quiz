//The game is developed as a configurable framework which gives the user/developer
//the flexibility to pass their own set of question, time to answer each question
//and marks per question. 

//Main function for handling all logics in the game
function Quiz(questionList, timeLimit, timeInterval) {
	//The Quiz takes any externally defined set of questions. The questions need
	//to be structured in a pre-defined JSON format
    this.questions = questionList,
    this.answerTimeLimit = timeLimit,
    this.timeInterval = timeInterval,
    this.currentQuestionIndex = null,
    this.score = null,
    this.timer = null,

    //Function to initialize variables for a new game
    this.newGame = function() {
    	//Show only the game instructions
        $("#divcard-instruction").show();
        //Hide the quiz question card and gameover cards
        $("#divcard-question").hide();
        $("#divcard-gameover").hide();
        //Initialize variables at the begining of the game
        this.currentQuestionIndex = 0;
        this.drawQuestionIndex(this.currentQuestionIndex);
        this.score = 0;
        this.drawScore();
        this.resetTimer();
    },

    //Function to draw the question index
    this.drawQuestionIndex = function(index) {
        $("#span-index").text(index + "/" + this.questions.length);
    },

    //Function to draw the score
    this.drawScore = function() {
        $("#span-score").text(this.score);
    },

    //Function to draw the next question. If there are no questions left,
    //then the gameover card is displayed.
    this.nextQuestion = function() {
        $("#divcard-instruction").hide();
        $("#divcard-question").show();
        //If more questions
        if (this.currentQuestionIndex < this.questions.length) {
            this.drawQuestionIndex((parseInt(this.currentQuestionIndex) + 1));
            this.drawQuestion(this.questions[this.currentQuestionIndex]);
            this.startTimer();
            this.currentQuestionIndex++;
        } 
        //Else is no more questions to draw
        else {
        	this.resetTimer();
            $("#divcard-question").hide();
            $("#divcard-gameover").show();
        }
    },

    //Function to draw the question on the screen
    this.drawQuestion = function(question) {
    	//Clear the last question
        $("#div-questionblock").empty();
        //Write the new question
        var pQuestion = $("<p id='p-question'>").text(question.question);
        $("#div-questionblock").append(pQuestion);
        //Write the answer options for the question
        //Radio options
        if (question.questionType === "radio") {
            var formRadioAnsOption = $("<form id='form-answerOptions'>").addClass("radio");
            for (i = 0; i < question.answerOptions.length; i++) {
                var labelAnsOption = $("<label>").attr("id", "label" + i);
                var inputAnsOption = $("<input>");
                inputAnsOption.attr("type", "radio");
                inputAnsOption.attr("name", "answer-option");
                inputAnsOption.attr("value", i);
                labelAnsOption.append(inputAnsOption);
                labelAnsOption.append(question.answerOptions[i].answer);
                formRadioAnsOption.append(labelAnsOption);
                formRadioAnsOption.append("<br>");
            }
            $("#div-questionblock").append(formRadioAnsOption);
        } 
        //Checkbox option - multiple answers
        else if (question.questionType === "checkbox") {
        	//TODO
        }
        //Write submit answer button
        var btnSubmitAns = $("<button>").addClass("btn btn-primary");
        btnSubmitAns.attr("id", "btn-submitAns");
        btnSubmitAns.text("Submit");
        $("#div-questionblock").append(btnSubmitAns);
    },

    this.startTimer = function() {
        var selfPointer = this;
        var mins = 00;
        var secs = 00;
        var minsLimit = Math.floor(this.answerTimeLimit / 60);
        var secsLimit = (this.answerTimeLimit % 60);
        $("#span-timermins").text("00");
        $("#span-timersecs").text("00");

        this.timer = setInterval(function() {
            secs++;
            if (secs <= 9) {
                $("#span-timersecs").text("0" + secs);
            } else {
                $("#span-timersecs").text(secs);
            }

            if (secs >= 60) {
                mins++;
                if (mins > 9) {
                    $("#span-timermins").text(mins);
                } else {
                    $("#span-timermins").text("0" + mins);
                }
                secs = 0;
                $("#span-timersecs").text("0" + 0);
            }

            if (mins === minsLimit && secs === secsLimit) {
                selfPointer.stopTimer();
                selfPointer.answerHandler("timeout");
            }
        }, 1000);
    },

    this.stopTimer = function() {
        clearInterval(this.timer);
    },

    this.resetTimer = function() {
        this.stopTimer(this.timer);
        $("#span-timermins").text("00");
        $("#span-timersecs").text("00");
	},

    this.answerHandler = function(eventSource) {
        var evalAnswer = null;
        var selfPointer = this;

        //Disable the form to prevent user for chaning the answer
        $("input").prop("disabled", true);
        $("#btn-submitAns").prop("disabled", true);
        
        //When user fails to submit answer in time
        if (eventSource === "timeout") {
            $("#div-questionblock").append("<div id='div-questionevalresult'>Sorry. Question timeout</div>");
            for (i = 0; i < this.questions[this.currentQuestionIndex - 1].answerOptions.length; i++) {
                if (this.questions[this.currentQuestionIndex - 1].answerOptions[i].correct === true) {
                    $("#label" + i).css("color", "green");
                    $("#label" + i).css("font-weight", "bold");
                }
            }
        } 
        //When user submits an answer
        else if (eventSource === "submit") {
            this.stopTimer();

            //Evaluate user submitted answer
            if (this.evalAnswer(this.questions[this.currentQuestionIndex - 1])) {
            	$("input[type=radio]:checked").parent().css("color", "green");
            	$("input[type=radio]:checked").parent().css("font-weight", "bold");
                $("#div-questionblock").append("<div id='div-questionevalresult'>Congragulation! Thats the correct answer.</div>");
                this.score = this.score + this.questions[this.currentQuestionIndex - 1].marks;
                this.drawScore();

            } else {
                $("#div-questionblock").append("<div id='div-questionevalresult'>Sorry. Wrong answer</div>");
                for (i = 0; i < this.questions[this.currentQuestionIndex - 1].answerOptions.length; i++) {
                    if (this.questions[this.currentQuestionIndex - 1].answerOptions[i].correct === true) {
                        $("#label" + i).css("color", "green");
                                            $("#label" + i).css("font-weight", "bold");
                    }
                }
                $("input[type=radio]:checked").parent().css("color", "red");
            	$("input[type=radio]:checked").parent().css("font-weight", "bold");
            }
        }

        //Wait for 5 seconds before writing the next question
        var sleepTimer = setInterval(function() {
            selfPointer.nextQuestion();
            clearInterval(sleepTimer);
        }, this.timeInterval * 1000);
    },//End of answerHandler function

    this.evalAnswer = function(question) {
        var answerEvalStatus = false;

        question.answerOptions.forEach(function(element, index) {
            if (element.correct) {
                if ($("input[type=radio]")[index].checked) {

                    answerEvalStatus = true;
                }
            }
        });

        if (answerEvalStatus) {
            return true;
        } else {
            return false;
        }
    }//End of evalAnswer function

}//End of Quiz function