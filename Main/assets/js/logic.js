var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var elementQuestions = document.getElementById("questions");
var timeEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var nameEl = document.getElementById("initials");
var reponseEl = document.getElementById("feedback");

function startQuiz() {
  var startQuiz = document.getElementById("start-screen");
  startQuiz.setAttribute("class", "hide");
  elementQuestions.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timeEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timeEl.textContent = time;
    reponseEl.textContent = "Wrong!";
  } else {
    reponseEl.textContent = "Correct!";
  }
  reponseEl.setAttribute("class", "feedback");
  setTimeout(function () {
    reponseEl.setAttribute("class", "feedback hide");
  }, 1000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  elementQuestions.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = nameEl.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}
submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
nameEl.onkeyup = checkForEnter;
