$(document).ready(function () {
	
	var timerNumber = 21;

	// score variables
	var numCorrect = 0;
	var numIncorrect = 0;
	var numAnswered = 0;

	var answers = [];
  	var currentQuestion = 0;

	// remember the positions in the array, there are four choices but the first number is 0. The 'correct' answers are 0,1,2,3, not 1,2,3,4
	var trivia = [
		{
			question: 'How many seasons did Lou Gehrig play every inning of every game?',
			correct: 1,
			MultipleChoice: ['5', '1', '13', '10'],
		},
		{
			question: 'What Ivy League university did Lou Gehrig attend?',
			correct: 2,
			MultipleChoice: ['Harvard', 'Princeton', 'Columbia', 'Brown'],
		},
		{
			question: 'How many seasons saw Hank Aaron blast 50 or more homers?',
			correct: 1,
			MultipleChoice: ['24', '0', '15', '7'],
		},
		{
			question: 'What did Babe Ruth, Rogers, Hornsby, Ted Williams and Willie Mays all do in their first major league at-bats?',
			correct: 2,
			MultipleChoice: ['Walk', 'Homer', 'Strike out', 'Triple'],
		},
		{
			question: 'Who was the American League base-stealing champ for nine years in the 1980s?',
			correct: 1,
			MultipleChoice: ['Vince Coleman', 'Rickey Henderson', 'Ozzie Smith', 'Lou Brock'],
		},
		{
			question: 'Which two cities have ballparks honoring Number 44 above the outfield fence?',
			correct: 0,
			MultipleChoice: ['Atlanta and Milwaukee', 'New York and Los Angeles', 'Boston and Milwaukee', 'New York and San Francisco'],
		},
		{
			question: 'What two Yankees were nearly traded to Milwaukee for pitcher Warren Spahn and slugger Hank Aaron in 1960?',
			correct: 1,
			MultipleChoice: ['Mickey Mantle and Roger Maris', 'Mickey Mantle and Whitey Ford', 'Whitey Ford and Roger Maris', 'Yogi Berra and Mickey Mantle'],
		},
		{
			question: 'Who was the only major leaguer to play at least 500 games with each of four teams - Houston, Montréal, New York and Detroit?',
			correct: 3,
			MultipleChoice: ['Rickey Henderson', 'Nolan Ryan', 'Vince Coleman', 'Rusty Staub'],
		},
		{
			question: 'Who was the only player to play over 500 games at each of five different positions?',
			correct: 1,
			MultipleChoice: ['Robin Yount', 'Pete Rose', 'Albert Puljos', 'Rusty Staub'],
		},
		{
			question: 'Which pitcher has the most wins in Dodgers history?',
			correct: 0,
			MultipleChoice: ['Don Drysdale', 'Sandy Kofax', 'Don Sutton', 'Orel Hershieser'],
		},
		
	];
	
	//function to hide html elements
	var hide = function (elementId) {
		$(elementId).css("visibility", "hidden");
	};
	//function to show html elements
	var show = function (elementId) {
		$(elementId).css("visibility", "visible");
	};
	//function for writing html elements
	var write = function (elementId, thing) {
		$(elementId).html('<h3>' + thing + "</h3>")
	};

	//question function
	var questionWrite = function () {
		if (currentQuestion <= 9) { 
			$('#questions').html('<h4>' + trivia[currentQuestion].question + '</h4>');
			answers = trivia[currentQuestion].MultipleChoice;
			show('.answer');
			for (var i = 0; i < answers.length; i++) {
				$('#answer' + i).html('<h4>' + answers[i] + '</h4>');
			}
		}
		else {
			gameOver();
		}
	};

	// clears the html contents of the answers
	var answerClear = function () {
		$('#answers').empty();
		for (var i = 0; i < 4; i++) {
			  $('#answer' + i).html('');
		}
		hide('.answer');
	};

	// Timer
	var start = function() {
		counter = setInterval(countDown, 1000);
		$('#instructions').empty();
		hide('#start');// hide start button
		questionWrite();//write question & answers	
	};

	// clears all content
	var clearScreen = function () {
		$('#instructions').empty();
		$('#questions').empty();
		$('#scoreDiv').empty();
		answerClear();
	}

	// Timer countdown 
	var countDown = function () {
		timerNumber --;// decrease timerNumber
		$('#timerDiv').html('<h2> Time Remaining:' + timerNumber + '</h2>');// write timer to html timerDiv
		if (timerNumber == 0) {
			gameOver();
		}
	};

	// Timer stop function
	var stop = function () {
		clearInterval(counter);
	};

	// reset function
	var reset = function () {
		stop();
		timerNumber = 21;
		answers = [];
		currentQuestion = 0;
		clearScreen();
		$('#timerDiv').empty();
		write('#instructions');
		show('#start');
		hide('#reset');
	};
	
	//next question
	var nextQuestion = function () {
    $('#image').css('display', 'none');
		$('#questions').css('display', 'initial');
		$('#answersDiv').css('display', 'initial');
		$('#answerMsg').css('display', 'none');
		clearInterval();
		timerNumber = 21;
	}
  
	//check answer
	$('.answer').click(function () {
    var clicked = $(this);
		var value = clicked.attr('value');
		var correctAnswer = trivia[currentQuestion].correct;
    
		if (value == correctAnswer) {
      $('#questions').empty();
			answerClear();
			$('#answersDiv').css('display', 'none');
			$('#questions').css('display', 'none'); 
			$('#answers').css('display', 'initial');
			$('#image').attr('src', trivia[currentQuestion].gif);
      $('#image').css('display', 'initial');
     
		$('#answers').html('<h3> You chose ' + answers[value] + '.</h3> <br><h3>The correct answer was ' + answers[correctAnswer] + '.</h3>');
		setInterval(nextQuestion, 5 * 1000);
		numAnswered ++;
		numCorrect ++;
		currentQuestion ++;
		questionWrite();
		}
		else {
      $('#answers').html('<h3> You chose ' + answers[value] + '.</h3> <br><h3>The correct answer was ' + answers[correctAnswer] + '.</h3>');
			numAnswered ++;
			numIncorrect ++;
			currentQuestion ++;
			//timerNumber = 21;
			$('#questions').empty();
			answerClear();
			questionWrite();
		}
	});
    var gameOver = function() {
      stop(); // stop the timer
      clearScreen();
      write('#instructions', '<h3>Game Over!</h3>');
      $('#scoreDiv').append('<h3>Are you a baseball genius or base ball noon, what do your results say?</h3>');
      $('#scoreDiv').append('<h3>Total Questions Answered: ' + numAnswered + '</h3>');
      $('#scoreDiv').append('<h3>Number of correct answers: ' + numCorrect + '</h3>');
      $('#scoreDiv').append('<h3>Number of incorrect answers: ' + numIncorrect + '</h3>');
      show('#reset');
    };
  
  // click handlers	
	$('#start').on("click", start);
  	$('#reset').on('click', reset);
})