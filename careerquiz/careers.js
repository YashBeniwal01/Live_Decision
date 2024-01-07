// Define the questions and options with associated personality types
const questions = [
    "How would you describe your problem-solving skills?",
    "Which of these activities do you find most enjoyable?",
    "What type of work environment do you prefer?",
    "How do you handle stress and pressure?",
    "What skills do you value the most?",
    "Do you enjoy working in teams?",
    "What's your preferred way of learning?",
    "What motivates you the most?",
    "How do you handle routine tasks?",
    "Which area of work do you find most interesting?"
];

const options = [
    ["A. I enjoy finding practical solutions.", "B. I like analyzing complex issues.", "C. I prefer creative problem-solving.", "D. I enjoy helping people with their problems."],
    ["A. Solving practical problems.", "B. Analyzing data or information.", "C. Expressing creativity.", "D. Helping and supporting others."],
    ["A. Outdoors and hands-on work.", "B. Quiet and research-oriented.", "C. Artistic and open environment.", "D. Collaborative and team-oriented."],
    ["A. I thrive under pressure.", "B. I need a calm and controlled environment.", "C. I work best when it's relaxed.", "D. I enjoy helping others manage stress."],
    ["A. Technical and practical skills.", "B. Analytical and research skills.", "C. Creative and artistic skills.", "D. People and interpersonal skills."],
    ["A. I prefer working independently.", "B. I enjoy working with a small group.", "C. I like to work alone.", "D. I thrive in a team setting."],
    ["A. Hands-on experience.", "B. Analyzing and researching.", "C. Expressing creativity.", "D. Learning through helping others."],
    ["A. Achieving tangible results.", "B. Solving complex problems.", "C. Expressing my ideas.", "D. Making a difference in people's lives."],
    ["A. I prefer routine tasks.", "B. I need some variety in my work.", "C. Routine tasks bore me.", "D. I like a mix of routine and non-routine work."],
    ["A. Science and technology.", "B. Research and data analysis.", "C. Arts and design.", "D. Social work and helping professions."]
];

// Define the personality codes (Holland Codes)
const personalityTypes = {
    R: "Realistic",
    I: "Investigative",
    A: "Artistic",
    S: "Social",
    E: "Enterprising",
    C: "Conventional"
};

// Function to calculate the user's dominant personality type
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

// Sample user responses (replace with actual user responses)
const userResponses = ["A", "B", "C", "D", "A", "B", "C", "D", "A", "B"];

// Calculate the user's personality type(s)
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

// Display user's personality type(s) and suggested career types
console.log("Your Dominant Personality Type(s):", userPersonalityTypes.join(", "));
console.log("Suggested Career Types:", userPersonalityTypes.flatMap(type => careerSuggestions[type]).join(", "));
