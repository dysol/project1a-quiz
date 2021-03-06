//declare the game objects
var TinkerStation = function() {
  this.player1Turn = true;
  this.p1Score = 0;
  this.p2Score = 0;
  this.gameResult = null;
  this.currQnIdx = null; //store qns and prevent it from re-generating


  //store questions, answers and options inside array
  this.questions = [{
    question: "Your opponent sends out a Flying Pokémon, which of the following types should you pick?",
    answer: "Electric Type",
    options: ["Psychic Type", "Fighting Type", "Electric Type"],
  }, {
    question: "Which Pokémon seems to always have a headache?",
    answer: "Psyduck",
    options: ["Psyduck", "Magikarp", "Ditto"],
  }, {
    question: "What is so fragile that sound can destroy it?",
    answer: "Silence",
    options: ["Love", "Aerogel", "Silence"],
  }, {
    question: "A cup can hold 300ml, the current volume is 150ml. Which of the following is true?",
    answer: "The cup is full",
    options: ["The cup is half-full", "The cup is full", "The cup is half-empty"],
  }, {
    question: "parseFloat('AA2') = ?",
    answer: "NaN",
    options: ["2", "112", "NaN"],
  }, {
    question: "Which of the following creates a new element in DOM?",
    answer: "$('<newelement>')",
    options: ["$<newelement>", "$('<newelement>')", "$('newelement')"],
  }, {
    question: "How far can you walk into the woods?",
    answer: "Half way in",
    options: ["Deep in", "Half way in", "Ain't gonna walk in"],
  }, {
    question: "Who among them is the youngest ruler?",
    answer: "Puyi The Last Emperor",
    options: ["Alexander The Great", "Puyi The Last Emperor", "Augustus Caesar"],
  }, {
    question: "'Nephelococcygia' is the practice of doing what?",
    answer: "Finding shapes in clouds",
    options: ["Breaking glass with your voice", "Finding shapes in clouds", "Sleeping with you eyes open"],
  }, {
    question: "Which insect shorted out a computer and inspired the term 'computer bug'?",
    answer: "Moth",
    options: ["Moth", "Flying Roach", "Fly" ],
  }];


  //It should return an integer that is the number of questions in a game
  this.numberOfQuestions = function() {
    return this.questions.length;
  };

  //It should return an integer that is the zero-based index of the current question in the quiz
  this.currentQuestion = function() {
    //randomize question and get index
    this.currQnIdx = Math.floor(Math.random() * this.questions.length);
    return this.currQnIdx;
  };

  //It should return an integer that is the zero-based index the correct answer for the current question
  this.correctAnswer = function() {
    var answer = this.questions[this.currQnIdx].answer;
    //return from option index as that is where is its linked up to on screen
    return this.questions[this.currQnIdx].options.indexOf(answer);
  };

  //It should return an integer that is the number of choices for the current question
  this.numberOfAnswers = function() {
    return this.questions[this.currQnIdx].options.length;
  };

  //It should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.
  this.playTurn = function(choice) {
    if (choice == this.correctAnswer()) {
      if (this.player1Turn === true) {
        this.p1Score++; //player 1 score points
      } else {
        this.p2Score++; //player 2 score points
      }
      return true;
    } else {
      return false;
    }
  };

  //It should return a true or false if the quiz is over.
  this.isGameOver = function() {
    if (this.numberOfQuestions() <= 0) {
      return true;
    } else {
      return false;
    }
  };

  //It should return 0 if the game is not yet finished. Else it should return either 1 or 2 depending on which player won. It should return 3 if the game is a draw.
  this.whoWon = function() {
    //checks which player win or draw
    if (this.p1Score > this.p2Score) {
      return 1;
    } else if (this.p2Score > this.p1Score) {
      return 2;
    } else {
      return 3;
    }
    //checks if game is not over
    if (this.isGameOver === false) {
      return 0;
    }
  };

  //It should restart the game so it can be played again.
  this.restart = function() {
    location.reload(); //reload page
  };

};


//LIVE
$(document).ready(function() {
  console.log('Dom ready');

  //create new game
  var game = new TinkerStation();
  //console.log(game.numberOfQuestions());

  function updateDisplay() {
    if (game.numberOfQuestions() > 0) {
      //generate new question index
      this.qnsNOptionsIdx = game.currentQuestion();
      //get the question of that index
      this.newQns = game.questions[qnsNOptionsIdx].question;
      //get the options of that index
      this.qnsOptions = game.questions[qnsNOptionsIdx].options;

      //set the question text
      $('.questions > h3').text(newQns);

      //set options in the buttons
      $('button').each(function(optionsIndex) {
        //retrieve options array
        $(this).text(qnsOptions[optionsIndex]);
      });

      //highlight which player turn
      if (game.player1Turn === true) {
        $('.p1Score').css('background-color', '#F2E86D');
        $('.p2Score').css('background-color', 'transparent');
      } else {
        $('.p2Score').css('background-color', '#F2E86D');
        $('.p1Score').css('background-color', 'transparent');
      }
      //show player score
      $('.p1Score > p').text('Score: ' + game.p1Score);
      $('.p2Score > p').text('Score: ' + game.p2Score);

      if (game.numberOfQuestions() == 1) {
        $('h1').text('Final Question!');
      }
    }
  }
  updateDisplay();

  //seperating logic from display updates
  function updateGame() {
    //remove the generated set from array
    game.questions.splice(this.qnsNOptionsIdx, 1);
    //change player turn
    game.player1Turn = !game.player1Turn;

  }

  //pop up box
  function popAlert(whichPop) {
    var showResult = "";
    switch (whichPop) {
      case 0:
        //when game over
        if (game.gameResult == 3) {
          showResult = 'It\'s a Draw!';
        } else {
          showResult = 'Player ' + game.gameResult + ' Wins!';
        }
        swal({
          title: showResult,
          confirmButtonText: 'Next >>',
          confirmButtonColor: '#F59E2E',
          background: '#FACB8F',
          width: 500,
          padding: 100,
          allowEscapeKey: false,
          allowOutsideClick: false,
        }).then(function() {
          swal({
            title: 'Initializing new game..',
            text: 'Click START to play again!',
            confirmButtonText: 'START',
            confirmButtonColor: '#574D68',
            background: '#F2E86D'
          }).then(function() {
            location.reload();
          });
        });
        break;
      case 1: //if correct
        swal({
          title: 'That\'s right!',
          text: '^_^',
          confirmButtonText: 'Next >>',
          confirmButtonColor: '#1CD17A',
          background: '#68EBAC',
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        break;
      case 2: //if wrong
        swal({
          title: 'Not quite right..',
          text: '._.',
          confirmButtonText: 'Next >>',
          confirmButtonColor: '#C93232',
          background: '#E08181',
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        break;
      default:

    }
  }

  //adding buttons
  $('button').on('click', function(event) {
    console.log('clicked');

    //check correct answer
    if (game.playTurn($(event.target).val())) {
      popAlert(1);
      updateGame();
      updateDisplay();
    } else {
      popAlert(2);
      updateGame();
      updateDisplay();
    }

    if (game.isGameOver() === true) {
      //get winner 1, 2 or 3:draw
      game.gameResult = game.whoWon();
      popAlert(0);
      //game.restart();
    }
    console.log(game.numberOfQuestions());
    console.log(game.questions);
  });


});
