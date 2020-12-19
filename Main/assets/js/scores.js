function finalScores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    var highScore = document.createElement("li");
    highScore.textContent = score.initials + " - " + score.score;

    var addScore = document.getElementById("highscores");
    addScore.appendChild(highScore);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

finalScores();
