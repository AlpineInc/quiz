function Quiz(questionList) {
    console.log(this);
    this.self = this,
        this.questions = questionList,
        this.currentQuestionIndex = 0,
        //gameStatus: ""
        this.score = 0,
        this.isplayTimer = null,
        this.timer = null,


        this.newQuiz = function() {
            //draw card with game instructions and button to start play

            $("#divcard-instruction").show();
            $("#divcard-question").hide();
            $("#divcard-gameover").hide();

            //initialize score to 0
            this.score = 0;
            //reset timer
            this.resetTimer(this.displayTimer, "span-timer");
            //reset currentQuestionIndex 0
            this.currentQuestionIndex = 0;
            //set gameStatus to "instruct"
            //draw score
            this.drawScore();
            //draw questions index
            this.drawQuestionIndex(0);
        },
        this.drawScore = function() {
            $("#span-score").text(this.score);
        },
        this.drawQuestionIndex = function() {
            console.log("in drawQuestionIndex");
            console.log(this.currentQuestionIndex);
            $("#span-index").text((parseInt(this.currentQuestionIndex) + 1) + "/" + this.questions.length);
        },
        this.drawQuestionIndex = function(index) {
            $("#span-index").text(index + "/" + this.questions.length);
        },
        this.nextQuestion = function() {
            $("#divcard-instruction").hide();
            $("#divcard-question").show();
            console.log("in next question function");
            //if more questions
            if (this.currentQuestionIndex < this.questions.length) {
                console.log("inside if");
                //draw question index
                this.drawQuestionIndex((parseInt(this.currentQuestionIndex) + 1));
                //draw next question
                this.drawQuestion(this.questions[this.currentQuestionIndex]);
                //set gameStatus to loaded
                //start timer
                this.startTimer();
                //increment currentQuestionIndex
                this.currentQuestionIndex++;
            } else {
                //else update card with game over and start over button
                $("#divcard-question").hide();
                $("#divcard-gameover").show();
            }
        },
        this.drawQuestion = function(question) {
            console.log(question.question);
            $("#div-question").empty();
            var pQuestion = $("<p>");
            pQuestion.text(question.question);
            $("#div-question").append(pQuestion);
            var radioAnsOption = $("<form>");
            radioAnsOption.addClass("radio");
            var lineBreak = $("<br>");
            for (i = 0; i < question.answerOptions.length; i++) {

                var labelAnsOption = $("<label>");
                var inputAnsOption = $("<input>");
                inputAnsOption.attr("type", "radio");
                inputAnsOption.attr("name", "answer-option");
                inputAnsOption.attr("value", 1);
                labelAnsOption.attr("id", "radio" + i);
                labelAnsOption.append(inputAnsOption);
                radioAnsOption.append(labelAnsOption);
                labelAnsOption.append(question.answerOptions[i].answer);
                labelAnsOption.append(lineBreak);
                $("#div-question").append(radioAnsOption);
            }
            var divBtnQuestion = $("<div>");
            var btnQuestion = $("<button>");
            btnQuestion.attr("type", "submit");
            btnQuestion.attr("id", "btn-submit");
            btnQuestion.addClass("btn btn-primary");
            btnQuestion.text("Submit");
            divBtnQuestion.append(btnQuestion);
            $("#div-question").append(divBtnQuestion);
        },
        this.startTimer = function() {
            //set timmer to 00:00
            //draw timer every sec
            console.log(this);
            var selfi = this;
            var mins = 00;
            var secs = 00;
            $("#span-timermins").text("00");
            $("#span-timersecs").text("00");

            this.timer = setInterval(function() {
                console.log(this);
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

                if (mins === 0 && secs === 15) {
                    console.log(selfi);
                    selfi.stopTimer();
                    selfi.answerHandler("timeout");
                }
            }, 1000);
            //when reached 30 secs, stop timer
            //when reached 30 secs invoke answerHandler

        },
        timerHandler = function() {


        },
        this.stopTimer = function() {
            clearInterval(this.timer);
        },
        this.resetTimer = function(timer, location) {
            this.stopTimer(timer);
            $("#" + location).text("00:00");

        },
        this.answerHandler = function(eventSource) {
            var evalAnswer = null;

            //if eventSource is timer
            if (eventSource === "timeout") {
                //disable radio and button
                //update card with sorry message
                $("#div-question").append("<h3>Sorry. Question timeout</h3>");
                //update card with correct answer
                console.log(this.questions[this.currentQuestionIndex - 1].answerOptions);
                for (i = 0; i < this.questions[this.currentQuestionIndex - 1].answerOptions.length; i++) {
                    if (this.questions[this.currentQuestionIndex - 1].answerOptions[i].correct === true) {
                        console.log("inside if");
                        $("#radio" + i).css("color", "green");
                    }
                }
            } else if (eventSource === "submit") {
                //if event source is submit button
                //stop timer
                this.stopTimer();
                //evaluate answer
            }

            //if answer is correct
            //increment score
            //draw score
            //update card with congrats
            //if answer is wrong
            //update card with sorry message.
            //update card with correct answer

            //star new timer for invoking  nextQuestion


        },
        this.evalAnswer = function() {
            for (i = 0; i < document.myform.whichThing.length; i++) {
                if (document.myform.whichThing[i].checked == true) {
                    t = t + document.myform.whichThing[i].value;
                }
            }
        }



}