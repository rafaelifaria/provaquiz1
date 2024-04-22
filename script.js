document.addEventListener("DOMContentLoaded", function() {
    // Seleção de elementos do DOM
    const playerNameInput = document.getElementById("player-name");
    const startBtn = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const nextBtn = document.getElementById("next-btn");
    const retryBtn = document.getElementById("retry-btn");
    let currentQuestionIndex = 0;
    let score = 0;

    // Array de objetos de perguntas e respostas
    const questions = [
        {
            question: "Qual é a capital do Brasil?",
            options: ["A) São Paulo", "B) Rio de Janeiro", "C) Brasília", "D) Belo Horizonte"],
            answer: "C"
        },
        {
            question: "Qual é o maior planeta do sistema solar?",
            options: ["A) Terra", "B) Júpiter", "C) Marte", "D) Saturno"],
            answer: "B"
        },
        {
            question: "Qual é a fórmula matemática para calcular a área de um triângulo?",
            options: ["A) A = l x w", "B) A = π x r²", "C) A = 1/2 x b x h", "D) A = π x d"],
            answer: "C"
        },
        {
            question: "Qual é o maior oceano do mundo?",
            options: ["A) Oceano Atlântico", "B) Oceano Índico", "C) Oceano Pacífico", "D) Oceano Ártico"],
            answer: "C"
        },
        {
            question: "Quem escreveu 'O Pequeno Príncipe'?",
            options: ["A) J.K. Rowling", "B) Antoine de Saint-Exupéry", "C) William Shakespeare", "D) J.R.R. Tolkien"],
            answer: "B"
        },
        {
            question: "Qual é o resultado de 2 + 2 * 2?",
            options: ["A) 6", "B) 8", "C) 4", "D) 10"],
            answer: "A"
        }
        // Adicione mais perguntas aqui
    ];

    // Adiciona ouvintes de eventos aos botões
    startBtn.addEventListener("click", startQuiz);
    nextBtn.addEventListener("click", loadNextQuestion);
    retryBtn.addEventListener("click", startQuiz);

    // Função para iniciar o quiz
    function startQuiz() {
        const playerName = playerNameInput.value;
        if (playerName.trim() === "") {
            alert("Por favor, informe seu nome.");
            return;
        }
        playerNameInput.disabled = true;
        startBtn.style.display = "none";
        questionContainer.classList.remove("d-none");
        resultContainer.classList.add("d-none");
        document.getElementById("start-container").style.display = "none"; // Esconde o título e campo de entrada de nome
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }

    // Função para carregar a próxima pergunta
    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById("question").textContent = currentQuestion.question;

        // Verifica se há uma imagem para a pergunta
        if (currentQuestion.image) {
            const imageContainer = document.getElementById("image-container");
            const questionImage = document.getElementById("question-image");
            questionImage.src = currentQuestion.image;
            imageContainer.style.display = "block";
        } else {
            // Oculta o contêiner de imagem se não houver imagem
            document.getElementById("image-container").style.display = "none";
        }

        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";
        // Cria botões de opção para cada opção da pergunta
        currentQuestion.options.forEach(option => {
            const optionBtn = document.createElement("button");
            optionBtn.textContent = option;
            optionBtn.className = "btn btn-secondary option-btn";
            // Adiciona um ouvinte de evento para verificar a resposta selecionada
            optionBtn.addEventListener("click", () => checkAnswer(option.charAt(0)));
            optionsContainer.appendChild(optionBtn);
        });
    }

    // Função para verificar a resposta selecionada
    function checkAnswer(selectedOption) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.answer) {
            score++;
        }
        // Desativa todos os botões de opção e destaca a resposta correta
        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.disabled = true;
            if (btn.textContent.charAt(0) === currentQuestion.answer) {
                btn.classList.add("correct-answer");
            } else {
                btn.classList.add("wrong-answer");
            }
        });
        nextBtn.style.display = "block";
    }

    // Função para carregar a próxima pergunta ou mostrar o resultado final
    function loadNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            // Habilita os botões de opção e remove a classe de destaque
            document.querySelectorAll(".option-btn").forEach(btn => {
                btn.disabled = false;
                btn.classList.remove("correct-answer", "wrong-answer");
            });
            nextBtn.style.display = "none";
        } else {
            showResult();
        }
    }

    // Função para mostrar o resultado final do quiz
    function showResult() {
        questionContainer.classList.add("d-none");
        resultContainer.classList.remove("d-none");
        const resultMessage = document.getElementById("result-message");
        resultMessage.textContent = `Parabéns, ${playerNameInput.value}! Você completou o quiz.`;
        const answersContainer = document.getElementById("answers");
        answersContainer.innerHTML = "";
        // Exibe todas as perguntas e suas respostas corretas
        questions.forEach((question, index) => {
            const answerElement = document.createElement("p");
            answerElement.textContent = `${index + 1}. ${question.question} - Resposta correta: ${question.answer}`;
            if (question.answer === questions[index].options[0].charAt(0)) {
                answerElement.classList.add("correct-answer");
            } else {
                answerElement.classList.add("wrong-answer");
            }
            answersContainer.appendChild(answerElement);
        });
        // Exibe a pontuação final do usuário
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = `Pontuação: ${score}/${questions.length}`;
    }
});
