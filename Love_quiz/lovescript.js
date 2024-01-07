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
        "How would you describe your level of emotional intimacy with your partner?" ,
        "Are you and your partner able to resolve conflicts and disagreements peacefully?",
        "Do you feel a strong sense of trust and security in your relationship?",
        "Are you and your partner supportive of each other's personal goals and aspirations?",
        "How often do you express affection and appreciation towards your partner?",
        "Are you satisfied with the level of physical intimacy in your relationship?",
        "Do you share common interests and hobbies with your partner?",
        "How well do you and your partner communicate about your individual needs and desires?",
        "Are you and your partner aligned in your long-term life goals, such as family, career, and future plans?",
        "In times of challenges or stress, how well do you and your partner support and lean on each other?"
    ];
    
    const options = [
        ["A. We are deeply emotionally connected.", "B. We often have conflicts but work on resolving them.", "C. Trust and security are issues in our relationship.", "D. I'm not sure about the emotional intimacy."],
        ["A. We resolve conflicts peacefully and effectively.", "B. We have occasional disagreements but handle them well.", "C. Conflict resolution is a major challenge for us.", "D. We avoid conflicts and don't discuss issues."],
        ["A. Trust and security are strong in our relationship.", "B. Trust is there, but we sometimes have doubts.", "C. Trust and security are fragile in our relationship.", "D. I'm unsure about the level of trust."],
        ["A. We fully support each other's goals and dreams.", "B. We are mostly supportive but have some conflicts.", "C. We rarely support each other's personal goals.", "D. We haven't discussed our personal goals."],
        ["A. We express affection and appreciation frequently.", "B. We occasionally show affection and appreciation.", "C. We rarely express affection and appreciation.", "D. We don't express affection and appreciation."],
        ["A. We are very satisfied with our physical intimacy.", "B. Physical intimacy is okay but could be better.", "C. Physical intimacy is lacking in our relationship.", "D. We haven't discussed our physical intimacy."],
        ["A. We have many common interests and hobbies.", "B. We share some interests but have our individual hobbies.", "C. We don't share many common interests or hobbies.", "D. We haven't explored each other's interests."],
        ["A. We communicate openly about our needs and desires.", "B. We communicate sometimes but have room for improvement.", "C. Communication about needs and desires is a struggle.", "D. We rarely discuss our needs and desires."],
        ["A. We are fully aligned in our long-term life goals.", "B. We have some alignment but also differences.", "C. Our long-term goals are mostly different.", "D. We haven't discussed our long-term goals."],
        ["A. We support and lean on each other effectively during challenges.", "B. We support each other but have room for improvement.", "C. We struggle to support each other during challenges.", "D. We haven't faced significant challenges together."]
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
    }, 20000); // Show the pop-up after 20 seconds   

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
        let likeCount = parseInt(localStorage.getItem("likeCount")) || 0;

        // Increment the like count by 1
        likeCount++;

        // Update the like count in Local Storage
        localStorage.setItem("likeCount", likeCount);


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
