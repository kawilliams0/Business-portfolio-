// Quiz data
const quizData = {
    fundamentals: {
        title: "Cybersecurity Fundamentals",
        questions: [
            {
                question: "What does CIA stand for in cybersecurity?",
                options: ["Confidentiality, Integrity, Availability", "Cybersecurity, Intelligence, Authentication"],
                correct: 0
            },
            {
                question: "What is the most common form of social engineering attack?",
                options: ["Phishing", "Keylogging"],
                correct: 0
            },
            {
                question: "Which type of malware encrypts a user's files and demands payment?",
                options: ["Ransomware", "Adware"],
                correct: 0
            },
            {
                question: "What is the process of converting plaintext into ciphertext called?",
                options: ["Encryption", "Encoding"],
                correct: 0
            },
            {
                question: "What is the primary purpose of a firewall?",
                options: ["To block unauthorized access", "To remove malware from files"],
                correct: 0
            }
        ]
    },
    network: {
        title: "Network Security & Attacks",
        questions: [
            {
                question: "What is the main purpose of a DMZ in network security?",
                options: ["Isolate public-facing services", "Store sensitive user data"],
                correct: 0
            },
            {
                question: "Which protocol is commonly used for secure file transfers?",
                options: ["SFTP", "HTTP"],
                correct: 0
            },
            {
                question: "What does ARP spoofing do?",
                options: ["Redirects network traffic to an attacker", "Encrypts data on a server"],
                correct: 0
            },
            {
                question: "What is a man-in-the-middle attack?",
                options: ["Intercepting communication between two parties", "Cracking passwords with brute force"],
                correct: 0
            },
            {
                question: "How does a packet sniffer work?",
                options: ["Captures and analyzes network traffic", "Encrypts data packets for security"],
                correct: 0
            }
        ]
    },
    cryptography: {
        title: "Cryptography & Cybersecurity Best Practices",
        questions: [
            {
                question: "What is the difference between hashing and encryption?",
                options: ["Hashing is one-way, encryption is reversible", "Encryption is one-way, hashing is reversible"],
                correct: 0
            },
            {
                question: "What is the purpose of a digital signature?",
                options: ["Verify authenticity and integrity", "Encrypt email attachments"],
                correct: 0
            },
            {
                question: "What is the main advantage of asymmetric encryption?",
                options: ["Secure key exchange", "Faster processing"],
                correct: 0
            },
            {
                question: "What is an example of a strong hashing algorithm?",
                options: ["SHA-256", "MD5"],
                correct: 0
            },
            {
                question: "What does the term 'salting' refer to in password security?",
                options: ["Adding random data before hashing", "Encrypting passwords twice"],
                correct: 0
            }
        ]
    }
};

class Quiz {
    constructor(quizId, quizType) {
        this.quizId = quizId;
        this.quizType = quizType;
        this.currentQuestion = 0;
        this.score = 0;
        this.quizContainer = document.getElementById(quizId);
        this.questions = quizData[quizType].questions;
        this.init();
    }

    init() {
        this.quizContainer.innerHTML = `
            <h3>${quizData[this.quizType].title}</h3>
            <div class="quiz-progress">
                <span id="progress-${this.quizId}">Question 1 of ${this.questions.length}</span>
            </div>
            <div class="quiz-question" id="question-${this.quizId}"></div>
            <div class="quiz-options" id="options-${this.quizId}"></div>
            <div class="quiz-feedback" id="feedback-${this.quizId}"></div>
            <button class="quiz-next" id="next-${this.quizId}">Next Question</button>
        `;
        this.showQuestion();
        this.setupEventListeners();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionElement = document.getElementById(`question-${this.quizId}`);
        const optionsElement = document.getElementById(`options-${this.quizId}`);
        const progressElement = document.getElementById(`progress-${this.quizId}`);
        
        questionElement.innerHTML = `<p>${question.question}</p>`;
        optionsElement.innerHTML = question.options.map((option, index) => `
            <button class="quiz-option" data-index="${index}">${option}</button>
        `).join('');
        
        progressElement.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;
        
        const nextButton = document.getElementById(`next-${this.quizId}`);
        nextButton.style.display = 'none';
    }

    setupEventListeners() {
        const optionsContainer = document.getElementById(`options-${this.quizId}`);
        const nextButton = document.getElementById(`next-${this.quizId}`);
        
        optionsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('quiz-option')) {
                const selectedIndex = parseInt(e.target.dataset.index);
                this.checkAnswer(selectedIndex);
            }
        });
        
        nextButton.addEventListener('click', () => {
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
                this.showQuestion();
            } else {
                this.showResults();
            }
        });
    }

    checkAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll(`#options-${this.quizId} .quiz-option`);
        const feedbackElement = document.getElementById(`feedback-${this.quizId}`);
        const nextButton = document.getElementById(`next-${this.quizId}`);
        
        options.forEach(option => option.disabled = true);
        
        if (selectedIndex === question.correct) {
            this.score++;
            feedbackElement.innerHTML = '<p class="correct">Correct!</p>';
        } else {
            feedbackElement.innerHTML = '<p class="incorrect">Incorrect. The correct answer was: ' + 
                question.options[question.correct] + '</p>';
        }
        
        nextButton.style.display = 'block';
    }

    showResults() {
        const percentage = (this.score / this.questions.length) * 100;
        this.quizContainer.innerHTML = `
            <h3>Quiz Complete!</h3>
            <p>Your score: ${this.score} out of ${this.questions.length} (${percentage}%)</p>
            <button class="quiz-restart">Restart Quiz</button>
        `;
        
        this.quizContainer.querySelector('.quiz-restart').addEventListener('click', () => {
            this.currentQuestion = 0;
            this.score = 0;
            this.init();
        });
    }
}

// Initialize quizzes when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Quiz('fundamentals-quiz', 'fundamentals');
    new Quiz('network-quiz', 'network');
    new Quiz('cryptography-quiz', 'cryptography');
}); 