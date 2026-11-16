


var timeLimit = 600;          // 10 minutes in seconds
var secondsLeft = 600;        // seconds remaining
var quizRunning = true;       // checks if the quiz is running
var totalQuestions = 10;
var passPercent = 70;         // percentage needed to pass
var score = 0;                // number of correct answers
var details = "";             // the text for the per question results

// ----- Timer -----


function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var secs = seconds % 60;
  if (secs < 10) {
    secs = "0" + secs;        
  }
  return minutes + ":" + secs;
}


function tick() {

  if (quizRunning === false) {
    return;
  }

  secondsLeft = secondsLeft - 1;
  document.getElementById("timer").textContent = "Time left: " + formatTime(secondsLeft);

  // Makes the timer red in the last minute
  if (secondsLeft <= 60) {
    document.getElementById("timer").style.color = "#8e1b1b";
    document.getElementById("timer").style.backgroundColor = "#fbe4e4";
  }

  // When time runs out, submits the quiz automatically
  if (secondsLeft <= 0) {
    submitQuiz();
  }
}

// ----- Grading -----


function checkQuestion(number, isCorrect, answerText) {
  if (isCorrect === true) {
    score = score + 1;
    details = details + '<p class="correct"><b>Question ' + number + ': Correct</b> (1/1)<br>Answer: ' + answerText + '</p>';
  } else {
    details = details + '<p class="incorrect"><b>Question ' + number + ': Incorrect</b> (0/1)<br>Answer: ' + answerText + '</p>';
  }
}


function submitQuiz() {
 
  if (quizRunning === false) {
    return;
  }
  quizRunning = false;                         // stops the timer from counting
  var timeSpent = timeLimit - secondsLeft;     // seconds used
  score = 0;
  details = "";

  // Fill in the Blank Questions
  var answer1 = document.getElementById("q1").value.trim().toLowerCase();
  checkQuestion(1, answer1 === "set-cookie" || answer1 === "set cookie", "Set-Cookie");

  var answer2 = document.getElementById("q2").value.trim().toLowerCase();
  checkQuestion(2, answer2 === "stateless", "stateless");

  // Multiple Choice Questions
  checkQuestion(3, document.getElementById("q3_2").checked, "Lou Montulli");
  checkQuestion(4, document.getElementById("q4_3").checked, "Third-party cookie");
  checkQuestion(5, document.getElementById("q5_2").checked, "GDPR");
  checkQuestion(6, document.getElementById("q6_2").checked, "Blocks JavaScript on the page from reading the cookie");
  checkQuestion(7, document.getElementById("q7_2").checked, "Secure");
  checkQuestion(8, document.getElementById("q8_1").checked, "When you close your browser");


  var domain = document.getElementById("q9_1").checked;
  var margin = document.getElementById("q9_2").checked;
  var path = document.getElementById("q9_3").checked;
  var sameSite = document.getElementById("q9_4").checked;
  var footer = document.getElementById("q9_5").checked;
  var correct9 = false;
  if (domain === true && margin === false && path === true && sameSite === true && footer === false) {
    correct9 = true;
  }
  checkQuestion(9, correct9, "Domain, Path, and SameSite");

  
  var safari = document.getElementById("q10_1").checked;
  var chrome = document.getElementById("q10_2").checked;
  var firefox = document.getElementById("q10_3").checked;
  var brave = document.getElementById("q10_4").checked;
  var correct10 = false;
  if (safari === true && chrome === false && firefox === true && brave === true) {
    correct10 = true;
  }
  checkQuestion(10, correct10, "Safari, Firefox, and Brave");

  // Calculate the score 
  var percent = Math.round((score / totalQuestions) * 100);
  var summary = "";
  if (percent >= passPercent) {
    summary = '<div class="pass"><h3>PASSED</h3>';
  } else {
    summary = '<div class="fail"><h3>FAILED</h3>';
  }
  summary = summary + '<p class="big">' + percent + '%</p>';
  summary = summary + '<p>Score: ' + score + ' out of ' + totalQuestions + '</p>';
  summary = summary + '<p>Time spent: ' + formatTime(timeSpent) + '</p></div>';


  document.getElementById("results").innerHTML = summary + details;
  document.getElementById("timer").textContent = "Quiz submitted";
}

// ----- Reset -----


function resetQuiz() {
  // Clears the two text boxes
  document.getElementById("q1").value = "";
  document.getElementById("q2").value = "";

  // Uncheck questions 3 to 10 
  for (var q = 3; q <= 10; q++) {
    for (var n = 1; n <= 4; n++) {
      document.getElementById("q" + q + "_" + n).checked = false;
    }
  }
  
  document.getElementById("q9_5").checked = false;

  // Clears the results and restarts the timer
  document.getElementById("results").innerHTML = "";
  secondsLeft = timeLimit;
  quizRunning = true;
  document.getElementById("timer").textContent = "Time left: " + formatTime(secondsLeft);
  document.getElementById("timer").style.color = "#4a2c1a";
  document.getElementById("timer").style.backgroundColor = "#f3e3c8";
}


document.getElementById("submitBtn").addEventListener("click", submitQuiz);
document.getElementById("resetBtn").addEventListener("click", resetQuiz);


setInterval(tick, 1000);