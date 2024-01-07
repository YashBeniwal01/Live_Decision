document.addEventListener("DOMContentLoaded", function() {
    const userScore = parseInt(localStorage.getItem("userScore"));
    const userScoreElement = document.getElementById("user-score");
    const resultDecisionElement = document.getElementById("result-decision");

    userScoreElement.textContent = userScore;

    // Determine the decision based on the user's score
    let resultDecision = "Average";
    if (userScore >= 50) {
        resultDecision = "Excellent";
    } else if (userScore >= 20) {
        resultDecision = "Good";
    } else if (userScore >= 0) {
        resultDecision = "Average";
    } else if (userScore >= -20) {
        resultDecision = "Challenging";
    } else {
        resultDecision = "Needs Improvement";
    }

    resultDecisionElement.textContent = resultDecision;
});
