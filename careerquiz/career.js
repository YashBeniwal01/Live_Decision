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
    [4, -1, -2, -3],
    [4, -1, -2, -3],
    [4, -1, -2, -3],
    [4, -1, -2, -3],
    [4, -1, -2, -3],
    [4, -1, -2, -3],
    [4, -1, -2, -3],
    [4, -1, -2, -3],
    [4, -1, -2, -3],
    [4, -1, -2, -3]

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

const personalityTypes = {
    A: "Realistic",
    B: "Investigative",
    C: "Artistic",
    D: "Social",
    // Add more types as needed
};




function showResults() {
    // Get the user's responses from questionScores
    const userResponses = questionScores.map((score, index) => {
        if (score === 4) return "A";
        else if (score === -1) return "B";
        else if (score === -2) return "C";
        else if (score === -3) return "D";
        return ""; // Handle other cases if needed
    });

    // Calculate the user's dominant personality type(s)
    const userPersonalityTypes = calculatePersonalityType(userResponses);

    // Suggested career types based on the user's personality
    const careerSuggestions = {
        Realistic: ["Mechanical Engineer", "Electrician", "Carpenter"],
        Investigative: ["Research Scientist", "Data Analyst", "Psychologist"],
        Artistic: ["Graphic Designer", "Interior Designer", "Musician"],
        Social: ["Social Worker", "Teacher", "Counselor"],
        Enterprising: ["Entrepreneur", "Sales Manager", "Marketing Specialist"],
        Conventional: ["Accountant", "Office Manager", "Financial Analyst"]
    };

    // Create a div element to display the results
    const resultsDiv = document.createElement("div");
    resultsDiv.classList.add("results-container");

    // Display the user's dominant personality type(s)
    const personalityTypeText = document.createElement("p");
    personalityTypeText.textContent = "Your Dominant Personality Type(s): " + userPersonalityTypes.join(", ");
    resultsDiv.appendChild(personalityTypeText);

    // Display the suggested career types
    const suggestedCareersText = document.createElement("p");
    suggestedCareersText.textContent = "Suggested Career Types: " + userPersonalityTypes.flatMap(type => careerSuggestions[type]).join(", ");
    resultsDiv.appendChild(suggestedCareersText);

    // Clear the question container and add the results
    questionElement.textContent = "Quiz Completed";
    optionsContainer.innerHTML = "";
    questionContainer.appendChild(resultsDiv);

    prevButton.style.display = "none";
    nextButton.style.display = "none";

    const cureContainer = document.getElementById("cure-container");
    cureContainer.style.display = "block";

    updateCureContainer(userScore);

    document.getElementById("headCure").style.display = "block";

    // Rating
    setTimeout(function () {
        const popupBox = document.getElementById("popup");
        popupBox.style.display = "block";
    }, 20000);
}

// Add this function definition at the beginning of your career.js file
function calculatePersonalityType(userResponses) {
    const personalityScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    userResponses.forEach((response, index) => {
        // Adjust scores based on user responses
        switch (response) {
            case "A":
                personalityScores.A++;
                break;
            case "B":
                personalityScores.I++;
                break;
            case "C":
                personalityScores.A++;
                break;
            case "D":
                personalityScores.S++;
                break;
        }
    });

    // Find the dominant personality type(s)
    const maxScore = Math.max(...Object.values(personalityScores));
    const dominantTypes = Object.keys(personalityScores).filter(
        (type) => personalityScores[type] === maxScore
    );

    return dominantTypes.map((type) => personalityTypes[type]);
}


function like() {
        let likeCount = parseInt(localStorage.getItem("careerLikeCount")) || 0;

        // Increment the like count by 1
        likeCount++;

        // Update the like count in Local Storage
        localStorage.setItem("careerLikeCount", likeCount);

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


// Care Suggestion for the Relationship

function updateCureContainer(userScore) {
    const cureContainer = document.getElementById("cure-container");

    // Define different content for each result category (Excellent, Good, Average, Challenging, Needs Improvement)
    const cureContent = {
        Excellent: "Congratulations! Your relationship is in excellent shape. Continue to nurture it with open communication and shared experiences.",
        Good: "Your relationship is doing well. Keep up the good work and consider spending quality time together to strengthen your bond.",
        Average: "Your relationship is average. Focus on improving communication and addressing any issues that may arise.",
        Challenging: "Your relationship faces some challenges. It's essential to address these issues and work on improving the relationship.",
        "Needs Improvement": "Your relationship needs improvement. Seek open and honest conversations with your friend to identify areas for growth."
    };

    // Get the result category based on the user's score
    let resultCategory;
    if (userScore >= 12) {
        resultCategory = "Excellent";
    } else if (userScore >= 5) {
        resultCategory = "Good";
    } else if (userScore >= 0) {
        resultCategory = "Average";
    } else if (userScore >= -9) {
        resultCategory = "Challenging";
    } else {
        resultCategory = "Needs Improvement";
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
