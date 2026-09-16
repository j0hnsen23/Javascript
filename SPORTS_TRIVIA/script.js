const questions = [
    {
        category: "Fotball",
        question: "Hvilken norsk fotballspiller ble kåret til Premier League sin toppscorer i sesongen 2022/23?",
        options: ["Martin Ødegaard", "Erling Haaland", "Alexander Sørloth", "Joshua King"],
        answer: 1
    },
    {
        category: "Vintersport",
        question: "Hvilken norsk skiskytter har flest OL-gull i historien?",
        options: ["Johannes Thingnes Bø", "Ole Einar Bjørndalen", "Emil Hegle Svendsen", "Tarjei Bø"],
        answer: 1
    },
    {
        category: "Langrenn",
        question: "Hvem er kjent som 'kongen av langrenn' med flest verdenscupseiere i historien?",
        options: ["Petter Northug", "Bjørn Dæhlie", "Johannes Høsflot Klæbo", "Vegard Ulvang"],
        answer: 2
    },
    {
        category: "Fotball",
        question: "Hvilket lag spiller Erling Haaland for (per 2024)?",
        options: ["Borussia Dortmund", "Manchester City", "Real Madrid", "Bayern München"],
        answer: 1
    },
    {
        category: "Håndball",
        question: "Hvor mange ganger har det norske kvinnelandslaget i håndball vunnet VM (per 2023)?",
        options: ["2 ganger", "4 ganger", "6 ganger", "8 ganger"],
        answer: 2
    },
    {
        category: "Friidrett",
        question: "Hvilken norsk friidrettsutøver satte verdensrekord i 1500 meter i 2023?",
        options: ["Filip Ingebrigtsen", "Henrik Ingebrigtsen", "Jakob Ingebrigtsen", "Karsten Warholm"],
        answer: 2
    },
    {
        category: "Friidrett",
        question: "Karsten Warholm er verdensmester og olympisk mester i hvilken øvelse?",
        options: ["100 meter", "400 meter hekk", "Lengde", "Kule"],
        answer: 1
    },
    {
        category: "Vintersport",
        question: "I hvilken by ble Vinter-OL arrangert i Norge i 1994?",
        options: ["Oslo", "Lillehammer", "Trondheim", "Bergen"],
        answer: 1
    },
    {
        category: "Skihopp",
        question: "Hvem har vunnet flest verdenscuprenn i skihopp gjennom historien?",
        options: ["Kazuyoshi Funaki", "Gregor Schlierenzauer", "Kamil Stoch", "Robert Kranjec"],
        answer: 1
    },
    {
        category: "Fotball",
        question: "Hvilken norsk klubb har vunnet flest seriemesterskap i Eliteserien (menn)?",
        options: ["Vålerenga", "Molde", "Rosenborg", "Brann"],
        answer: 2
    }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let progress = 0;

const categoryElem = document.getElementById('category');
const questionElem = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const scoreElem = document.getElementById('score');
const highScoreElem = document.getElementById('high-score');
const timeElem = document.getElementById('time');
const progressElem = document.getElementById('progress');
const startButton = document.getElementById('start');

if (localStorage.getItem('highScore')) {
    highScoreElem.innerText = localStorage.getItem('highScore');
}

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElem.innerText = score;
    startButton.disabled = true;
    timeLeft = 60;
    timeElem.innerText = timeLeft;
    shuffledQuestions = [...questions];
    shuffle(shuffledQuestions);
    timerInterval = setInterval(updateTimer, 1000);
    loadQuestion();
}

function loadQuestion() {
    const questionData = shuffledQuestions[currentQuestionIndex];
    categoryElem.innerText = `Category: ${questionData.category}`;
    questionElem.innerText = questionData.question;

    const shuffledAnswers = [...questionData.options];
    shuffle(shuffledAnswers);

    answerButtons.forEach((btn, index) => {
        btn.innerText = shuffledAnswers[index];
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });

    progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressElem.style.width = `${progress}%`;
}

function updateTimer() {
    timeLeft--;
    timeElem.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function checkAnswer(selectedIndex) {
    const questionData = shuffledQuestions[currentQuestionIndex];
    const correctAnswerText = questionData.options[questionData.answer];

    if (answerButtons[selectedIndex].innerText === correctAnswerText) {
        answerButtons[selectedIndex].classList.add('correct');
        score++;
    } else {
        answerButtons[selectedIndex].classList.add('incorrect');
    }

    scoreElem.innerText = score;
    answerButtons.forEach(btn => btn.disabled = true);
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your score: ${score}`);
    const highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        highScoreElem.innerText = score;
    }
    startButton.disabled = false;
}

startButton.addEventListener('click', startGame);
answerButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => checkAnswer(index));
});