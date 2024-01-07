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
        "What are your primary interests and hobbies outside of work?",
        "What are your favorite subjects or topics to learn about?",
        "What types of activities make you lose track of time?",
        "If money were no object, what would you choose to do with your life?",
        "What types of challenges or problems do you enjoy solving the most?",
        "What skills or talents do your friends and family often compliment you on?",
        "What kind of work environment do you thrive in?",
        "What would you like to be known or remembered for in your career?",
        "Do you prefer working independently or as part of a team?",
        "What are your long-term career goals or aspirations?"

    ];
    
    const options = [
        ["A. Outdoor activities and sports", "B. Reading and research", "C. Artistic or creative pursuits", "D. Volunteering and community involvement"],
        ["A. Science and technology", "B. Psychology and human behavior", "C. History and culture", "D. Environmental and sustainability issues"],
        ["A. Solving complex problems", "B. Helping others with their personal issues", "C. Expressing your creativity", "D. Working on projects that benefit the environment"],
        ["A. Travel the world and explore different cultures", "B. Start a non-profit organization", "C. Pursue a career in the arts", "D. Focus on conservation and sustainability efforts"],
        ["A. Logical and analytical challenges", "B. Emotional and interpersonal challenges", "C. Creative and innovative challenges", "D. Challenges related to environmental preservation"],
        ["A. Technical skills or expertise", "B. Empathy and people skills", "C. Artistic or musical talents", "D. Environmental awareness and advocacy"],
        ["A. Fast-paced and dynamic", "B. Supportive and nurturing", "C. Collaborative and creative", "D. Sustainable and eco-friendly"],
        ["A. Innovations and breakthroughs in your field", "B. Making a positive impact on people's lives", "C. Creating inspiring art or content", "D. Contributing to a healthier planet"],
        ["A. I prefer working independently", "B. I enjoy working as part of a team", "C. I like a mix of both", "D. It depends on the task or project"],
        ["A. Climbing the corporate ladder", "B. Making a difference in individuals' lives", "C. Achieving recognition in the arts", "D. Leading environmental initiatives"]
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
        let likeCount = parseInt(localStorage.getItem("travelLikeCount")) || 0;

        // Increment the like count by 1
        likeCount++;

        // Update the like count in Local Storage
        localStorage.setItem("travelLikeCount", likeCount);


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
