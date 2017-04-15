
    
$(document).ready(function(){
//variables for the trivia
var countDown = 30;
var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var triviaOver = false;
var notAnswered = 0;

    
    

function setTimer() {
    intervalId = setInterval(countBackwards, 1000);
}

    
//function to set the clock to count backwards, if the time runs out, the game is over 
function countBackwards() {
    countDown --;
    $("#clock-of-death").text("TIME LEFT: " + countDown);
    if (countDown <=0) {
        stopCounting();
        triviaOver = true;
//        alert("Game Over!");
//        $("#answers-container").hide();
//        $(".question").hide();
//        $("#button-next").hide();
        hideStuff();
    }
}
//when the clock reaches 0 it will stop running    
function stopCounting() {
    clearInterval(intervalId);
}


//Question data bank for the game

var questionsDataBank = [{
	question: "On Wednesdays, we wear pink",
    choices: ["The Godfather", "Poltergeist", "Mean Girls", "Conan The Barbarian"],
    correctAnswer: 2
}, {
	question: "Gentlemen, you can't fight in here! This is a war room",
	choices: ["Goldfinger", "Xanadu", "The Shining", "Dr. Strangelove, or How I Learned to Stop Worrying and Love the Bomb"],
	correctAnswer: 3
}, {
	question: "Mrs. Robinson, you're trying to seduce me. Aren't you?",
	choices: ["Dr. No", "Jaws", "The Graduate", "Jurassic Park"],
	correctAnswer: 2
}, {
	question: "Yo, Adrian",
	choices: ["Planet of the Apes", "The Big Lebowsky", "Wolverine", "Rocky"],
	correctAnswer: 3
}, {
	question: "Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!",
	choices: ["The Treasure of Sierra Madre", "Casablanca", "Saturday Night Fever", "Meet the Gringo"],
	correctAnswer: 0
}, {
	question: "So come up to the lab and see what's on the slab. I see you shiver with antici... pation.",
	choices: ["Independence Day", "The Rocky Horror Picture Show", "Grease", "Dumbo"],
	correctAnswer: 1
}, {
	question: "You talkin' to me?",
	choices: ["Mulan", "Cars", "Saturday Night Fever", "Taxi Driver"],
	correctAnswer: 3   
}, {
    question: "I'll have what she's having",
    choices: ["Forrest Gump", "When Harry Met Sally", "Rush Hour", "Y Tu Mama tambien"],
    correctAnswer: 1
}, {
    question: "I'm too old for this shit",
    choices: ["The Little Mermaid", "Animal House", "Lethal Weapon", "Monuments Men"],
    correctAnswer: 2
}, {
    question: "Frankly my dear, I don't give a damn",
    choices: ["Gone with the Wind", "The Hunger Games", "Apollo 13", " Burn After Reading"],
    correctAnswer: 0
}, {
    question: " You see that pack of Virginia killing sticks on the end of the piano?",
    choices: ["Who's Afraid of Virginia Wolf", "Tarzan", "Planet of the Apes", "RocknRolla"],
    correctAnswer: 3
}, {
    question: "I know I fib a good deal. After all, a woman's charm is 50% illusion.",
    choices: ["Citizen Kane", "The Maltese Falcon", "A Streetcar Named Desire", "You've Got Mail"],
    correctAnswer: 2
}];
    
    
//control point - making sure this works  
	for (var i=0; i<questionsDataBank.length; i++) {
		console.log(questionsDataBank[i]);  
} 
    

//this is the main button that will start the game and the timer     
$("#start-button").click(function() {
    console.log("start the game!"); 
    setTimer();
    countBackwards();  
// Call for the function that displays the questions
    displayQuestion();
//hide start button
	$("#start-button").addClass("hidden");
});
    
//hides the final score of the player at the beginning of the game
    hideScore();


// On clicking next, display the next question
    $("#button-next").on("click", function () {
//if the trivia is not over, the questions will display and the user input will be captured in the respective counters       
        if (!triviaOver) {
//I couldn't quite make this to work to go to the next question if the question was not answered
            value = $("input[type='radio']:checked").val();
            if (value == undefined) {
                notAnswered ++;
				$("#player-stats").text("NOT ANSWERED: " + notAnswered);
            
            } else {

                if (value == questionsDataBank[currentQuestion].correctAnswer) {
                    correctAnswers++;
                    $("#correct-answers").text("CORRECT ANSWERS: " + correctAnswers);
                } else {
					wrongAnswers++;
					 $("#wrong-answers").text("WRONG ANSWERS: " + wrongAnswers);
					 
				} 
                currentQuestion++; 
                //increments and goes to next question
              
                if (currentQuestion < questionsDataBank.length)  {
                    displayQuestion();
                } 
                      
                else {
                    alert("game over");
                    displayScore();
                	triviaOver = true; 
                    hideStuff();
                    stopCounting();
                }
            }
        } else { // game not over
            triviaOver = false;
            $("#button-next").text("NEXT QUESTION");
            resetTrivia();
            displayQuestion();
            hideScore();
        }

    });

    
// inserts questions, answers and initial scores in page
function displayQuestion() {
    
    showGameStats();

    var question = questionsDataBank[currentQuestion].question;
    var questionClass = $(".question");
    var choiceList = $(".choice-list");
    var numChoices = questionsDataBank[currentQuestion].choices.length;

// Set the questionClass text into the current question, displays current question into the page
    $(questionClass).text(question);
// Remove current <li> elements 
    $(choiceList).find("li").remove();
//inserts answers from array into li elements of the ul
    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questionsDataBank[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynamic-radio-button" />' + choice + '</li>').appendTo(choiceList);
    }  
}
  

//reset the quiz    
function resetTrivia() {
    currentQuestion = 0;
    correctAnswers = 0;
	wrongAnswers = 0;
    hideScore();
   
}
function hideStuff(){
    $("#answers-container, .question, #button-next").hide();    
}

function displayScore() {
    $("#result").text("YOU SCORED: " + correctAnswers + " OUT OF " + questionsDataBank.length);
    $("#result").show();   
    
}

function hideScore() {
    $("#result").hide();
}

function showGameStats() {
    $("#button-next, #player-stats, #correct-answers, #wrong-answers").show();
    
}
   

}); //end document ready
