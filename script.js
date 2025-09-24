const dataCorreta = "22/01/2024"; 

const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game-container');
const dateInput = document.getElementById('date-input');
const loginButton = document.getElementById('login-button');
const errorMessage = document.getElementById('error-message');

function checkDate() {
    if (dateInput.value === dataCorreta) {
        loginContainer.classList.add('hidden'); 
        gameContainer.classList.remove('hidden'); 
        loadQuestion(); 
    } else {
        errorMessage.textContent = "Data incorreta. Tente de novo!";
        dateInput.classList.add('shake-error');
        setTimeout(() => {
            dateInput.classList.remove('shake-error');
        }, 820);
    }
}

if (loginButton) {
    loginButton.addEventListener('click', checkDate);
}
if(dateInput) {
    dateInput.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            checkDate();
        }
    });
}


const quizData = [
    
    {
        question: "Onde foi nosso primeiro beijo?",
        options: ["Na praia", "No cinema", "No parque", "No Shopping"],
        correct: 3,
        image: "imagens/foto_Shopping.jpg"
    },
    {
        question: "Qual foi o destino da nossa primeira viagem?",
        options: ["Guarujá", "Rio de Janeiro", "Salvador", "Florianópolis"],
        correct: 0,
        image: "imagens/foto_viagem.jpg"
    },
    {
        question: "Qual foi o show de artista internacional que a gente viu?",
        options: ["GUCCI MANE", "POST MALONE", "TRAVIS SCOTT", "LIL NAS X"],
        correct: 1, 
        image: "imagens/foto_show_internacional.jpg"
    },
    {
        question: "Qual foi o último festival que a gente foi?",
        options: ["MELHOR DIA", "FESTA DO CHEFE", "JAGUARIUNA", "VILLAMIX"],
        correct: 0,
        image: "imagens/foto_ultimo_festival.jpg"
    },
    {
        question: "Qual o 1º show que vimos juntos?",
        options: ["LUAN SANTANA", "MATUE", "VEIGH", "POST MALONE"],
        correct: 0,
        image: "imagens/foto_primeiro_show.jpg"
    },
  
    {
        question: "Onde é nosso local de lanche favorito?",
        options: ["VIP SUSHI", "RANGO BRABO", "QUEBRADA BURGUER", "BAR DO SHOPPING"],
        correct: 2, 
        image: "imagens/foto_lanche.jpg" 
    }
];

let currentQuestionIndex = 0;

const gameUI = document.getElementById('game');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const surpriseImageEl = document.getElementById('surprise-image');
const endGameScreen = document.getElementById('end-game-screen');

function loadQuestion() {
    if (endGameScreen) endGameScreen.classList.add('hidden');
    if (gameUI) gameUI.classList.remove('hidden');

    resultEl.textContent = '';
    surpriseImageEl.classList.add('hidden');

    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';

    currentQuestion.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option');
        button.addEventListener('click', () => checkAnswer(index));
        optionsEl.appendChild(button);
    });
}

function showEndScreen() {
    gameUI.classList.add('hidden');
    endGameScreen.classList.remove('hidden');

    confetti({
        particleCount: 150, 
        spread: 90, 
        origin: { y: 0.6 } 
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        resultEl.innerHTML = "Parabéns, você acertou! ❤️";
        resultEl.style.color = 'green';
        surpriseImageEl.src = currentQuestion.image;
        surpriseImageEl.classList.remove('hidden');

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showEndScreen();
            }
        }, 4000);
    } else {
        resultEl.textContent = "Ops, resposta errada! Tente de novo.";
        resultEl.style.color = 'red';
    }
}