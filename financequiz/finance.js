///Server side language

const questionContainer = document.getElementById('question-container');
const serverURL = 'http://localhost:5500'; // Replace with your server URL

// Load questions from the server
fetch(`${serverURL}/api/questions`)
    .then(response => response.json())
    .then(questions => {
        questions.forEach(question => {
            questionContainer.appendChild(createQuestionBox(question));
        });
    })
    .catch(error => console.error(error));



    const questions = [
        "How do you and your roommate handle conflicts or disagreements?",
        "Do you and your roommate have open communication about household responsibilities?",
        "How often do you and your roommate spend time together outside of the living space?",
        "Are you and your roommate comfortable sharing personal items or belongings?",
        "Do you and your roommate have similar cleanliness and organization preferences?",
        "How do you and your roommate handle guests or visitors in your shared space?",
        "Are you and your roommate aware of each other's daily schedules and routines?",
        "How do you and your roommate handle shared expenses and financial matters?",
        "Do you and your roommate have common interests or hobbies that you enjoy together?",
        "How would you describe the overall level of trust and understanding between you and your roommate?"
    ];
    
    const options = [
        ["A. We openly discuss and resolve conflicts when they arise.", "B. We have occasional conflicts but address them through communication.", "C. Conflicts are a challenge for us, and we struggle to resolve them.", "D. We avoid conflicts and don't discuss disagreements."],
        ["A. We have clear communication and agreement on household responsibilities.", "B. We discuss responsibilities but sometimes encounter misunderstandings.", "C. Household responsibilities are a frequent source of tension.", "D. We haven't discussed or established household responsibilities."],
        ["A. We frequently spend time together outside of the living space.", "B. We occasionally hang out together outside of our shared space.", "C. We prefer spending time separately and have our own social circles.", "D. We rarely spend time together outside of the living space."],
        ["A. We are comfortable sharing personal items and belongings.", "B. We share some items but have boundaries on personal belongings.", "C. We prefer to keep our personal items separate.", "D. We haven't discussed sharing personal items."],
        ["A. We have similar cleanliness and organization preferences.", "B. We have some differences but compromise on cleanliness.", "C. Our cleanliness preferences often lead to conflicts.", "D. We haven't discussed or noticed differences in cleanliness preferences."],
        ["A. We have clear guidelines and communication about guests.", "B. We discuss guests but sometimes encounter disagreements.", "C. Guest policies are a source of tension between us.", "D. We haven't discussed or established guidelines for guests."],
        ["A. We are aware of each other's daily schedules and routines.", "B. We have a general idea but may not be fully aware of each other's schedules.", "C. We are not well-informed about each other's daily schedules and routines.", "D. We haven't discussed or paid attention to each other's schedules."],
        ["A. We have a clear system for handling shared expenses and financial matters.", "B. We discuss finances but sometimes encounter challenges.", "C. Finances are a source of tension between us.", "D. We haven't discussed or established a system for handling shared expenses."],
        ["A. We have common interests or hobbies that we enjoy together.", "B. We share some interests but also have individual hobbies.", "C. We don't have many common interests or hobbies.", "D. We haven't explored each other's interests or hobbies."],
        ["A. There is a high level of trust and understanding between us.", "B. We trust each other but sometimes have doubts.", "C. Trust and understanding are fragile in our relationship.", "D. We haven't discussed or assessed the level of trust between us."]
    ];
       

const optionValues = [
    [3, 1, -1, -2],
    [3, 1, -1, -2],
    [3, 1, -1, -2],
    [3, 1, -1, -2],
    [3, 1, -1, -2],
    [3, 1, -1, -2],
    [3, 1, -1, -2],
    [3, 1, -1, -2],
    [3, 1, -1, -2],
    [3, 1, -1, -2]
   
    // Add more option values for each question here
];

let currentQuestionIndex = 0;
let userScore = 0;

const questionElement = document.getElementById("question");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const optionsContainer = document.querySelector(".options");

prevButton.addEventListener("click", showPreviousQuestion);
nextButton.addEventListener("click", showNextQuestion);

function showQuestion(index) {
    questionElement.textContent = `Question ${index + 1}: ${questions[index]}`;
    updateOptions(index);
}


function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        // Store the user's selection for the current question
        optionsContainer.querySelectorAll(".option").forEach((option, i) => {
            if (option.classList.contains("selected")) {
                questionScores[currentQuestionIndex] = optionValues[currentQuestionIndex][i];
            }
        });

        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        prevButton.disabled = false;
        nextButton.textContent = "Next";
        // Restore the user's selection for the previous question
        optionsContainer.querySelectorAll(".option").forEach((option, i) => {
            if (optionValues[currentQuestionIndex][i] === questionScores[currentQuestionIndex]) {
                option.classList.add("selected");
            }
        });
        if (currentQuestionIndex === 0) {
            prevButton.disabled = true;
        }
    }
}

function showNextQuestion() {
    // Check if the user has selected an option for the current question
    let optionSelected = false;
    optionsContainer.querySelectorAll(".option").forEach(option => {
        if (option.classList.contains("selected")) {
            optionSelected = true;
        }
    });

    if (!optionSelected) {
        alert("Please choose an option before going to the next question.");
        return; // Do not proceed if no option is selected
    }

    if (currentQuestionIndex < questions.length - 1) {
        // Store the user's selection for the current question
        optionsContainer.querySelectorAll(".option").forEach((option, i) => {
            if (option.classList.contains("selected")) {
                questionScores[currentQuestionIndex] = optionValues[currentQuestionIndex][i];
            }
        });

        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        prevButton.disabled = false;
        nextButton.textContent = "Next";
        // Restore the user's selection for the next question
        optionsContainer.querySelectorAll(".option").forEach((option, i) => {
            if (optionValues[currentQuestionIndex][i] === questionScores[currentQuestionIndex]) {
                option.classList.add("selected");
            }
        });

        if (currentQuestionIndex === questions.length - 1) {
            nextButton.textContent = "See Results";
        }
    } else {
        showResults();
    }
}


function updateOptions(index) {
    optionsContainer.innerHTML = "";
    for (let i = 0; i < options[index].length; i++) {
        const option = document.createElement("div");
        option.textContent = options[index][i];
        option.className = "option";
        option.addEventListener("click", () => selectOption(optionValues[index][i]));
        optionsContainer.appendChild(option);
    }
}


const questionScores = new Array(questions.length).fill(0);

function selectOption(value) {
    // Get the index of the current question
    const questionIndex = currentQuestionIndex;

    // Deduct the previous score for this question
    userScore -= questionScores[questionIndex];

    // Add the new score for this question
    userScore += value;
    questionScores[questionIndex] = value;

    // Deselect all options for the current question
    optionsContainer.querySelectorAll(".option").forEach(option => option.classList.remove("selected"));

    // Mark the selected option
    event.target.classList.add("selected");
}



function showResults() {
    // Determine the decision based on the user's score
    let decision;
    if (userScore >= 30) {
        decision = "You're in an excellent relationship!";
    } else if (userScore >= 10) {
        decision = "Your relationship is good.";
    } else if (userScore >= -10) {
        decision = "Your relationship is average.";
    } else if (userScore >= -20) {
        decision = "Your relationship is challenging.";
    } else {
        decision = "Your relationship needs improvement.";
    }

    // Display the results - `<p style = "color:white">Your score: ${userScore}</p>
    questionElement.textContent = "Quiz Completed";
    optionsContainer.innerHTML = `<p id = "decision-text">Your Relationship Status - </p><p id = "decision">${decision}</p>`;
    prevButton.style.display = "none";
    nextButton.style.display = "none";

    const cureContainer = document.getElementById("cure-container");
    cureContainer.style.display = "block";

    // Call the function to draw the circular chart with percentages
    chartText();

    drawDecisionChart(userScore); // Replace these percentages with your actual values
    
    updateCureContainer(userScore);

    document.getElementById("headCure").style.display = "block";


    //Generate Insights
    document.getElementsByClassName("insights-container")[0].style.display = "block";

    generateInsights(questionScores);

    
    // Rating
    setTimeout(function() {
        const popupBox = document.getElementById("popup");
        popupBox.style.display = "block";
    }, 200); // Show the pop-up after 20 seconds   

}


function generateInsights(questionScores) {
    const insightsContainer = document.getElementById("insights-container");
    const insights = [];

    // Analyze each question and provide insights based on the user's responses
    for (let i = 0; i < questionScores.length; i++) {
        const score = questionScores[i];
        const question = questions[i];

        let insight = "";

        if (score >= 3) {
            insight = "You are doing great in this aspect. Keep it up!";
        } else if (score >= 1) {
            insight = "You are doing well, but there's room for improvement.";
        } else if (score >= -1) {
            insight = "This area may need some attention and improvement.";
        } else {
            insight = "This area needs significant improvement.";
        }

        insights.push({ question, insight });
    }

    // Display the insights in the HTML
    insightsContainer.innerHTML = "";
    insights.forEach((item, index) => {
        const insightElement = document.createElement("div");
        insightElement.className = "insight";
        insightElement.innerHTML = `<p><strong>Question ${index + 1}:</strong> ${item.question}</p><p><strong>Insight:</strong> ${item.insight}</p>`;
        insightsContainer.appendChild(insightElement);
    });
}


function like() {
        let likeCount = parseInt(localStorage.getItem("financeLikeCount")) || 0;

        // Increment the like count by 1
        likeCount++;

        // Update the like count in Local Storage
        localStorage.setItem("financeLikeCount", likeCount);


        const heartIcon = document.getElementById("heart-icon");

        heartIcon.classList.remove("blank");
        heartIcon.classList.add("filled"); // Add the "filled" class to make it red
    
       
        // Adjust the timeout to keep the pop-up visible for 2 seconds
        setTimeout(function() {
            document.getElementById("popup").style.display = "none";
        }, 100); // 1 seconds*/

    }


showQuestion(currentQuestionIndex);
prevButton.disabled = true;




//Displaying Result chart

function drawDecisionChart(userScore) {
    const canvas = document.getElementById("decision-chart");
    const ctx = canvas.getContext("2d");


    canvas.width = 0;
    canvas.height = 0;

    // Calculate the percentages of positive and negative responses
    const totalQuestions = questions.length;
        //const totalQuestions = questions.length;
        const positiveResponses = questionScores.filter(score => score === 1 || score === 3).length;
        const negativeResponses = questionScores.filter(score => score === -1 || score === -2).length;
    /*
    const positiveResponses = questionScores.filter(score => score > 0).length;
    const negativeResponses = totalQuestions - positiveResponses;*/

    const positivePercentage = (positiveResponses / totalQuestions) * 100;
    const negativePercentage = (negativeResponses / totalQuestions) * 100;

    // Define data for the chart
    const data = {
        labels: ["Positivity in Relationship", "Negativity in Relationship"],
        datasets: [{
            data: [positivePercentage, negativePercentage],
            backgroundColor: ["#00ff00", "#ff0000"], // Green for positive, red for negative
            radius:200,
        }],
    };

    // Create and render the chart
    new Chart(ctx, {
        type: "pie",
        data: data,
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: '#fff', // Change the font color here
                        // Change the font size here
                        font: {
                            size:20,
                            family: "'Cursive', cursive", // Use a cursive font
                            weight: 'bold', // Make the labels bold
                        },
                    },
                },
                
            },
        layout: {
            padding:0,
                },

        },
    });
}

// Display chart-text
function chartText(){
    document.getElementById("chart-text").innerHTML = "Decision Chart";
    const instruct = document.getElementById("instruct");
    instruct.style.opacity = 0;
}


// Care Suggestion for the Relationship

function updateCureContainer(userScore) {
    const cureContainer = document.getElementById("cure-container");

    // Define different content for each result category (Excellent, Good, Average, Challenging, Needs Improvement)
    const cureContent = {
        Excellent: [
            "Keep nurturing your love and communication",
            "Explore new experiences together to keep the excitement alive",
            "Continue showing appreciation and affection"
        ],
        Good: [
            "Maintain open and honest communication",
            "Plan quality time together to strengthen your bond",
            "Address any minor issues promptly to prevent them from growing"
        ],
        Average: [
            "Work on improving communication",
            "Identify areas where you can grow as a couple",
            "Focus on shared experiences to bring you closer"
        ],
        Challenging: [
            "Seek open and honest conversations to understand each other's needs",
            "Consider relationship counseling or therapy",
            "Work together on finding solutions to underlying issues"
        ],
        Critical: [
            "Seek immediate professional help or counseling",
            "Address any destructive patterns and behaviors",
            "Make a serious commitment to rebuilding the relationship"
        ]
    };
    

    // Get the result category based on the user's score
    let resultCategory;
    if (userScore >= 20) {
        resultCategory = "Excellent";
    } else if (userScore >= 10) {
        resultCategory = "Good";
    } else if (userScore >= -5) {
        resultCategory = "Average";
    } else if (userScore >= -10) {
        resultCategory = "Challenging";
    } else {
        resultCategory = "Critical";
    }

    // Update the content of the cure container
    cureContainer.innerHTML = `<p>${cureContent[resultCategory]}</p>`;   
}






// Your existing code here

document.addEventListener("DOMContentLoaded", function () {
    const startScreen = document.querySelector(".quiz-start-screen");
    const questionContainer = document.getElementById("question-container"); // Change the ID to match your HTML
    const startButton = document.getElementById("start-quiz");

    // Hide the question container initially
    questionContainer.style.display = "none";

    startButton.addEventListener("click", function () {
        startScreen.style.display = "none";
        questionContainer.style.display = "block";
        showQuestion(currentQuestionIndex);
    });

    // Rest of your code
});


document.getElementById("start-button").addEventListener("click", function() {
    // Hide the start screen
    document.querySelector(".quiz-start-screen").style.display = "none";

    // Show the question container
    document.getElementById("question-container").style.display = "block";
});
